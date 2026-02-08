---
sidebar_position: 25
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Web Page Import API

The Web Page Import API allows you to import a single web page into your Knowledge Graph. It fetches the page content, extracts structured data and text using Trafilatura, converts it to RDF, and stores it in the graph.

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

## Fetching Strategies (Fetch Mode)

By default, the system uses a **Smart Fallback** strategy to ensure high success rates even when target websites have strict bot protections.

You can explicitly control the fetching behavior using the `fetch_options.mode` parameter.

| Mode | Description |
| :--- | :--- |
| `default` | **Recommended.** Tries the standard proxy first. If blocked (403/429), automatically retries using ScrapingBee. |
| `proxy` | Forces the use of the standard Proxy service. |
| `scrapingbee` | Forces the use of ScrapingBee (supports JS rendering and premium proxies). |

### Example: Forcing ScrapingBee

```json
{
  "url": "https://example.com/complex-page",
  "fetch_options": {
    "mode": "scrapingbee"
  }
}
```

## Advanced Scraping Options

When using `scrapingbee` mode (either forced or via fallback), you can configure advanced parameters to handle dynamic or protected content.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `render_js` | Boolean | `true` | Renders JavaScript on the page (essential for SPA or content in accordions). |
| `block_ads` | Boolean | `true` | Blocks intrusive advertisements to save bandwidth. |
| `premium_proxy` | Boolean | `true` | Uses high-quality residential proxies to bypass advanced security shields. |
| `timeout` | Integer | `60000` | Max rendering timeout in milliseconds. |
| `wait_for` | String | `null` | A CSS selector to wait for before returning the content. |
| `country_code` | String | `null` | ISO 2-letter country code for geo-proxies (e.g., `us`, `de`). |

### Example: JavaScript Rendering with Geolocation

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

## Data Extraction

The API uses **Trafilatura** to extract the main content. The resulting entity is typically of type `http://schema.org/WebPage` (configurable via `output_types`) and includes:
- **Headline**: Extracted from page titles/headers.
- **Text**: The main body content.
- **Abstract**: A brief summary of the content.
- **Embeddings**: Optional vector representations if configured in the request.

## Troubleshooting

- **403 Forbidden**: The target site is blocking the request. Try setting `fetch_options.mode` to `scrapingbee` and enable `premium_proxy`.
- **429 Too Many Requests**: You are hitting rate limits. The `default` mode will automatically switch to ScrapingBee to bypass this.
