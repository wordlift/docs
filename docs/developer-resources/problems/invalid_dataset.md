---
id: invalid_dataset
slug: /problems/invalid_dataset
title: "Invalid dataset"
sidebar_label: "invalid_dataset"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type invalid_dataset (HTTP 422): what it means and what to do."
---

# Invalid dataset

| | |
|---|---|
| `code` | `invalid_dataset` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/invalid_dataset` |

The inline `dataset` could not be read: an entity without an `id` or `name`, a field of the wrong type, or more than 5,000 entities.

## What to do

`detail` says what was wrong. Keep each entity to the documented fields and the vocabulary under 5,000 entities; larger vocabularies belong in your WordLift knowledge graph, resolved with `wordlift://dataset/me`.

## Extension members

- `detail`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
