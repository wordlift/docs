---
title: "worai link-groups"
description: "Convert a link-group CSV to RDF in Turtle, JSON-LD, XML or N3, and optionally apply the changes through the WordLift API."
sidebar_label: "link-groups"
last_updated: 2026-10-27
---

# worai link-groups

Convert a link-group CSV to RDF and optionally apply changes via WordLift API.

## Usage

- `worai link-groups <links.csv> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `links.csv` | string | Path to input CSV file. |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--format` | choice | `turtle` | Output RDF format: `turtle`, `json-ld`, `xml`, `n3`. |
| `--apply` | bool | `false` | Apply changes via WordLift API. |
| `--dry-run` | bool | `false` | Show curl commands without executing them. |
| `--concurrency` | int | `2` | Number of concurrent API requests. |
| `--retries` | int | `3` | Number of retries for failed API requests. |

## Examples

- `worai link-groups ./links.csv --format turtle`
- `worai link-groups ./links.csv --apply --dry-run --concurrency 4`

## Notes

- `--apply` requires `WORDLIFT_API_KEY` (or `profiles.<name>.api_key` in config).
