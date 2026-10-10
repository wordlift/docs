---
id: invalid_request
slug: /problems/invalid_request
title: "Invalid request"
sidebar_label: "invalid_request"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type invalid_request (HTTP 422): what it means and what to do."
---

# Invalid request

| | |
|---|---|
| `code` | `invalid_request` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/invalid_request` |

The request body does not match the schema: a required field is missing, a value has the wrong type, or `text` is empty or longer than 100,000 characters.

## What to do

Read `errors`: one entry per failing field with its location (`loc`), message and type. Fix the body and send it again. Documents longer than the limit are sent in chunks; the open clients do this for you.

## Extension members

- `errors`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
