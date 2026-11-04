---
title: patch
---

Patch WordLift entities from RDF (Turtle or JSON-LD).

## Usage
- `worai patch <file.ttl|file.jsonld> [options]`

## Arguments

| Argument | Type | Description |
| --- | --- | --- |
| `file.ttl\|file.jsonld` | string | Path to RDF input file (.ttl or .jsonld). |

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
- Needs a config file containing the selected profile (`default` unless set with `worai --profile <name> patch ...` or `WORAI_PROFILE`), even with `--dry-run`. The API key comes from `profiles.<name>.api_key`, then `WORDLIFT_API_KEY`. Setting `WORDLIFT_API_KEY` without such a config fails with exit code `2`.
- A subject counts as patched when the API answers with a 2xx status and a JSON body holding something other than `@context`. The body isn't checked against the subject, so a 200 with `{"error":"not stored"}` still counts as patched.
- These count as failures, and each one prints the subject and the reason:
  - Any non-2xx status. The message shows the status code and the response body.
  - A 2xx status whose body is empty, is not JSON, or holds no data (`{}`, `[]`, `null` or another JSON scalar, only `@context`, or an empty `@graph`). The write may not have been stored. Check the entity before relying on it.
  - A transport error from `curl`, such as a failed connection or a 60-second timeout.
- Attempts are 5 seconds apart. Only transport errors and 5xx responses are retried. Other 4xx responses and 2xx responses without an entity fail straight away.
- When subjects were processed, the command prints `Patched X of Y subjects; Z failed.` and exits with code `4` if any failed. On failure, an error line follows on stderr. If no subjects match, it prints `No subjects found for processing.` and exits `0`. With `--dry-run` it makes no API calls, prints no summary and exits `0`. Invalid options or a missing key or config exit `2`. An unreadable or invalid input file exits `1`.
- The API key is passed to `curl` over stdin, so it isn't in the process list. Exact matches are removed from failure messages, and `--dry-run` prints a placeholder.
