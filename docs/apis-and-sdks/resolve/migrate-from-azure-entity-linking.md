---
sidebar_label: Migrate from Azure Entity Linking
title: Migrate from Azure Entity Linking to resolve()
description: Azure AI Language retires Entity Linking on 1 September 2028. Move an Azure Entity Linking call to resolve() in under an hour; the request, the response field map, and what to do with "unresolved".
last_updated: 2026-10-27
---

# Migrate from Azure Entity Linking to resolve()

Azure AI Language retires Entity Linking on 1 September 2028
([Microsoft notice](https://learn.microsoft.com/en-us/azure/ai-services/language-service/entity-linking/how-to/call-api)).
This guide moves an Azure Entity Linking call to resolve() in under an hour:
one endpoint, one header, and a field map. The main difference is the
identifier: Azure returns a Wikipedia page, resolve() returns a Wikidata ID, or
`unresolved` with a reason.

## What changes

| | Azure Entity Linking | resolve() |
| --- | --- | --- |
| Identifier | Wikipedia title and URL (`id`, `url`) | Wikidata QID (`entity.id`), plus `same_as` links to Wikidata and DBpedia |
| When unsure | Returns a link with a low `confidenceScore`, or nothing | Returns `status: "unresolved"` with one of four reasons |
| Your own entities | Not supported | Your WordLift graph, or up to 5,000 entities sent with the request |
| Mentions | Detected by the service | Detected by the service, or your own spans |
| Batching | Several documents per request | One text per request, up to 100,000 characters |
| Languages | English and Spanish only ([Azure language support](https://learn.microsoft.com/en-us/azure/ai-services/language-service/entity-linking/language-support)) | English, Italian, French, German, Spanish, Portuguese; Japanese and Chinese at a lower level |

## 1. Get a key

Request a free key at [wordlift.io/resolve](https://wordlift.io/resolve/#access):
1,000 requests a month for individual developers, delivered immediately. A call
costs one request plus one per 1,000 characters
([Requests and limits](/apis-and-sdks/resolve/#requests-and-limits)). Read
your `accountId` once:

```bash
curl -s https://api.wordlift.io/accounts/me -H "Authorization: Key $WL_KEY"
```

## 2. Change the call

Before, Azure Entity Linking:

```bash
curl -X POST "$LANGUAGE_ENDPOINT/language/:analyze-text?api-version=2022-05-01" \
  -H "Content-Type: application/json" \
  -H "Ocp-Apim-Subscription-Key: $LANGUAGE_KEY" \
  -d '{"kind":"EntityLinking","parameters":{"modelVersion":"latest"},
       "analysisInput":{"documents":[{"id":"1","language":"en",
       "text":"Microsoft was founded by Bill Gates and Paul Allen."}]}}'
```

After, resolve():

```bash
curl -X POST "https://api.wordlift.io/accounts/$WL_ACCOUNT_ID/resolve" \
  -H "Content-Type: application/json" \
  -H "Authorization: Key $WL_KEY" \
  -d '{"language":"en",
       "text":"Microsoft was founded by Bill Gates and Paul Allen."}'
```

The same in Python:

```python
import os, requests

def link(text, language="en"):
    r = requests.post(
        f"https://api.wordlift.io/accounts/{os.environ['WL_ACCOUNT_ID']}/resolve",
        headers={"Authorization": f"Key {os.environ['WL_KEY']}"},
        json={"text": text, "language": language},
        timeout=30,
    )
    r.raise_for_status()
    return r.json()["mentions"]

for m in link("Microsoft was founded by Bill Gates and Paul Allen."):
    if m["status"] == "resolved":
        print(m["text"], m["entity"]["id"], m["entity"]["label"])
    else:
        print(m["text"], "unresolved:", m.get("reason"))
```

## 3. Map the response

| Azure field | resolve() field | Note |
| --- | --- | --- |
| `results.documents[].entities[]` | `mentions[]` | resolve() returns one entry per mention, not per entity |
| `entities[].matches[].text` | `mentions[].text` | |
| `matches[].offset` | `mentions[].start` | Character position in `text`; when comparing, call Azure with `stringIndexType` `UnicodeCodePoint` |
| `matches[].offset + length` | `mentions[].end` | |
| `entities[].name` | `mentions[].entity.label` | |
| `entities[].id`, `entities[].url` (Wikipedia) | `mentions[].entity.id` (Wikidata QID) | No Wikipedia URL is returned; Wikidata and DBpedia links are in `entity.same_as` |
| `matches[].confidenceScore` | `mentions[].score` | Relevance, not a calibrated probability; compare only within the same `signals.path` |
| `entities[].dataSource` | `dataset_uri` | `wikidata://public` by default |
| `bingId` | none | |
| (no equivalent) | `status`, `reason` | `unresolved` with `no_candidates`, `no_suitable_candidate`, `type_conflict` or `low_relevance` |
| `parameters.modelVersion` | none | The engine is versioned on our side |

## 4. Convert the IDs you already stored

If your database holds Azure's Wikipedia URLs, convert them once with the
Wikidata API. One call takes up to 50 titles:

```python
import requests

def wikipedia_to_qid(titles, lang="en"):
    r = requests.get("https://www.wikidata.org/w/api.php", params={
        "action": "wbgetentities", "sites": f"{lang}wiki",
        "titles": "|".join(titles), "props": "sitelinks",
        "sitefilter": f"{lang}wiki", "redirects": "yes", "format": "json",
    }, headers={"User-Agent": "your-app/1.0 (you@example.com)"}, timeout=30)
    out = {}
    for qid, e in r.json().get("entities", {}).items():
        if qid.startswith("Q"):
            out[e["sitelinks"][f"{lang}wiki"]["title"]] = qid
    return out

print(wikipedia_to_qid(["Microsoft", "Bill Gates"]))  # {'Microsoft': 'Q2283', 'Bill Gates': 'Q5284'}
```

## 5. Decide what "unresolved" does in your code

Azure rarely says no. resolve() does, and the reason tells you what to do next:

| Reason | Meaning | Typical handling |
| --- | --- | --- |
| `no_candidates` | Nothing in the dataset has that name | Flag as possibly new; do not create a record automatically |
| `no_suitable_candidate` | Candidates exist, none fits the context | Send to review, or pass the type with the mention |
| `type_conflict` | The best candidate has the wrong type | Check the mention type you sent |
| `low_relevance` | The evidence is too weak | Leave unlinked |

If many of your entities are missing from Wikidata, resolve against your own
graph first: add `"dataset_uri": "wordlift://dataset/me,wikidata://public"`, or
send your own list with `"dataset_uri": "inline"` and `"dataset"` (up to 5,000
entities). See [Three worlds to resolve against](/apis-and-sdks/resolve/#three-worlds-to-resolve-against).

## 6. Run both side by side before you switch

Run a sample of your own texts through both services and compare the answers
mention by mention before you switch. Azure answers English and Spanish only.

The open comparison harness scores both services on the same gold mentions with
one rule, on our six development sets or on your own:

```bash
git clone https://github.com/wordlift/content-analysis && cd content-analysis && make setup
export WL_KEY=... AZURE_LANGUAGE_ENDPOINT=... AZURE_LANGUAGE_KEY=...
.venv/bin/python tools/compare.py --datasets datasets --systems resolve,azure --out results
```

## Errors

Every error is an RFC 9457 Problem Details document with a stable code; the
codes and what to do about each are on [Resolve API errors](/apis-and-sdks/resolve/errors/).

## Related

- [Resolve API guide](/apis-and-sdks/resolve/)
- [Resolve API errors](/apis-and-sdks/resolve/errors/)
- [Live demos, no sign-up](https://wordlift.io/resolve/demos/)
