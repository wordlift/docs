---
title: graph
---

# graph

Run graph-specific workflows.

## Usage
- `worai graph sync run --profile <name> [--debug]`
- `worai --config <path> graph sync run --profile <name> [--debug]`
- `worai graph sync create <destination> [--template <src>] [--defaults] [--data-file <path>] [--vcs-ref <ref>] [--non-interactive] [--force]`
- `worai graph property delete <predicate> [--dry-run] [--yes] [--workers <n>] [--retries <n>] [--rate-delay <s>] [--limit <n>]`

## Notes
- `graph sync run` executes the graph sync workflow for a profile in `worai.toml`.
- `graph sync create` bootstraps a new graph sync project from a Copier template.
- `graph sync create` enables Copier trusted mode by default, so template `_tasks` run automatically.
- `graph property delete` removes one predicate from all matching entities.
  - accepts full IRI (`https://w3id.org/seovoc/html`) or CURIE (`seovoc:html`).
  - includes private fields by default (`X-include-Private: true`) for both matching-entity discovery and deletion PATCH requests.
  - `--dry-run` reports matching entities without patching.
  - without `--yes`, the command asks for confirmation before patching.
- Supported input sources:
  - `urls` (explicit URL list)
  - `sitemap_url` (+ optional `sitemap_url_pattern`)
  - Google Sheets (`sheets_url` + `sheets_name` + `sheets_service_account`)
- `--profile` is required and must match a profile entry in the selected config file.
- Config path comes from root `worai --config ...` when provided.
- Without root `--config`, standard worai config discovery applies (`WORAI_CONFIG`, `./worai.toml`, `~/.config/worai/config.toml`, `~/.worai.toml`).
- `sheets_service_account` accepts either inline JSON or a file path.
- The command fails when the selected profile does not define `api_key`.
- `google_search_console` can be set globally or per profile in `worai.toml`.
  - profile value overrides global value.
  - default is `false` when unset.
  - mapped to SDK setting `GOOGLE_SEARCH_CONSOLE`.
- SDK 5 ingestion settings are forwarded when configured:
  - `ingest.source`: `auto|urls|sitemap|sheets|local`
  - `ingest.loader`: `auto|simple|proxy|playwright|premium_scraper|web_scrape_api|passthrough`
  - `ingest.passthrough_when_html`: default `true`
- Loader default behavior is `web_scrape_api`.
  - legacy `web_page_import_mode=default` maps to `web_scrape_api`
  - legacy `proxy` and `premium_scraper` keep the same value
Example ingestion config:
```toml
[profile.acme]
api_key = "wl_..."
sitemap_url = "https://example.com/sitemap.xml"
ingest.source = "sitemap"
ingest.loader = "web_scrape_api"
ingest.passthrough_when_html = true
web_page_import_timeout = "60s"
```
- `sheets_service_account` is required only when using Google Sheets source (`sheets_url` + `sheets_name`).
- Failure cases for `sheets_service_account` (Sheets source only):
  - value is missing or empty
  - value is neither valid JSON object content nor an existing file path
  - JSON content is valid JSON but not an object

Example profile config:
```toml
[profile.acme]
api_key = "wl_..."
google_search_console = true
sheets_service_account = "./service-account.json"
# or inline JSON string:
# sheets_service_account = "{\"type\":\"service_account\",...}"
```

## Examples
- `worai graph sync run --profile acme`
- `worai --config ./worai.toml graph sync run --profile acme`
- `worai graph sync run --profile acme --debug`
- `worai graph sync create ./acme-graph`
- `worai graph property delete seovoc:html --dry-run`
- `worai graph property delete https://w3id.org/seovoc/html --yes --workers 4`
