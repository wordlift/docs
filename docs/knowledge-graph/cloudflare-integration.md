---
title: Cloudflare Integration
description: Fetch WordLift JSON-LD at the Cloudflare edge and inject it into the initial HTML response with HTMLRewriter.
keywords:
  - Cloudflare Worker
  - HTMLRewriter
  - edge JSON-LD injection
  - WordLift Data API
---

# Cloudflare Integration

Use a Cloudflare Worker when the website is already behind Cloudflare and WordLift JSON-LD must be present in the initial HTML response. The Worker fetches the page from the origin, retrieves the page-specific JSON-LD from the [Data API](./data-api.md), and inserts an `application/ld+json` script into the HTML `<head>` with [`HTMLRewriter`](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/).

This integration does not load `bootstrap.js`. JSON-LD delivery happens entirely at the edge before the response is returned to the crawler or browser.

## Request flow and security boundaries

Route the Worker only over public content pages. Exclude administration, account, preview, checkout, and other private or personalized routes.

This reference targets a [Worker Route](https://developers.cloudflare.com/workers/configuration/routing/routes/) in front of an application origin, where `fetch(request)` retrieves the origin response. It is not a drop-in implementation for a Worker Custom Domain, where the Worker is itself the origin. If another Worker produces the origin response, adapt the topology to use a service binding or another explicit origin path and review Cloudflare's [`global_fetch_strictly_public` compatibility behavior](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#global-fetch-strictly-public).

The Worker should:

1. Accept only public `GET` requests on explicitly allowed HTTPS hosts.
2. Fetch the origin response without following redirects.
3. Continue only for a direct `2xx` HTML response other than `206 Partial Content`.
4. Normalize the page URL according to the website's canonical URL policy.
5. Fetch JSON-LD only from the fixed `https://api.wordlift.io` origin without forwarding request headers or credentials.
6. Parse, validate, and safely serialize the JSON-LD before inserting it into `<head>`.
7. Return the origin response unchanged when the Data API response is unavailable or invalid.

Do not derive the page host from `Forwarded`, `X-Forwarded-Host`, or a caller-provided API URL. Configure the production hosts in the Worker and align URL normalization with the website's redirects, locale routing, query-string policy, and trailing-slash policy.

## Worker reference implementation

The following JavaScript module is a reference implementation to adapt and test for the target Cloudflare zone. Replace the example authority and excluded paths, then adapt `normalizeCanonicalUrl` and `resolveLanguage` to the website's trusted routing rules.

The example keeps JSON-LD cached for up to 24 hours. Entries are fresh for one hour; an older acceptable entry is served immediately while the Worker refreshes it in the background. Review the canonical [performance and caching guidance](./data-api.md#performance-and-caching) before choosing production thresholds.

```js
const ALLOWED_PAGE_AUTHORITIES = new Set(["www.example.com"]);
const EXCLUDED_PATH_PREFIXES = [
  "/account",
  "/admin",
  "/checkout",
  "/preview",
];
// Add only non-sensitive query parameters that are part of canonical identity.
const CANONICAL_QUERY_PARAMETERS = new Set([]);

const DATA_API_ORIGIN = "https://api.wordlift.io";
const CACHE_VERSION = "wordlift-jsonld-v1";
const FRESH_TTL_MS = 60 * 60 * 1000;
const MAX_STALE_MS = 24 * 60 * 60 * 1000;
const DATA_API_TIMEOUT_MS = 1200;
const MAX_JSON_LD_BYTES = 1024 * 1024;
const RETRY_COOLDOWN_MS = 30 * 1000;
const MAX_RETRY_COOLDOWNS = 1000;

const inFlightRefreshes = new Map();
const retryAfter = new Map();

function isPublicContentRequest(request) {
  if (request.method !== "GET") return false;

  const url = new URL(request.url);
  if (url.protocol !== "https:" || !ALLOWED_PAGE_AUTHORITIES.has(url.host)) {
    return false;
  }

  return !EXCLUDED_PATH_PREFIXES.some(
    (prefix) => url.pathname === prefix || url.pathname.startsWith(`${prefix}/`),
  );
}

function isRewritableHtml(response) {
  if (response.status < 200 || response.status >= 300 || response.status === 206) {
    return false;
  }

  const contentType = response.headers.get("content-type") || "";
  return response.body !== null && contentType.toLowerCase().includes("text/html");
}

function normalizeCanonicalUrl(requestUrl) {
  const url = new URL(requestUrl);
  url.hash = "";

  for (const name of [...url.searchParams.keys()]) {
    if (!CANONICAL_QUERY_PARAMETERS.has(name)) url.searchParams.delete(name);
  }

  url.searchParams.sort();
  return url.toString();
}

function resolveLanguage(_canonicalUrl) {
  // Return a validated ISO 639-1 code from trusted host or path routing.
  // Return null for a monolingual site or when the URL identifies the graph.
  return null;
}

function validateLanguage(language) {
  return language === null || /^[a-z]{2}$/.test(language);
}

function toDataApiUrl(canonicalUrl, language) {
  const page = new URL(canonicalUrl);
  const api = new URL(
    `/data/${page.protocol.slice(0, -1)}/${page.host}${page.pathname}`,
    DATA_API_ORIGIN,
  );

  for (const [name, value] of page.searchParams) {
    if (CANONICAL_QUERY_PARAMETERS.has(name)) {
      api.searchParams.append(name, value);
    }
  }
  if (language !== null) api.searchParams.set("__wl_lang", language);

  return api;
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function createCacheContext(requestUrl, canonicalUrl, language) {
  const id = await sha256(`${CACHE_VERSION}\n${canonicalUrl}\n${language || ""}`);
  const cacheUrl = new URL(requestUrl);
  cacheUrl.pathname = `/.wordlift-jsonld-cache/${id}`;
  cacheUrl.search = "";
  cacheUrl.hash = "";

  return {
    id,
    key: new Request(cacheUrl.toString(), { method: "GET" }),
  };
}

function isJsonLdValue(value) {
  return value !== null && (Array.isArray(value) || typeof value === "object");
}

async function readJsonWithLimit(response) {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_LD_BYTES) {
    throw new Error("response_too_large");
  }

  if (!response.body) throw new Error("missing_response_body");

  const reader = response.body.getReader();
  const chunks = [];
  let received = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > MAX_JSON_LD_BYTES) {
        await reader.cancel();
        throw new Error("response_too_large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const value = JSON.parse(new TextDecoder().decode(bytes));
  if (!isJsonLdValue(value)) throw new Error("invalid_json_ld_shape");
  return value;
}

async function fetchJsonLd(dataApiUrl) {
  if (dataApiUrl.origin !== DATA_API_ORIGIN) {
    throw new Error("invalid_data_api_origin");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DATA_API_TIMEOUT_MS);

  try {
    const response = await fetch(dataApiUrl.toString(), {
      method: "GET",
      headers: { Accept: "application/ld+json" },
      redirect: "manual",
      signal: controller.signal,
    });

    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    if (
      response.status !== 200 ||
      (!contentType.includes("application/ld+json") &&
        !contentType.includes("application/json"))
    ) {
      throw new Error("invalid_data_api_response");
    }

    return await readJsonWithLimit(response);
  } finally {
    clearTimeout(timer);
  }
}

async function readCache(cacheKey) {
  const response = await caches.default.match(cacheKey);
  if (!response) return null;

  try {
    const record = await response.json();
    if (
      typeof record?.fetchedAt !== "number" ||
      !isJsonLdValue(record?.jsonLd)
    ) {
      return null;
    }
    return record;
  } catch {
    return null;
  }
}

async function writeCache(cacheKey, jsonLd) {
  const record = JSON.stringify({ fetchedAt: Date.now(), jsonLd });
  await caches.default.put(
    cacheKey,
    new Response(record, {
      headers: {
        "Cache-Control": `public, max-age=${Math.floor(MAX_STALE_MS / 1000)}`,
        "Content-Type": "application/json",
      },
    }),
  );
}

function setRetryCooldown(id) {
  const now = Date.now();
  for (const [key, expiresAt] of retryAfter) {
    if (expiresAt <= now) retryAfter.delete(key);
  }

  if (retryAfter.size >= MAX_RETRY_COOLDOWNS) {
    const oldestKey = retryAfter.keys().next().value;
    if (oldestKey !== undefined) retryAfter.delete(oldestKey);
  }

  retryAfter.set(id, now + RETRY_COOLDOWN_MS);
}

function refreshJsonLd(cacheContext, dataApiUrl) {
  const existing = inFlightRefreshes.get(cacheContext.id);
  if (existing) return existing;

  const cooldownEnd = retryAfter.get(cacheContext.id) || 0;
  if (cooldownEnd > Date.now()) {
    return Promise.reject(new Error("refresh_throttled"));
  }
  if (cooldownEnd !== 0) retryAfter.delete(cacheContext.id);

  const refresh = (async () => {
    const jsonLd = await fetchJsonLd(dataApiUrl);
    await writeCache(cacheContext.key, jsonLd);
    return jsonLd;
  })()
    .then((jsonLd) => {
      retryAfter.delete(cacheContext.id);
      return jsonLd;
    })
    .catch((error) => {
      setRetryCooldown(cacheContext.id);
      throw error;
    })
    .finally(() => inFlightRefreshes.delete(cacheContext.id));

  inFlightRefreshes.set(cacheContext.id, refresh);
  return refresh;
}

async function getJsonLd(request, canonicalUrl, language, ctx) {
  const cacheContext = await createCacheContext(
    request.url,
    canonicalUrl,
    language,
  );
  const dataApiUrl = toDataApiUrl(canonicalUrl, language);
  const cached = await readCache(cacheContext.key);
  const age = cached ? Date.now() - cached.fetchedAt : Number.POSITIVE_INFINITY;

  if (cached && age <= FRESH_TTL_MS) return cached.jsonLd;

  if (cached && age <= MAX_STALE_MS) {
    ctx.waitUntil(refreshJsonLd(cacheContext, dataApiUrl).catch(() => undefined));
    return cached.jsonLd;
  }

  try {
    return await refreshJsonLd(cacheContext, dataApiUrl);
  } catch {
    return null;
  }
}

function serializeJsonLd(jsonLd) {
  return JSON.stringify(jsonLd)
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export default {
  async fetch(request, _env, ctx) {
    const originResponse = await fetch(request, { redirect: "manual" });

    if (!isPublicContentRequest(request) || !isRewritableHtml(originResponse)) {
      return originResponse;
    }

    const canonicalUrl = normalizeCanonicalUrl(request.url);
    const canonical = new URL(canonicalUrl);
    if (
      canonical.protocol !== "https:" ||
      !ALLOWED_PAGE_AUTHORITIES.has(canonical.host)
    ) {
      return originResponse;
    }

    const language = resolveLanguage(canonicalUrl);
    if (!validateLanguage(language)) return originResponse;

    const jsonLd = await getJsonLd(
      request,
      canonicalUrl,
      language,
      ctx,
    );
    if (!jsonLd) return originResponse;

    const script = `<script type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`;
    return new HTMLRewriter()
      .on("head", {
        element(head) {
          head.append(script, { html: true });
        },
      })
      .transform(originResponse);
  },
};
```

The cache key contains a SHA-256 digest rather than the canonical URL, so query values are not exposed through the internal cache URL. The Data API request is a new request containing only the `Accept` header; cookies, authorization headers, forwarded headers, and other origin-request metadata are not sent to WordLift.

The in-memory refresh map deduplicates requests and applies a short failure cooldown within one Worker isolate. For strict coordination and backoff across isolates or regions, use a Durable Object or another coordination mechanism. Do not log full canonical URLs, query strings, Data API bodies, credentials, or upstream exception text. Prefer bounded reason codes and the hashed cache identifier.

## Origin and caching requirements

- The origin must return a complete HTML document containing a `<head>` element. If no `<head>` is present, `HTMLRewriter` has no injection target.
- Configure redirects and canonical host rules before the Worker route when possible. The Worker returns origin redirects unchanged.
- Do not cache personalized HTML as a side effect of this integration. The example caches only the JSON-LD record.
- Keep the maximum stale age aligned with the site's publishing cadence. Never serve cached structured data beyond the accepted stale window.
- If the site is multilingual, derive the language from trusted host or path routing and include the validated language in the Data API request and cache key. See [Multilingual requests](./data-api.md#multilingual-requests).
- If a Content Security Policy requires a nonce or hash for JSON-LD script elements, adapt the injected tag to the site's existing CSP design.

## Validate before rollout

Test the Worker on a staging route and inspect the raw response rather than only the browser DOM:

```bash
curl --silent --show-error https://www.example.com/example-page \
  | grep 'application/ld+json'
```

Validate all of these paths before production rollout:

- a public `GET` returning `2xx` HTML receives valid JSON-LD in `<head>`;
- `HEAD`, mutation methods, excluded paths, redirects, errors, partial responses, and non-HTML content pass through unchanged;
- unapproved hosts and ports pass through unchanged, and spoofed `Forwarded` or `X-Forwarded-Host` values cannot change the canonical URL or Data API request;
- cookies, authorization, forwarding, and other inbound headers are absent from the Data API request;
- fresh, stale, expired, and malformed cache records follow the expected behavior;
- a Data API timeout, redirect, invalid content type, oversized body, or malformed JSON leaves the page unchanged;
- repeated refresh failures observe the cooldown instead of creating a request for every page view;
- values containing `</script>` or other markup remain data and cannot create a second HTML element;
- tracking and sensitive query parameters are excluded by the canonical URL policy;
- different validated languages produce separate cache entries;
- raw HTML contains the JSON-LD without executing JavaScript.

Monitor cache hits, stale responses, timeouts, refresh failures, and the age of data served as described in [Performance and caching](./data-api.md#performance-and-caching). Use the official Cloudflare references for [`HTMLRewriter`](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/) and the [Workers Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/).
