---
title: entity-matrix
---

Build a URL x entity-type pivot table from an exported graph file.

Use this command when you need to audit which Schema.org entity types appear on each URL in a Turtle graph exported from WordLift. The command reads a local graph file, builds a URL-centered subgraph for each page, counts the entity types found in that subgraph, and prints or writes a pivot table.

## Usage
- `worai entity-matrix [options] <file>`

## Argument

| Argument | Type | Required | Description |
| --- | --- | --- | --- |
| `file` | string | yes | Path to a local Turtle (`.ttl`) graph file. This is typically a file produced by `worai graph export`. |

## Required configuration

For local output formats (`table`, `json`, `csv`, `tsv`, `parquet`), the command only requires a readable local Turtle file. It does not require a WordLift API key because it does not call the WordLift API while building the matrix.

Additional requirements apply for specific formats:

| Output format | Required configuration |
| --- | --- |
| `table` | None beyond the input file. |
| `json` | None beyond the input file. Use `--output` to write to a file instead of stdout. |
| `csv` | None beyond the input file. Use `--output` to write to a file instead of stdout. |
| `tsv` | None beyond the input file. Use `--output` to write to a file instead of stdout. |
| `parquet` | Requires `--output <file>` and the Parquet optional dependency (`pyarrow`). |
| `gsheets` | Requires Google Sheets credentials, spreadsheet ID, worksheet name, and the Google Sheets optional dependency (`gspread`). |

The command depends on `wordlift-sdk>=6.13.0` for graph-audit matrix generation.

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--exclude-type`, `-x` | string | none | Entity type short name to exclude from output columns, such as `WebPage` or `BreadcrumbList`. Repeat the option to exclude multiple types. |
| `--cluster` / `--no-cluster` | bool | `--no-cluster` | Aggregate URL rows that share a common parent path and identical entity-type set into one wildcard row, such as `https://example.com/blog/*`. Counts are summed across clustered URLs. |
| `--depth` | int | `1` | Number of relationship hops to follow when collecting referenced entities into each URL subgraph. Increase this when you need entities referenced beyond the first hop. |
| `--count` / `--no-count` | bool | `--no-count` | Show integer counts instead of presence markers. With `--no-count`, the table shows whether each type is present. With `--count`, it shows how many entities of each type were found. |
| `--format`, `-f` | choice | `table` | Output format. Supported values: `table`, `json`, `csv`, `tsv`, `parquet`, `gsheets`. |
| `--output`, `-o` | path | stdout | Output file path. Optional for `table`, `json`, `csv`, and `tsv`; required for `parquet`. Ignored by `gsheets`, which writes to the configured spreadsheet. |
| `--gsheets-credentials` | string | none | Path to a Google service-account JSON file. Required when `--format gsheets` unless configured through environment or `worai.toml`. |
| `--gsheets-id` | string | none | Google Sheets spreadsheet ID. Required when `--format gsheets` unless configured through environment or `worai.toml`. |
| `--gsheets-sheet` | string | none | Google Sheets worksheet tab name. Required when `--format gsheets` unless configured through environment or `worai.toml`. |

## How the matrix is built

For each URL found in the graph, `entity-matrix` builds a subgraph that includes:

1. The entity IRI for that URL and child entity IRIs whose IRI starts with the parent IRI plus `/`.
2. Named entity IRIs directly referenced by the root entity or its children.
3. Children of each referenced entity.
4. Additional referenced entities up to the configured `--depth`.

The command then counts the Schema.org types found in that subgraph and creates one row per URL.

Example output with `--count`:

| url | Article | FAQPage | Question | Thing |
| --- | --- | --- | --- | --- |
| `https://example.com/my-post` | 1 | 1 | 3 | 2 |
| `https://example.com/about` | 1 | 0 | 0 | 0 |

With the default `--no-count`, the table uses presence markers instead of integer counts.

## Output formats

| Format | Description |
| --- | --- |
| `table` | Prints a rich terminal table to stdout. This is the default and is best for interactive inspection. |
| `json` | Writes structured JSON rows. Use this when another script or agent needs to consume the matrix. |
| `csv` | Writes comma-separated rows. Use this for spreadsheets or downstream data workflows. |
| `tsv` | Writes tab-separated rows. Useful when values may contain commas. |
| `parquet` | Writes a Parquet file for analytics workflows. Use with `--output`. |
| `gsheets` | Writes the matrix directly to a Google Sheets tab. Requires Google Sheets configuration. |

## Google Sheets configuration

When `--format gsheets` is used, the command needs:

- a service-account credential file
- a spreadsheet ID
- a worksheet tab name
- the `gspread` Python package, installed through the worai Google Sheets optional dependency

You can provide those values as CLI flags:

```bash
worai entity-matrix graph.ttl \
  --format gsheets \
  --gsheets-credentials svc.json \
  --gsheets-id 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms \
  --gsheets-sheet "Entity Matrix"
```

You can also configure them through environment variables:

| Env var | Description |
| --- | --- |
| `GSHEETS_CREDENTIALS` | Path to the service-account JSON file. |
| `GSHEETS_SPREADSHEET_ID` | Google Sheets spreadsheet ID. |
| `GSHEETS_SHEET_NAME` | Worksheet tab name. |

Or define them in `worai.toml` under a profile:

```toml
[profiles.my-site.gsheets]
credentials = "svc.json"
spreadsheet_id = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
sheet_name = "Entity Matrix"
```

Resolution order for each Google Sheets value is:

1. CLI flag
2. Environment variable
3. Selected profile in `worai.toml`

Use the root `--profile` option to select the profile:

```bash
worai --profile my-site entity-matrix graph.ttl --format gsheets
```

The target spreadsheet must be shared with the service-account email, or the Google Sheets write will fail.

## Notes

- The input file must be a local Turtle graph file.
- Both `http://schema.org/url` and `https://schema.org/url` are recognized.
- Type short names strip the `http://schema.org/` or `https://schema.org/` prefix. For other namespaces, the local name after `#` or `/` is used.
- Child entities are detected by IRI prefix. For example, `https://data.example.com/article/post/faq` is treated as a child of `https://data.example.com/article/post`.
- Referenced entities must be named IRIs that appear in the graph as typed entities.
- `--exclude-type` removes columns from the output; it does not modify the input graph.
- `--cluster` only collapses URLs in the same parent path when they have the same set of present entity types. URLs with different type sets remain separate rows.
- `--depth` increases the referenced-entity traversal distance and can produce wider or larger matrices on dense graphs.

## Examples

- `worai entity-matrix graph.ttl`
- `worai entity-matrix graph.ttl --count`
- `worai entity-matrix graph.ttl --exclude-type WebPage --exclude-type BreadcrumbList`
- `worai entity-matrix graph.ttl --format csv --output entity-matrix.csv`
- `worai entity-matrix graph.ttl --cluster --format tsv --output entity-matrix.tsv`
- `worai entity-matrix graph.ttl --depth 2 --count --format json --output entity-matrix.json`
- `worai --profile my-site entity-matrix graph.ttl --cluster --format gsheets`
