---
title: Out-of-Band Data API Cache Prefill
description: Refresh WordLift Data API responses on a schedule and serve JSON-LD from an application cache without fetching it during page rendering.
keywords:
  - Data API cache
  - scheduled cache refresh
  - out-of-band cache prefill
  - Next.js JSON-LD
---

# Out-of-Band Data API Cache Prefill

Use an out-of-band process when you want server-rendered WordLift JSON-LD without calling the [Data API](./data-api.md) during a page request. A scheduled job fetches and validates the JSON-LD for a known set of canonical URLs, stores it in a shared application cache, and lets the page renderer read only from that cache.

This is a server-side caching option, not a separate injection mechanism. The application still serializes the cached JSON-LD into an `application/ld+json` script in the HTML response.

## When to use this option

Scheduled cache prefill is a good fit when:

- the application uses server-side rendering, such as a Next.js application;
- the canonical URLs can be obtained from a trusted sitemap, CMS, route inventory, or publication feed;
- all rendering instances can access the same persistent cache;
- structured data can remain valid for the configured maximum cache age, which is 30 hours in the starting configuration below;
- predictable Data API traffic is more important than immediate updates;
- the Data API must remain outside the page-rendering critical path.

This option is especially useful for high-traffic sites with a bounded set of public pages. The scheduled job absorbs Data API latency, while page requests perform only a cache read.

## When to choose another option

Use request-time caching or another server-side integration when:

- structured data must reflect graph updates almost immediately;
- URLs are unbounded, generated dynamically, or difficult to enumerate safely;
- the application cannot provide a shared persistent cache;
- the site is statically generated and is not rebuilt or revalidated after cache updates.

Use this pattern only for public content pages. Exclude administration, preview, account, checkout, and other private or personalized routes unless they have a separately reviewed structured-data and caching design.

Do not use an in-memory `Map`, local file, or process-local cache for serverless or horizontally scaled applications. Those caches are not reliably shared between rendering instances and may disappear between invocations.

## Recommended schedule and TTL

As a starting point:

- run the refresh job every **24 hours**;
- store successful responses with a **30-hour TTL**.

The six-hour overlap allows time for a delayed job or bounded retries before the previous entry expires. Choose shorter intervals when the Knowledge Graph changes more frequently. Keep an on-demand refresh path for new pages and urgent graph corrections.

If a job can run for more than the six-hour overlap, reduce the batch size, increase controlled concurrency, or start refreshing more frequently. Do not extend the TTL without deciding how old the structured data may become.

## Refresh flow

For each scheduled run:

1. Load the approved canonical URL inventory from a trusted source. Do not accept an inventory supplied by the scheduler caller.
2. Normalize each URL according to the site's canonical host, trailing-slash policy, and an explicit allowlist of query parameters that belong to canonical identity. Derive URLs from trusted CMS or route data, not `Host`, `X-Forwarded-Host`, or request-supplied values.
3. Resolve and validate the language when the graph requires `__wl_lang`.
4. Build the [Data API URL](./data-api.md#api-url-format) using the normalized canonical URL.
5. Fetch from the fixed `https://api.wordlift.io` origin with a bounded timeout and controlled concurrency. Reject cross-origin redirects or verify that the final response came from the same fixed origin.
6. Accept only a successful JSON or JSON-LD response within the application's size limit.
7. Parse the response, reject empty values, and validate the expected Data API JSON-LD document shape before caching it.
8. Replace the cache entry atomically and set its TTL to 30 hours.
9. Record success, failure, retries, response age, and inventory coverage.

Build the cache key from:

- the normalized canonical URL;
- the validated language, when present;
- a cache or response-format version.

Do not forward cookies, authorization headers, or other viewer request metadata to the Data API. Avoid logging response bodies or sensitive query strings.

## Failure behavior

Never replace a valid cache entry with an error, empty response, oversized response, or malformed JSON-LD. Retry transient failures with bounded exponential backoff inside the six-hour overlap.

The page renderer should not call the Data API when an entry is missing or expired. Omit the WordLift JSON-LD for that response, log the cache miss, and let the scheduled or on-demand process restore the entry. This fail-open behavior prevents structured-data delivery from delaying or failing the page. A failed refresh preserves the previous valid entry only until its TTL expires.

Handle partial batch failures per URL. A failure for one page must not prevent valid responses for other pages from being stored.

## Next.js architecture

A Next.js application can separate refresh and rendering responsibilities:

1. A platform scheduler invokes a protected Route Handler or a standalone worker every 24 hours.
2. The refresh process reads the canonical URL inventory and writes validated JSON-LD to a distributed, persistent cache.
3. A Server Component, layout, or page reads the cached value and never fetches the Data API directly.
4. The renderer safely serializes the cached value into the HTML.

The cache adapter and URL inventory are application responsibilities. For example, the integration can expose interfaces similar to:

```ts
interface JsonLdCache {
  get(key: string): Promise<unknown | null>;
  set(key: string, value: unknown, ttlSeconds: number): Promise<void>;
}

interface CanonicalUrlInventory {
  list(): Promise<Array<{ url: string; language?: string }>>;
}
```

Use a store shared by every Next.js instance. If pages are statically generated, updating this cache alone does not change their HTML; rebuild or revalidate the affected pages after a successful refresh.

Authenticate and authorize scheduler calls on the server. Accept only the intended HTTP method, typically `POST`, reject unauthorized requests, and apply rate, replay, and concurrency controls. Do not put scheduler credentials in query parameters, and do not let the caller submit arbitrary URLs to refresh.

When rendering the script, serialize parsed JSON rather than concatenating strings, and escape characters that could terminate the script element. See the [Next.js server-side example](./data-api.md#nextjs-server-side-example) for the injection point. If the site uses a strict Content Security Policy, apply its nonce or hash policy to the JSON-LD script.

## New and updated pages

A daily job may not know about a page published after the latest inventory snapshot. Combine the scheduled run with one of these options:

- trigger an on-demand refresh from the publishing workflow;
- enqueue the new canonical URL when the CMS publishes it;
- refresh recently changed sitemap entries more frequently;
- run a pre-deployment warm-up before making new routes public.

Increment the cache version or purge affected keys when canonical URL rules, language routing, or response handling changes.

## Monitoring

Track at least:

- inventory size and percentage successfully cached;
- refresh successes, failures, and retries;
- missing and expired entries;
- age of the JSON-LD used during rendering;
- refresh duration and Data API latency;
- on-demand refresh outcomes.

Alert before repeated failures consume the six-hour overlap. A successful job should mean that every expected URL either has a newly validated entry or a recorded, actionable failure.

## Validate before rollout

Use a representative URL set and confirm that:

- canonical, query-string, trailing-slash, and language variants use the intended cache keys;
- spoofed host headers, unapproved query parameters, and caller-supplied URLs cannot change the inventory, upstream origin, or cache key;
- unauthorized scheduler requests and unintended HTTP methods are rejected without logging credentials;
- valid responses replace entries atomically;
- empty, malformed, non-JSON-LD, oversized, redirected, and timed-out responses preserve the previous valid entry until its TTL expires;
- partial failures do not stop the remaining batch;
- missing or expired entries do not delay or break page rendering;
- raw HTML contains valid JSON-LD without executing JavaScript;
- values containing markup remain escaped data and cannot terminate the JSON-LD script;
- the client-side WordLift integration does not inject duplicate JSON-LD;
- new and corrected pages can be refreshed on demand.

For request-time caching instead, follow [Performance and caching](./data-api.md#performance-and-caching).
