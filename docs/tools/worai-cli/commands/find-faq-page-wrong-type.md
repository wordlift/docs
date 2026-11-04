---
title: "worai find-faq-page-wrong-type"
description: "Find entities that have schema:mainEntity but lack the schema:FAQPage type in a Turtle file, and optionally patch them through the WordLift API."
sidebar_label: "find-faq-page-wrong-type"
last_updated: 2026-10-27
---

# worai find-faq-page-wrong-type

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

- `--patch` requires `WORDLIFT_API_KEY` (or `profiles.<name>.api_key` in config).
