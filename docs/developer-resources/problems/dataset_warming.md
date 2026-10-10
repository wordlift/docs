---
id: dataset_warming
slug: /problems/dataset_warming
title: "Dataset warming"
sidebar_label: "dataset_warming"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type dataset_warming (HTTP 503): what it means and what to do."
---

# Dataset warming

| | |
|---|---|
| `code` | `dataset_warming` |
| HTTP status | 503 |
| `type` | `https://docs.wordlift.io/problems/dataset_warming` |

Your knowledge graph is being read for the first time in a while. Nothing was resolved against a partial graph.

## What to do

Retry after the seconds in `Retry-After`. The body repeats the same number as `retry_after_s` for clients that only read the body; the header is authoritative.

## Extension members

- `dataset_uri`
- `retry_after_s`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
