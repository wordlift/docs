---
title: "Botify Crawl Imports"
description: "Populate a Knowledge Graph with web page entities from an existing Botify crawl, with custom field mappings, filters and optional embeddings."
sidebar_position: 40
last_updated: 2026-10-27
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Botify Crawl Imports

:::note Review the population options first

Before using the Botify integration, review [Create a Knowledge Graph](../knowledge-graph/create.md) to confirm that this specialized connector is the right population method for your source and use case.

:::

Use the Botify Crawl Imports endpoint (`https://api.wordlift.io/botify-crawl-imports`) to populate a Knowledge Graph with data from Botify. This is a specialized path for customers whose source is an existing Botify crawl.

The import creates web pages with this basic data:

- Headline
- Abstract
- Text
- URL

:::tip

Optionally, the Botify Crawl Import can create embeddings to support Vector Search. If you're interested in this feature, contact [support@wordlift.io](mailto:support@wordlift.io).

:::

See the [reference](/apis-and-sdks/api-reference/manager/create-botify-crawl-import/) for this API.

## Requirements

Prepare the following data:

- Botify Username
- Botify Project
- Botify Token
- WordLift Key

You can find the Botify data at [botify.com](https://app.botify.com). The folder structure provides the username and the project. For example, if the project is located at https://app.botify.com/my-user-name/my-project-name/, the Botify Username is _my-user-name_ and the Botify Project is _my-project-name_. The Botify Token is in the User Profile screen.

You can find the WordLift Key at [my.wordlift.io](https://my.wordlift.io). If you're unsure how to access the Dashboard, contact [support@wordlift.io](mailto:support@wordlift.io).

:::info
You can't configure the Botify parameters from my.wordlift.io yet. Contact [support@wordlift.io](mailto:support@wordlift.io) and WordLift performs the configuration for you.
:::

## How to call the API

Send a POST request to https://api.wordlift.io/botify-crawl-imports. The `Authorization` header is required with the value of `Key __YOUR_WORDLIFT_KEY__`. This is an example request body:

```json
{
  "collection": "crawl.20240127",
  "types": ["CollectionPage"],
  "filters": [
    {
      "field": "crawl.20240127.extract.plp_header_description_extracted_text_part_1",
      "predicate": "re",
      "value": "^.+$"
    }
  ],
  "request_embeddings": [
    "http://schema.org/headline",
    "http://schema.org/text"
  ],
  "text": [
    "{collection}.extract.plp_header_description_extracted_text_part_1",
    "{collection}.extract.plp_header_description_extracted_text_part_2",
    "{collection}.extract.plp_header_description_extracted_text_part_3",
    "{collection}.extract.plp_header_description_extracted_text_part_4",
    "{collection}.extract.plp_header_description_extracted_text_part_5",
    "{collection}.extract.plp_header_description_extracted_text_part_6"
  ]
}
```

This request tells the API to:

1. Use the Botify collection called `crawl.20240127`.
1. Filter the data by the field `crawl.20240127.extract.plp_header_description_extracted_text_part_1`. The Botify filters can be used here.
1. Generate embeddings from the resulting `headline` and `text` properties in the schema.org namespace.
1. Generate the `text` property by joining the data in the `{collection}.extract.plp_header_description_extracted_text_part_...` Botify property.
1. Set the target `@type` to `CollectionPage` (the default is `WebPage`).

:::tip
`{collection}` is a placeholder. The API replaces it with the value set in `collection`.
:::

This is the complete example curl request:

```shell
## Request
curl -X "POST" "https://api.wordlift.io/botify-crawl-imports" \
     -H 'Authorization: Key __YOUR_WORDLIFT_KEY__' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "collection": "crawl.20240127",
  "types": ["CollectionPage"],
  "filters": [
    {
      "field": "crawl.20240127.extract.plp_header_description_extracted_text_part_1",
      "value": "^.+$",
      "predicate": "re"
    }
  ],
  "request_embeddings": [
    "http://schema.org/headline",
    "http://schema.org/text"
  ],
  "text": [
    "{collection}.extract.plp_header_description_extracted_text_part_1",
    "{collection}.extract.plp_header_description_extracted_text_part_2",
    "{collection}.extract.plp_header_description_extracted_text_part_3",
    "{collection}.extract.plp_header_description_extracted_text_part_4",
    "{collection}.extract.plp_header_description_extracted_text_part_5",
    "{collection}.extract.plp_header_description_extracted_text_part_6"
  ]
}'
```

The API responds with streaming data of content type [NDJSON](https://github.com/ndjson/ndjson-spec) (`application/x-ndjson`), one valid JSON object per line:

```json
{"headline":"The headline","text":"The text","image":null,"url":"https://example.org/the-url","date_published":null,"abstract":"The abstract."}
{...}
{...}
{...}
```

:::info
WordLift generates embeddings asynchronously from a queue, so they may not be immediately available for Vector Search. Depending on the queue size, generating the embeddings can take up to an hour.
:::

## How the API works {#how-does-the-api-work}

The API uses the provided request to call the Botify endpoint. It is not required, but it can help to be familiar with the [Botify API](https://developers.botify.com/docs/welcome-to-botifys-api-documentation).

You can restrict the data requested from Botify with `filters`, which map to Botify's own filters.

The API maps the source data in Botify to semantic data in the Knowledge Graph, based on the schema.org vocabulary.

These are the default mappings:

- `{collection}.metadata.title.content` is mapped to schema.org/headline.
- `{collection}.metadata.description.content` is mapped to schema.org/description.
- `url` is mapped to schema.org/url.

You can customize the default mappings and map additional Botify properties:

- schema.org/headline, use the request `headline` property, only one value is accepted.
- schema.org/description, use the request `description` property. An array is provided, the values from the specified properties are joined together.
- schema.org/text, use the request `text` property. As for `description`, an array is provided, the values from the specified properties are joined together.

By default, the generated entity in the Knowledge Graph has the `WebPage` type. To customize the type, pass it in `types`. `types` is an array, and the API assigns all the specified types.

The API reads the data from Botify, converts it to semantic data and writes it to the Knowledge Graph while streaming it back to the client as NDJSON.
