---
id: dataset_not_supported
slug: /problems/dataset_not_supported
title: "Dataset not supported"
sidebar_label: "dataset_not_supported"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type dataset_not_supported (HTTP 422): what it means and what to do."
---

# Dataset not supported

| | |
|---|---|
| `code` | `dataset_not_supported` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/dataset_not_supported` |

`dataset_uri` names a world the engine does not serve, lists a world twice, or is empty.

## What to do

Use one of the values in `supported`: `wikidata://public`, `wordlift://dataset/me`, `inline`, or the ordered pair `wordlift://dataset/me,wikidata://public` (your graph first, Wikidata for the rest).

## Extension members

- `dataset_uri`
- `supported`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
