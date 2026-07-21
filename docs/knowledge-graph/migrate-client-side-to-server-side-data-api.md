---
sidebar_position: 36
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Migrate from Client-Side API to Server-Side API

Use this guide when you already publish WordLift JSON-LD with the client-side WordLift Cloud API and want to move JSON-LD injection into your server-side rendering pipeline.

Server-side injection makes the JSON-LD available in the initial HTML response. This is useful when structured data must be visible to systems that do not execute JavaScript, including some crawlers, AI retrieval systems, and agentic tools.

## Before you start

Confirm that your team can:

- change the server, static-site generator, edge function, or framework code that renders pages;
- determine the canonical URL for each rendered page;
- add a cache for Data API responses;
- validate JSON-LD in the rendered HTML.

If you cannot change the server-side rendering pipeline, continue using the [WordLift Cloud script](../cloud/index.md).

## What changes

With the client-side integration, the browser loads `bootstrap.js`, fetches JSON-LD, and injects it into the rendered DOM after the page loads.

With the server-side integration, your application fetches JSON-LD from the [Data API](./data-api.md), caches it, and injects it into the HTML before the response is returned.

| Area | Client-side API | Server-side Data API |
| --- | --- | --- |
| Injection point | Browser DOM after JavaScript runs | Initial server-rendered HTML |
| Implementation location | Script tag or tag manager | Server, framework, static build, or edge layer |
| Response handling | Legacy JSON shapes may be consumed directly by custom code | Standard JSON-LD document parsed as linked data |
| Caching responsibility | Browser and WordLift Cloud script behavior | Your application cache |
| Best fit | Fast setup, minimal application changes | Raw HTML discoverability and controlled rendering |

## Response format differences

Do not migrate by copying old property paths one by one. The server-side Data API returns a JSON-LD document. Treat it as linked data and parse it with JSON-LD or RDF-aware tooling when you need to transform or query it.

See [Parsing JSON-LD and RDF](./data-api.md#parsing-json-ld-and-rdf) for library recommendations.

### Legacy client-side response shape

Legacy responses may be a top-level array of schema.org objects. Some properties may use unprefixed schema.org names, and each node may carry its own `@context`.

```json
[
  {
    "@context": "https://schema.org/",
    "@type": "http://schema.org/CollectionPage",
    "@id": "https://data.acme.example/acme/category/how-to-choose-running-shoes",
    "url": "https://www.acme.example/running-shoes",
    "headline": "How to Choose Running Shoes",
    "abstract": "A practical guide from Acme Inc. for choosing running shoes.",
    "datePublished": "2026-03-11"
  },
  {
    "@context": "https://schema.org/",
    "@type": "http://schema.org/Question",
    "@id": "https://data.acme.example/acme/questions/best-running-shoe-fit",
    "name": "How should running shoes fit?"
  }
]
```

### Server-side JSON-LD response shape

The server-side Data API returns a JSON-LD document with a shared `@context` and an `@graph`. Related nodes are connected with `@id` references.

```json
{
  "@context": {
    "@vocab": "https://data.acme.example/acme/",
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "https://data.acme.example/acme/category/how-to-choose-running-shoes",
      "@type": "schema:CollectionPage",
      "schema:url": "https://www.acme.example/running-shoes",
      "schema:headline": "How to Choose Running Shoes",
      "schema:abstract": "A practical guide from Acme Inc. for choosing running shoes.",
      "schema:datePublished": "2026-03-11",
      "schema:mainEntity": [
        {
          "@id": "https://data.acme.example/acme/questions/best-running-shoe-fit"
        }
      ]
    },
    {
      "@id": "https://data.acme.example/acme/questions/best-running-shoe-fit",
      "@type": "schema:Question",
      "schema:name": "How should running shoes fit?",
      "schema:acceptedAnswer": {
        "@id": "https://data.acme.example/acme/questions/best-running-shoe-fit/answer"
      }
    },
    {
      "@id": "https://data.acme.example/acme/questions/best-running-shoe-fit/answer",
      "@type": "schema:Answer",
      "schema:text": "Running shoes should feel secure at the heel, allow natural toe movement, and match the surface you run on."
    }
  ]
}
```

The exact nodes and properties depend on the Knowledge Graph data available for the requested URL.

## Migration steps

<a id="2-map-each-page-to-its-canonical-url"></a>

### 1. Map each page to its canonical URL

For each rendered page, determine the canonical URL that WordLift uses for the Knowledge Graph entry.

This URL is used to build the Data API request. For example:

```text
https://www.acme.example/running-shoes
```

becomes:

```text
https://api.wordlift.io/data/https/www.acme.example/running-shoes
```

See [API URL format](./data-api.md#api-url-format) for the full URL construction rules.

<a id="3-fetch-and-parse-the-json-ld"></a>

### 2. Fetch and parse the JSON-LD

Fetch the Data API response from server-side code. Parse it as JSON, then serialize it into the page as an `application/ld+json` script.

Do not build JSON-LD with string concatenation. Use your runtime JSON serializer and escape characters that could break out of the script tag.

```html
<script type="application/ld+json">
{
  "@context": {
    "@vocab": "https://data.acme.example/acme/",
    "schema": "http://schema.org/"
  },
  "@graph": [
    {
      "@id": "https://data.acme.example/acme/category/how-to-choose-running-shoes",
      "@type": "schema:CollectionPage",
      "schema:url": "https://www.acme.example/running-shoes",
      "schema:headline": "How to Choose Running Shoes"
    }
  ]
}
</script>
```

For a framework example, see the [Next.js server-side example](./data-api.md#nextjs-server-side-example).

<a id="4-add-caching-timeout-and-fallback-behavior"></a>

### 3. Add caching, timeout, and fallback behavior

Do not block page rendering on an uncached Data API request without a timeout and fallback.

Use a stale-while-revalidate approach:

- serve fresh cached JSON-LD when available;
- serve acceptable stale JSON-LD when fresh data is unavailable;
- refresh the cache outside the critical rendering path where possible;
- skip JSON-LD for that response rather than delaying the page when no acceptable cache entry exists.

Start with a minimum cache TTL of 1 minute. Depending on your publishing cadence, a TTL of 3 hours, 6 hours, 12 hours, or 24 hours may be more appropriate.

See [Performance and caching](./data-api.md#performance-and-caching) for the full caching model and observability recommendations.

<a id="5-handle-multilingual-pages"></a>

### 4. Handle multilingual pages

If the site is multilingual, pass the `__wl_lang` query parameter when requesting structured data for a specific language.

```text
https://api.wordlift.io/data/https/www.acme.example/running-shoes?__wl_lang=en
```

See [Multilingual requests](./data-api.md#multilingual-requests) and [Multilingual Graphs](./multilingual.md) for language routing details.

<a id="6-validate-before-rollout"></a>

### 5. Validate before rollout

Before removing the client-side integration, validate a representative set of pages:

- raw HTML contains one or more `application/ld+json` script tags;
- JSON-LD parses as valid JSON;
- structured data validators can read the markup;
- canonical URL mapping matches the WordLift Knowledge Graph URL;
- cache hit, stale response, timeout, and error paths are logged;
- no duplicate JSON-LD is injected by both server-side code and `bootstrap.js`.

After validation, remove or disable the client-side JSON-LD injection for the migrated pages. If you still need other WordLift Cloud features on those pages, configure the script so it does not duplicate JSON-LD injection.

## Related documentation

- [Data API](./data-api.md)
- [Choosing client-side or server-side injection](./data-api.md#choosing-client-side-or-server-side-injection)
- [Performance and caching](./data-api.md#performance-and-caching)
- [WordLift Cloud script](../cloud/index.md)
- [Multilingual Graphs](./multilingual.md)
