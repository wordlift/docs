---
id: unknown_include
slug: /problems/unknown_include
title: "Unknown include"
sidebar_label: "unknown_include"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type unknown_include (HTTP 422): what it means and what to do."
---

# Unknown include

| | |
|---|---|
| `code` | `unknown_include` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/unknown_include` |

`include` lists a value the engine does not know.

## What to do

The accepted values are `candidates` (the bounded set of identities considered) and `evidence` (how the decision was made). `values` lists what was refused.

## Extension members

- `values`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
