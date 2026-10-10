---
id: dataset_unavailable
slug: /problems/dataset_unavailable
title: "Dataset unavailable"
sidebar_label: "dataset_unavailable"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type dataset_unavailable (HTTP 502 or 503): what it means and what to do."
---

# Dataset unavailable

| | |
|---|---|
| `code` | `dataset_unavailable` |
| HTTP status | 502 or 503 |
| `type` | `https://docs.wordlift.io/problems/dataset_unavailable` |

With status 502: the knowledge graph named in `dataset_uri` could not be read from its source. With status 503: the engine itself has no index loaded yet. The status, not the code, tells the two apart.

## What to do

On a 502 retry shortly; if it persists, check that the key's graph exists and is readable in the WordLift dashboard. On a 503 retry after a minute: the service is starting.

## Extension members

- `dataset_uri`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
