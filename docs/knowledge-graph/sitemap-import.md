---
sidebar_position: 20
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Sitemap Import API

It is possible to jumpstart a Knowledge Graph by importing the URLs from a simple sitemap.xml file (i.e. a sitemap with a list of URLs; sitemap.xml with references to other sitemap files isn't yet supported). It is also possible to specify a list of URLs.

## Import

You can import web pages by providing a `sitemap.xml`` file or a list of URLs.

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

The response is of type [NDJSON](https://ndjson.org/). Each line is a valid JSON with the details about the imported web page.

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

The response is of type [NDJSON](https://ndjson.org/). Each line is a valid JSON with the details about the imported web page.

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
