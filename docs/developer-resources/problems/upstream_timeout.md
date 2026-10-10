---
id: upstream_timeout
slug: /problems/upstream_timeout
title: "Gateway timeout"
sidebar_label: "upstream_timeout"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type upstream_timeout (HTTP 504): what it means and what to do."
---

# Gateway timeout

| | |
|---|---|
| `code` | `upstream_timeout` |
| HTTP status | 504 |
| `type` | `https://docs.wordlift.io/problems/upstream_timeout` |

A service the engine depends on did not answer in time.

## What to do

Retry shortly. A timed-out request may still have been served, so do not assume it was not.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
