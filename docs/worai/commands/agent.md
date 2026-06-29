# agent

Launch external agent CLIs with worai MCP server + skills.

## Usage
- `worai agent [options] [-- <agent-cli-args...>]`
- `worai agent mcp serve [--config <path>] [--profile <name>]`

## Options
- `--agent-cli` / `--cli`: `codex|claude|gemini` (default: `codex`)
- `--agent-exec`: override executable path
- `--config`: session default config path for MCP tool calls
- `--profile`: session default profile for MCP tool calls
- `--codex-use-user-config`: for `--agent-cli codex`, skip forced WordLift provider/model injection and use existing user Codex auth/config
- `--dry-run`: print generated launch command and asset paths without launching
- `--keep-temp`: keep generated temporary skills/MCP config files after exit

## Notes
- `worai agent` generates:
  - a temporary skills file (`WORAI_SKILL.md`)
  - a temporary MCP config file pointing to `worai agent mcp serve`
- MCP tools exposed:
  - `worai_version`
  - `worai_help`
  - `worai_graph_validate`
  - `worai_graph_export`
  - `worai_graph_audit`
  - `worai_graph_kpis`
  - `worai_entity_matrix`
  - `worai_graph_reset`
  - `worai_graph_sync_run_start` (async)
  - `worai_structured_data_validate_page`
  - `worai_structured_data_inventory_start` (async)
  - `worai_web_pages_classify_types`
  - `worai_job_status`
  - `worai_job_output`
  - `worai_job_events`
  - `worai_job_cancel`
  - `worai_cli_exec` (fallback; argv-array based)
- MCP config/profile precedence:
  - per-call `config_path` + `profile`
  - then session defaults from `worai agent --config/--profile`
  - then `WORAI_PROFILE`
  - then `default`
- Codex launcher behavior:
  - default mode injects runtime model config for WordLift provider (`agent.codex_model`, default `gpt-5-5-graph-sync`)
  - in default mode, `X-API-Key` is resolved from the selected profile `api_key` (with `WORDLIFT_API_KEY` fallback)
  - in default mode, if no profile is provided, falls back to `default` with a warning
  - in default mode, exits with a human-readable error when fallback `default` profile is missing in the resolved config
  - `--codex-use-user-config` disables the forced WordLift provider/model injection and uses existing Codex user auth/config
  - `--dry-run` redacts `X-API-Key` in printed launch command when injected
- Config:
  - set `agent.codex_model` globally or under a profile to override the default Codex WordLift model

## Examples
- `worai agent --agent-cli codex`
- `worai agent --agent-cli codex --codex-use-user-config`
- `worai agent --agent-cli codex --config ./worai.toml` (falls back to `default` profile with warning when `--profile` and `WORAI_PROFILE` are not set)
- `worai agent --agent-cli claude --profile acme`
- `worai agent --agent-cli gemini --config ./worai.toml --profile acme`
- `worai agent --agent-cli codex --dry-run`
- `worai agent mcp serve --profile acme`
