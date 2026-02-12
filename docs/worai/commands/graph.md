---
title: graph
---

# graph

Run graph-specific workflows.

## Usage
- `worai graph sync --profile <name> [--config <path>] [--debug]`

## Notes
- `--profile` is required and must match a profile entry in the selected config file.
- `--config` defaults to `worai.toml`.
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
- `worai graph sync --profile zurich --config ./worai.toml`
- `worai graph sync --profile zurich --debug`
