---
id: invalid_identity
slug: /problems/invalid_identity
title: "Invalid identity"
sidebar_label: "invalid_identity"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type invalid_identity (HTTP 422): what it means and what to do."
---

# Invalid identity

| | |
|---|---|
| `code` | `invalid_identity` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/invalid_identity` |

A candidate id is not in a form the engine accepts.

## What to do

Send Wikidata identities as `Q312`, `wd:Q312` or `https://www.wikidata.org/entity/Q312`; the answer echoes the form you used. `mention` is the index of the mention, `id` the value refused, `accepted` the forms.

## Extension members

- `mention`
- `id`
- `accepted`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
