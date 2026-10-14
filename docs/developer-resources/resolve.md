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
The live tester and the benchmark against other entity-linking services are at
[wordlift.io/resolve](https://wordlift.io/resolve/).

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

The first call that reads a large graph may return `503` with a `Retry-After`
header while the graph is being read; nothing is resolved against a partial
graph. Retry after the given seconds.

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
Japanese and Chinese answer too and are measured on the same gold sets, at a
lower level: F1 77.2 for Japanese and 68.7 for Chinese, against Google Cloud
Natural Language's 81.4 and 74.8. The full comparison, misses included, is on
[wordlift.io/resolve](https://wordlift.io/resolve/#benchmarks).
