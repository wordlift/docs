# graph

Run graph-specific workflows.

For customer-facing guidance on GraphSync and assisted Business+ or Enterprise onboarding, see [GraphSync](/knowledge-graph/graphsync/).

Mapping docs:
- Reference: `docs/graph-sync-mappings-reference.md`
- Guide: `docs/graph-sync-mappings-guide.md`
- Examples: `docs/graph-sync-mappings-examples.md`

## Usage
- `worai graph sync run [--debug]`
- `worai --config <path> --profile <name> graph sync run [--debug]`
- `worai graph sync create <destination> [--template <src>] [--defaults] [--data-file <path>] [--vcs-ref <ref>] [--non-interactive] [--force]`
- `worai graph export [--validate] [output_file_name]`
- `worai graph validate <file-or-url> [<file-or-url> ...] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file-or-url>] [--level warning|error] [--format text|json]`
- `worai graph property delete <predicate> [--dry-run] [--yes] [--workers <n>] [--retries <n>] [--rate-delay <s>] [--limit <n>]`
- `worai graph audit <file> [--depth <n>] [--list-isolated-iris] [--show-url-violations] [--rich-snippets-granularity counts|entities] [--workers <n>] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file>] [--issue-level warning|error] [--format text|json]`
- `worai graph kpis calculate <file> [--website-host <host>] [--graph-host <host>] [--builtin-shape <name>] [--exclude-builtin-shape <name>] [--shape <file>] [--no-builtin-shapes] [--depth <n>] [--issue-level warning|error] [--shacl-workers <n>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--rdf-error-policy fail|repair-iris] [--output <file>]`
- `worai graph kpis payload <file> [--snapshot-date YYYY-MM-DD] [--website-host <host>] [--memory-mode auto|full|streaming] [--max-full-graph-bytes <bytes>] [--rdf-error-policy fail|repair-iris] [--output <file>]`
- `worai graph reset [--keep-country] [--keep-language] [--keep-url] [--yes]`

## Notes
- `graph sync run` executes the graph sync workflow for a profile in `worai.toml`.
- `graph sync create` bootstraps a new graph sync project from a Copier template.
- `graph sync create` enables Copier trusted mode by default, so template `_tasks` run automatically.
- `graph export` downloads graph data from `/dataset/export` and writes it to a local file.
  - profile resolution is: root `--profile`, then `WORAI_PROFILE`, then `default`.
  - API key resolution is `profiles.<name>.api_key` first, then `WORDLIFT_API_KEY`.
  - output format is inferred from file extension:
    - `.ttl` -> `text/turtle`
    - `.nt` -> `application/n-triples`
    - `.nq` -> `application/n-quads`
    - `.rdf`/`.xml` -> `application/rdf+xml`
    - `.jsonld`/`.json` -> `application/ld+json`
  - when no output file is passed, default name is `export_<profile>_<yyyyMMdd>_<seq>.ttl` (sequence starts at `1` and increments if the file already exists).
  - `--validate` runs SHACL validation on the exported file right after download; the command fails on SHACL errors or warnings.
- `graph validate` validates one or more local files or URLs.
  - `--builtin-shape` includes selected packaged shape names.
  - `--exclude-builtin-shape` removes packaged shapes from the active set.
  - `--shape` adds extra shape files/URLs.
  - `--level warning|error` controls failure threshold (`warning` fails on warnings+errors, `error` fails only on errors).
  - `--format text|json` selects report output format.
- `graph property delete` removes one predicate from all matching entities.
  - accepts full IRI (`https://w3id.org/seovoc/html`) or CURIE (`seovoc:html`).
  - includes private fields by default (`X-include-Private: true`) for both matching-entity discovery and deletion PATCH requests.
  - `--dry-run` reports matching entities without patching.
  - without `--yes`, the command asks for confirmation before patching.
- `--non-interactive` is implemented by enabling Copier defaults mode and skipping prompts; required unanswered fields still fail fast.
- Supported input sources:
  - `urls` (explicit URL list)
  - `sitemap_url` (+ optional `sitemap_url_pattern`)
  - Google Sheets (`sheets_url` + `sheets_name` + `sheets_service_account`)
  - configure exactly one source mode per run.
- `graph sync run` profile resolution is: root `--profile`, then `WORAI_PROFILE`, then `default`.
- Config path comes from root `worai --config ...` when provided.
- Without root `--config`, standard worai config discovery applies (`WORAI_CONFIG`, nearest `worai.toml` from current directory upward, `~/.config/worai/config.toml`, `~/.worai.toml`).
- `.env` is auto-loaded at CLI startup; a `WORAI_CONFIG` value from `.env` is honored unless `WORAI_CONFIG` is already set in the environment.
- Logging precedence is: root `--log-level`, then `WORAI_LOG_LEVEL`, then `profiles.<name>.log_level`, then `profiles._base.log_level`, then global `log_level`, then `info`.
- During `graph sync run`, the resolved effective level is propagated to `morph-kgc` as `logging_level` so `warning` suppresses morph `INFO` logs (for example `mapping_partitioner`) while `info` allows them.
- `sheets_service_account` accepts either inline JSON or a file path.
- The command fails if the selected profile has no `api_key`.
- `google_search_console` can be set globally or per profile in `worai.toml`.
  - profile value overrides global value.
  - default is `false` when unset.
  - mapped to SDK setting `GOOGLE_SEARCH_CONSOLE`.
- `postprocessor_runtime` can be set globally or per profile in `worai.toml`.
  - profile value overrides global value.
  - accepted values: `oneshot`, `persistent`.
  - SDK 6 default is `persistent`; set `oneshot` to preserve legacy one-shot behavior.
  - when set, exported as env var `POSTPROCESSOR_RUNTIME` during `graph sync run`.
- `canonical_id_strategy` can be set globally or per profile in `worai.toml` (requires SDK 6.12.3+).
  - profile value overrides global value.
  - accepted values: `legacy` (default), `dependency_graph`.
  - forwarded to the SDK as `CANONICAL_ID_STRATEGY` via `extra_settings`.
  - use `dependency_graph` when postprocessors mint FAQ child entities (e.g. an Article also typed as FAQPage with Question nodes via `schema:mainEntity`) before canonical IRIs are finalized; `legacy` mode leaves those questions under the stale pre-canonical root IRI.
  - can also be set via env var `CANONICAL_ID_STRATEGY=dependency_graph`.
- Callback telemetry for `graph sync run`:
  - `graph sync run` uses `run_cloud_workflow` and logs per-graph progress events and one final KPI summary.
  - `on_info` lifecycle messages remain supported and are logged as info events.
  - debug artifacts are written by the SDK protocol callback to `output/debug_cloud/<profile>/` (relative to the invocation current working directory):
    - `static_templates.ttl`
    - `cloud_<sha256(url)>.ttl` for each callback URL.
- SDK `wordlift-sdk` 5.1.1+ postprocessor context changes:
  - `context.settings` removed; read from `context.profile` (example: `context.profile["settings"]["api_url"]`).
  - `context.account.key` removed; use `context.account_key`.
  - `context.account` remains the clean `/me` account object.
- `web_page_import_timeout` in `worai.toml` is interpreted as seconds and converted to milliseconds for the SDK.
  - example: `web_page_import_timeout = 60` -> `60000` ms
  - explicit suffixes are also supported: `60s`, `60000ms`
- SDK 6 ingestion settings are forwarded when present:
  - `ingest_source`: `auto|urls|sitemap|sheets|local`
  - `ingest_loader`: `auto|simple|proxy|playwright|premium_scraper|web_scrape_api|passthrough`
  - `ingest_passthrough_when_html`: default `true`
- With `wordlift-sdk>=6.10.0`, `ingest_timeout_ms` defaults to `30000` in the SDK and is forwarded as `INGEST_TIMEOUT_MS` only when explicitly configured in worai.
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
postprocessor_runtime = "persistent"
canonical_id_strategy = "dependency_graph"
sheets_service_account = "./service-account.json"
# or inline JSON string:
# sheets_service_account = "{\"type\":\"service_account\",...}"
```

- `graph audit` audits a local RDF file for schema compliance, rich snippets coverage, and graph connectivity (requires wordlift-sdk>=6.11.0).
  - `<file>` accepts TTL, JSON-LD, NT, or RDF/XML.
  - `--depth <n>` controls subgraph expansion depth for schema compliance checks (default: 1).
  - `--list-isolated-iris` includes the IRI list for each isolated subgraph in the report.
  - `--show-url-violations` lists each failing URL with its SHACL violations.
  - `--rich-snippets-granularity counts|entities` controls detail level of rich snippets section (default: counts).
  - `--workers <n>` sets max worker processes for SHACL validation (default: auto).
  - `--builtin-shape` and `--exclude-builtin-shape` are mutually exclusive.
  - `--shape <file>` appends an extra local `.ttl` shape file; repeat for multiple.
  - `--issue-level warning|error` filters the issue severity shown (default: warning).
  - `--format text|json` selects report output format (default: text).
  - exits with code 1 if load errors are encountered.
- `graph kpis` calculates compact graph KPI snapshots from a local RDF export (requires wordlift-sdk>=8.3.6).
  - `calculate` writes the detailed KPI JSON for inspection or artifacts.
  - `payload` writes the numeric-only WordLift API payload for a dated snapshot.
  - `--website-host` scopes URL coverage and duplicate URL KPIs to the customer website host.
  - `--graph-host` marks graph dataset hosts as internal when computing broken internal edges; repeat for multiple hosts.
  - `--memory-mode auto` uses full calculation for smaller files and streaming partial KPIs for large N-Triples, Turtle, and RDF/XML exports over `--max-full-graph-bytes`.
  - `--rdf-error-policy fail|repair-iris` defaults to strict parsing; `repair-iris` repairs invalid percent escapes inside Turtle IRI tokens before temporary N-Triples conversion.
  - URL-rooted SHACL compliance validates first-level entities with `schema:url` at `--depth 1` by default.
  - `--no-builtin-shapes` runs only shapes passed with `--shape`, useful for fast scheduled KPI gates.
  - `--shacl-workers` parallelizes URL-level SHACL validation for larger graphs.
- `graph reset` resets the WordLift account associated with the current profile (requires wordlift-sdk>=6.12.0).
  - **Destructive and irreversible** — prompts for confirmation unless `--yes` is passed.
  - `--keep-country` preserves the account country on reset.
  - `--keep-language` preserves the account language on reset.
  - `--keep-url` preserves the account URL on reset.
  - API key is resolved from the active profile (`profiles.<name>.api_key`) or `WORDLIFT_API_KEY`.

## Examples
- `worai --profile acme graph sync run`
- `worai --config ./worai.toml --profile acme graph sync run`
- `worai --profile acme graph sync run --debug`
- `worai graph sync create ./acme-graph`
- `worai graph sync create ./acme-graph --template ./graph-sync-template`
- `worai graph sync create ./acme-graph --data-file ./answers.yml --non-interactive`
- `worai graph sync create ./acme-graph --vcs-ref v1.2.3`
- `worai graph export`
- `worai --profile acme graph export`
- `worai --profile acme graph export ./acme-export.jsonld`
- `worai graph export ./acme-export.ttl --validate`
- `worai graph validate ./acme-export.ttl`
- `worai graph validate ./acme-export.ttl ./acme-export.jsonld --builtin-shape google-required --exclude-builtin-shape schemaorg-grammar --shape ./custom.ttl --level warning --format json`
- `worai graph property delete seovoc:html --dry-run`
- `worai graph property delete https://w3id.org/seovoc/html --yes --workers 4`
- `worai graph audit ./acme-export.ttl`
- `worai graph audit ./acme-export.ttl --format json --show-url-violations`
- `worai graph audit ./acme-export.ttl --rich-snippets-granularity entities --issue-level error`
- `worai graph audit ./acme-export.ttl --builtin-shape google-required --shape ./custom.ttl`
- `worai --profile acme graph kpis calculate ./acme-export.ttl --website-host www.example.com --output graph-kpis.json`
- `worai --profile acme graph kpis payload ./acme-export.ttl --snapshot-date 2026-06-29 --website-host www.example.com --output graph-kpi-payload.json`
- `worai --profile acme graph reset --yes`
- `worai --profile acme graph reset --keep-country --keep-language`
