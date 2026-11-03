---
title: patch
---

Patch WordLift entities from RDF (Turtle or JSON-LD).

## Usage
- `worai patch <file.ttl|file.jsonld> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `file.ttl|file.jsonld` | string | Path to RDF input file (.ttl or .jsonld). |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--dry-run` | bool | `false` | Print curl commands instead of executing them. |
| `--add-types` | bool | `false` | Use 'add' for rdf:type properties instead of replace. |
| `--types-only` | bool | `false` | Only process rdf:type triples. |
| `--subjects-file` | string | none | File containing subject URIs to process (one per line). |
| `--workers` | int | `2` | Number of concurrent requests. |
| `--retries` | int | `3` | Attempts per subject, including the first. Minimum `1`. |

## Examples
- `worai patch ./data.ttl --dry-run --add-types`
- `worai patch ./data.jsonld --types-only --workers 4`

## Notes
- Requires `WORDLIFT_API_KEY` (or `profiles.<name>.api_key` in config).
- A subject counts as patched only when the API answers with a 2xx status and a response body that contains an entity.
- These count as failures, and each one prints the subject and the reason:
  - Any non-2xx status. The message shows the status code and the response body.
  - A 2xx status with an empty body (nothing, `{}`, or an empty JSON-LD graph) or a body that is not JSON. The API returned no entity, so the write may not have been stored. Check the entity before relying on it.
  - A transport error from `curl`, such as a failed connection or a 60-second timeout.
- Attempts are 5 seconds apart. Only transport errors and 5xx responses are retried. Other 4xx responses and 2xx responses without an entity fail straight away.
- The command ends with a summary (`Patched X of Y subjects; Z failed.`) and exits with code `4` if any subject failed. With `--dry-run` it makes no API calls and prints no summary.
- The API key is passed to `curl` over stdin and is never shown in errors or logs.
