---
id: not_found
slug: /problems/not_found
title: "Not found"
sidebar_label: "not_found"
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

The requested path does not exist.

## What to do

Check the method and path against the [Resolve API Guide](/apis-and-sdks/resolve/),
which documents the public endpoint and how to obtain your account id.

This is one of the [Resolve API errors](/apis-and-sdks/resolve/errors/). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/apis-and-sdks/resolve/).
