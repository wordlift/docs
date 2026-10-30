---
title: "Configure the worai CLI"
description: "Look up where the worai CLI reads settings, which profile keys and environment variables it supports, and which value wins when several are set."
sidebar_label: "Configuration"
sidebar_position: 3
last_updated: 2026-10-27
---

# Configure the worai CLI

The worai CLI reads settings from a TOML file with named profiles, from environment variables and from command-line flags. Set up a profile once per site or environment, then select it with `--profile` or `WORAI_PROFILE` instead of passing the same flags on every command. This page lists where worai looks for settings, the common keys and which value wins.

## Config file discovery {#config-files}

worai uses the first config file it finds, in this order:

1. The path passed to the root `--config` option, for example `worai --config ./worai.toml graph sync run`.
2. The path in the `WORAI_CONFIG` environment variable.
3. `./worai.toml` in the current directory.
4. `~/.config/worai/config.toml`.
5. `~/.worai.toml`.

:::warning[Review needed]
TODO [SME]: confirm whether worai checks only `./worai.toml` or searches for the nearest `worai.toml` from the current directory upward, as the graph command reference states.
:::

worai loads a `.env` file automatically at startup. A `WORAI_CONFIG` value set in `.env` is honored unless `WORAI_CONFIG` is already set in the environment.

## Profiles

A profile is a TOML table named `[profiles.<name>]` that groups the settings for one site, account or environment.

```toml
[profiles.acme]
api_key = "wl_..."
sitemap_url = "https://example.com/sitemap.xml"
```

Select a profile with the root `--profile` option or the `WORAI_PROFILE` environment variable:

```bash
worai --profile acme graph sync run
```

worai resolves the profile in this order:

1. The root `--profile` option.
2. `WORAI_PROFILE`.
3. The profile named `default`.

`[profiles._base]` holds shared fallback values. When a profile is selected and it does not set `log_level`, worai uses `profiles._base.log_level`.

Some settings can also be set globally, at the top level of the file. For those keys, a profile value overrides the global value.

`worai agent` falls back to the `default` profile with a warning when no profile is provided, and exits with an error if the `default` profile is missing from the resolved config. See [worai agent](/tools/worai-cli/commands/agent/).

## Profile settings

These tables list common keys that command references document. They are not an exhaustive list. Detailed behavior lives on each command page.

:::warning[Review needed]
TODO [SME]: confirm whether an authoritative list of profile keys exists, and whether `profiles._base` applies to keys other than `log_level`.
:::

### Account and sources

| Key | Used by | Values and default | Example |
| --- | --- | --- | --- |
| `api_key` | All commands that call the WordLift API | WordLift API key. `graph sync run` fails if the selected profile has no `api_key`. | `api_key = "wl_..."` |
| `mapping` | [graph](/tools/worai-cli/commands/graph/) sync | Mapping file for the profile. | `mapping = "default.yarrrml"` |
| `urls` | graph sync | Explicit list of URLs to process. | `urls = ["https://example.com/page"]` |
| `sitemap_url` | graph sync | Sitemap URL to read URLs from. | `sitemap_url = "https://example.com/sitemap.xml"` |
| `sitemap_url_pattern` | graph sync | Optional pattern applied with `sitemap_url`. | Not documented |
| `sheets_url`, `sheets_name` | graph sync | Google Sheets source and tab name. | `sheets_name = "URLs"` |
| `sheets_service_account` | graph sync | Inline JSON or a file path. Required only with the Google Sheets source. | `sheets_service_account = "./service-account.json"` |

Configure exactly one source mode per run: `urls`, `sitemap_url`, or Google Sheets (`sheets_url`, `sheets_name` and `sheets_service_account`).

### Ingestion

| Key | Used by | Values and default | Example |
| --- | --- | --- | --- |
| `ingest_source` | graph sync, [structured-data](/tools/worai-cli/commands/structured-data/) | `auto`, `urls`, `sitemap`, `sheets`, `local` | `ingest_source = "sitemap"` |
| `ingest_loader` | graph sync, structured-data | `auto`, `simple`, `proxy`, `playwright`, `premium_scraper`, `web_scrape_api`, `passthrough` | `ingest_loader = "web_scrape_api"` |
| `ingest_passthrough_when_html` | graph sync, structured-data | `true` (default) or `false` | `ingest_passthrough_when_html = true` |
| `ingest_timeout_ms` | graph sync | Milliseconds. Forwarded only when set; with `wordlift-sdk>=6.10.0` the SDK default is `30000`. | `ingest_timeout_ms = 30000` |
| `playwright_wait_until` | graph sync | Playwright wait strategy. | `playwright_wait_until = "domcontentloaded"` |
| `web_page_import_timeout` | graph sync | Seconds, or a value with an `s` or `ms` suffix. | `web_page_import_timeout = 60` |

The top-level `[ingest]` table sets ingestion fallbacks for `structured-data inventory` and [web-pages](/tools/worai-cli/commands/web-pages/):

| Key | Values | Example |
| --- | --- | --- |
| `ingest.source` | `auto`, `urls`, `sitemap`, `sheets`, `local` | `source = "auto"` |
| `ingest.loader` | Same values as `ingest_loader` | `loader = "web_scrape_api"` |
| `ingest.passthrough_when_html` | `true` or `false` | `passthrough_when_html = true` |
| `ingest.url_regex` | Regex applied to discovered URLs | `url_regex = "/blog/"` |

### Graph sync

These keys can be set globally or per profile. A profile value overrides the global value.

| Key | Used by | Values and default | Example |
| --- | --- | --- | --- |
| `google_search_console` | graph sync | `true` or `false` (default `false`) | `google_search_console = true` |
| `postprocessor_runtime` | graph sync | `oneshot` or `persistent`. The SDK 6 default is `persistent`. | `postprocessor_runtime = "persistent"` |
| `canonical_id_strategy` | graph sync (SDK 6.12.3+) | `legacy` (default) or `dependency_graph` | `canonical_id_strategy = "dependency_graph"` |
| `shacl_validate_mode` | graph sync | `warn`, `fail`, `off` | `shacl_validate_mode = "warn"` |
| `shacl_builtin_shapes`, `shacl_exclude_builtin_shapes`, `shacl_extra_shapes` | graph sync | Shape selection for SHACL validation. | Not documented |

### Google Search Console, Google Analytics and Google Sheets

| Key | Used by | Values and default | Example |
| --- | --- | --- | --- |
| `gsc_site_id` | [canonicals](/tools/worai-cli/commands/canonicals/), [seoreport](/tools/worai-cli/commands/seoreport/) | Search Console property. `seoreport` also reads the legacy `gsc.id`. | `gsc_site_id = "sc-domain:example.com"` |
| `ga_property_id` | seoreport | GA4 property ID. Preferred over the legacy `ga.id`. | `ga_property_id = "123456789"` |
| `oauth.service_account` | canonicals, web-pages | Service account file path or inline JSON. | `service_account = "./service-account.json"` |
| `oauth.client_secrets` | canonicals | OAuth client secrets path. | `client_secrets = "./client_secrets.json"` |
| `oauth.token` | canonicals | OAuth user token path. | `token = "oauth_token.json"` |
| `canonicals.output` | canonicals | Output path. Supports `{profile}`, `{date}`, `{seq}` and the other placeholders listed on the command page. | `output = "canonicals_{profile}_{date}.csv"` |
| `canonicals.interval`, `canonicals.concurrency`, `canonicals.request_timeout_sec` | canonicals | Defaults for the matching `canonicals dedupe` options. | `interval = "28d"` |
| `web_pages.output` | web-pages | Output path for `web-pages classify-types`. | Not documented |
| `gsheets.credentials`, `gsheets.spreadsheet_id`, `gsheets.sheet_name` | [entity-matrix](/tools/worai-cli/commands/entity-matrix/) | Google Sheets output settings for `--format gsheets`. | `sheet_name = "Entity Matrix"` |

Keys with a dot belong to a sub-table of the profile. For example, `gsheets.sheet_name` goes under `[profiles.<name>.gsheets]`.

### Logging

| Key | Used by | Values and default | Example |
| --- | --- | --- | --- |
| `log_level` | All commands | `debug`, `info`, `warning`, `error`. Set globally, in `profiles._base` or per profile. Default `info`. | `log_level = "warning"` |

### Agent

| Key | Used by | Values and default | Example |
| --- | --- | --- | --- |
| `agent.codex_model` | [agent](/tools/worai-cli/commands/agent/) | Overrides the default Codex WordLift model. Set globally or per profile. | Not documented |

## Environment variables

| Variable | Purpose | Values |
| --- | --- | --- |
| `WORAI_CONFIG` | Path to a config TOML file. | File path |
| `WORAI_PROFILE` | Profile name under `[profiles.<name>]`. Sets the default profile for commands that load profiles. | Profile name |
| `WORAI_LOG_LEVEL` | Default log level. | `debug`, `info`, `warning`, `error` |
| `WORAI_LOG_FORMAT` | Default log format. | `text`, `json` |
| `WORAI_DISABLE_UPDATE_CHECK` | Disables startup update checks. | `1`, `true`, `yes`, `on` |
| `WORDLIFT_API_KEY` | WordLift API key for entity operations. Used when the profile has no `api_key`. | API key |
| `GSC_CLIENT_SECRETS` | Path to the OAuth client secrets JSON for Google Search Console. | File path |
| `OAUTH_TOKEN` | Path to the shared OAuth token for Google Search Console and Google Analytics. | File path |
| `GSC_TOKEN`, `GA_TOKEN` | Legacy aliases for `OAUTH_TOKEN`. If you use them, they must point to the same file. | File path |
| `GSC_OUTPUT` | Default output CSV path for the Google Search Console export. | File path |
| `GA_ID` | GA4 property ID for Analytics sections. | Property ID |
| `GSHEETS_CREDENTIALS` | Path to the Google service account JSON for `entity-matrix`. | File path |
| `GSHEETS_SPREADSHEET_ID` | Google Sheets spreadsheet ID for `entity-matrix`. | Spreadsheet ID |
| `GSHEETS_SHEET_NAME` | Worksheet tab name for `entity-matrix`. | Tab name |
| `CANONICAL_ID_STRATEGY` | Alternative to the `canonical_id_strategy` key for graph sync. | `legacy`, `dependency_graph` |

Example environment setup:

```bash
export WORDLIFT_API_KEY="wl_..."
export WORAI_CONFIG="~/worai.toml"
export WORAI_PROFILE="dev"
export GSC_CLIENT_SECRETS="~/client_secrets.json"
export GA_ID="123456789"
```

## Precedence rules

**Profile.** Root `--profile`, then `WORAI_PROFILE`, then `default`.

**API key.** `profiles.<name>.api_key` first, then `WORDLIFT_API_KEY`. `upload-entities-from-turtle` checks its `--api-key` option before both.

**Log level.** worai uses the first value it finds:

1. Root `--log-level`.
2. `WORAI_LOG_LEVEL`.
3. `profiles.<name>.log_level`, when a profile is selected.
4. `profiles._base.log_level`, when a profile is selected and sets no `log_level`.
5. Global `log_level`.
6. `info`.

**Global and profile keys.** For `google_search_console`, `postprocessor_runtime` and `canonical_id_strategy`, a profile value overrides the global value.

**Google Search Console, Google Analytics and OAuth values.** CLI flags and environment variables apply, and `canonicals`, `seoreport` and `web-pages` also read profile defaults (see [Google Search Console, Google Analytics and Google Sheets](#google-search-console-google-analytics-and-google-sheets)). Each command page lists its own fallbacks.

**Google Sheets values (entity-matrix).** CLI flag, then environment variable, then the selected profile in `worai.toml`.

**Ingestion settings (structured-data inventory).** New settings (`--ingest-*` options or `ingest_*` config) win over legacy settings when both are set. Legacy settings still apply when the new ones are unset.

**worai agent MCP config and profile.** Per-call `config_path` and `profile` first, then the session defaults from `worai agent --config` and `--profile`, then `WORAI_PROFILE`, then `default`.

## Example worai.toml

A minimal file with one profile:

```toml
[profiles.default]
api_key = "wl_..."
mapping = "default.yarrrml"
sitemap_url = "https://example.com/sitemap.xml"
ingest_loader = "web_scrape_api"
```

A file with global settings, a shared fallback and two profiles:

```toml
log_level = "info"
google_search_console = false

[profiles._base]
log_level = "warning"

[profiles.acme]
api_key = "wl_..."
sitemap_url = "https://acme.example.com/sitemap.xml"
ingest_source = "sitemap"
ingest_loader = "web_scrape_api"
google_search_console = true
gsc_site_id = "sc-domain:acme.example.com"

[profiles.acme.gsheets]
credentials = "svc.json"
spreadsheet_id = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
sheet_name = "Entity Matrix"

[profiles.globex]
api_key = "wl_..."
urls = ["https://globex.example.com/page"]
log_level = "debug"
```

With this file, `worai --profile acme graph sync run` logs at `warning` (from `profiles._base`), and `worai --profile globex graph sync run` logs at `debug`.

The command references show values such as `api_key = "${WORDLIFT_API_KEY}"` in `worai.toml`.

:::warning[Review needed]
TODO [SME]: confirm whether worai expands `${VAR}` environment variable references inside `worai.toml`.
:::

## Related

- [Install the worai CLI](/tools/worai-cli/install/)
- [worai graph](/tools/worai-cli/commands/graph/)
- [worai structured-data](/tools/worai-cli/commands/structured-data/)
- [worai entity-matrix](/tools/worai-cli/commands/entity-matrix/)
- [worai canonicals](/tools/worai-cli/commands/canonicals/)
- [worai seoreport](/tools/worai-cli/commands/seoreport/)
- [worai web-pages](/tools/worai-cli/commands/web-pages/)
- [worai agent](/tools/worai-cli/commands/agent/)
