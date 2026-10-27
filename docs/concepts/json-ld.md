---
title: "JSON-LD"
description: "JSON-LD is the linked data format WordLift uses to publish structured data. Learn its parts, how it reaches your page and how it combines with existing markup."
last_updated: 2026-10-27
---

# JSON-LD

[JSON-LD](https://json-ld.org/) (JSON for Linked Data) is a JSON format for describing linked data. On a web page it sits inside a `<script type="application/ld+json">` tag, apart from the visible content.

## Why it matters

JSON-LD gives search engines and AI systems a machine-readable description of the entities on a page: what the page is, what it is about, and who published it. Search engines can consume it directly as structured data. Because it is also valid RDF, tools that support JSON-LD can parse it into triples and combine it with other [linked data](/concepts/linked-data/).

## How it works: anatomy of WordLift JSON-LD

This is a sample [Data API](/apis-and-sdks/data-api/) response:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://data.example.org/entity/page",
      "url": "https://example.org/page.html",
      "name": "Example page",
      "about": {
        "@id": "https://data.example.org/entity/example-topic"
      },
      "publisher": {
        "@id": "https://data.example.org/entity/example-organization"
      }
    },
    {
      "@type": "Thing",
      "@id": "https://data.example.org/entity/example-topic",
      "name": "Example topic",
      "sameAs": [
        "https://www.wikidata.org/wiki/Q1492"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://data.example.org/entity/example-organization",
      "name": "Example Organization",
      "url": "https://example.org/"
    }
  ]
}
```

| Part | What it does |
| --- | --- |
| `@context` | Names the vocabulary the keys come from, usually schema.org. Read [Schema.org](/concepts/schema-org/). |
| `@graph` | Holds several entities in one block. |
| `@type` | Says what kind of thing each entity is, such as `WebPage`, `Thing` or `Organization`. |
| `@id` | Gives each entity a stable identifier under the graph's dataset URI. Other entities refer to it by this value. |
| `url`, `name` | Page-level properties. Others you can see include `headline` and `description`. |
| `about`, `publisher` | Relationships from the page to other entities, written as references to their `@id`. |
| `sameAs` | Links an entity to the same thing in another dataset, here Wikidata. Read [Entities](/concepts/entities/#reconciliation-and-sameas). |

The exact entities and properties depend on the data available in the Knowledge Graph for the requested URL.

Treat JSON-LD as data, not text. Parse and serialize it with a JSON-LD or RDF library, such as jsonld.js, RDFLib or Apache Jena, instead of editing it with string replacement. The [Data API](/apis-and-sdks/data-api/#parsing-json-ld-and-rdf) lists these libraries.

## How it reaches your page {#how-it-reaches-your-page}

The same JSON-LD can reach the page in two places:

- **Client-side.** [WordLift Cloud](/welcome/install-wordlift-cloud/) loads `bootstrap.js` in the browser. The script detects the page URL, fetches the JSON-LD from the Data API and adds it to the rendered page. The JSON-LD is not in the initial HTML the server returns.
- **Server-side, build-time or edge.** Your server, static-site generator, edge function or application framework fetches the JSON-LD from the Data API and puts it in the HTML before the page is returned. The [Cloudflare integration](/apis-and-sdks/data-api/cloudflare-integration/) and [out-of-band cache prefill](/apis-and-sdks/data-api/out-of-band-cache-prefill/) are examples.

The difference matters because consumers read pages in different ways. Googlebot renders JavaScript, so it sees client-side JSON-LD. Some AI crawlers, retrieval systems and agentic tools inspect only the raw HTML response, so they miss JSON-LD that a script adds later. When AI search visibility or access by crawlers that do not run JavaScript is a priority, prefer server-side delivery. Client-side delivery suits cases where speed of setup and minimal application changes come first. The [Data API](/apis-and-sdks/data-api/#choosing-client-side-or-server-side-injection) explains the tradeoffs and the setup.

The classic WordPress plugin generates JSON-LD inside WordPress for posts and entity pages. Its output is documented in [WordPress plugin JSON-LD](/integrations/wordpress-plugin/jsonld/).

To export the whole graph as JSON-LD instead of one page, use the [KG-REST export](/apis-and-sdks/kg-rest/#export) with the `application/ld+json` format.

## Working with existing markup {#working-with-existing-markup}

A page can carry JSON-LD from more than one source, for example your theme and WordLift. In the WordPress plugin you have four options:

- **Disable WordLift's JSON-LD.** Add the `wl_jsonld_enabled` filter, returning false, in your theme.
- **Edit WordLift's JSON-LD with PHP filters.** For example, the `wl_post_jsonld` filter can change `@type` from `Article` to `NewsArticle`. This requires PHP development skills.
- **Customize it with Mappings.** Use [Mappings](/integrations/wordpress-plugin/mappings/) in the plugin's interface.
- **Add your own JSON-LD with the same `@id`.** When two blocks describe the same `@id`, consumers that support it can combine the two descriptions of one entity.

:::warning[Review needed]
TODO [SME]: confirm that adding your own JSON-LD with the same `@id` is still the recommended way to combine markup, and whether it applies to Data API and WordLift Cloud output as well as the WordPress plugin.
:::

## Related

- [Data API](/apis-and-sdks/data-api/)
- [Cloudflare integration](/apis-and-sdks/data-api/cloudflare-integration/)
- [WordPress plugin JSON-LD](/integrations/wordpress-plugin/jsonld/)
- [Schema.org](/concepts/schema-org/)
- [Linked data](/concepts/linked-data/)
- [KG-REST export](/apis-and-sdks/kg-rest/#export)
