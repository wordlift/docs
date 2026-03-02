---
title: web-pages
---

Run ingestion-backed workflows for web pages.

## Usage
- `worai web-pages classify-types <source> [options]`

## classify-types
Classify ingested URLs into schema.org types and export CSV columns:
`url,main_type,additional_types,explanation`.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `source` | string | Source input for ingestion (sitemap URL/path, URL file, sheets URL/ID, or local JSON file). |

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--output` | string | `web_pages_type_classification_<profile>_<date>_<seq>.csv` | Output CSV path (supports profile template fallback). |
| `--sheet-name` | string | none | Sheet tab name when using sheets source. |
| `--service-account` | string | none | Google service account path or JSON body (required for sheets source). |
| `--ingest-source` | string | `auto` | `auto|urls|sitemap|sheets|local`. |
| `--ingest-loader` | string | `web_scrape_api` | `auto|simple|proxy|playwright|premium_scraper|web_scrape_api|passthrough`. |
| `--ingest-passthrough-when-html / --no-ingest-passthrough-when-html` | bool | config/default | Prefer passthrough when HTML is already embedded. |
| `--url-regex` | string | none | URL regex filter mapped to SDK `URL_REGEX`. |
| `--agent-cli` | string | auto | Local agent CLI (`claude|codex|gemini`). |
| `--agent-timeout-sec` | float | `120.0` | Per-page agent timeout. |
| `--max-markdown-chars` | int | `24000` | Markdown truncation limit before classification. |
| `-y, --yes` | bool | `false` | Skip confirmation prompt and proceed. |

### Credit confirmation
- The command prompts before execution because each run consumes agent credits.
- Prompt default is yes (`Y/n`), so pressing `Enter` continues.
- Use `-y` / `--yes` in automation to skip the prompt.

### Config Fallbacks
- `profiles.<name>.web_pages.output`
- `ingest.source`
- `ingest.loader`
- `ingest.url_regex`
- `ingest.passthrough_when_html`
- `profiles.<name>.oauth.service_account`

### Examples
- `worai web-pages classify-types https://example.com/sitemap.xml --ingest-source sitemap --ingest-loader playwright --url-regex "/blog/" --output ./types.csv`
- `worai web-pages classify-types ./urls.txt --ingest-source urls --output ./types.csv`
- `worai web-pages classify-types https://docs.google.com/spreadsheets/d/<id>/edit --ingest-source sheets --sheet-name URLs --service-account ./service-account.json --output ./types.csv`
- `worai web-pages classify-types https://example.com/sitemap.xml --ingest-source sitemap --output ./types.csv --yes`
