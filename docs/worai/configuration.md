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
- `[profile.<name>]` with `--profile` or `WORAI_PROFILE`

Example `worai.toml`:
```
[defaults]
log_level = "info"

[wordlift]
api_key = "wl_..."

[gsc]
client_secrets = "/path/to/client_secrets.json"

[ga]
id = "123456789"
client_secrets = "/path/to/client_secrets.json"

[oauth]
token = "/path/to/oauth_token.json"
```

Notes:
- `oauth.token` is the shared token file for GSC + GA4. If not set via config or env, the CLI defaults to `./oauth_token.json`.
- Legacy keys `gsc.token` and `ga.token` are still read, but must point to the same file when used.

## Environment variables

- `WORAI_CONFIG` — path to a config TOML file.
- `WORAI_PROFILE` — profile name under `[profile.<name>]`.
- `WORAI_LOG_LEVEL` — default log level (`debug|info|warning|error`).
- `WORAI_LOG_FORMAT` — default log format (`text|json`).
- `WORDLIFT_KEY` — WordLift API key for entity operations.
- `WORDLIFT_API_KEY` — alternate WordLift API key name.
- `GSC_CLIENT_SECRETS` — path to OAuth client secrets JSON for GSC.
- `OAUTH_TOKEN` — path to store the shared OAuth token (GSC + GA).
- `GSC_OUTPUT` — default output CSV path for GSC export.
- `GA_ID` — GA4 property ID for Analytics sections.
- `GA_CLIENT_SECRETS` — path to OAuth client secrets JSON for GA4.
- `GSC_TOKEN` / `GA_TOKEN` — legacy aliases for `OAUTH_TOKEN` (must point to the same file if used).

Example environment setup:
```
export WORDLIFT_KEY="wl_..."
export WORAI_CONFIG="~/worai.toml"
export WORAI_PROFILE="dev"
export GSC_CLIENT_SECRETS="~/client_secrets.json"
export GA_ID="123456789"
```
