---
title: "worai find-missing-names"
description: "List CollectionPage entities in an RDF file that are missing both schema:name and schema:headline."
sidebar_label: "find-missing-names"
last_updated: 2026-10-27
---

# worai find-missing-names

List CollectionPage entities missing schema:name and schema:headline.

## Usage

- `worai find-missing-names <file.ttl>`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `file.ttl` | string | Path to RDF file. |

## Examples

- `worai find-missing-names ./data.ttl`
