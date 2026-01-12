---
title: delete-entities-from-csv
---

Delete entities listed in a CSV file (first column = IRI).

## Usage
- `worai delete-entities-from-csv <csv_file> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `csv_file` | string | Path to CSV file with IRIs in the first column. |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--batch-size` | int | `10` | Number of IRIs to delete per batch. |

## Examples
- `worai delete-entities-from-csv ./entities.csv --batch-size 20`

## Notes
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config).
