---
id: monitoring
slug: /developer-resources/monitoring
sidebar_label: Monitoring API Guide
---

# Developer API Guide

This document describes how to query monitor results for a specific URL.

## Base Host

All examples use:

```
https://api.wordlift.io
```

## Endpoint

Get the latest monitor results for a URL in a graph:

```
GET /monitor/graphs/{graph_id}/urls/results?url=<full_url>
```

## Security

You can authenticate in two ways:
1. OAuth2 with a Bearer token in the `Authorization` header.
2. Graph Key with a Key token in the `Authorization` header.

## Example: OAuth2 Bearer Token

```
curl -sS \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  "https://api.wordlift.io/monitor/graphs/1506805/urls/results?url=https://www.busesforsale.com/buses/21358-2019-ford-t350-hd-blue-bird-mfsab"
```

## Example: Graph Key Token

```
curl -sS \
  -H "Authorization: Key $GRAPH_KEY" \
  "https://api.wordlift.io/monitor/graphs/1506805/urls/results?url=https://www.busesforsale.com/buses/21358-2019-ford-t350-hd-blue-bird-mfsab"
```

## Example Response

Note: The response below is truncated for brevity.

```json
{
  "url": "https://www.busesforsale.com/buses/21358-2019-ford-t350-hd-blue-bird-mfsab",
  "graph_id": "1506805",
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
              "@type": "Vehicle",
              "name": "2014 Ford Phoenix 22 CE Shuttle Bus"
            }
          ]
        },
        "api": {
          "jsonld": [
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "2019 Ford T350 HD Blue Bird MFSAB",
              "brand": "Ford",
              "model": "T350 HD",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD"
              }
            }
          ],
          "url": "https://api.wordlift.io/data/https/www.busesforsale.com/buses/21358-2019-ford-t350-hd-blue-bird-mfsab?__wl_lang=en",
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

## Response Structure

Top-level fields:
- `url`: the requested URL.
- `graph_id`: the graph identifier used for the query.
- `status`: overall status for the latest run (`OK`, `WARNING`, `ERROR`, or `PENDING`).
- `run_id`: identifier for the latest run.
- `created_at`: when the run was queued.
- `processed_at`: when the run finished.
- `monitors`: a compact list of monitor summaries.
- `results`: detailed per-monitor results.

Each result contains:
- `monitor_name`: identifier of the monitor.
- `state`: `OK`, `WARN`, or `FAIL`.
- `details`: human-readable summary.
- `score`: numeric score if the monitor provides one.
- `metadata`: structured, monitor-specific data.
- `created_at`, `processed_at`: timestamps for the run.

### Structured Data Metadata

The structured data monitor includes:
- `jsonld_blocks`: number of JSON-LD script blocks found in the page.
- `jsonld_bytes`: total JSON-LD size in bytes.
- `errors`: validation errors (missing required properties).
- `warnings`: validation warnings (missing recommended properties).
- `monitor_version`: version of `wordlift-monitors-structured-data`.
- `monitor_build`: optional build identifier (image digest or git SHA).
- `page.jsonld`: JSON-LD extracted from the page.
- `api.jsonld`: JSON-LD returned by `api.wordlift.io` for the same URL (not validated).
- `execution_ms`: total execution time for this task.
