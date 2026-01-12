---
title: dedupe
---

Find duplicated WordLift entities by schema:url and delete duplicates.

## Usage
- `worai dedupe [options]`

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--endpoint` | string | `https://api.wordlift.io/graphql` | WordLift GraphQL endpoint. |
| `--dry-run` | bool | `false` | Show delete calls without executing them. |
| `--rate-delay` | float | `0.0` | Seconds to sleep between delete calls. |
| `--auto` | bool | `false` | Automatically keep the last IRI in each group. |

## Examples
- `worai dedupe --dry-run`
- `worai dedupe --auto --rate-delay 0.5`

## Notes
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config).
