---
title: patch
---

Patch WordLift entities from RDF (Turtle or JSON-LD).

## Usage
- `worai patch <file.ttl|file.jsonld> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `file.ttl|file.jsonld` | string | Path to RDF input file (.ttl or .jsonld). |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--dry-run` | bool | `false` | Print curl commands instead of executing them. |
| `--add-types` | bool | `false` | Use 'add' for rdf:type properties instead of replace. |
| `--types-only` | bool | `false` | Only process rdf:type triples. |
| `--subjects-file` | string | none | File containing subject URIs to process (one per line). |
| `--workers` | int | `2` | Number of concurrent requests. |
| `--retries` | int | `3` | Number of retries for failed requests. |

## Examples
- `worai patch ./data.ttl --dry-run --add-types`
- `worai patch ./data.jsonld --types-only --workers 4`

## Notes
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config).
