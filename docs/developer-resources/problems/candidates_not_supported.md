---
id: candidates_not_supported
slug: /problems/candidates_not_supported
title: "Candidates not supported"
sidebar_label: "candidates_not_supported"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type candidates_not_supported (HTTP 422): what it means and what to do."
---

# Candidates not supported

| | |
|---|---|
| `code` | `candidates_not_supported` |
| HTTP status | 422 |
| `type` | `https://docs.wordlift.io/problems/candidates_not_supported` |

A mention carries `candidates` while the request resolves against a user dataset (`wordlift://dataset/me` or `inline`).

## What to do

With a user dataset the dataset itself is the candidate world: drop the per-mention `candidates`, or resolve against `wikidata://public` where candidates restrict the decision.

## Extension members

- `detail`

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
