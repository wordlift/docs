---
title: agent
---

Launch external agent CLIs with worai MCP server + skills.

## Usage
- `worai agent [options] [-- <agent-cli-args...>]`
- `worai agent mcp serve [--config <path>] [--profile <name>]`

Arguments after `--` are passed through to the selected agent CLI unchanged.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--agent-cli`, `--cli` | string | `codex` | Agent CLI to launch: `codex|claude|gemini`. |
| `--agent-exec` | string | auto | Override agent executable path. |
| `--config` | string | none | Session default `worai.toml` path for MCP tools. |
| `--profile` | string | none | Session default profile for MCP tools. |
| `--dry-run` | bool | `false` | Print launch command and generated files without launching. |
| `--keep-temp` | bool | `false` | Keep generated temporary skill/MCP config files after exit. |

## MCP tools
- `worai_version`
- `worai_help`
- `worai_graph_validate`
- `worai_graph_export`
- `worai_graph_sync_run_start` (async)
- `worai_structured_data_validate_page`
- `worai_structured_data_inventory_start` (async)
- `worai_web_pages_classify_types`
- `worai_job_status`
- `worai_job_output`
- `worai_job_cancel`
- `worai_cli_exec` (fallback; argv-array based; no shell string)

## Config precedence for MCP calls
1. per-call `config_path` / `profile`
2. session defaults from `worai agent --config/--profile`
3. environment + standard worai discovery

## Examples
- `worai agent --agent-cli codex`
- `worai agent --agent-cli codex -- --yolo --search`
- `worai agent --agent-cli claude --profile acme`
- `worai agent --agent-cli gemini --config ./worai.toml --profile acme`
- `worai agent --agent-cli codex --dry-run`
- `worai agent mcp serve --profile acme`
