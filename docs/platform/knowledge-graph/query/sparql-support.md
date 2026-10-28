---
title: SPARQL support
description: "Which SPARQL 1.1 features the WordLift SPARQL endpoint supports, its W3C conformance, and its limits."
last_updated: 2026-10-28
keywords:
  - SPARQL
  - SPARQL 1.1
  - W3C conformance
  - limits
---

# SPARQL support

What the [SPARQL endpoint](./sparql.md) supports, how closely it follows the W3C SPARQL 1.1 standard, and where it differs.

## Supported

| | |
|---|---|
| Query forms | `SELECT`, `ASK`, `CONSTRUCT`, `DESCRIBE` |
| Query features | all of SPARQL 1.1 query except [what is listed below](#not-supported): `OPTIONAL`, `UNION`, `MINUS`, `FILTER [NOT] EXISTS`, property paths, aggregates with `GROUP BY` and `HAVING`, sub-queries, `BIND`, `VALUES`, and the built-in functions |
| Protocol | SPARQL 1.1 Protocol query operation: `GET`, and `POST` with a form or a query body |
| Results | SPARQL 1.1 JSON, XML, CSV and TSV results; RDF in Turtle, JSON-LD, N-Triples, RDF/XML and other formats |

## Not supported

| Feature | What happens |
|---|---|
| SPARQL Update | refused with `422` |
| Federated queries (`SERVICE`) | refused with `422` |
| Named graphs (`GRAPH`, `FROM`, `FROM NAMED`) | accepted, but match nothing: the data is in the default graph |
| More than 1,000 rows or statements | the answer stops at 1,000, without notice |

## W3C conformance

The endpoint is tested against the [W3C SPARQL 1.1 test suite](https://github.com/w3c/rdf-tests/tree/main/sparql/sparql11) on every build. Of the 232 read-only tests in the query and results suites:

| | Tests |
|---|---|
| Not run, because they need named graphs | 16 |
| Run | 216 |
| **Passed** | **215 (99.5%)** |
| Passed, out of all 232 | 92.7% |

The one test that fails is `BNODE(str)`. `BNODE("x")` should create a new blank node in each solution, but the endpoint returns the same blank node in all of them.

## Limits

| Limit | Value |
|---|---|
| Query length | 20,000 characters (2,000 with `GET`) |
| Rows or statements per answer | 1,000 |
| Time per query | 10 seconds |

A query that would read too much of the graph is refused with `422`. Name a type or an IRI in the query to keep it small.
