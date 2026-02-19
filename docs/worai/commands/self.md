---
title: self
---

Manage worai CLI update workflows.

## Usage
- `worai self update [options]`

## self update
Check PyPI for a newer `worai` version and print (or run) the recommended upgrade command.

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--check-only` | bool | `false` | Only check for updates and print the suggested upgrade command. |
| `--yes`, `-y` | bool | `false` | Run the upgrade command immediately. |

### Examples
- `worai self update --check-only`
- `worai self update --yes`

### Notes
- Startup update checks are cached (24h) and non-blocking.
- Disable startup update checks via `WORAI_DISABLE_UPDATE_CHECK=1` or config `updates.check = false`.
