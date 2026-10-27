---
title: "worai upload-entities-from-turtle"
description: "Upload Turtle files from a folder to the WordLift entities endpoint, with recursive search, per-run limits and resumable state."
sidebar_label: "upload-entities-from-turtle"
last_updated: 2026-10-27
---

# worai upload-entities-from-turtle

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

- Uses `profiles.<name>.api_key` first, then `WORDLIFT_API_KEY`, if `--api-key` is not provided.
