---
title: find-faq-page-wrong-type
---

Find entities with schema:mainEntity but missing schema:FAQPage type. Optionally patch.

## Usage
- `worai find-faq-page-wrong-type <file.ttl> [--dry-run|--patch] [--replace-type]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `file.ttl` | string | Path to Turtle RDF file. |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--patch` | bool | `false` | Execute live API patch calls. |
| `--dry-run` | bool | `false` | Print sample patch payloads without executing. |
| `--replace-type` | bool | `false` | Remove existing types before adding FAQPage. |

## Examples
- `worai find-faq-page-wrong-type ./data.ttl`
- `worai find-faq-page-wrong-type ./data.ttl --dry-run --replace-type`
- `worai find-faq-page-wrong-type ./data.ttl --patch --replace-type`

## Notes
- `--patch` requires `WORDLIFT_KEY` (or `wordlift.api_key` in config).
