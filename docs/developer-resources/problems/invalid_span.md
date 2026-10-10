---
id: invalid_span
slug: /problems/invalid_span
title: "Invalid span"
sidebar_label: "invalid_span"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type invalid_span (HTTP 422): what it means and what to do."
---

# Invalid span

| | |
|---|---|
| `code` | `invalid_span` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/invalid_span` |

A mention you sent does not lie in `text` as written: the characters between `start` and `end` are not the mention's `text`, or the offsets fall outside the text.

## What to do

`mention` is the index of the offending mention in your `mentions` list. Offsets are zero-based character positions in `text` (Python string indices); `end` is exclusive. The usual causes are offsets counted on another version of the text, normalised whitespace or quotes, and byte offsets.

## Extension members

- `mention`
- `detail`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
