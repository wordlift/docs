---
title: upload-entities-from-turtle
---

Upload .ttl/.turtle files to WordLift /entities with resume support.

## Usage
- `worai upload-entities-from-turtle <folder> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `folder` | string | Folder containing .ttl/.turtle files. |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--recursive` | bool | `false` | Search for files recursively. |
| `--limit` | int | `0` | Max number of files to upload this run (0 = no limit). |
| `--state-file` | string | none | Path to resume state file (default: `<folder>/.entities_upload_state.json`). |
| `--base-url` | string | `https://api.wordlift.io` | WordLift API base URL. |
| `--api-key` | string | none | WordLift API key (or use env vars). |

## Examples
- `worai upload-entities-from-turtle ./entities --recursive --limit 50`

## Notes
- Uses `WORDLIFT_KEY` or `WORDLIFT_API_KEY` if `--api-key` is not provided.
