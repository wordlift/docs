---
title: "Web Page Import"
description: "Import one or a few web pages into your Knowledge Graph as WebPage entities, and tune how WordLift fetches dynamic or protected pages."
sidebar_position: 25
last_updated: 2026-10-27
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Web Page Import

:::note Review the population options first

Before using the Web Page Import API, review [Create a Knowledge Graph](../knowledge-graph/create.md) to determine whether a single-page import or a broader GraphSync workflow fits your use case.

:::

The Web Page Import API turns unstructured web content into structured data in your Knowledge Graph. When you provide a URL, the service retrieves the page content, extracts the core information, and represents it as a Knowledge Graph entity.

Use this API for one or a few individual pages, or as a narrow integration primitive. It creates a page-oriented entity and defaults to the `WebPage` type; it is not the recommended way to model and synchronize a complete Business+ or Enterprise graph.

## Overview

When you import a web page, WordLift performs these actions:

1.  **Retrieval**: Downloads the HTML content of the page using a smart fetching system.
2.  **Extraction**: Identifies the main text, headline, and metadata while ignoring noise like sidebars or ads.
3.  **Structuring**: Converts the extracted data into RDF, typically following the [Schema.org WebPage](https://schema.org/WebPage) vocabulary.
4.  **Enrichment**: Optionally generates vector embeddings for semantic search and AI applications.

## Basic import

To import a web page with default settings, send a `POST` request to the `/web-page-imports` endpoint.

```sh
curl -X "POST" "https://api.wordlift.io/web-page-imports" \
     -H 'Authorization: Key <YOUR_API_KEY>' \
     -H 'Content-Type: application/json' \
     -d '{
  "url": "https://example.com/some-page"
}'
```

## Advanced fetching options

Modern websites often use dynamic rendering or strict bot protections. You can tune how WordLift retrieves the page using the `fetch_options` object.

### Fetching modes

The `mode` parameter determines the strategy used to download the page:

| Mode | Description |
| :--- | :--- |
| `default` | **Recommended.** Uses a smart fallback system. It attempts a standard fetch and automatically upgrades to an advanced rendering fetch if the target site blocks the initial request. |
| `proxy` | Uses the standard fetching service. |
| `premium_scraper` | Forces the use of an advanced rendering engine capable of handling JavaScript and premium residential networks. |

### Configuration parameters

When using the advanced rendering engine (either via `default` fallback or forced `premium_scraper` mode), the following options are available:

| Option | Type | Description |
| :--- | :--- | :--- |
| `render_js` | Boolean | Executes JavaScript on the page. Required for Single Page Applications (SPAs) or content hidden behind interactive elements like accordions. |
| `premium_proxy` | Boolean | Uses high-quality residential networks to bypass advanced security shields on enterprise websites. |
| `country_code` | String | Sets the geographical location for the request (for example `us`, `de` or `ch`), so you can import region-specific content. |
| `wait_for` | String | Instructs the fetcher to wait for a specific CSS selector to appear before capturing the content. |
| `block_ads` | Boolean | Prevents ads from loading, which reduces bandwidth and gives a cleaner extraction. |

### Example: importing a dynamic Swiss website

```json
{
  "url": "https://www.zurich.ch/de",
  "fetch_options": {
    "mode": "premium_scraper",
    "render_js": true,
    "country_code": "ch",
    "wait_for": ".main-content"
  }
}
```

## Extracted data

WordLift stores the resulting entity in the Knowledge Graph with the following structured properties:

- **Headline**: The primary title of the content.
- **Text**: The full body text extracted from the page.
- **Abstract**: A concise summary of the page content.
- **URL**: The original source URL.
- **Types**: By default, the entity is typed as `http://schema.org/WebPage`.

## Troubleshooting

- **Access denied (403)**: If the standard fetch is blocked, the system usually retries automatically in `default` mode. If it still fails, try forcing `mode: premium_scraper` with `premium_proxy: true`.
- **Incomplete content**: If the page relies heavily on client-side rendering, set `render_js` to `true`.
