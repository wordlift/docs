---
id: error
slug: /problems/error
title: "Error"
sidebar_label: "error"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type error (HTTP any): what it means and what to do."
---

# Error

| | |
|---|---|
| `code` | `error` |
| HTTP status | any |
| `type` | `https://docs.wordlift.io/problems/error` |

An error without a more specific code; the HTTP status carries the meaning.

## What to do

Read `status`, `title` and `detail`.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
