---
sidebar_position: 25
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Web Page Import

The Web Page Import API allows you to transform unstructured web content into structured data within your Knowledge Graph. By providing a URL, the service automatically retrieves the page content, extracts the core information, and represents it as a Knowledge Graph entity.

## Overview

When you import a web page, WordLift performs several key actions:
1.  **Retrieval**: Downloads the HTML content of the page using a smart fetching system.
2.  **Extraction**: Identifies the main text, headline, and metadata while ignoring noise like sidebars or ads.
3.  **Structuring**: Converts the extracted data into RDF, typically following the [Schema.org WebPage](https://schema.org/WebPage) vocabulary.
4.  **Enrichment**: Optionally generates vector embeddings for semantic search and AI applications.

## Basic Import

To import a web page with default settings, send a `POST` request to the `/web-page-imports` endpoint.

```sh
curl -X "POST" "https://api.wordlift.io/web-page-imports" 
     -H 'Authorization: Key <YOUR_API_KEY>' 
     -H 'Content-Type: application/json' 
     -d '{
  "url": "https://example.com/some-page"
}'
```

## Advanced Fetching Options

Modern websites often use dynamic rendering or strict bot protections. You can tune how WordLift retrieves the page using the `fetch_options` object.

### Fetching Modes

The `mode` parameter determines the strategy used to download the page:

| Mode | Description |
| :--- | :--- |
| `default` | **Recommended.** Uses a smart fallback system. It attempts a standard fetch and automatically upgrades to an advanced rendering fetch if the target site blocks the initial request. |
| `proxy` | Uses the standard fetching service. |
| `scrapingbee` | Forces the use of an advanced rendering engine capable of handling JavaScript and premium residential networks. |

### Configuration Parameters

When using the advanced rendering engine (either via `default` fallback or forced `scrapingbee` mode), the following options are available:

| Option | Type | Description |
| :--- | :--- | :--- |
| `render_js` | Boolean | Executes JavaScript on the page. Required for Single Page Applications (SPAs) or content hidden behind interactive elements like accordions. |
| `premium_proxy` | Boolean | Uses high-quality residential networks to bypass advanced security shields on enterprise websites. |
| `country_code` | String | Sets the geographical location for the request (e.g., `us`, `de`, `ch`), allowing you to import region-specific content. |
| `wait_for` | String | Instructs the fetcher to wait for a specific CSS selector to appear before capturing the content. |
| `block_ads` | Boolean | Prevents ads from loading, reducing bandwidth and ensuring a cleaner extraction. |

### Example: Importing a Dynamic Swiss Website

```json
{
  "url": "https://www.zurich.ch/de",
  "fetch_options": {
    "mode": "scrapingbee",
    "render_js": true,
    "country_code": "ch",
    "wait_for": ".main-content"
  }
}
```

## Extracted Data

The resulting entity is stored in the Knowledge Graph and includes the following structured properties:
- **Headline**: The primary title of the content.
- **Text**: The full body text extracted from the page.
- **Abstract**: A concise summary of the page content.
- **Url**: The original source URL.
- **Types**: By default, the entity is typed as `http://schema.org/WebPage`.

## Troubleshooting

- **Access Denied (403)**: If the standard fetch is blocked, the system usually retries automatically in `default` mode. If it still fails, try forcing `mode: scrapingbee` with `premium_proxy: true`.
- **Incomplete Content**: If the page relies heavily on client-side rendering, ensure `render_js` is set to `true`.
