---
title: Query the Knowledge Graph
description: "Read your Knowledge Graph with GraphQL or SPARQL, and choose the right one for the job."
last_updated: 2026-10-28
keywords:
  - GraphQL
  - SPARQL
  - Knowledge Graph
  - query
---

# Query the Knowledge Graph

You can read your [Knowledge Graph](/platform/knowledge-graph/) in two query languages. Both answer from the same data, with your WordLift key, and both are read-only: to change the graph, use [GraphSync](/platform/knowledge-graph/graph-sync/) or [KG-REST](/apis-and-sdks/kg-rest/).

| | GraphQL | SPARQL |
|---|---|---|
| Endpoint | `POST https://api.wordlift.io/graphql` | `GET` / `POST https://api.wordlift.io/accounts/{accountId}/sparql` |
| Authentication | `Authorization: Key <your key>` | `Authorization: Key <your key>` |
| Answer | JSON, shaped like the query | SPARQL results (JSON, XML, CSV, TSV) or RDF (Turtle, JSON-LD, …) |
| Private data | with `X-Include-Private: true` | never included |
| Rows per answer | as many as you ask for | at most 1,000 |
| Guide | [GraphQL guide](./graphql.md) | [SPARQL guide](./sparql.md), [SPARQL support](./sparql-support.md) |

## Which one to use

**Use GraphQL** to read entities the way a website, an app or an agent does: a page of articles, a product with its offers, the pages that changed since yesterday. Queries are short and the answer is ready to use. You can ask only for what the schema has fields and filters for.

**Use SPARQL** for questions the schema does not cover: any join, a property path, `GROUP BY`, a count per type, or a graph to export with `CONSTRUCT`. It follows the W3C standard, so existing tools and libraries work with it. Each answer must stay within the endpoint's limits.

## The same question in both languages

**A page of articles:**

```graphql
{
  articles(page: 0, rows: 10) {
    iri
    headline: string(name: "schema:headline")
  }
}
```

```sparql
PREFIX schema: <http://schema.org/>
SELECT ?article ?headline WHERE {
  ?article a schema:Article
  OPTIONAL { ?article schema:headline ?headline }
}
ORDER BY ?article
LIMIT 10 OFFSET 0
```

**An entity's name in English:**

```graphql
{
  resource(iri: "https://data.example.org/kg/acme") {
    name: text(name: "schema:name", lang: "en") { value lang }
  }
}
```

```sparql
PREFIX schema: <http://schema.org/>
SELECT ?name WHERE {
  <https://data.example.org/kg/acme> schema:name ?name
  FILTER langMatches(lang(?name), "en")
}
```

`text` returns one value. Use `texts` to get all of them, as SPARQL does.

**Entities whose name contains a word:**

```graphql
{
  entities(query: { nameConstraint: { regex: { pattern: "graph", i: true } } }, rows: 10) {
    iri
  }
}
```

```sparql
PREFIX schema: <http://schema.org/>
SELECT ?entity WHERE {
  ?entity schema:name ?name
  FILTER regex(?name, "graph", "i")
}
ORDER BY ?entity
LIMIT 10
```

## What both have in common

- **Your dataset only.** The key selects the Knowledge Graph. You cannot read another account's data.
- **Full IRIs.** Both take and return entity IRIs in full, such as `https://data.example.org/kg/acme`.
- **Private data stays out** unless you ask for it with GraphQL. Without it, private entities and private properties are left out of every answer, and a filter or sort on a private property matches nothing.
