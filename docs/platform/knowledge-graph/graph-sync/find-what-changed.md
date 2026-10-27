---
title: Find what changed with GraphSync
description: Query the WordLift GraphQL endpoint for the entities and URLs that GraphSync updated since a given date.
keywords:
  - GraphSync
  - changed entities
  - dateImported
  - GraphQL
  - incremental updates
---

# Find what changed with GraphSync

Each [GraphSync](./index.md) run compares every page with what is already in the Knowledge Graph and writes only the pages whose data changed. You can ask the GraphQL endpoint which entities changed since a date, for example to re-index those URLs, refresh caches, or review the changes.

## How GraphSync records changes

GraphSync keeps two properties on the entities that represent each page:

- `seovoc:importHash`: a fingerprint of the data GraphSync produced for the page. When a run produces the same fingerprint, the page is not written again.
- `seovoc:dateImported`: when GraphSync last wrote the page, as an `xsd:dateTime` in UTC. It changes only when the data changes, so it tells you when the page's data last changed.

Both properties use the private `seovoc:` namespace. Send the `X-include-Private: true` header to read or filter on them; without it the fields return `null` and the filter matches nothing.

## Query the changes

Filter `entities` with `dateImportedConstraint`:

```graphql
query UpdatedSince($since: String!, $page: Int!, $rows: Int!) {
  entities(
    page: $page
    rows: $rows
    query: { dateImportedConstraint: { gte: $since } }
  ) {
    iri
    url: string(name: "schema:url")
    types: refs(name: "rdf:type")
    date_imported: dateTime(name: "seovoc:dateImported")
  }
}
```

With these variables:

```json
{ "since": "2026-10-26T00:00:00Z", "page": 0, "rows": 100 }
```

The query returns every changed entity with its `iri`. `url` is `null` for entities that have no URL of their own, such as the person behind an author profile page; that page is returned too, with its URL.

- Increase `page` until a page returns fewer than `rows` results.
- Each constraint takes one operator. For a time window, use `between` instead of combining `gte` and `lte`:

  ```graphql
  dateImportedConstraint: { between: { lower: "2026-10-26T00:00:00Z", upper: "2026-10-27T00:00:00Z" } }
  ```

## Call the endpoint with curl

Replace `$WORDLIFT_KEY` with your WordLift key:

```bash
curl -s https://api.wordlift.io/graphql \
  -H "Authorization: Key $WORDLIFT_KEY" \
  -H "Content-Type: application/json" \
  -H "X-include-Private: true" \
  -d '{
    "query": "query UpdatedSince($since: String!, $page: Int!, $rows: Int!) { entities(page: $page, rows: $rows, query: { dateImportedConstraint: { gte: $since } }) { iri url: string(name: \"schema:url\") types: refs(name: \"rdf:type\") date_imported: dateTime(name: \"seovoc:dateImported\") } }",
    "variables": { "since": "2026-10-26T00:00:00Z", "page": 0, "rows": 100 }
  }'
```

The response lists the changed entities:

```json
{
  "data": {
    "entities": [
      {
        "iri": "https://data.example.com/example/collection-pages/press-room",
        "url": "https://www.example.com/about/press",
        "types": ["http://schema.org/CollectionPage"],
        "date_imported": "2026-10-27T08:49:08Z"
      },
      {
        "iri": "https://data.example.com/example/persons/jane-doe",
        "url": null,
        "types": ["http://schema.org/Person"],
        "date_imported": "2026-10-27T08:55:58Z"
      }
    ]
  }
}
```

## Limits

- Dates start with the first GraphSync run on wordlift-sdk 8.6.0 or later. A page that has not changed since then has no `seovoc:dateImported` yet.
- The date belongs to the page's own data. When only an entity that a page links to changes, such as the organization or an author, the page keeps its date and is not returned.
- Graphs populated with the [Web Page Import](../../data-sources/web-page-import.md) API also carry `seovoc:dateImported`, set at each import, so they can appear in the results.

For the full GraphQL reference, see the [GraphQL API](/apis-and-sdks/api-reference/graphql/graphql-support/).
