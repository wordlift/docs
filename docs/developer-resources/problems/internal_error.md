---
id: internal_error
slug: /problems/internal_error
title: "Internal server error"
sidebar_label: "internal_error"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type internal_error (HTTP 500): what it means and what to do."
---

# Internal server error

| | |
|---|---|
| `code` | `internal_error` |
| HTTP status | 500 |
| `type` | `https://docs.wordlift.io/problems/internal_error` |

The engine failed while handling the request.

## What to do

Retry once; if it persists, report the `instance` path and the time to WordLift support.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
