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
POST https://api.wordlift.io/resolve
Authorization: Key <your WordLift key>
```

The full request and response schema is in the [API reference](/api/resolve/resolve-mentions).
The live tester and the benchmark against other entity-linking services are at
[wordlift.io/resolve](https://wordlift.io/resolve/).

## A first call

```bash
curl -X POST https://api.wordlift.io/resolve \
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

## Credits and limits

Each call reports its cost in smart credits in the `X-Wordlift-Consumption`
response header: one credit per request plus one per 1,000 characters of text.
Resolving against your own graph costs the same as the public world. When your
plan's monthly allowance is reached the API answers `429 Too Many Requests`
with the `X-RateLimit-*` headers describing the limit and when it resets.

## Clients

- Python: `pip install "resolve-pipeline @ git+https://github.com/wordlift/content-analysis.git"`,
  then `python -m resolve_pipeline "Apple opened a store in Rome." --language en`.
- TypeScript: `npm install @wordlift/resolve`.
- The open pipeline, CLI, examples and the contract live at
  [github.com/wordlift/content-analysis](https://github.com/wordlift/content-analysis).

## Languages

English, Italian, French, German, Spanish and Portuguese are supported.
Japanese and Chinese answer too, without a published measurement.
