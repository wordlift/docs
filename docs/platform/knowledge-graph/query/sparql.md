---
title: SPARQL guide
description: "Query your Knowledge Graph with SPARQL 1.1: endpoint, authentication, result formats, limits and errors."
last_updated: 2026-10-28
keywords:
  - SPARQL
  - SPARQL endpoint
  - Knowledge Graph
  - RDF
---

# SPARQL guide

The SPARQL endpoint answers [SPARQL 1.1](https://www.w3.org/TR/sparql11-query/) read queries over your [Knowledge Graph](/platform/knowledge-graph/). What it supports, and how closely it follows the standard, is on the [SPARQL support](./sparql-support.md) page. To compare it with GraphQL, see [Query the Knowledge Graph](./index.md).

## Endpoint

```text
GET  https://api.wordlift.io/accounts/{accountId}/sparql?query=…
POST https://api.wordlift.io/accounts/{accountId}/sparql
```

Authenticate with `Authorization: Key <your key>` or `X-API-Key: <your key>`. `{accountId}` must be the account of that key: the `accountId` that `GET https://api.wordlift.io/accounts/me` returns.

```bash
WL_ACCOUNT_ID=$(curl -s https://api.wordlift.io/accounts/me \
  -H "Authorization: Key $WORDLIFT_KEY" | jq -r .accountId)
```

## First query

Count the entities of each type:

```bash
curl -s "https://api.wordlift.io/accounts/$WL_ACCOUNT_ID/sparql" \
  -H "Authorization: Key $WORDLIFT_KEY" \
  -H "Content-Type: application/sparql-query" \
  -H "Accept: application/sparql-results+json" \
  --data-binary @- <<'EOF'
SELECT ?type (COUNT(?entity) AS ?entities) WHERE { ?entity a ?type }
GROUP BY ?type
ORDER BY DESC(?entities)
LIMIT 10
EOF
```

## Send a query

| Request | Query |
|---|---|
| `POST` with `Content-Type: application/sparql-query` | in the body |
| `POST` with `Content-Type: application/x-www-form-urlencoded` | in the `query` form field |
| `GET` | in the `query` URL parameter, up to 2,000 characters |

A query can be up to 20,000 characters. Use `POST` for anything but short queries. Answers are not cached.

## Choose a result format

Ask for a format with the `Accept` header. Without one, you get the default.

| Query | Default | Also available |
|---|---|---|
| `SELECT` | `application/sparql-results+json` | `application/sparql-results+xml`, `text/csv`, `text/tab-separated-values` |
| `ASK` | `application/sparql-results+json` | `application/sparql-results+xml` |
| `CONSTRUCT`, `DESCRIBE` | `text/turtle` | `application/ld+json`, `application/n-triples`, `application/rdf+xml` and other RDF formats |

## Write queries that work well

- **Use full IRIs.** Entities have absolute IRIs. Declare a `BASE` or a `PREFIX` for your dataset's namespace to keep queries short:

  ```sparql
  BASE <https://data.example.org/kg/>
  PREFIX schema: <http://schema.org/>
  SELECT ?property ?value WHERE { <acme> ?property ?value }
  ```

- **Page long answers.** An answer has at most 1,000 rows (or statements, for `CONSTRUCT` and `DESCRIBE`), and anything past that is dropped without notice. To read more, sort on enough variables to give a total order and page with `LIMIT` and `OFFSET`:

  ```sparql
  PREFIX schema: <http://schema.org/>
  SELECT ?product ?name WHERE { ?product a schema:Product ; schema:name ?name }
  ORDER BY ?product ?name
  LIMIT 500 OFFSET 1000
  ```

- **Start from a type or an IRI.** A query that names its subject, or its `rdf:type`, reads only those entities. A pattern like `?s ?p ?o` without a type reads the whole graph, and on a large graph can be refused for reading too much.
- **Do not use named graphs.** Your data is in the default graph, so `GRAPH`, `FROM` and `FROM NAMED` match nothing.

## Private data

The SPARQL endpoint never returns private data. Private entities and private properties, such as the GraphSync bookkeeping properties in the `seovoc:` namespace, are not in the graph that SPARQL sees. Use [GraphQL](./graphql.md#private-data) to read them.

## Errors

| Status | Meaning |
|---|---|
| `400` | The query is missing, does not parse, cannot be evaluated, or ran longer than 10 seconds. |
| `401`, `403` | The key is missing or not valid, or `{accountId}` is not the key's account. |
| `404` | The account has no Knowledge Graph. |
| `405` | The method is not `GET` or `POST`. |
| `406` | The `Accept` header asks for a format the query cannot be returned in. |
| `413` | The query is too long. |
| `422` | The query is a SPARQL Update or uses `SERVICE`, or would read more of the graph than the endpoint allows. |

Errors from the query have a JSON body with the kind of error and a message:

```json
{ "error": "UNSUPPORTED", "message": "SPARQL Update is not supported" }
```
