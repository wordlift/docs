---
id: upstream_error
slug: /problems/upstream_error
title: "Bad gateway"
sidebar_label: "upstream_error"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type upstream_error (HTTP 502): what it means and what to do."
---

# Bad gateway

| | |
|---|---|
| `code` | `upstream_error` |
| HTTP status | 502 |
| `type` | `https://docs.wordlift.io/problems/upstream_error` |

A service the engine depends on answered with an error while your request was handled.

## What to do

Retry shortly.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
