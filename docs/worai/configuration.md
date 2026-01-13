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
token = "/path/to/gsc_token.json"
```

## Environment variables

- `WORAI_CONFIG` — path to a config TOML file.
- `WORAI_PROFILE` — profile name under `[profile.<name>]`.
- `WORAI_LOG_LEVEL` — default log level (`debug|info|warning|error`).
- `WORAI_LOG_FORMAT` — default log format (`text|json`).
- `WORDLIFT_KEY` — WordLift API key for entity operations.
- `WORDLIFT_API_KEY` — alternate WordLift API key name.
- `GSC_CLIENT_SECRETS` — path to OAuth client secrets JSON for GSC.
- `GSC_TOKEN` — path to store the OAuth token.
- `GSC_OUTPUT` — default output CSV path for GSC export.

Example environment setup:
```
export WORDLIFT_KEY="wl_..."
export WORAI_CONFIG="~/worai.toml"
export WORAI_PROFILE="dev"
export GSC_CLIENT_SECRETS="~/client_secrets.json"
```
