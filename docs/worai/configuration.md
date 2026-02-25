---
sidebar_position: 3
title: Configuration
---

## Config files

Discovery order:
- `--config`
- `WORAI_CONFIG`
- `./worai.toml`
- `~/.config/worai/config.toml`
- `~/.worai.toml`

Profiles:
- `[profiles.<name>]` with `--profile` or `WORAI_PROFILE`
- Logging keys:
  - `log_level` (global)
  - `profiles.<name>.log_level` (profile override)

Example `worai.toml`:
```toml
[profiles.default]
api_key = "${WORDLIFT_API_KEY}"
mapping = "default.yarrrml"
sitemap_url = "https://example.com/sitemap.xml"
ingest_loader = "web_scrape_api"
```

Notes:
- Non-sync command auth resolves from SDK profiles (`profiles.<name>.api_key`) first, then `WORDLIFT_API_KEY`.
- `WORAI_PROFILE` defaults the selected profile for commands that support profile-aware loading.
- Command-specific OAuth/GSC/GA values are resolved from CLI flags and environment variables.
- Logging level precedence:
  - `--log-level` (highest)
  - `WORAI_LOG_LEVEL`
  - `profiles.<name>.log_level` from `worai.toml` (when profile is selected)
  - global `log_level` from `worai.toml`
  - `info` (default)

## Environment variables

- `WORAI_CONFIG` — path to a config TOML file.
- `WORAI_PROFILE` — profile name under `[profiles.<name>]`.
- `WORAI_LOG_LEVEL` — default log level (`debug|info|warning|error`).
- `WORAI_LOG_FORMAT` — default log format (`text|json`).
- `WORDLIFT_API_KEY` — WordLift API key for entity operations.
- `GSC_CLIENT_SECRETS` — path to OAuth client secrets JSON for GSC.
- `OAUTH_TOKEN` — path to store the shared OAuth token (GSC + GA).
- `GSC_OUTPUT` — default output CSV path for GSC export.
- `GA_ID` — GA4 property ID for Analytics sections.
- `GA_CLIENT_SECRETS` — path to OAuth client secrets JSON for GA4.
- `GSC_TOKEN` / `GA_TOKEN` — legacy aliases for `OAUTH_TOKEN` (must point to the same file if used).
- `WORAI_DISABLE_UPDATE_CHECK` — set to `1|true|yes|on` to disable startup update checks.

Example environment setup:
```
export WORDLIFT_API_KEY="wl_..."
export WORAI_CONFIG="~/worai.toml"
export WORAI_PROFILE="dev"
export GSC_CLIENT_SECRETS="~/client_secrets.json"
export GA_ID="123456789"
```
