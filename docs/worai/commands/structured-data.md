---
title: structured-data
---

Generate JSON-LD/YARRRML mappings or materialize RDF from YARRRML using Playwright-rendered pages.

## Usage
- `worai structured-data create <url> [schema_type] [options]`
- `worai structured-data generate <input> --yarrrml <mapping.yarrrml> [options]`
- `worai structured-data inventory <source> (--output <file.csv> | --sheets <spreadsheet_id>) [options]`

## structured-data create
Generate JSON-LD and YARRRML for a rendered web page using Playwright and Agent WordLift.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `url` | string | Target page URL. |
| `schema_type` | string | Schema.org type to generate (e.g., `Review`). Required unless provided with `--type`. |

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--type` | string | none | Schema.org type to generate (e.g., `Review`). Required if `schema_type` is omitted. |
| `--output-dir` | string | `.` | Output directory for generated files. |
| `--base-name` | string | `structured-data` | Base output filename. |
| `--jsonld` | string | none | Write JSON-LD to this file path. |
| `--yarrml` | string | none | Write YARRRML to this file path. |
| `--debug` | bool | `false` | Write agent prompt/response to `.structured-data/agent_debug.json` and echo to stderr. |
| `--headed` | bool | `false` | Run the browser with a visible UI instead of headless. |
| `--timeout-ms` | int | `30000` | Timeout (ms) for page loads. |
| `--max-xhtml-chars` | int | `40000` | Max characters to keep in cleaned XHTML sent to the agent. |
| `--max-text-node-chars` | int | `400` | Max characters per text node in cleaned XHTML. |
| `--max-nesting-depth` | int | `2` | Max depth for related schema types in the property guide. |
| `--verbose` | bool | `true` | Emit progress logs to stderr. |
| `--wait-until` | choice | `networkidle` | Playwright wait strategy: `domcontentloaded`, `load`, `networkidle`. |

### Notes
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config) to resolve the dataset URI.
- Requires `yarrrml-parser` (`npm install -g @rmlio/yarrrml-parser`).
- `morph-kgc` is included in project dependencies.
- Each JSON-LD node includes an `@id` built as `<dataset_uri>/<pluralized-type>/<name>-<hash>`.
- YARRRML uses XPath selectors.
- `schema:url` is replaced with `__URL__` and source paths with `__XHTML__` when `--reusable` is enabled.
- Intermediate artifacts are stored under `<output-dir>/.structured-data/` (HTML, XHTML, cleaned XHTML, mapping, validation reports).
- The generator rejects hard-coded literals (except `schema:url`) and checks XPath evidence before accepting a mapping.
- Missing Google-required properties are reported as warnings (not hard failures).

### Examples
- `worai structured-data create https://example.com/article Review --output-dir ./structured-data`
- `worai structured-data create https://example.com/article --type Review --output-dir ./structured-data`
- `worai structured-data create https://example.com/article Review --jsonld ./out/page.jsonld --yarrml ./out/page.yarrml`

## structured-data generate
Render pages from a sitemap (or a single URL), apply a YARRRML mapping, and emit one RDF file per page.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `input` | string | Sitemap URL/path or a page URL. |

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--yarrrml` | string | none | Path to the YARRRML mapping file. |
| `--regex` | string | `.*` | Regex to filter URLs (matches full URL). |
| `--output-dir` | string | `.` | Output directory for generated RDF. |
| `--format` | string | `ttl` | Output format: `ttl`, `jsonld`, `rdf`, `nt`, `nq`. |
| `--concurrency` | string | `auto` | Worker count or `auto` to adapt to responses. |
| `--headed` | bool | `false` | Run the browser with a visible UI instead of headless. |
| `--timeout-ms` | int | `30000` | Timeout (ms) for page loads. |
| `--wait-until` | choice | `networkidle` | Playwright wait strategy: `domcontentloaded`, `load`, `networkidle`. |
| `--max-xhtml-chars` | int | `40000` | Max characters to keep in cleaned XHTML. |
| `--max-text-node-chars` | int | `400` | Max characters per text node in cleaned XHTML. |
| `--max-pages` | int | none | Max number of pages to process. |
| `--verbose` | bool | `true` | Emit progress logs to stderr. |

### Notes
- Requires `yarrrml-parser` (`npm install -g @rmlio/yarrrml-parser`).
- Uses Playwright to render HTML and converts it to XHTML before mapping.
- Output filenames use `{slug}--{hash}.{ext}` to avoid collisions.
- Blank nodes are rejected by default.

### Examples
- `worai structured-data generate https://example.com/sitemap.xml --yarrrml ./mapping.yarrrml --output-dir ./out`
- `worai structured-data generate https://example.com/page --yarrrml ./mapping.yarrrml --format jsonld`
- `worai structured-data generate ./sitemap.xml --yarrrml ./mapping.yarrrml --regex "/product/" --concurrency auto`

## structured-data inventory
Parse all URLs from a sitemap, extract JSON-LD from each page, and export a structured-data inventory.

### Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `source` | string | Sitemap URL/path, or Google Spreadsheet URL/ID containing input URLs. |

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--sheet-name` | string | none | Source sheet tab name when `source` is a Google Spreadsheet (reads the `url` column). |
| `--output` | string | none | Write inventory to CSV. |
| `--sheets` | string | none | Google Spreadsheet ID to write inventory to. |
| `--client-secrets` | string | none | OAuth client secrets JSON path (used when Sheets auth needs re-consent). |
| `--token` | string | `oauth_token.json` | OAuth token path (shared token file). |
| `--port` | int | `8080` | Local redirect port for OAuth flow. |
| `--timeout` | float | `30.0` | HTTP timeout in seconds for sitemap and page fetches. |

### Output columns
- `url`
- `faq_markup` (`yes`/`no`, based on `FAQPage` existence)
- `faq_markup_from_graph` (`yes`/`no`, based on `FAQPage.@id` being under current account dataset URI)
- `types` (comma-separated schema types without schema.org prefixes)
- `structured_data` (full combined JSON-LD object with one `@graph`)

### Notes
- Uses JSON-LD only (`<script type=\"application/ld+json\">`).
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config) to resolve account dataset URI.
- Requires exactly one destination: `--output` or `--sheets`.
- When using a Google Spreadsheet as source, `--sheet-name` is required.

### Examples
- `worai structured-data inventory https://example.com/sitemap.xml --output ./structured-data-inventory.csv`
- `worai structured-data inventory https://docs.google.com/spreadsheets/d/<id>/edit --sheet-name URLs_US --output ./structured-data-inventory.csv`
- `worai structured-data inventory https://example.com/sitemap.xml --sheets 1AbCdEfGhIjKlMnOp`
