---
id: resolve
slug: /developer-resources/resolve
sidebar_label: Resolve API Guide
title: Resolve API Guide
description: Resolve mentions in a text to identities in Wikidata, your WordLift knowledge graph or an inline vocabulary, or get an honest "unresolved".
---

# Resolve API Guide

`resolve()` takes a text and tells you who or what each mention refers to, as a
stable identifier, or returns `unresolved` with a reason. A resolver is allowed
to abstain. It never returns the least-bad candidate as a match.

```
POST https://api.wordlift.io/accounts/{accountId}/resolve
Authorization: Key <your WordLift key>
```

`accountId` is your account's id: the `accountId` field that
`GET https://api.wordlift.io/accounts/me` returns for the same key. The open
clients read it from the key on first use, so they take only the key.

```bash
WL_ACCOUNT_ID=$(curl -s https://api.wordlift.io/accounts/me \
  -H "Authorization: Key $WL_KEY" | jq .accountId)
```

The full request and response schema is in the [API reference](/api/resolve/resolve-mentions).
The live tester is at [wordlift.io/resolve](https://wordlift.io/resolve/); the
comparison with other entity-linking services, losses included, is
[on the WordLift blog](https://wordlift.io/blog/en/entity-linking-apis-compared/).
Moving from Azure Entity Linking, which retires on 1 September 2028? See
[Migrate from Azure Entity Linking](/developer-resources/resolve/migrate-from-azure-entity-linking).

## A first call

```bash
curl -X POST "https://api.wordlift.io/accounts/$WL_ACCOUNT_ID/resolve" \
  -H "Authorization: Key $WL_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "Tim Cook said Apple will open a store in Rome.", "language": "en"}'
```

```json
{
  "mentions": [
    {"text": "Tim Cook", "start": 0, "end": 8, "status": "resolved",
     "entity": {"id": "Q265852", "label": "Tim Cook", "description": "American business executive",
                "types": ["Person"], "same_as": ["https://www.wikidata.org/entity/Q265852",
                                                 "http://dbpedia.org/resource/Tim_Cook"]},
     "score": 0.93},
    {"text": "Apple", "start": 14, "end": 19, "status": "resolved",
     "entity": {"id": "Q312", "label": "Apple Inc.", "types": ["Organization"]}, "score": 0.99},
    {"text": "Rome", "start": 41, "end": 45, "status": "resolved",
     "entity": {"id": "Q220", "label": "Rome", "types": ["City"]}, "score": 0.99}
  ],
  "dataset_uri": "wikidata://public",
  "language": "en"
}
```

Every mention comes back with `status` `resolved` or `unresolved`. A resolved
mention carries the entity and a `score` in `[0, 1]`. An unresolved mention
carries one of four public reasons:

| Reason | Meaning |
|---|---|
| `no_candidates` | nothing in the dataset answers to this name |
| `no_suitable_candidate` | candidates exist, none fits the context |
| `type_conflict` | the best candidate contradicts the mention's type |
| `low_relevance` | the evidence is too weak to commit |

## Your own mentions and candidates

If you already have spans from your own NER or from an editor, send them, and
the engine resolves exactly those:

```json
{"text": "Apple opened a store in Rome.", "language": "en",
 "mentions": [{"text": "Apple", "start": 0, "end": 5}, {"text": "Rome", "start": 24, "end": 28}]}
```

A mention may also carry the candidates you want the decision restricted to,
as `Q312`, `wd:Q312` or a Wikidata entity URI. Identifiers are echoed back in
the form you sent.

## Three worlds to resolve against

`dataset_uri` selects where identities come from. Worlds can be ordered; a
mention stops at the first world that resolves it.

| `dataset_uri` | World |
|---|---|
| `wikidata://public` | Wikidata, the default |
| `wordlift://dataset/me` | your WordLift knowledge graph, read with your key |
| `wordlift://dataset/me,wikidata://public` | your graph first, Wikidata for the rest |
| `inline` | a vocabulary sent in the request's `dataset` field, up to 5,000 entities |

Answers from your graph carry your IRIs, and `same_as` bridges them to the
Wikidata and DBpedia identifiers. SKOS labels and definitions in your graph are
read as aliases and descriptions.

```json
{"text": "Our Roma office opened in 2019.", "language": "en",
 "dataset_uri": "wordlift://dataset/me,wikidata://public"}
```

### The first call on your graph

The engine reads your graph before it can answer from it. A graph of a few
hundred entities is ready in seconds; one with hundreds of thousands of
entities can take several minutes. The read happens again after a few hours
without calls, and when a new server starts.

While the graph is being read, a call waits up to about 20 seconds and then
answers `503` with the code [`dataset_warming`](/problems/dataset_warming) and a
`Retry-After` header. The read goes on in the background. Nothing is resolved
against a partial graph and nothing is charged. Retry after the given seconds
until the call answers:

```python
import time, requests

def resolve(url, key, body, max_wait_s=900):
    deadline = time.monotonic() + max_wait_s
    while True:
        r = requests.post(url, json=body, headers={"Authorization": f"Key {key}"}, timeout=120)
        warming = r.status_code == 503 and r.headers.get("content-type", "").startswith("application/problem+json") \
            and r.json().get("code") == "dataset_warming"
        if not warming or time.monotonic() > deadline:
            r.raise_for_status()
            return r.json()
        time.sleep(int(r.headers.get("Retry-After", "15")))
```

- Before a batch, send one call and wait for it to answer; then send the rest.
  Calls sent in parallel during the read all receive `503`.
- Calls against `wikidata://public` alone never wait for a graph.

## Evidence

Add `"include": ["candidates", "evidence"]` to see the bounded set of
identities the engine considered and how it decided, which is useful while
building a vocabulary or reviewing abstentions.

## Errors

Every error is an RFC 9457 Problem Details document with a stable `code` and a
`type` URI that leads to the code's page; the list of codes and what to do about
each is in [Resolve API Errors](/developer-resources/resolve-errors).

## Requests and limits

Every plan includes a monthly allowance of resolve() requests; a free developer
key includes 1,000. A call counts as one request, plus one per 1,000 characters
of text, so a sentence counts 2 and a 5,000-character article 6. Each response
says what the call counted in the `X-Wordlift-Cost` header, and where the
allowance stands in `X-RateLimit-Limit`, `X-RateLimit-Remaining` and
`X-RateLimit-Reset`. Resolving against your own graph counts the same as the
public world. When the allowance is used up the API answers `429 Too Many
Requests` with the same headers until the monthly reset; nothing is charged.

## Clients

- Python: `pip install "resolve-pipeline @ git+https://github.com/wordlift/content-analysis.git"`,
  then `python -m resolve_pipeline "Apple opened a store in Rome." --language en`.
- TypeScript: `npm install @wordlift/resolve`.
- The open pipeline, CLI, examples and the contract live at
  [github.com/wordlift/content-analysis](https://github.com/wordlift/content-analysis).

## Languages

English, Italian, French, German, Spanish and Portuguese are supported.
Japanese and Chinese are experimental: measured on small gold sets (79 and
78 mentions), currently behind Google Cloud Natural Language (F1 77.2 against
81.4 for Japanese, 68.7 against 74.8 for Chinese). The full comparison, misses
included, is on [wordlift.io/resolve](https://wordlift.io/resolve/#benchmarks).
