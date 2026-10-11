---
id: dataset_required
slug: /problems/dataset_required
title: "Dataset required"
sidebar_label: "dataset_required"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type dataset_required (HTTP 422): what it means and what to do."
---

# Dataset required

| | |
|---|---|
| `code` | `dataset_required` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/dataset_required` |

`dataset_uri` is `inline` but the request carries no `dataset` object.

## What to do

Send the vocabulary in `dataset` as `{"entities": [{"id", "name", "aliases", "description", "types", "same_as"}, ...]}`. When `dataset` is present, `dataset_uri` may be omitted.

## Extension members

- `detail`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
