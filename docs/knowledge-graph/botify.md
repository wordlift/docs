---
sidebar_position: 40
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Botify Crawl Imports

Use the Botify Crawl Imports endpoint (`https://api.wordlift.io/botify-crawl-imports`) to populate a Knowledge Graph with data from Botify.

The import will create Web Pages extracting basic data:

* Headline
* Abstract
* Text
* Url

:::tip

Optionally, the Botify Crawl Import can create embeddings to support Vector Search. If you're interested into this feature, inquire at hello@wordlift.io.

:::

See the [reference](/api/manager/create-botify-crawl-import/) for this API.

## Requirements

Prepare the following data:

* Botify Username
* Botify Project
* Botify Token
* WordLift Key

The Botify data can be found at [botify.com](https://app.botify.com), the folder structure provides the username and the project, e.g. if the project is located at https://app.botify.com/my-user-name/my-project-name/, it means that the Botify Username is _my-user-name_ and that the Botify Project is _my-project-name_. The Botify Token is located in the User Profile screen.

The WordLift Key can be found at [my.wordlift.io](https://my.wordlift.io). If you're unsure how to access the Dashboard, contact us at hello@wordlift.io.

:::info
At the moment is is not possible to configure the Botify parameters from my.wordlift.io, you'll need to contact us at hello@wordlift.io in order for us to perform the configuration.
:::

## How to call the API

Create a POST request to https://api.wordlift.io/botify-crawl-imports. The `Authorization` header is required with the value of `Key __YOUR_WORDLIFT_KEY__`. This is an example request body:

```json
{
  "collection": "crawl.20240127",
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

With this request we tell the API to:

1. Use the Botify collection called `crawl.20240127`.
1. Filter the data by the field `crawl.20240127.extract.plp_header_description_extracted_text_part_1`. The Botify filters can be used here.
1. We ask the API to generate embeddings by using the resulting `headline` and `text` properties from the schema.org namespace.
1. We tell the API to generate the `text` property by joining the data present in the `{collection}.extract.plp_header_description_extracted_text_part_...` Botify property.

:::tip
`{collection}` is a placeholder, it is replaced with the value set in `collection`.
:::

This is the complete example CURL:

```shell
## Request
curl -X "POST" "https://api.wordlift.io/botify-crawl-imports" \
     -H 'Authorization: Key __YOUR_WORDLIFT_KEY__' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "collection": "crawl.20240127",
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

The API will respond with streaming data of content-type [NDJSON](https://github.com/ndjson/ndjson-spec) (`application/x-ndjson`), basically a valid JSON per line:

```json
{"headline":"The headline","text":"The text","image":null,"url":"https://example.org/the-url","date_published":null,"abstract":"The abstract."}
{...}
{...}
{...}
```

:::info
Embeddings are generated asynchronously from a queue, so they may not be immediately available for Vector Search. Depending on the queue size it may take up to an hour for the embeddings to be generated.
:::

## How does the API work

The API will use the provided request to call the Botify endpoint. Although not necessary, it may be helpful to familiarize with [Botify API](https://developers.botify.com/docs/welcome-to-botifys-api-documentation).

It is possible to restrict the data requested from Botify by using the `filters`, which map to Botify's own filters.

The API maps the source data in Botify to semantic data in Knowledge Graph, based on the schema.org vocabulary.

Following are the default mappings:

* `{collection}.metadata.title.content` is mapped to schema.org/headline.
* `{collection}.metadata.description.content` is mapped to schema.org/description.
* `url` is mapped to schema.org/url.

It is possible to customize the default and additional map Botify properties to schema.org/text, to customize:

* schema.org/headline, use the request `headline` property, only one value is accepted.
* schema.org/description, use the request `description` property. An array is provided, the values from the specified properties are joined together.
* schema.org/text, use the request `text` property. As for `description`, an array is provided, the values from the specified properties are joined together.

Moreover by default the generated entity in KG is assigned the `WebPage` type. It is possibile to customize the type by passing it in `types`. An array is provided, all the specified types will be assigned.

The API reads the data from Botify, converts it to semantic data and writes it data to the KG while returning it to the client in a streaming fashion (NDJSON).