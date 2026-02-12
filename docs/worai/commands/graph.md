---
title: graph
---

# graph

Run graph-specific workflows.

## Usage
- `worai graph sync --profile <name> [--debug]`
- `worai --config <path> graph sync --profile <name> [--debug]`

## Notes
- Supported input sources:
  - `urls` (explicit URL list)
  - `sitemap_url` (+ optional `sitemap_url_pattern`)
  - Google Sheets (`sheets_url` + `sheets_name` + `sheets_service_account`)
- `--profile` is required and must match a profile entry in the selected config file.
- Config path comes from root `worai --config ...` when provided.
- Without root `--config`, standard worai config discovery applies (`WORAI_CONFIG`, `./worai.toml`, `~/.config/worai/config.toml`, `~/.worai.toml`).
- `sheets_service_account` accepts either inline JSON or a file path.
- The command fails when the selected profile does not define `api_key`.
- `sheets_service_account` is required only when using Google Sheets source (`sheets_url` + `sheets_name`).
- Failure cases for `sheets_service_account` (Sheets source only):
  - value is missing or empty
  - value is neither valid JSON object content nor an existing file path
  - JSON content is valid JSON but not an object

Example profile config:
```toml
[profile.acme]
api_key = "wl_..."
sheets_service_account = "./service-account.json"
# or inline JSON string:
# sheets_service_account = "{\"type\":\"service_account\",...}"
```

## Examples
- `worai graph sync --profile acme`
- `worai --config ./worai.toml graph sync --profile acme`
- `worai graph sync --profile acme --debug`
