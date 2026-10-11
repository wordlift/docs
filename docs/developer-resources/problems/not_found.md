---
id: not_found
slug: /problems/not_found
title: "Not found"
sidebar_label: "not_found"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type not_found (HTTP 404): what it means and what to do."
---

# Not found

| | |
|---|---|
| `code` | `not_found` |
| HTTP status | 404 |
| `type` | `https://docs.wordlift.io/problems/not_found` |

The path does not exist under `/v1/`.

## What to do

Resolve is `POST /v1/resolve`; check the method and the path.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
