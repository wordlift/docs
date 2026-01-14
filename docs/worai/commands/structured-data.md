---
title: structured-data
---

Generate JSON-LD and YARRRML for a rendered web page using Playwright and Agent WordLift.

## Usage
- `worai structured-data create <url> [schema_type] [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `url` | string | Target page URL. |
| `schema_type` | string | Schema.org type to generate (e.g., `Review`). Required unless provided with `--type`. |

## Options

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

## Notes
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config) to resolve the dataset URI.
- Requires `yarrrml-parser` (`npm install -g @rmlio/yarrrml-parser`).
- `morph-kgc` is included in project dependencies.
- Each JSON-LD node includes an `@id` built as `<dataset_uri>/<pluralized-type>/<name>-<hash>`.
- YARRRML uses XPath selectors.
- Intermediate artifacts are stored under `<output-dir>/.structured-data/` (HTML, XHTML, cleaned XHTML, mapping, validation reports).
- The generator rejects hard-coded literals (except `schema:url`) and checks XPath evidence before accepting a mapping.
- Missing Google-required properties are reported as warnings (not hard failures).

## Examples
- `worai structured-data create https://example.com/article Review --output-dir ./structured-data`
- `worai structured-data create https://example.com/article --type Review --output-dir ./structured-data`
- `worai structured-data create https://example.com/article Review --jsonld ./out/page.jsonld --yarrml ./out/page.yarrml`
