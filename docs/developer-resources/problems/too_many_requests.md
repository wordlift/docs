---
id: too_many_requests
slug: /problems/too_many_requests
title: "Too many requests"
sidebar_label: "too_many_requests"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type too_many_requests (HTTP 429): what it means and what to do."
---

# Too many requests

| | |
|---|---|
| `code` | `too_many_requests` |
| HTTP status | 429 |
| `type` | `https://docs.wordlift.io/problems/too_many_requests` |

The replica serving your request has its limit of requests in flight and waiting, so this one was refused before any work was done. Nothing was resolved and nothing was charged.

## What to do

Wait the seconds in the `Retry-After` header and send the request again. A 429 with a `text/plain` body and `X-RateLimit-*` headers is a different case: the account's monthly allowance for resolve() is spent (see the guide's Credits and limits).

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
