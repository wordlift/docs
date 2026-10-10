---
id: unavailable
slug: /problems/unavailable
title: "Service unavailable"
sidebar_label: "unavailable"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type unavailable (HTTP 503): what it means and what to do."
---

# Service unavailable

| | |
|---|---|
| `code` | `unavailable` |
| HTTP status | 503 |
| `type` | `https://docs.wordlift.io/problems/unavailable` |

The engine cannot serve requests at the moment, typically while starting.

## What to do

Retry after the seconds in `Retry-After` when present, otherwise after a minute.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
