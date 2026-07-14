---
sidebar_position: 20
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Sitemap Import API

:::note Review the population options first

Before using the Sitemap Import API, review [Create a Knowledge Graph](./create-a-knowledge-graph.md) to decide whether this limited page import or GraphSync is appropriate for your graph.

:::

Use the Sitemap Import API for a small, simple import of page-oriented entities from a `sitemap.xml` file or an explicit URL list. Each URL produces one page-oriented entity, which defaults to the `WebPage` type. The API does not provide the custom multi-entity mappings or recurring, source-specific synchronization available with GraphSync.

The sitemap must contain a list of URLs. Sitemap indexes that reference other sitemap files are not supported.

:::warning Maximum 50 pages per request

The Sitemap Import API is synchronous and must fetch, process, and write every page within five minutes. Limit each request to a maximum of 50 web pages:

- An explicit `urls` list must contain no more than 50 URLs.
- A `sitemap_url`, after applying any `sitemap_url_regex` filter, must resolve to no more than 50 URLs.

For more than 50 pages, use [GraphSync](./graphsync.md) instead of splitting a larger graph bootstrap across Sitemap Import requests.

:::

## Import

You can import web pages by providing a `sitemap.xml` file or a list of URLs.

### Import URLs from a sitemap.xml file

Call the Sitemap import API by specifying the `sitemap.xml` URL in the `sitemap_url` property:

```sh
curl -X "POST" "https://api.wordlift.io/sitemap-imports" \
     -H 'Authorization: Key <key>' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "sitemap_url": "https://example.org/sitemap.xml"
}'
```

The response is of type [NDJSON](https://en.wikipedia.org/wiki/JSON_streaming#Newline-delimited_JSON). Each line is a valid JSON with the details about the imported web page.

### Import URLs by providing them to the request

Call the Sitemap import API by specifying a list of URLs `urls` property:

```sh
curl -X "POST" "https://api.wordlift.io/sitemap-imports" \
     -H 'Authorization: Key <key>' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "urls": [ 
    "https://example.org/file1.html",
    "https://example.org/file2.html",
    "https://example.org/file3.html"
  ]
}'
```

The response is of type [NDJSON](https://en.wikipedia.org/wiki/JSON_streaming#Newline-delimited_JSON). Each line is a valid JSON with the details about the imported web page.

## Import Analytics data

To import Analytics data see the [Analytics API](./analytics-api.md)

## Query the data

Query the imported data by using the GraphQL endpoint. This is an example GraphQL query:

```graphql
query {
  entities(
    page: 0
    rows: 1000
  ) {
    id: iri
    headline: string(name: "schema:headline")
    text: string(name: "schema:text")
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
    source: strings(name: "seovoc:source")
  }
}
```
