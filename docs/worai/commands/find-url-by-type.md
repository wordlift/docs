---
title: find-url-by-type
---

Extract schema:url values from a Turtle graph for one or more schema types.

## Usage
- `worai find-url-by-type <file.ttl> schema:Type [schema:OtherType...] [--show-id]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `file.ttl` | string | Path to Turtle (.ttl) graph file. |
| `schema:Type` | string | One or more schema.org types (e.g., `schema:Service`). |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--show-id` | bool | `false` | Print subject URI instead of schema:url. |

## Examples
- `worai find-url-by-type ./data.ttl schema:Service schema:Product`
- `worai find-url-by-type ./data.ttl schema:Service --show-id`
