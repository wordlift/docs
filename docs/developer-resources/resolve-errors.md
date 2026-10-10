---
id: resolve-errors
slug: /developer-resources/resolve-errors
sidebar_label: Resolve API Errors
title: Resolve API Errors
description: Every error of the Resolve API is an RFC 9457 Problem Details document with a stable code; this page lists the codes and what to do about each.
---

# Resolve API Errors

Every error answered by the [Resolve API](/developer-resources/resolve) is an
[RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) Problem Details document,
`Content-Type: application/problem+json`:

```json
{
  "type": "https://docs.wordlift.io/problems/dataset_not_supported",
  "title": "Dataset not supported",
  "status": 422,
  "instance": "/v1/resolve",
  "code": "dataset_not_supported",
  "dataset_uri": "x://y",
  "supported": ["wikidata://public", "wordlift://dataset/me", "inline"]
}
```

`code` is the stable identifier to compare on, and `type` is the page under
`https://docs.wordlift.io/problems/` describing it. `detail` is a sentence when
the engine has one. Extension members carry what the engine knows about the
failure and are listed on each code's page. Responses with an error status
cost no credits.

The exception is the `429` the gateway answers when the account's monthly
allowance is spent: its body is `text/plain` and the `X-RateLimit-*` headers
describe the limit and when it resets. The engine's own `429`
(`too_many_requests`) is Problem JSON with `Retry-After`. Where a retry time is
given, the `Retry-After` header is authoritative.

## Codes

| HTTP status | `code` | Meaning |
|---|---|---|
| 401 | [`unauthorized`](/problems/unauthorized) | The request carried no WordLift key, an empty one, or one the account service does not recognise |
| 422 | [`invalid_request`](/problems/invalid_request) | The request body does not match the schema: a required field is missing, a value has the wrong type, or `text` is empty or longer than 100,000 characters |
| 422 | [`invalid_span`](/problems/invalid_span) | A mention you sent does not lie in `text` as written: the characters between `start` and `end` are not the mention's `text`, or the offsets fall outside the text |
| 422 | [`invalid_identity`](/problems/invalid_identity) | A candidate id is not in a form the engine accepts |
| 422 | [`dataset_not_supported`](/problems/dataset_not_supported) | `dataset_uri` names a world the engine does not serve, lists a world twice, or is empty |
| 422 | [`dataset_required`](/problems/dataset_required) | `dataset_uri` is `inline` but the request carries no `dataset` object |
| 422 | [`invalid_dataset`](/problems/invalid_dataset) | The inline `dataset` could not be read: an entity without an `id` or `name`, a field of the wrong type, or more than 5,000 entities |
| 422 | [`unknown_include`](/problems/unknown_include) | `include` lists a value the engine does not know |
| 422 | [`candidates_not_supported`](/problems/candidates_not_supported) | A mention carries `candidates` while the request resolves against a user dataset (`wordlift://dataset/me` or `inline`) |
| 429 | [`too_many_requests`](/problems/too_many_requests) | The replica serving your request has its limit of requests in flight and waiting, so this one was refused before any work was done |
| 503 | [`dataset_warming`](/problems/dataset_warming) | Your knowledge graph is being read for the first time in a while |
| 502 or 503 | [`dataset_unavailable`](/problems/dataset_unavailable) | With status 502: the knowledge graph named in `dataset_uri` could not be read from its source |
| 404 | [`not_found`](/problems/not_found) | The path does not exist under `/v1/` |
| 500 | [`internal_error`](/problems/internal_error) | The engine failed while handling the request |
| 502 | [`upstream_error`](/problems/upstream_error) | A service the engine depends on answered with an error while your request was handled |
| 503 | [`unavailable`](/problems/unavailable) | The engine cannot serve requests at the moment, typically while starting |
| 504 | [`upstream_timeout`](/problems/upstream_timeout) | A service the engine depends on did not answer in time |
| any | [`error`](/problems/error) | An error without a more specific code; the HTTP status carries the meaning |

## Retrying

Nothing is resolved or charged when the status is an error, so a `429`, `502`
or `503` can be retried after the seconds given. The open clients do not retry
on their own: a request that timed out on the client side may still have been
served and metered, so the retry policy is yours.
