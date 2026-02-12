---
title: graph
---

# graph

Run graph-specific workflows.

## Usage
- `worai graph sync --profile <name> [--debug]`
- `worai --config <path> graph sync --profile <name> [--debug]`

## Notes
- `--profile` is required and must match a profile entry in the selected config file.
- Config path comes from root `worai --config ...` when provided.
- Without root `--config`, standard worai config discovery applies (`WORAI_CONFIG`, `./worai.toml`, `~/.config/worai/config.toml`, `~/.worai.toml`).
- `sheets_service_account` accepts either inline JSON or a file path.
- The command fails when the selected profile does not define `api_key`.

Example profile config:
```toml
[profile.zurich]
api_key = "wl_..."
sheets_service_account = "./service-account.json"
# or inline JSON string:
# sheets_service_account = "{\"type\":\"service_account\",...}"
```

## Examples
- `worai graph sync --profile zurich`
- `worai --config ./worai.toml graph sync --profile zurich`
- `worai graph sync --profile zurich --debug`
