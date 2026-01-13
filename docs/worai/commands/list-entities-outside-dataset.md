---
title: list-entities-outside-dataset
---

List entities that do not belong to the account dataset.

This command fetches the `dataset_uri` via `get_me`, queries GraphQL for all entity IRIs, and prints those that do not start with the dataset URI.

## Usage
- `worai list-entities-outside-dataset [options]`

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--dataset-uri` | string |  | Override dataset URI (otherwise fetched via `get_me`). |
| `--endpoint` | string | `https://api.wordlift.io/graphql` | WordLift GraphQL endpoint. |
| `--base-url` | string | `https://api.wordlift.io` | WordLift API base URL. |
| `--limit` | int | `0` | Limit number of entities to list. |
| `--query-template` | string |  | GraphQL query template with `{dataset_uri}` placeholder (optional). |

## Examples
- `worai list-entities-outside-dataset`
- `worai list-entities-outside-dataset --limit 100`
- `worai list-entities-outside-dataset --dataset-uri https://example.com/dataset`

## Notes
- Requires `WORDLIFT_KEY` (or `wordlift.api_key` in config).
- If your GraphQL schema differs, pass a custom `--query-template`. The default query is `entities { iri }`.
