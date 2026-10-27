---
title: "Query your Knowledge Graph with GraphQL"
description: "Send GraphQL queries to your WordLift Knowledge Graph to fetch entities, products and articles field by field, and page through large graphs."
sidebar_label: "GraphQL API"
last_updated: 2026-10-27
---

# Query your Knowledge Graph with GraphQL

Use the GraphQL API to read specific fields from your Knowledge Graph, such as product names, prices and URLs, and fetch them page by page in your own application. GraphQL queries data that is already in the graph. To create, update or delete entities, or to export the whole dataset, use [KG-REST](/apis-and-sdks/kg-rest/).

## Prerequisites {#prerequisites}

- **A WordLift key for the target graph.** Each key belongs to one Knowledge Graph. Find it on the home page of the [Dashboard](https://my.wordlift.io), or see [Authentication and API keys](/apis-and-sdks/#authentication).
- **A Business+ or Enterprise plan.** Both plans include access to the GraphQL endpoint. See [Get access](/apis-and-sdks/#get-access).
- **An HTTP client.** The examples use `curl`; any client that can send a JSON `POST` request works.

## Send your first query {#send-your-first-query}

Send a `POST` request to `https://api.wordlift.io/graphql` with your key in the `Authorization` header, prefixed with `Key`. The request body is JSON with a `query` string.

```bash
curl -X POST "https://api.wordlift.io/graphql" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "Authorization: Key $WL_KEY" \
  --data-raw '{"variables": {}, "query": "query { entities(page: 0, rows: 10) { id: iri headline: string(name: \"schema:headline\") description: string(name: \"schema:description\") url: string(name: \"schema:url\") } }"}'
```

The same query, formatted for reading:

```graphql
query {
  entities(page: 0, rows: 10) {
    id: iri
    headline: string(name: "schema:headline")
    description: string(name: "schema:description")
    url: string(name: "schema:url")
  }
}
```

A successful call returns `200` with a JSON object that holds the fields you selected, under the aliases you gave them (`id`, `headline`, `description` and `url` in this example).

:::warning[Review needed]
TODO [SME]: provide an anonymized sample response for this query so readers can see the exact response shape.
:::

## Select properties {#select-properties}

Select each property by its prefixed name, such as `schema:name` or `rdf:type`, with one of these selectors. Give each selection an alias (`names:`, `types:`) to name it in the response.

| Selector | Use it to | Example |
| --- | --- | --- |
| `iri` | Return the entity's IRI. | `id: iri` |
| `string(name:)` | Return a value of a property. | `name: string(name: "schema:name")` |
| `strings(name:)` | Return the values of a property as a list. | `names: strings(name: "schema:name")` |
| `refs(name:)` | Return the IRIs a property points to. | `types: refs(name: "rdf:type")` |
| `int(name:)` | Return an integer value. | `clicks: int(name: "seovoc:3MonthsClicks")` |
| `resource(name:) { ... }` | Follow a property to one related resource and select its fields. | `brand: resource(name: "schema:brand") { name: string(name: "schema:name") }` |
| `resources(name:) { ... }` | Follow a property to related resources and select their fields. | `offers: resources(name: "schema:offers") { price: strings(name: "schema:price") }` |
| `topN(name:, sort:, limit:) { ... }` | Return the top related resources, sorted by a field. | See the example below. |

Property names use prefixes. The examples in these docs use `schema:` (schema.org), `rdf:type`, `dct:references`, `seovoc:` (for example `seovoc:seoKeywords`) and `wordpress:content`. Your graph can also use its own ontology prefixes.

This query nests resources and uses `topN` to return the three keywords with the most impressions for each entity:

```graphql
query {
  entities(page: 0, rows: 1000) {
    id: iri
    headline: string(name: "schema:headline")
    types: refs(name: "rdf:type")
    url: string(name: "schema:url")
    seoKeywords: strings(name: "seovoc:seoKeywords")
    topThreeMonthsKeywords: topN(
      name: "seovoc:seoKeywords"
      sort: { field: "seovoc:3MonthsImpressions", direction: DESC }
      limit: 3
    ) {
      name: string(name: "seovoc:name")
      impressions: int(name: "seovoc:3MonthsImpressions")
      clicks: int(name: "seovoc:3MonthsClicks")
    }
  }
}
```

To add search analytics data such as keywords and impressions to your graph, see [Analytics API](/apis-and-sdks/analytics-api/).

## Query by type and filter {#query-by-type-and-filter}

Start a query from the root field that matches the data you want:

| Root field | Returns |
| --- | --- |
| `entities` | Entities in the graph |
| `products` | Products |
| `articles` | Articles |
| `faqPages` | FAQ pages |

This query returns products with their brand and price:

```graphql
query {
  products(page: 0, rows: 100) {
    id: iri
    url: strings(name: "schema:url")
    gtin: strings(name: "schema:gtin")
    names: strings(name: "schema:name")
    brand: resource(name: "schema:brand") {
      name: string(name: "schema:name")
    }
    offers: resource(name: "schema:offers") {
      price: string(name: "schema:price")
    }
  }
}
```

To narrow the products to a list of names, pass a `query` argument with `nameConstraint`:

```graphql
query {
  products(
    query: { nameConstraint: { in: ["PRODUCT_NAME_1", "PRODUCT_NAME_2"] } }
    page: 0
    rows: 100
  ) {
    id: iri
    name: string(name: "schema:name")
    type: string(name: "rdf:type")
  }
}
```

:::warning[Review needed]
TODO [SME]: list every root field and filter input available to customers, and say whether schema introspection is enabled.
:::

## Paginate large graphs {#paginate-large-graphs}

On large graphs, a query without pagination can take a long time and time out. Use `page` and `rows` to fetch the data in pages:

- `page` is the page number, starting at `0`.
- `rows` is the number of results per page.

Request the next page by increasing `page` and keeping `rows` the same.

```graphql
query {
  products(page: 1, rows: 100) {
    id: iri
    name: string(name: "schema:name")
  }
}
```

:::warning[Review needed]
TODO [SME]: confirm the maximum `rows` per page, the query timeout and any rate limit for the GraphQL API.
:::

## Troubleshooting {#troubleshooting}

| Symptom | Cause and fix |
| --- | --- |
| `401` Unauthorized | The request has no key. Add the `Authorization` header. |
| `403` Forbidden | The key is invalid or lacks the `Key` prefix. Send `Authorization: Key <your-wordlift-key>` and check that the key belongs to the graph you are querying. |
| The request times out | The query returns too much data. Add `page` and `rows`, or lower `rows`. |
| Fields come back empty | Your graph stores the data under other properties. Open an entity's IRI to see how its data is organized, then change the property names in your query. |

## Related {#related}

- [GraphQL API reference](/apis-and-sdks/api-reference/graphql/graphql-support/), generated from the OpenAPI specification
- [WordLift Reader](/apis-and-sdks/llm-connectors/wordlift-reader/), which loads GraphQL results into LlamaIndex
- [Zapier](/integrations/zapier/) and [Power Automate](/integrations/power-automate/), which run GraphQL queries in automations
- [GraphQL presets in the Content Generation API](/platform/agent-wordlift/content-generation/api-guide/#graphql-presets), sample queries for common scenarios
- [worai CLI](/tools/worai-cli/install/), where commands such as `dedupe` query `https://api.wordlift.io/graphql` by default
- [KG-REST](/apis-and-sdks/kg-rest/), for writes and full dataset export
