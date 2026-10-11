---
id: unauthorized
slug: /problems/unauthorized
title: "Unauthorized"
sidebar_label: "unauthorized"
displayed_sidebar: docs
pagination_prev: null
pagination_next: null
description: "Resolve API problem type unauthorized (HTTP 401): what it means and what to do."
---

# Unauthorized

| | |
|---|---|
| `code` | `unauthorized` |
| HTTP status | 401 |
| `type` | `https://docs.wordlift.io/problems/unauthorized` |

The request carried no WordLift key, an empty one, or one the account service does not recognise.

## What to do

Send the account key as `Authorization: Key <your key>`. Keys are in the WordLift dashboard; a key also selects the knowledge graph that `wordlift://dataset/me` reads.

This is one of the [Resolve API errors](/developer-resources/resolve-errors). Errors are
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details documents with
`Content-Type: application/problem+json`; `code` is the stable identifier and
`type` is this page. See the [Resolve API Guide](/developer-resources/resolve).
