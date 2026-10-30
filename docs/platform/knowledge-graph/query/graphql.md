---
title: GraphQL guide
description: "Read entities from your Knowledge Graph with GraphQL: requests, properties, filters, paging, vector search and private data."
last_updated: 2026-10-28
keywords:
  - GraphQL
  - Knowledge Graph
  - filters
  - pagination
  - vector search
---

# GraphQL guide

The GraphQL endpoint reads the entities of your [Knowledge Graph](/platform/knowledge-graph/) as JSON shaped like the query. It is read-only. To compare it with SPARQL, see [Query the Knowledge Graph](./index.md). The request and response schema is in the [API reference](/apis-and-sdks/api-reference/graphql/graphql-support/).

## First query

Replace `$WORDLIFT_KEY` with your WordLift key:

```bash
curl -s https://api.wordlift.io/graphql \
  -H "Authorization: Key $WORDLIFT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ entities(rows: 3) { iri name: string(name: \"schema:name\") } }"}'
```

```json
{
  "data": {
    "entities": [
      { "iri": "https://data.example.org/kg/acme", "name": "Acme" },
      { "iri": "https://data.example.org/kg/beta", "name": "Beta" },
      { "iri": "https://data.example.org/kg/gamma", "name": "Gamma" }
    ]
  }
}
```

## Requests

- Send `POST` with a JSON body: `query`, and optionally `variables` and `operationName`.
- Send one operation per request. Batched arrays of operations are not supported.
- Authenticate with `Authorization: Key <your key>` or `X-API-Key: <your key>`. The key selects your Knowledge Graph.
- Add `X-Include-Private: true` to read [private data](#private-data).

The endpoint supports introspection, so GraphQL clients and code generators can read its schema.

## Entry points

Each entry point returns entities. The most common are:

| Entry point | Returns |
|---|---|
| `resource(iri: "…")` | one entity, by IRI |
| `entities(query, page, rows)` | any entities, with filters on type, URL, name and other properties |
| `entity(url: "…")` | the entities with this `schema:url` |
| `articles`, `products`, `webpages`, `events`, `organizations`, `persons`, `faqPages`, … | entities of one type, with filters for that type |
| `entitySearch(query, page, rows, orderBy)` | entities that match filters or a [vector search](#vector-search), with sorting |

Introspect the endpoint to see every entry point and which filters each accepts.

## Read properties

Entities read any property by name. Choose the field for the kind of value:

| Field | Returns |
|---|---|
| `string(name)`, `strings(name)` | literals as strings |
| `int`, `float`, `bool`, `date`, `dateTime`, `time`, and their plurals | literals as that type |
| `text(name, lang, langs)`, `texts(…)` | `{ value lang }`, optionally only in some languages |
| `ref(name)`, `refs(name)` | the IRIs a property points to |
| `resource(name)`, `resources(name)` | the entities a property points to, to read their properties in turn |
| `topN(name, limit, sort)` | the first entities a property points to, sorted on one of their properties |
| `aggregateInt`, `aggregateFloat(name, operation, aggregationField)` | the `SUM` or `AVG` of a property of the entities a property points to |

The singular field returns the first value; the plural returns all of them. Name properties with a prefix, such as `schema:name` or `rdf:type`.

```graphql
{
  product(iri: "https://data.example.org/kg/acme-anvil") {
    name: string(name: "schema:name")
    description: text(name: "schema:description", lang: "en") { value }
    brand: resource(name: "schema:brand") { name: string(name: "schema:name") }
    averagePrice: aggregateFloat(name: "schema:offers", operation: AVG, aggregationField: "schema:price")
  }
}
```

Use aliases (`name:`, `brand:`) to give each field a name in the answer.

## Filter

A list entry point's `query` argument holds its filters, and an entity must match all of them. Most filters are named `<property>Constraint` and take one operator:

| Operator | Matches values that |
|---|---|
| `eq: "x"` | equal `x` |
| `in: […]`, `notIn: […]` | are, or are not, in the list |
| `regex: { pattern, i }` | match a regular expression; `i: true` ignores case |
| `gt`, `gte`, `lt`, `lte` | are greater or smaller |
| `between: { lower, upper }` | are within a range |
| `exists: { exists: true }` | are present (or absent, with `false`) |

`contains` is an older name for `eq`. It matches a whole value, not part of one: use `regex` for that.

```graphql
{
  entities(
    query: {
      typeConstraint: { in: ["http://schema.org/Article", "http://schema.org/WebPage"] }
      headlineConstraint: { regex: { pattern: "knowledge graph", i: true } }
    }
    rows: 20
  ) {
    iri
    headline: string(name: "schema:headline")
  }
}
```

Each constraint takes one operator. For a range, use `between` instead of combining `gte` and `lte`. [Find what changed with GraphSync](../graph-sync/find-what-changed.md) shows a date filter.

## Page through results

- `page` counts from 0, and `rows` is the page size. With only `page`, a page has 10 entities.
- Paged results come in a stable order, by IRI (after the `orderBy` sort, where an entry point has one). Read pages until one has fewer than `rows` entities, and you get every match exactly once.
- Without `page` and `rows`, results come in no particular order. Page any list that can be long.

## Vector search

`entitySearch` ranks entities by meaning, not by exact words:

```graphql
{
  entitySearch(query: { search: { string: "customer service" } }, rows: 5) {
    iri
    score: float(name: "_:score")
    name: string(name: "schema:name")
  }
}
```

- Results come best first. The only sort allowed is by score (`orderBy: [score_DESC]`).
- Read the similarity score with `float(name: "_:score")`.
- Other filters in `query` still apply, for example `typeConstraint`.

## Private data

Some properties and entities in your Knowledge Graph can be private, such as the GraphSync bookkeeping properties in the `seovoc:` namespace. Without `X-Include-Private: true`:

- private entities are left out of every answer;
- a field that reads a private property returns `null`, or `[]` for a list;
- a filter or sort on a private property matches nothing.

Send the header when your application needs those values, and only from a server: do not expose it, or your key, in a browser.

## Errors

- A GraphQL error, such as a syntax error, an unknown field or an invalid regular expression, returns HTTP `200` with an `errors` array. Check `errors` as well as the status code.
- A field that fails returns `null` with an error for its path. The rest of the answer is kept.
- `401` and `403` mean the key is missing or not valid.
