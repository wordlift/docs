---
title: "Monitoring API"
description: "Fetch the latest Monitor results for a URL, including status, title, canonical, performance and structured data checks, with field and state reference."
last_updated: 2026-10-27
---

# Monitoring API

The Monitoring API returns the latest Monitor results for a URL in your Knowledge Graph: the overall status of the latest run, a summary per monitor, and detailed results such as the JSON-LD found on the page compared with the JSON-LD WordLift publishes. Use it to bring check results into your own dashboards, alerts or CI.

Monitor is in Early Access on Business+ and Enterprise. For what Monitor checks and how to read the same results in the dashboard, see [Monitor](/platform/monitor/).

## Base URL and authentication {#base-url-and-authentication}

All requests use the base URL `https://api.wordlift.io`. Authenticate with either method in the `Authorization` header:

| Method | Header |
| --- | --- |
| OAuth2 access token | `Authorization: Bearer <access-token>` |
| WordLift key (Graph Key) | `Authorization: Key <your-wordlift-key>` |

See [Authentication and API keys](/apis-and-sdks/#authentication) for where to find your key and how to store it.

## Get the latest results for a URL {#endpoint}

```http
GET /monitor/graphs/{graph_id}/urls/results?url=<full_url>
```

| Parameter | In | Required | Description |
| --- | --- | --- | --- |
| `graph_id` | Path | Yes | The identifier of the graph that holds the URL. |
| `url` | Query | Yes | The full URL of the page, including the scheme. |

:::warning[Review needed]
TODO [SME]: confirm that `GET /monitor/graphs/{graph_id}/urls/results` is still supported. The Monitor OpenAPI specification exposes account-scoped endpoints under `/accounts/{account_id}/monitoring/` with Key authentication only.
:::

## Example request and response {#example-request-and-response}

With an OAuth2 access token:

```bash
curl -sS \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://api.wordlift.io/monitor/graphs/1234567/urls/results?url=https://www.example.com/products/example-product"
```

With a WordLift key:

```bash
curl -sS \
  -H "Authorization: Key $WL_KEY" \
  "https://api.wordlift.io/monitor/graphs/1234567/urls/results?url=https://www.example.com/products/example-product"
```

The response below is shortened.

```json
{
  "url": "https://www.example.com/products/example-product",
  "graph_id": "1234567",
  "status": "OK",
  "run_id": "c2b4b364-4f4c-4ef1-b8f4-7b02d5c9e0f7",
  "created_at": "2026-02-05T08:12:10.145Z",
  "processed_at": "2026-02-05T08:12:46.913Z",
  "monitors": [
    {
      "name": "status_check",
      "state": "OK",
      "details": "200 OK",
      "score": 100
    },
    {
      "name": "title_check",
      "state": "OK",
      "details": "Title present",
      "score": 100
    },
    {
      "name": "canonical_check",
      "state": "OK",
      "details": "Canonical present",
      "score": 100
    },
    {
      "name": "performance_check",
      "state": "OK",
      "details": "TTFB 182ms",
      "score": 100
    },
    {
      "name": "structured_data",
      "state": "WARN",
      "details": "JSON-LD validated with warnings",
      "score": 90
    }
  ],
  "results": [
    {
      "monitor_name": "structured_data",
      "state": "WARN",
      "details": "JSON-LD validated with warnings",
      "score": 90,
      "metadata": {
        "execution_ms": 1432.6,
        "jsonld_blocks": 2,
        "jsonld_bytes": 4098,
        "errors": [],
        "warnings": [
          {
            "severity": "Warning",
            "message": "Schema.org range check: item.",
            "path": "http://schema.org/item"
          }
        ],
        "monitor_version": "0.3.0",
        "monitor_build": "bf8c88698c07ceb3842bef6a93009bb24bd9f9815ed668cfac4e964591ecbb02",
        "page": {
          "jsonld": [
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Example Product"
            }
          ]
        },
        "api": {
          "jsonld": [
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Example Product",
              "brand": "Example Brand",
              "model": "EX-100",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD"
              }
            }
          ],
          "url": "https://api.wordlift.io/data/https/www.example.com/products/example-product?__wl_lang=en",
          "status_code": 200,
          "error": null
        }
      },
      "created_at": "2026-02-05T08:12:10.145Z",
      "processed_at": "2026-02-05T08:12:46.913Z"
    }
  ]
}
```

## Response fields {#response-structure}

### Top-level fields {#top-level-fields}

| Field | Description |
| --- | --- |
| `url` | The requested URL. |
| `graph_id` | The graph identifier used for the query. |
| `status` | The overall status of the latest run: `OK`, `WARNING`, `ERROR` or `PENDING`. |
| `run_id` | The identifier of the latest run. |
| `created_at` | When the run was queued. |
| `processed_at` | When the run finished. |
| `monitors` | A compact list of monitor summaries. |
| `results` | Detailed results per monitor. |

### Monitor summary fields {#monitor-summary-fields}

Each item in `monitors` contains:

| Field | Description |
| --- | --- |
| `name` | The monitor identifier, for example `status_check`, `title_check`, `canonical_check`, `performance_check` or `structured_data`. |
| `state` | The monitor state: `OK`, `WARN` or `FAIL`. |
| `details` | A human-readable summary. |
| `score` | A numeric score, when the monitor provides one. |

### Result fields {#result-fields}

Each item in `results` contains:

| Field | Description |
| --- | --- |
| `monitor_name` | The monitor identifier. |
| `state` | The monitor state: `OK`, `WARN` or `FAIL`. |
| `details` | A human-readable summary. |
| `score` | A numeric score, when the monitor provides one. |
| `metadata` | Structured, monitor-specific data. See [Structured data metadata](#structured-data-metadata). |
| `created_at`, `processed_at` | Timestamps for the run. |

## States and statuses {#states-and-statuses}

The overall `status` and the per-monitor `state` use different values.

| Value | Where | Meaning |
| --- | --- | --- |
| `OK` | `status` and `state` | The checks passed. |
| `WARNING` | `status` | The latest run has warnings. |
| `WARN` | `state` | The monitor passed with warnings. |
| `ERROR` | `status` | The latest run has errors. |
| `FAIL` | `state` | The monitor failed. |
| `PENDING` | `status` | The run is queued and has not finished. |

:::warning[Review needed]
TODO [SME]: confirm the meaning of each value and how per-monitor `WARN` and `FAIL` roll up into the overall `WARNING` and `ERROR`.
:::

## Structured data metadata {#structured-data-metadata}

The `metadata` object of the structured data monitor contains:

| Field | Description |
| --- | --- |
| `jsonld_blocks` | The number of JSON-LD script blocks found in the page. |
| `jsonld_bytes` | The total JSON-LD size in bytes. |
| `errors` | Validation errors: missing required properties. |
| `warnings` | Validation warnings: missing recommended properties. |
| `monitor_version` | The version of `wordlift-monitors-structured-data`. |
| `monitor_build` | An optional build identifier (image digest or git SHA). |
| `page.jsonld` | The JSON-LD extracted from the page. |
| `api.jsonld` | The JSON-LD returned by the [Data API](/apis-and-sdks/data-api/) for the same URL. It is not validated. |
| `api.url` | The Data API URL requested for the page. |
| `execution_ms` | The total execution time for this task, in milliseconds. |

Compare `page.jsonld` with `api.jsonld` to see whether the page carries the JSON-LD that WordLift publishes for it.

## Errors {#errors}

:::warning[Review needed]
TODO [SME]: list the status codes and response bodies this endpoint returns (for example for a missing key, an unknown graph or a URL with no results).
:::

For conventions shared across WordLift APIs, see [Errors](/apis-and-sdks/#errors).

## Related {#related}

- [Monitor](/platform/monitor/), the product documentation
- [Inspect URL results](/platform/monitor/inspect-url-results/), to read the same results in the dashboard
- [Data API](/apis-and-sdks/data-api/), the source of `api.jsonld`
- [schema.org](https://schema.org/), the vocabulary the structured data checks use
