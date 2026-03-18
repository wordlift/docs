---
title: graph
---

# graph

Run graph-specific workflows.

## Usage
- `worai graph sync run [--debug]`
- `worai --config <path> --profile <name> graph sync run [--debug]`
- `worai graph sync create <destination> [--template <src>] [--defaults] [--data-file <path>] [--vcs-ref <ref>] [--non-interactive] [--force]`
- `worai graph export [output_file_name]`
- `worai graph validate <file-or-url> [<file-or-url> ...] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file-or-url>] [--level warning|error] [--format text|json]`
- `worai graph property delete <predicate> [--dry-run] [--yes] [--workers <n>] [--retries <n>] [--rate-delay <s>] [--limit <n>]`

## Notes
- `graph sync run` executes the graph sync workflow for a profile in `worai.toml`.
- `graph sync create` bootstraps a new graph sync project from a Copier template.
- `graph sync create` enables Copier trusted mode by default, so template `_tasks` run automatically.
- `graph export` downloads graph data from `/export` and writes it to a local file.
  - `--profile` is optional for export and defaults to `default`.
  - API key resolution is `profiles.<name>.api_key` first, then `WORDLIFT_API_KEY`.
  - output format is inferred from file extension:
    - `.ttl` -> `text/turtle`
    - `.nt` -> `application/n-triples`
    - `.nq` -> `application/n-quads`
    - `.rdf`/`.xml` -> `application/rdf+xml`
    - `.jsonld`/`.json` -> `application/ld+json`
  - when no output file is passed, default name is `export_<profile>_<yyyyMMdd>_<seq>.ttl` (sequence starts at `1` and increments if the file already exists).
- `graph validate` validates one or more local files or URLs with SHACL shapes.
  - `--builtin-shape` includes selected packaged shape names.
  - `--exclude-builtin-shape` removes packaged shapes from the active set.
  - `--shape` adds extra shape files/URLs.
  - `--level warning|error` controls failure threshold.
  - `--format text|json` selects output format.
- `graph property delete` removes one predicate from all matching entities.
  - accepts full IRI (`https://w3id.org/seovoc/html`) or CURIE (`seovoc:html`).
  - includes private fields by default (`X-include-Private: true`) for both matching-entity discovery and deletion PATCH requests.
  - `--dry-run` reports matching entities without patching.
  - without `--yes`, the command asks for confirmation before patching.
- Supported input sources:
  - `urls` (explicit URL list)
  - `sitemap_url` (+ optional `sitemap_url_pattern`)
  - Google Sheets (`sheets_url` + `sheets_name` + `sheets_service_account`)
  - configure exactly one source mode per run.
- `graph sync run` profile resolution is: root `--profile`, then `WORAI_PROFILE`, then `default`.
- `graph sync run` profile resolution is: command `--profile` (deprecated), then root `--profile`, then `WORAI_PROFILE`, then `default`.
- Config path comes from root `worai --config ...` when provided.
- Without root `--config`, standard worai config discovery applies (`WORAI_CONFIG`, `./worai.toml`, `~/.config/worai/config.toml`, `~/.worai.toml`).
- `sheets_service_account` accepts either inline JSON or a file path.
- The command fails when the selected profile does not define `api_key`.
- `google_search_console` can be set globally or per profile in `worai.toml`.
  - profile value overrides global value.
  - default is `false` when unset.
  - mapped to SDK setting `GOOGLE_SEARCH_CONSOLE`.
- `postprocessor_runtime` can be set globally or per profile in `worai.toml`.
  - profile value overrides global value.
  - accepted values: `oneshot`, `persistent`.
  - SDK 6 default is `persistent`; set `oneshot` to preserve legacy one-shot behavior.
  - when set, exported as env var `POSTPROCESSOR_RUNTIME` during `graph sync run`.
- Callback telemetry for `graph sync run`:
  - `graph sync run` uses `run_cloud_workflow` and logs per-graph progress events and one final KPI summary.
  - `on_info` lifecycle messages remain supported and are logged as info events.
  - debug artifacts are written by the SDK protocol callback to `output/debug_cloud/<profile>/` (relative to the invocation current working directory):
    - `static_templates.ttl`
    - `cloud_<sha256(url)>.ttl` for each callback URL.
- SDK 6 ingestion settings are forwarded when configured:
  - `ingest_source`: `auto|urls|sitemap|sheets|local`
  - `ingest_loader`: `auto|simple|proxy|playwright|premium_scraper|web_scrape_api|passthrough`
  - `ingest_passthrough_when_html`: default `true`
- With `wordlift-sdk>=6.10.0`, `ingest_timeout_ms` defaults to `30000` in the SDK and is forwarded as `INGEST_TIMEOUT_MS` only when explicitly configured in worai.
- With `wordlift-sdk>=6.10.0`, `playwright_wait_until` defaults to `domcontentloaded` in the SDK and is forwarded as `PLAYWRIGHT_WAIT_UNTIL` only when explicitly configured in worai.
- SDK 6 cloud-flow migration deprecates integration reliance on:
  - `WEB_PAGE_IMPORT_MODE`
  - `WEB_PAGE_IMPORT_TIMEOUT`
- SDK 6.2 SHACL validation settings:
  - use `shacl_validate_mode = "warn"|"fail"|"off"`
  - use `shacl_builtin_shapes`, `shacl_exclude_builtin_shapes`, `shacl_extra_shapes`
  - `shacl_validate_sync` and `shacl_shape_specs` are no longer supported
Example ingestion config:
```toml
[profiles.acme]
api_key = "wl_..."
sitemap_url = "https://example.com/sitemap.xml"
ingest_source = "sitemap"
ingest_loader = "web_scrape_api"
ingest_passthrough_when_html = true
ingest_timeout_ms = 30000
playwright_wait_until = "domcontentloaded"
```
- `sheets_service_account` is required only when using Google Sheets source (`sheets_url` + `sheets_name`).
- Failure cases for `sheets_service_account` (Sheets source only):
  - value is missing or empty
  - value is neither valid JSON object content nor an existing file path
  - JSON content is valid JSON but not an object

Example profile config:
```toml
[profiles.acme]
api_key = "wl_..."
google_search_console = true
sheets_service_account = "./service-account.json"
# or inline JSON string:
# sheets_service_account = "{\"type\":\"service_account\",...}"
```

## Examples
- `worai --profile acme graph sync run`
- `worai --config ./worai.toml --profile acme graph sync run`
- `worai --profile acme graph sync run --debug`
- `worai graph sync create ./acme-graph`
- `worai graph export`
- `worai --profile acme graph export`
- `worai graph export ./acme-export.jsonld --profile acme`
- `worai graph validate ./acme-export.ttl`
- `worai graph validate ./acme-export.ttl ./acme-export.jsonld --builtin-shape google-required --shape ./custom.ttl --level warning --format json`
- `worai graph property delete seovoc:html --dry-run`
- `worai graph property delete https://w3id.org/seovoc/html --yes --workers 4`
