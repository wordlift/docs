---
title: seocheck
---

Run SEO checks against URLs found in a sitemap. Supports remote sitemap URLs and local files.

## Usage
- `worai seocheck <sitemap_url_or_path> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `sitemap_url_or_path` | string | URL or local file path to a sitemap XML (or sitemap index). Supports `.gz` files and `file://` URLs. |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--max-urls` | int | none | Limit the number of URLs checked. |
| `--timeout` | float | `20.0` | Timeout (seconds) for HTTP requests (sitemaps, robots.txt, llms.txt). |
| `--page-timeout` | int | `30000` | Timeout (ms) for browser page loads. |
| `--wait-until` | choice | `domcontentloaded` | Playwright wait strategy: `domcontentloaded`, `load`, `networkidle`. |
| `--ttfb-ok-ms` | float | `200.0` | TTFB ok threshold in ms. |
| `--ttfb-warn-ms` | float | `500.0` | TTFB warn threshold in ms. |
| `--headed` | bool | `false` | Run the browser with a visible UI instead of headless. |
| `--format` | choice | `text` | Output format: `text` or `json`. |
| `--output-dir` | string | none | Write report outputs to this directory (report.json, summary.txt, per-page JSONs, report UI). |
| `--output` | string | none | Write a comprehensive JSON report to this file path. |
| `--output-summary` | string | none | Write a human-readable summary report to this file path. |
| `--save-html` | bool | `false` | Save rendered HTML for each page to the output directory. |
| `--checks` | string | none | Comma-separated list of page check names to run (others disabled). |
| `--disable-checks` | string | none | Comma-separated list of page check names to skip. |
| `--concurrency` | string | `1` | Number of pages to process concurrently, or `auto`. |

## Examples
- `worai seocheck https://example.com/sitemap.xml`
- `worai seocheck ./sitemap.xml --max-urls 50 --format json`
- `worai seocheck https://example.com/sitemap.xml --output-dir ./seocheck-report --save-html`
