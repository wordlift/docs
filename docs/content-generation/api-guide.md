---
sidebar_position: 10
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# API Guide

## Introduction

The Content Generation API is based on Projects. Each Project contains the configuration that allows to:

1. Query and select data from the Knowledge Graph
1. Define a Prompt Template that is filled with the selected data
1. Configure the Model and its parameters

This webpage will provide a step-by-step guide on how to create, configure and run a Content Generation Project.

The API is organized according to the REST principles and in particular the [Zalando's Best Practices](https://opensource.zalando.com/restful-api-guidelines/).

## Authorization

:::info

Using the Content Generation API requires an OAuth2 Access Token.

:::

### Get an Access Token

An Access Token can be requested using User Credentials (username and password). This is a very simple method which only requires using the API Client ID (`W8sGqXvefG9XgnMXJYzk6nTiV6MWc3N8TyQJQJcO`). This method is useful when building client apps that don't have a direct interaction with the user.

This is an example CURL:

```sh
curl -X "POST" "https://s.wordlift.io/oauth/token/" \
     -H 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
     --data-urlencode "grant_type=password" \
     --data-urlencode "username=<your-user-name-or-email-address>" \
     --data-urlencode "password=<your-password>" \
     --data-urlencode "client_id=W8sGqXvefG9XgnMXJYzk6nTiV6MWc3N8TyQJQJcO"
```

The server will reply with an Access Token (which expires after one hour) and Refresh Token to request a new Access Token:

```json
{
  "access_token": "<access-token>",
  "expires_in": 3600,
  "token_type": "bearer",
  "scope": "basic",
  "refresh_token": "<refresh-token>"
}
```

### Refresh Access Token

An expired Access Token can't be used anymore. In this case it is possible to request a new Access Token using the Refresh Token at the previous step.

```sh
curl -X "POST" "https://s.wordlift.io/oauth/token/" \
     -H 'Content-Type: application/x-www-form-urlencoded; charset=utf-8' \
     --data-urlencode "grant_type=refresh_token" \
     --data-urlencode "refresh_token=<refresh-token>" \
     --data-urlencode "client_id=W8sGqXvefG9XgnMXJYzk6nTiV6MWc3N8TyQJQJcO"
```

The server will reply with an Access Token (which expires after one hour) and refresh token to request a new Access Token:

```json
{
  "access_token": "<access-token>",
  "expires_in": 3600,
  "token_type": "bearer",
  "scope": "basic",
  "refresh_token": "<refresh-token>"
}
```

:::caution

Please note that also the Refresh Token is updated.

:::

## Content Generation Projects

A the very core of the Content Generation API, there are Projects which define the configuration.

### Project Structure

A Content Generation Project contains the required configuration. Each Content Generation Project is assigned a unique ID. It is possible to retrieve the configuration for a Project by using the following request:

```sh
curl "https://api.wordlift.io/content-generation/content-generations/123" \
     -H 'Authorization: Bearer <access-token>'
```

This is an example response:

```json
{
  "id": 123,
  "name": "My Project 1",
  "penalty": 0.7,
  "temperature": 0.6,
  "stop": "###",
  "deleted": false,
  "model_id": 162,
  "max_tokens": 110,
  "created_at": "2023-12-15T16:22:19.095204Z",
  "modified_at": "2023-12-15T16:22:19.095204Z",
  "deleted_at": null,
  "min_words": 45,
  "graphql_query": "...a graphql query...",
  "prompt_template": "...a liquid template...",
  "account_id": 123,
  "words_to_ignore": [
    ...array of words to ignore...
  ]
}
```

Following is a brief explanation of the properties of a Content Generation Project:

| Property        | Description                                                                                    | Values     |
| --------------- | ---------------------------------------------------------------------------------------------- | ---------- |
| id              | The project ID                                                                                 |            |
| name            | The project name                                                                               |            |
| account_id      | The account id linking to a Knowledge Graph                                                    |            |
| graphql_query   | The GraphQL query to select the records from the Knowledge Graph                               |            |
| prompt_template | The Prompt Template using the Liquid language to create the prompts using the selected records |            |
| model_id        | The model id, use the list model endpoint to retrieve the list of models                       |            |
| penalty         | The model penalty                                                                              | 0.5-1.9    |
| temperature     | The model temperature                                                                          | 0.4-0.8    |
| stop            | The stop sequence                                                                              |            |
| max_tokens      | The maximum number of the completion's tokens                                                  | 0-2,000    |
| min_words       | The expected minimum amount of words for the completion                                        |            |
| words_to_ignore | An array of words to ignore                                                                    |            |
| created_at      | When the project was created                                                                   |            |
| modified_at     | When the project was last updated                                                              |            |
| deleted_at      | When the project was deleted (`null` if it's not deleted)                                      |            |
| deleted         | Whether the project is deleted                                                                 | true/false |


### Create a Project

To create a Project the following parameters are required:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'...json request payload...'
```

The JSON Request Payload looks like this:

```json
{
    "name": "A Project Label",
    "account_id": 123,
    "graphql_query": "...graphql query...",
    "stop": "###",
    "model_id": 123,
    "penalty": 0.5,
    "prompt_template": "...liquid template...",
    "temperature": 0.7,
    "max_tokens": 110,
    "min_words": 45,
    "deleted": false,
    "words_to_ignore": [ ...an array of words... ]
}
```

#### Knowledge Graph Account ID {#account-id}

The Account ID is used to connect to a Knowledge Graph. To retrive the list of Accounts use the List Accounts API:

```sh
curl 'https://api.wordlift.io/accounts?limit=2147483647&can_content_generation=true' \
    -H 'Accept: application/vnd.wordlift.accounts+json;version=1' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

:::note

The `content_generation` query parameter must be set to `true` in order to retrieve only Accounts that support Content Generation.

:::

This is an example response:

```json
{
  "self": "eyJwb3NpdGlvbiI6eyJpZCI6MH0sImNvbmRpdGlvbiI6IkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MjE0NzQ4MzY0NywiZmlsdGVycyI6W3sicGFyYW1ldGVyIjoicGFja2FnZV90eXBlIiwib3BlcmF0b3IiOiJJTiIsInZhbHVlIjpbImJ1c2luZXNzICsgZWNvbW1lcmNlIl19XX0=",
  "first": "eyJwb3NpdGlvbiI6eyJpZCI6MH0sImNvbmRpdGlvbiI6IkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MjE0NzQ4MzY0NywiZmlsdGVycyI6W3sicGFyYW1ldGVyIjoicGFja2FnZV90eXBlIiwib3BlcmF0b3IiOiJJTiIsInZhbHVlIjpbImJ1c2luZXNzICsgZWNvbW1lcmNlIl19XX0=",
  "prev": null,
  "next": null,
  "last": "eyJwb3NpdGlvbiI6eyJpZCI6OTIyMzM3MjAzNjg1NDc3NTgwN30sImNvbmRpdGlvbiI6IkxFU1NfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MjE0NzQ4MzY0NywiZmlsdGVycyI6W3sicGFyYW1ldGVyIjoicGFja2FnZV90eXBlIiwib3BlcmF0b3IiOiJJTiIsInZhbHVlIjpbImJ1c2luZXNzICsgZWNvbW1lcmNlIl19XX0=",
  "items": [
    {
      "id": 1,
      "key": "...wordlift-key...",
      "url": "https://example.org",
      "country": "us",
      "language": "en",
      "domain_uri": "https://data.example.org/example-dataset/",
      "ng_dataset_id": "abc123",
      "wp_admin": null,
      "wp_json": null,
      "wp_include_exclude_default": null,
      "subscription_id": 123,
      "user_id": 123,
      "package_type": "business + ecommerce",
      "diagnostic_plugins": []
    },
    ...
```

:::info

The `key` contains the WordLift Key that can be used with the [GraphQL API](#graphql-api).

:::


#### GraphQL Query {#graphql-api}

The GraphQL Query runs against the Knowledge Graph to query and select the data. This is an example GraphQL Query to retrieve the default Products' data:

```graphql
query {
   p: products(page:0,rows:10) {
     id: iri
     names: strings(name:"schema:name")
     types: refs(name:"rdf:type")
     urls: refs(name:"schema:url")
     material: strings(name:"schema:material")
     category: strings(name:"schema:category")
     color: strings(name:"schema:color")
     audience: resources(name:"schema:audience") {
       audienceType: strings(name:"schema:audienceType")
    }
     offers: resources(name:"schema:offers") {
       price: strings(name:"schema:price")
    }
   }
 }
 ```

It is possible to retrieve other GraphQL sample queryies by using the [GraphQL Query presets API](#graphql-presets).

```sh
curl 'https://api.wordlift.io/graphql' -X POST \
    -H 'Accept: application/json' \
    -H 'Authorization: Key <wordlift-key>' \
    -H 'Content-Type: application/json' \
     --data-raw '...graphql-query...'
```

:::tip

Before creating a Project it is advised to test the GraphQL query using the GraphQL Query endpoint.

:::

:::caution

The GraphQL query requires to use the WordLift Key associated with a Knowledge Graph (Account). The key can be found in the [Dashboard](https://my.wordlift.io) or by calling the [Accounts API](#account-id).

:::

#### Model

The `model_id` property requires a model ID. To retrieve the available models and their ID the following API is used:

```sh
curl 'https://api.wordlift.io/content-generation/models?limit=2147483647' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

This is an example response:

```json
{
  "self": "eyJwb3NpdGlvbiI6eyJpZCI6MH0sImNvbmRpdGlvbiI6IkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MTAsImZpbHRlcnMiOltdfQ==",
  "first": "eyJwb3NpdGlvbiI6eyJpZCI6MH0sImNvbmRpdGlvbiI6IkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MTAsImZpbHRlcnMiOltdfQ==",
  "prev": null,
  "next": "eyJwb3NpdGlvbiI6eyJpZCI6MzZ9LCJjb25kaXRpb24iOiJHUkVBVEVSX1RIQU4iLCJzb3J0IjoiK2lkIiwibGltaXQiOjEwLCJmaWx0ZXJzIjpbXX0=",
  "last": "eyJwb3NpdGlvbiI6eyJpZCI6OTIyMzM3MjAzNjg1NDc3NTgwN30sImNvbmRpdGlvbiI6IkxFU1NfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MTAsImZpbHRlcnMiOltdfQ==",
  "items": [
    {
      "id": 7,
      "name": "ada",
      "type": "openai"
    },
    {
      "id": 21,
      "name": "ada-code-search-code",
      "type": "openai"
    },
    {
      "id": 27,
      "name": "ada-code-search-text",
      "type": "openai"
    },
    {
      "id": 37,
      "name": "ada-search-document",
      "type": "openai"
    },
    ...
```

:::info

Almost all of the list API use cursor-based navigation.

:::

#### Prompt Template

The Prompt Template is used to dynamically create the Prompts by replacing placeholders with actual values from the selected records. Templates use the [Liquid template language](https://shopify.github.io/liquid/) which allows to build an extensive logic into the template.

In order to retrieve the list of available fields it is possible to use the [Fields API](#list-fields).

A template can be as simple as this:

```liquid
{{names.0}} is a {{types.0}}.
The material is {{material.0}} and it can be found in the {{category.0}}.
Its color is {{color.0}} and its targeted at {{audience.audienceType.0}}.
The price tag is {{offers.price.0}}.

More information can be found at {{urls.0}}.
```

Or as complex as this:

```liquid
{%- case genderType -%}
  {%- when 'MAN' or 'man' -%}
  {%- assign genderTypeFixed = 'men' -%}
  {%- when 'WOMAN' or 'woman' -%}
  {%- assign genderTypeFixed = 'women' -%}
  {%- when 'UNISEX' -%}
  {%- assign genderTypeFixed = 'unisex' -%}
{%- else -%}
  {%- assign genderTypeFixed = genderType | downcase -%}
{%- endcase -%}
{%- case macroAgeRange -%}
  {%- when 'Children' or 'children' -%}
  {%- assign genderTypeFixed = 'children' -%}
{%- endcase -%}
{%- case lensTreatment %}
  {% when lensTreatment.blank? %}
  {%- assign caseLensTreatment = false -%}
  {%- when 'classic' -%}
  {%- assign caseLensTreatment = false -%}
{%- else -%}
  {%- assign caseLensTreatment = lensTreatment | downcase -%}
{%- endcase -%}
{%- case isLensPolar %}
  {% when isLensPolar.blank? %}
  {%- assign caseIsLensPolar = false -%}
  {%- when 'False' -%}
  {%- assign caseIsLensPolar = false -%}
{%- else -%}
  {%- assign caseIsLensPolar = isLensPolar -%}
{%- endcase -%}
{%- case productGroup %}
  {%- when 'pptical' -%}
  {%- assign productGroupFixed = 'eyeglasses' -%}
  {%- assign lensColor = false -%}
  {%- assign caseLensTreatment = false -%}
  {%- assign isLensPolar = false -%}
  {%- when 'sun' -%}
  {%- assign productGroupFixed = 'sunglasses' -%}
{%- else -%}
  {%- assign productGroupFixed = productGroup -%}
{%- endcase -%}
{%- case frameTypeDowncase %}
  {%- when 'progressive eligible' -%}
  {%- assign frameTypeDowncase = false -%}
  {%- when 'full rim' -%}
  {%- assign frameTypeDowncase = false -%}
  {%- when 'semi rim' -%}
  {%- assign frameTypeDowncase = 'semi-rimless' -%}
{%- endcase -%}
{%- case templeColor %}
  {%- when frontColor -%}
  {%- assign templeColor = false -%}
{%- else -%}
  {%- assign templeColor = templeColor | downcase -%}
{%- endcase -%}
{%- case lensContrastEnhancement %}
  {% when lensContrastEnhancement.blank? %}
  {%- assign caseLensContrastEnhancement = false -%}
  {% when "False" %}
  {%- assign caseLensContrastEnhancement = false -%}
{%- else -%}
  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}
{%- endcase -%}
{%- case strassPresence %}
  {% when "False" %}
  {%- assign caseStrassPresence = false -%}
{%- else -%}
  {%- assign caseStrassPresence = strassPresence -%}
  {%- case strassPosition %}
    {% when "not present" %}
    {%- assign caseStrassPosition = false -%}
    {%- assign caseStrassPresence = false -%}
  {%- else -%}
    {%- assign caseStrassPresence = strassPosition -%}
    {%- assign caseStrassPosition = strassPresence -%}
  {%- endcase -%}
{%- endcase -%}
{%- case bridgeType %}
  {% when bridgeType.blank? %}
  {%- assign caseBridgeType = false -%}
  {%- when 'standard' -%}
  {%- assign caseBridgeType = false -%}
{%- else -%}
  {%- assign caseBridgeType = bridgeType -%}
{%- endcase -%}
{%- case specialProjectType %}
  {% when specialProjectType.blank? %}
  {%- assign caseSpecialProjectType = false -%}
  {% when "collaboration" %}
  {%- assign caseSpecialProjectType = specialProjectType -%}
  {%- case specialProjectCollection %}
    {% when specialProjectCollection.blank? %}
    {%- assign caseSpecialProjectCollection = false -%}
  {%- else -%}
    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}
  {%- endcase -%}
{%- else -%}
  {%- assign caseSpecialProjectType = false -%}
{%- endcase -%}
{%- case frontMaterial %}
  {% when frontMaterial.blank? %}
  {%- assign caseFrontMaterial = false -%}
  {%- when 'nylon' -%}
  {%- assign caseFrontMaterial = false -%}
  {%- when 'injected' -%}
  {%- assign caseFrontMaterial = false -%}
  {%- when 'o_matter' -%}
  {%- assign caseFrontMaterial = 'o matter' -%}
{%- else -%}
  {%- assign caseFrontMaterial = frontMaterial | downcase -%}
{%- endcase -%}
{%- case frameShape %}
  {% when frameShape.blank? %}
  {%- assign caseFrameShape = false -%}
{%- else -%}
  {%- assign caseFrameShape = frameShape | downcase -%}
{%- endcase -%}
{%- case frontColor %}
  {% when frontColor.blank? %}
  {%- assign caseFrontColor = false -%}
{%- else -%}
  {%- assign caseFrontColor = frontColor | downcase -%}
{%- endcase -%}
{%- case frontColorFinish %}
  {% when frontColorFinish.blank? %}
  {%- assign caseFrontColorFinish = false -%}
  {%- when 'NOT APPLICABLE' -%}
  {%- assign caseFrontColorFinish = false -%}
{%- else -%}
  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}
{%- endcase -%}

{%- case modelName %}
  {%- when modelName.blank? %}
  {%- assign caseModelName = false -%}
{%- else %}
  {%- assign caseModelName = modelName | append: ' ' | append: productGroupFixed -%}
{%- endcase -%}

{%- if caseModelName == false %}
  {%- if modelCodeDisplay = blank %}
    {%- assign caseModelName = modelCodeDisplay | append: ' ' | append: productGroupFixed -%}
  {%- endif %}
{%- endif -%}

{% if caseModelName %}
  {%- assign brandAndModelName = brand | append: ' ' | append: modelName -%}
  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}
  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}
  {%- if modelName -%}
    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}
  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}
  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}
  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}
  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}
  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}
  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}
  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}
  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}
  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}
  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}
  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}
  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}
  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}
  {% if frameFoldability %}It is foldable.{% endif %}
  ####
{% endif %}
```

## Other useful API

### List Projects

To retrieve the list of existing projects, use the following request:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations?limit=100000&deleted=false' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

The following query parameter are accepted:

| Query Parameter | Description                                                                                    | Values     |
| --------------- | ---------------------------------------------------------------------------------------------- | ---------- |
| limit           | The maximum number of results                                                                  |            |
| deleted         | When `false` deleted projects are not returned                                                 | true/false |


### List GraphQL Presets {#graphql-presets}

The platform can provide some GraphQL Presets for common scenarios:

```sh
curl 'https://api.wordlift.io/content-generation/graphql-query-presets?limit=2147483647' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

This is an example response:

```json
{
  "self": "eyJwb3NpdGlvbiI6eyJpZCI6MH0sImNvbmRpdGlvbiI6IkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MjE0NzQ4MzY0NywiZmlsdGVycyI6W119",
  "first": "eyJwb3NpdGlvbiI6eyJpZCI6MH0sImNvbmRpdGlvbiI6IkdSRUFURVJfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MjE0NzQ4MzY0NywiZmlsdGVycyI6W119",
  "prev": null,
  "next": null,
  "last": "eyJwb3NpdGlvbiI6eyJpZCI6OTIyMzM3MjAzNjg1NDc3NTgwN30sImNvbmRpdGlvbiI6IkxFU1NfVEhBTl9PUl9FUVVBTF9UTyIsInNvcnQiOiIraWQiLCJsaW1pdCI6MjE0NzQ4MzY0NywiZmlsdGVycyI6W119",
  "items": [
    {
      "label": "Entities",
      "body": "query {\n   entities(page:0,rows:10) {\n     id: iri\n     names: strings(name:\"schema:name\")\n     headlines: strings(name:\"schema:headline\")\n     types: refs(name:\"rdf:type\")\n     urls: refs(name:\"schema:url\")\n     references: refs(name:\"dct:references\")\n     mentions: resources(name:\"schema:mentions\") {\n       names: strings(name:\"schema:name\")\n     }\n   }\n }",
      "id": 1
    },
    {
      "label": "Products",
      "body": "query {\n   p: products(page:0,rows:10) {\n     id: iri\n     names: strings(name:\"schema:name\")\n     types: refs(name:\"rdf:type\")\n     urls: refs(name:\"schema:url\")\n     material: strings(name:\"schema:material\")\n     category: strings(name:\"schema:category\")\n     color: strings(name:\"schema:color\")\n     audience: resources(name:\"schema:audience\") {\n       audienceType: strings(name:\"schema:audienceType\")\n    }\n     offers: resources(name:\"schema:offers\") {\n       price: strings(name:\"schema:price\")\n    }\n   }\n }",
      "id": 2
    }
  ]
}
```


### List Property Fields {#list-fields}

By providing a GraphQL Query, this API will return the available fields in the response. The list of fields can be used to determine the placeholders to use in the Liquid template:

```sh
curl 'https://api.wordlift.io/content-generation/fields' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/graphql' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'query {\nproducts(\nquery: {\n  nameConstraint: {\n    in: [\n"0AR6123B__30028E","0AR8107__5017R5","0AR8110__501787","06S9034__903417","06S9002__900211","06E000184__1330L1","06E000184__4920V1","06E000185__1330L1","06S9034__903413","06E000185__1330R1","0AR8118__508973","0AR8118__504281","06E000189__1330L1","06E000190__1330L1","06E000192__4100V1","0AR8120__500187","0AR8120__5026_2","0AR8121__576287","06S9035__903502","06S9035__903507","0AR8121__500187","06S9035__903510","06S9036__903607","0AN3079__706_81","0AN3080__696_6G","06S9003__900309","06S9036__903606","0AN3080__706_81","06E000212__1330L1","0AR8123__500187","0AN3081__501_87","06E000212__1580B1","06S9036__903624" \n        ] }\n    })\n{\n     id: iri\n     names: strings(name:"schema:name")\n     types: refs(name:"rdf:type")\n     urls: refs(name:"schema:url")\n     material: strings(name:"schema:material")\n     category: strings(name:"schema:category")\n     color: strings(name:"schema:color")\n     audience: resources(name:"schema:audience") {\n       audienceType: strings(name:"schema:audienceType")\n    }\n     offers: resources(name:"schema:offers") {\n       price: strings(name:"schema:price")\n    }\n   }\n }'
```

Example response:

```json
[
  {
    "name": "id"
  },
  {
    "name": "names"
  },
  {
    "name": "types"
  },
  {
    "name": "urls"
  },
  {
    "name": "material"
  },
  {
    "name": "category"
  },
  {
    "name": "color"
  },
  {
    "name": "audience.audienceType"
  },
  {
    "name": "offers.price"
  }
]
```

* GraphQL

```sh
curl 'https://wordlift.stellate.sh/graphql' -X POST \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Authorization: Key VDkWn6RZqJfjvP8xkfH5tpqP9XQ6GC6MRSTMNe1ZHDxoCI7Rek3ankyaqFJsxILF' \
    -H 'Content-Type: application/json' \
     --data-raw '{"variables":{},"query":"{\n  products(\n    query: {nameConstraint: {in: [\"0AR6123B__30028E\", \"0AR8107__5017R5\", \"0AR8110__501787\", \"06S9034__903417\"]}}\n    page: 0\n    rows: 1000\n  ) {\n    id: iri\n    brand: string(name: \"schema:brand\")\n    name: string(name: \"schema:name\")\n    type: string(name: \"rdf:type\")\n    category: string(name: \"eyewear:category\")\n    productGroup: string(name: \"eyewear:eyewearProductGroup\")\n    bridgeType: string(name: \"eyewear:bridgeType\")\n    frameShape: string(name: \"eyewear:frameShape\")\n    faceShape: string(name: \"eyewear:faceShape\")\n    frameFitting: string(name: \"eyewear:frameFitting\")\n    frontColorFinish: string(name: \"eyewear:frontColorFinish\")\n    macroAgeRange: string(name: \"eyewear:macroAgeRange\")\n    ageGroupEnumeration: string(name: \"eyewear:ageGroupEnumeration\")\n    lensAssemblyTypeOnFrame: string(name: \"eyewear:lensAssemblyTypeOnFrame\")\n    frameType: string(name: \"eyewear:frameType\")\n    eyewearLensMaterial: string(name: \"eyewear:eyewearLensMaterial\")\n    eyewearTempleMaterial: string(name: \"eyewear:eyewearTempleMaterial\")\n    nosepadType: string(name: \"eyewear:nosepadType\")\n    release: string(name: \"eyewear:release\")\n    specialProjectCollection: string(name: \"eyewear:specialProjectCollection\")\n    specialProjectSponsor: string(name: \"eyewear:specialProjectSponsor\")\n    specialProjectType: string(name: \"eyewear:specialProjectType\")\n    specialProjectFeaturesFlag: string(name: \"eyewear:specialProjectFeaturesFlag\")\n    lensTreatment: string(name: \"eyewear:lensTreatment\")\n    lensColor: string(name: \"eyewear:lensColor\")\n    productStyleName: string(name: \"eyewear:productStyleName\")\n    productFamilyModel: string(name: \"eyewear:productFamilyModel\")\n    frameFoldability: string(name: \"eyewear:frameFoldability\")\n    roXability: string(name: \"eyewear:roXability\")\n    isLensPhotochromic: string(name: \"eyewear:isLensPhotochromic\")\n    isLensPolar: string(name: \"eyewear:isLensPolar\")\n    modelCodeDisplay: string(name: \"eyewear:modelCodeDisplay\")\n    progressiveFriendly: string(name: \"eyewear:progressiveFriendly\")\n    materialType: string(name: \"eyewear:materialType\")\n    maskShield: string(name: \"eyewear:maskShield\")\n    strassPresence: string(name: \"eyewear:strassPresence\")\n    strassPosition: string(name: \"eyewear:strassPosition\")\n    lensContrastEnhancement: string(name: \"eyewear:lensContrastEnhancement\")\n    lensBaseCurve: string(name: \"eyewear:lensBaseCurve\")\n    isLensGradient: string(name: \"eyewear:isLensGradient\")\n    isLensMirror: string(name: \"eyewear:isLensMirror\")\n    modelFit: string(name: \"eyewear:modelFit\")\n    modelName: string(name: \"eyewear:modelName\")\n    frontMaterial: string(name: \"eyewear:frontMaterial\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    templeColor: string(name: \"eyewear:templeColor\")\n    frontColor: string(name: \"eyewear:frontColor\")\n    isLensBlueLightFiltered: string(name: \"eyewear:isLensBlueLightFiltered\")\n    genderType: string(name: \"eyewear:genderType\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    channelAttributes: resources(name: \"eyewear:channelAttributes\") {\n      channel: string(name: \"eyewear:channel\")\n      styleName: string(name: \"eyewear:styleName\")\n      __typename\n    }\n    __typename\n  }\n}"}'
```

```sh
curl 'https://wordlift.stellate.sh/graphql' -X POST \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Authorization: Key VDkWn6RZqJfjvP8xkfH5tpqP9XQ6GC6MRSTMNe1ZHDxoCI7Rek3ankyaqFJsxILF' \
    -H 'Content-Type: application/json' \
     --data-raw '{"variables":{},"query":"{\n  products(\n    query: {nameConstraint: {in: [\"0AR6123B__30028E\", \"0AR8107__5017R5\", \"0AR8110__501787\", \"06S9034__903417\"]}}\n    page: 1\n    rows: 1000\n  ) {\n    id: iri\n    brand: string(name: \"schema:brand\")\n    name: string(name: \"schema:name\")\n    type: string(name: \"rdf:type\")\n    category: string(name: \"eyewear:category\")\n    productGroup: string(name: \"eyewear:eyewearProductGroup\")\n    bridgeType: string(name: \"eyewear:bridgeType\")\n    frameShape: string(name: \"eyewear:frameShape\")\n    faceShape: string(name: \"eyewear:faceShape\")\n    frameFitting: string(name: \"eyewear:frameFitting\")\n    frontColorFinish: string(name: \"eyewear:frontColorFinish\")\n    macroAgeRange: string(name: \"eyewear:macroAgeRange\")\n    ageGroupEnumeration: string(name: \"eyewear:ageGroupEnumeration\")\n    lensAssemblyTypeOnFrame: string(name: \"eyewear:lensAssemblyTypeOnFrame\")\n    frameType: string(name: \"eyewear:frameType\")\n    eyewearLensMaterial: string(name: \"eyewear:eyewearLensMaterial\")\n    eyewearTempleMaterial: string(name: \"eyewear:eyewearTempleMaterial\")\n    nosepadType: string(name: \"eyewear:nosepadType\")\n    release: string(name: \"eyewear:release\")\n    specialProjectCollection: string(name: \"eyewear:specialProjectCollection\")\n    specialProjectSponsor: string(name: \"eyewear:specialProjectSponsor\")\n    specialProjectType: string(name: \"eyewear:specialProjectType\")\n    specialProjectFeaturesFlag: string(name: \"eyewear:specialProjectFeaturesFlag\")\n    lensTreatment: string(name: \"eyewear:lensTreatment\")\n    lensColor: string(name: \"eyewear:lensColor\")\n    productStyleName: string(name: \"eyewear:productStyleName\")\n    productFamilyModel: string(name: \"eyewear:productFamilyModel\")\n    frameFoldability: string(name: \"eyewear:frameFoldability\")\n    roXability: string(name: \"eyewear:roXability\")\n    isLensPhotochromic: string(name: \"eyewear:isLensPhotochromic\")\n    isLensPolar: string(name: \"eyewear:isLensPolar\")\n    modelCodeDisplay: string(name: \"eyewear:modelCodeDisplay\")\n    progressiveFriendly: string(name: \"eyewear:progressiveFriendly\")\n    materialType: string(name: \"eyewear:materialType\")\n    maskShield: string(name: \"eyewear:maskShield\")\n    strassPresence: string(name: \"eyewear:strassPresence\")\n    strassPosition: string(name: \"eyewear:strassPosition\")\n    lensContrastEnhancement: string(name: \"eyewear:lensContrastEnhancement\")\n    lensBaseCurve: string(name: \"eyewear:lensBaseCurve\")\n    isLensGradient: string(name: \"eyewear:isLensGradient\")\n    isLensMirror: string(name: \"eyewear:isLensMirror\")\n    modelFit: string(name: \"eyewear:modelFit\")\n    modelName: string(name: \"eyewear:modelName\")\n    frontMaterial: string(name: \"eyewear:frontMaterial\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    templeColor: string(name: \"eyewear:templeColor\")\n    frontColor: string(name: \"eyewear:frontColor\")\n    isLensBlueLightFiltered: string(name: \"eyewear:isLensBlueLightFiltered\")\n    genderType: string(name: \"eyewear:genderType\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    channelAttributes: resources(name: \"eyewear:channelAttributes\") {\n      channel: string(name: \"eyewear:channel\")\n      styleName: string(name: \"eyewear:styleName\")\n      __typename\n    }\n    __typename\n  }\n}"}'
```

* Render Template

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/renders' -X POST \
    -H 'Accept: text/plain' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'{"template":"{%- case genderType -%}\\n  {%- when \'MAN\' or \'man\' -%}\\n  {%- assign genderTypeFixed = \'men\' -%}\\n  {%- when \'WOMAN\' or \'woman\' -%}\\n  {%- assign genderTypeFixed = \'women\' -%}\\n  {%- when \'UNISEX\' -%}\\n  {%- assign genderTypeFixed = \'unisex\' -%}\\n{%- else -%}\\n  {%- assign genderTypeFixed = genderType | downcase -%}\\n{%- endcase -%}\\n{%- case macroAgeRange -%}\\n  {%- when \'Children\' or \'children\' -%}\\n  {%- assign genderTypeFixed = \'children\' -%}\\n{%- endcase -%}\\n{%- case lensTreatment %}\\n  {% when lensTreatment.blank? %}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- when \'classic\' -%}\\n  {%- assign caseLensTreatment = false -%}\\n{%- else -%}\\n  {%- assign caseLensTreatment = lensTreatment | downcase -%}\\n{%- endcase -%}\\n{%- case isLensPolar %}\\n  {% when isLensPolar.blank? %}\\n  {%- assign caseIsLensPolar = false -%}\\n  {%- when \'False\' -%}\\n  {%- assign caseIsLensPolar = false -%}\\n{%- else -%}\\n  {%- assign caseIsLensPolar = isLensPolar -%}\\n{%- endcase -%}\\n{%- case productGroup %}\\n  {%- when \'pptical\' -%}\\n  {%- assign productGroupFixed = \'eyeglasses\' -%}\\n  {%- assign lensColor = false -%}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- assign isLensPolar = false -%}\\n  {%- when \'sun\' -%}\\n  {%- assign productGroupFixed = \'sunglasses\' -%}\\n{%- else -%}\\n  {%- assign productGroupFixed = productGroup -%}\\n{%- endcase -%}\\n{%- case frameTypeDowncase %}\\n  {%- when \'progressive eligible\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'full rim\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'semi rim\' -%}\\n  {%- assign frameTypeDowncase = \'semi-rimless\' -%}\\n{%- endcase -%}\\n{%- case templeColor %}\\n  {%- when frontColor -%}\\n  {%- assign templeColor = false -%}\\n{%- else -%}\\n  {%- assign templeColor = templeColor | downcase -%}\\n{%- endcase -%}\\n{%- case lensContrastEnhancement %}\\n  {% when lensContrastEnhancement.blank? %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n  {% when \\"False\\" %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n{%- else -%}\\n  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}\\n{%- endcase -%}\\n{%- case strassPresence %}\\n  {% when \\"False\\" %}\\n  {%- assign caseStrassPresence = false -%}\\n{%- else -%}\\n  {%- assign caseStrassPresence = strassPresence -%}\\n  {%- case strassPosition %}\\n    {% when \\"not present\\" %}\\n    {%- assign caseStrassPosition = false -%}\\n    {%- assign caseStrassPresence = false -%}\\n  {%- else -%}\\n    {%- assign caseStrassPresence = strassPosition -%}\\n    {%- assign caseStrassPosition = strassPresence -%}\\n  {%- endcase -%}\\n{%- endcase -%}\\n{%- case bridgeType %}\\n  {% when bridgeType.blank? %}\\n  {%- assign caseBridgeType = false -%}\\n  {%- when \'standard\' -%}\\n  {%- assign caseBridgeType = false -%}\\n{%- else -%}\\n  {%- assign caseBridgeType = bridgeType -%}\\n{%- endcase -%}\\n{%- case specialProjectType %}\\n  {% when specialProjectType.blank? %}\\n  {%- assign caseSpecialProjectType = false -%}\\n  {% when \\"collaboration\\" %}\\n  {%- assign caseSpecialProjectType = specialProjectType -%}\\n  {%- case specialProjectCollection %}\\n    {% when specialProjectCollection.blank? %}\\n    {%- assign caseSpecialProjectCollection = false -%}\\n  {%- else -%}\\n    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}\\n  {%- endcase -%}\\n{%- else -%}\\n  {%- assign caseSpecialProjectType = false -%}\\n{%- endcase -%}\\n{%- case frontMaterial %}\\n  {% when frontMaterial.blank? %}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'nylon\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'injected\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'o_matter\' -%}\\n  {%- assign caseFrontMaterial = \'o matter\' -%}\\n{%- else -%}\\n  {%- assign caseFrontMaterial = frontMaterial | downcase -%}\\n{%- endcase -%}\\n{%- case frameShape %}\\n  {% when frameShape.blank? %}\\n  {%- assign caseFrameShape = false -%}\\n{%- else -%}\\n  {%- assign caseFrameShape = frameShape | downcase -%}\\n{%- endcase -%}\\n{%- case frontColor %}\\n  {% when frontColor.blank? %}\\n  {%- assign caseFrontColor = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColor = frontColor | downcase -%}\\n{%- endcase -%}\\n{%- case frontColorFinish %}\\n  {% when frontColorFinish.blank? %}\\n  {%- assign caseFrontColorFinish = false -%}\\n  {%- when \'NOT APPLICABLE\' -%}\\n  {%- assign caseFrontColorFinish = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}\\n{%- endcase -%}\\n\\n{%- case modelName %}\\n  {%- when modelName.blank? %}\\n  {%- assign caseModelName = false -%}\\n{%- else %}\\n  {%- assign caseModelName = modelName | append: \' \' | append: productGroupFixed -%}\\n{%- endcase -%}\\n\\n{%- if caseModelName == false %}\\n  {%- if modelCodeDisplay \041= blank %}\\n    {%- assign caseModelName = modelCodeDisplay | append: \' \' | append: productGroupFixed -%}\\n  {%- endif %}\\n{%- endif -%}\\n\\n{% if caseModelName %}\\n  {%- assign brandAndModelName = brand | append: \' \' | append: modelName -%}\\n  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}\\n  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}\\n  {%- if modelName -%}\\n    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}\\n  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}\\n  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}\\n  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}\\n  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}\\n  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}\\n  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}\\n  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}\\n  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}\\n  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}\\n  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}\\n  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}\\n  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}\\n  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}\\n  {% if frameFoldability %}It is foldable.{% endif %}\\n  ####\\n{% endif %}","data":{"__typename":"Entity","id":"https://data.luxottica.com/eyewear-sun/06S9034__903417","brand":"Costa","name":"06S9034__903417","type":"http://schema.org/Product","category":"Optical","productGroup":"sun","bridgeType":"standard","frameShape":"rectangle","faceShape":"Oval-Round","frameFitting":"wide","frontColorFinish":"matte","macroAgeRange":"adult","ageGroupEnumeration":null,"lensAssemblyTypeOnFrame":"full rim","frameType":"full rim","eyewearLensMaterial":"polycarbonate","eyewearTempleMaterial":"injected","nosepadType":"plastic standard","release":null,"specialProjectCollection":null,"specialProjectSponsor":null,"specialProjectType":"collaboration","specialProjectFeaturesFlag":"True","lensTreatment":"mirror","lensColor":"gray silver mirror","productStyleName":null,"productFamilyModel":"Diego","frameFoldability":null,"roXability":"True","isLensPhotochromic":"False","isLensPolar":"True","modelCodeDisplay":"6S9034","progressiveFriendly":"classic","materialType":"zpfn","maskShield":"False","strassPresence":"False","strassPosition":"not present","lensContrastEnhancement":"True","lensBaseCurve":"base 8 decentered","isLensGradient":"False","isLensMirror":"True","modelFit":"high bridge fit","modelName":"Diego","frontMaterial":"injected","lensProtection":null,"templeColor":"matte black","frontColor":"matte black","isLensBlueLightFiltered":"False","genderType":"man","channelAttributes":[{"__typename":"Entity","channel":"DC - David Clulow","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"LC - Lens Crafters","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"AN - Arnette","styleName":"Diego"},{"__typename":"Entity","channel":"VO - Vogue","styleName":"Diego"},{"__typename":"Entity","channel":"OP - Oliver People","styleName":"Diego"},{"__typename":"Entity","channel":"VD - Vision Direct","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"OSI - OSI","styleName":"Diego"},{"__typename":"Entity","channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"FD - Frames Direct","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"SS - SmartShopper","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"OPSM - OPSM","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"NA - Native","styleName":"Diego"},{"__typename":"Entity","channel":"CM - Costa Del Mar","styleName":"Diego"},{"__typename":"Entity","channel":"MyLuxottica - MyLuxottica","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"OO - Oakley","styleName":"Diego"},{"__typename":"Entity","channel":"SGH - Sunglasshut","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"SGS - Sunglasses Shop","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"CL - Clearly","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"TO - Target Optical","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"RB - RayBan","styleName":"Diego"},{"__typename":"Entity","channel":"GL - Glasses","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"PO - Persol","styleName":"Diego"},{"__typename":"Entity","channel":"AM - Alain Mikli","styleName":"Diego"}]}}'
```

* Render a Collection of Templates

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/renders-collection' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'[{"data":{"__typename":"Entity","id":"https://data.luxottica.com/eyewear-sun/06S9034__903417","brand":"Costa","name":"06S9034__903417","type":"http://schema.org/Product","category":"Optical","productGroup":"sun","bridgeType":"standard","frameShape":"rectangle","faceShape":"Oval-Round","frameFitting":"wide","frontColorFinish":"matte","macroAgeRange":"adult","ageGroupEnumeration":null,"lensAssemblyTypeOnFrame":"full rim","frameType":"full rim","eyewearLensMaterial":"polycarbonate","eyewearTempleMaterial":"injected","nosepadType":"plastic standard","release":null,"specialProjectCollection":null,"specialProjectSponsor":null,"specialProjectType":"collaboration","specialProjectFeaturesFlag":"True","lensTreatment":"mirror","lensColor":"gray silver mirror","productStyleName":null,"productFamilyModel":"Diego","frameFoldability":null,"roXability":"True","isLensPhotochromic":"False","isLensPolar":"True","modelCodeDisplay":"6S9034","progressiveFriendly":"classic","materialType":"zpfn","maskShield":"False","strassPresence":"False","strassPosition":"not present","lensContrastEnhancement":"True","lensBaseCurve":"base 8 decentered","isLensGradient":"False","isLensMirror":"True","modelFit":"high bridge fit","modelName":"Diego","frontMaterial":"injected","lensProtection":null,"templeColor":"matte black","frontColor":"matte black","isLensBlueLightFiltered":"False","genderType":"man","channelAttributes":[{"__typename":"Entity","channel":"DC - David Clulow","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"LC - Lens Crafters","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"AN - Arnette","styleName":"Diego"},{"__typename":"Entity","channel":"VO - Vogue","styleName":"Diego"},{"__typename":"Entity","channel":"OP - Oliver People","styleName":"Diego"},{"__typename":"Entity","channel":"VD - Vision Direct","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"OSI - OSI","styleName":"Diego"},{"__typename":"Entity","channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"FD - Frames Direct","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"SS - SmartShopper","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"OPSM - OPSM","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"NA - Native","styleName":"Diego"},{"__typename":"Entity","channel":"CM - Costa Del Mar","styleName":"Diego"},{"__typename":"Entity","channel":"MyLuxottica - MyLuxottica","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"OO - Oakley","styleName":"Diego"},{"__typename":"Entity","channel":"SGH - Sunglasshut","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"SGS - Sunglasses Shop","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"CL - Clearly","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"TO - Target Optical","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"RB - RayBan","styleName":"Diego"},{"__typename":"Entity","channel":"GL - Glasses","styleName":"6S9034 Diego"},{"__typename":"Entity","channel":"PO - Persol","styleName":"Diego"},{"__typename":"Entity","channel":"AM - Alain Mikli","styleName":"Diego"}]},"template":"{%- case genderType -%}\\n  {%- when \'MAN\' or \'man\' -%}\\n  {%- assign genderTypeFixed = \'men\' -%}\\n  {%- when \'WOMAN\' or \'woman\' -%}\\n  {%- assign genderTypeFixed = \'women\' -%}\\n  {%- when \'UNISEX\' -%}\\n  {%- assign genderTypeFixed = \'unisex\' -%}\\n{%- else -%}\\n  {%- assign genderTypeFixed = genderType | downcase -%}\\n{%- endcase -%}\\n{%- case macroAgeRange -%}\\n  {%- when \'Children\' or \'children\' -%}\\n  {%- assign genderTypeFixed = \'children\' -%}\\n{%- endcase -%}\\n{%- case lensTreatment %}\\n  {% when lensTreatment.blank? %}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- when \'classic\' -%}\\n  {%- assign caseLensTreatment = false -%}\\n{%- else -%}\\n  {%- assign caseLensTreatment = lensTreatment | downcase -%}\\n{%- endcase -%}\\n{%- case isLensPolar %}\\n  {% when isLensPolar.blank? %}\\n  {%- assign caseIsLensPolar = false -%}\\n  {%- when \'False\' -%}\\n  {%- assign caseIsLensPolar = false -%}\\n{%- else -%}\\n  {%- assign caseIsLensPolar = isLensPolar -%}\\n{%- endcase -%}\\n{%- case productGroup %}\\n  {%- when \'pptical\' -%}\\n  {%- assign productGroupFixed = \'eyeglasses\' -%}\\n  {%- assign lensColor = false -%}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- assign isLensPolar = false -%}\\n  {%- when \'sun\' -%}\\n  {%- assign productGroupFixed = \'sunglasses\' -%}\\n{%- else -%}\\n  {%- assign productGroupFixed = productGroup -%}\\n{%- endcase -%}\\n{%- case frameTypeDowncase %}\\n  {%- when \'progressive eligible\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'full rim\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'semi rim\' -%}\\n  {%- assign frameTypeDowncase = \'semi-rimless\' -%}\\n{%- endcase -%}\\n{%- case templeColor %}\\n  {%- when frontColor -%}\\n  {%- assign templeColor = false -%}\\n{%- else -%}\\n  {%- assign templeColor = templeColor | downcase -%}\\n{%- endcase -%}\\n{%- case lensContrastEnhancement %}\\n  {% when lensContrastEnhancement.blank? %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n  {% when \\"False\\" %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n{%- else -%}\\n  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}\\n{%- endcase -%}\\n{%- case strassPresence %}\\n  {% when \\"False\\" %}\\n  {%- assign caseStrassPresence = false -%}\\n{%- else -%}\\n  {%- assign caseStrassPresence = strassPresence -%}\\n  {%- case strassPosition %}\\n    {% when \\"not present\\" %}\\n    {%- assign caseStrassPosition = false -%}\\n    {%- assign caseStrassPresence = false -%}\\n  {%- else -%}\\n    {%- assign caseStrassPresence = strassPosition -%}\\n    {%- assign caseStrassPosition = strassPresence -%}\\n  {%- endcase -%}\\n{%- endcase -%}\\n{%- case bridgeType %}\\n  {% when bridgeType.blank? %}\\n  {%- assign caseBridgeType = false -%}\\n  {%- when \'standard\' -%}\\n  {%- assign caseBridgeType = false -%}\\n{%- else -%}\\n  {%- assign caseBridgeType = bridgeType -%}\\n{%- endcase -%}\\n{%- case specialProjectType %}\\n  {% when specialProjectType.blank? %}\\n  {%- assign caseSpecialProjectType = false -%}\\n  {% when \\"collaboration\\" %}\\n  {%- assign caseSpecialProjectType = specialProjectType -%}\\n  {%- case specialProjectCollection %}\\n    {% when specialProjectCollection.blank? %}\\n    {%- assign caseSpecialProjectCollection = false -%}\\n  {%- else -%}\\n    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}\\n  {%- endcase -%}\\n{%- else -%}\\n  {%- assign caseSpecialProjectType = false -%}\\n{%- endcase -%}\\n{%- case frontMaterial %}\\n  {% when frontMaterial.blank? %}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'nylon\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'injected\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'o_matter\' -%}\\n  {%- assign caseFrontMaterial = \'o matter\' -%}\\n{%- else -%}\\n  {%- assign caseFrontMaterial = frontMaterial | downcase -%}\\n{%- endcase -%}\\n{%- case frameShape %}\\n  {% when frameShape.blank? %}\\n  {%- assign caseFrameShape = false -%}\\n{%- else -%}\\n  {%- assign caseFrameShape = frameShape | downcase -%}\\n{%- endcase -%}\\n{%- case frontColor %}\\n  {% when frontColor.blank? %}\\n  {%- assign caseFrontColor = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColor = frontColor | downcase -%}\\n{%- endcase -%}\\n{%- case frontColorFinish %}\\n  {% when frontColorFinish.blank? %}\\n  {%- assign caseFrontColorFinish = false -%}\\n  {%- when \'NOT APPLICABLE\' -%}\\n  {%- assign caseFrontColorFinish = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}\\n{%- endcase -%}\\n\\n{%- case modelName %}\\n  {%- when modelName.blank? %}\\n  {%- assign caseModelName = false -%}\\n{%- else %}\\n  {%- assign caseModelName = modelName | append: \' \' | append: productGroupFixed -%}\\n{%- endcase -%}\\n\\n{%- if caseModelName == false %}\\n  {%- if modelCodeDisplay \041= blank %}\\n    {%- assign caseModelName = modelCodeDisplay | append: \' \' | append: productGroupFixed -%}\\n  {%- endif %}\\n{%- endif -%}\\n\\n{% if caseModelName %}\\n  {%- assign brandAndModelName = brand | append: \' \' | append: modelName -%}\\n  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}\\n  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}\\n  {%- if modelName -%}\\n    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}\\n  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}\\n  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}\\n  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}\\n  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}\\n  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}\\n  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}\\n  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}\\n  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}\\n  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}\\n  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}\\n  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}\\n  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}\\n  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}\\n  {% if frameFoldability %}It is foldable.{% endif %}\\n  ####\\n{% endif %}"},{"data":{"__typename":"Entity","id":"https://data.luxottica.com/eyewear-sun/0AR6123B__30028E","brand":"Giorgio Armani","name":"0AR6123B__30028E","type":"http://schema.org/Product","category":"Optical","productGroup":"sun","bridgeType":"standard","frameShape":"square","faceShape":"Round-Oval-Square","frameFitting":"regular","frontColorFinish":"polished","macroAgeRange":"adult","ageGroupEnumeration":null,"lensAssemblyTypeOnFrame":"rimless","frameType":"rimless","eyewearLensMaterial":"polyamide","eyewearTempleMaterial":"metal","nosepadType":"metal standard","release":null,"specialProjectCollection":null,"specialProjectSponsor":null,"specialProjectType":"event","specialProjectFeaturesFlag":"True","lensTreatment":"gradient","lensColor":"gradient green","productStyleName":null,"productFamilyModel":null,"frameFoldability":null,"roXability":"False","isLensPhotochromic":"False","isLensPolar":"False","modelCodeDisplay":"AR6123B","progressiveFriendly":"classic","materialType":"zpfn","maskShield":"False","strassPresence":"True","strassPosition":"strass on metal component and","lensContrastEnhancement":"False","lensBaseCurve":"base 4","isLensGradient":"True","isLensMirror":"False","modelFit":"adjustable nosepads","modelName":null,"frontMaterial":"metal","lensProtection":null,"templeColor":"pale gold","frontColor":"pale gold","isLensBlueLightFiltered":"False","genderType":"woman","channelAttributes":[{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":"PO - Persol","styleName":"AR6123B"},{"__typename":"Entity","channel":"MyLuxottica - MyLuxottica","styleName":"AR6123B"},{"__typename":"Entity","channel":"SGH - Sunglasshut","styleName":"AR6123B"},{"__typename":"Entity","channel":"OP - Oliver People","styleName":"AR6123B"},{"__typename":"Entity","channel":"OPSM - OPSM","styleName":"AR6123B"},{"__typename":"Entity","channel":"TO - Target Optical","styleName":"AR6123B"},{"__typename":"Entity","channel":"FD - Frames Direct","styleName":"AR6123B"},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":"CM - Costa Del Mar","styleName":"AR6123B"},{"__typename":"Entity","channel":"VO - Vogue","styleName":"AR6123B"},{"__typename":"Entity","channel":"SS - SmartShopper","styleName":"AR6123B"},{"__typename":"Entity","channel":"LC - Lens Crafters","styleName":"AR6123B"},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":"OSI - OSI","styleName":"AR6123B"},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":"DC - David Clulow","styleName":"AR6123B"},{"__typename":"Entity","channel":"OO - Oakley","styleName":"AR6123B"},{"__typename":"Entity","channel":"AN - Arnette","styleName":"AR6123B"},{"__typename":"Entity","channel":"NA - Native","styleName":"AR6123B"},{"__typename":"Entity","channel":"RB - RayBan","styleName":"AR6123B"},{"__typename":"Entity","channel":"GL - Glasses","styleName":"AR6123B"},{"__typename":"Entity","channel":"AM - Alain Mikli","styleName":"AR6123B"}]},"template":"{%- case genderType -%}\\n  {%- when \'MAN\' or \'man\' -%}\\n  {%- assign genderTypeFixed = \'men\' -%}\\n  {%- when \'WOMAN\' or \'woman\' -%}\\n  {%- assign genderTypeFixed = \'women\' -%}\\n  {%- when \'UNISEX\' -%}\\n  {%- assign genderTypeFixed = \'unisex\' -%}\\n{%- else -%}\\n  {%- assign genderTypeFixed = genderType | downcase -%}\\n{%- endcase -%}\\n{%- case macroAgeRange -%}\\n  {%- when \'Children\' or \'children\' -%}\\n  {%- assign genderTypeFixed = \'children\' -%}\\n{%- endcase -%}\\n{%- case lensTreatment %}\\n  {% when lensTreatment.blank? %}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- when \'classic\' -%}\\n  {%- assign caseLensTreatment = false -%}\\n{%- else -%}\\n  {%- assign caseLensTreatment = lensTreatment | downcase -%}\\n{%- endcase -%}\\n{%- case isLensPolar %}\\n  {% when isLensPolar.blank? %}\\n  {%- assign caseIsLensPolar = false -%}\\n  {%- when \'False\' -%}\\n  {%- assign caseIsLensPolar = false -%}\\n{%- else -%}\\n  {%- assign caseIsLensPolar = isLensPolar -%}\\n{%- endcase -%}\\n{%- case productGroup %}\\n  {%- when \'pptical\' -%}\\n  {%- assign productGroupFixed = \'eyeglasses\' -%}\\n  {%- assign lensColor = false -%}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- assign isLensPolar = false -%}\\n  {%- when \'sun\' -%}\\n  {%- assign productGroupFixed = \'sunglasses\' -%}\\n{%- else -%}\\n  {%- assign productGroupFixed = productGroup -%}\\n{%- endcase -%}\\n{%- case frameTypeDowncase %}\\n  {%- when \'progressive eligible\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'full rim\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'semi rim\' -%}\\n  {%- assign frameTypeDowncase = \'semi-rimless\' -%}\\n{%- endcase -%}\\n{%- case templeColor %}\\n  {%- when frontColor -%}\\n  {%- assign templeColor = false -%}\\n{%- else -%}\\n  {%- assign templeColor = templeColor | downcase -%}\\n{%- endcase -%}\\n{%- case lensContrastEnhancement %}\\n  {% when lensContrastEnhancement.blank? %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n  {% when \\"False\\" %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n{%- else -%}\\n  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}\\n{%- endcase -%}\\n{%- case strassPresence %}\\n  {% when \\"False\\" %}\\n  {%- assign caseStrassPresence = false -%}\\n{%- else -%}\\n  {%- assign caseStrassPresence = strassPresence -%}\\n  {%- case strassPosition %}\\n    {% when \\"not present\\" %}\\n    {%- assign caseStrassPosition = false -%}\\n    {%- assign caseStrassPresence = false -%}\\n  {%- else -%}\\n    {%- assign caseStrassPresence = strassPosition -%}\\n    {%- assign caseStrassPosition = strassPresence -%}\\n  {%- endcase -%}\\n{%- endcase -%}\\n{%- case bridgeType %}\\n  {% when bridgeType.blank? %}\\n  {%- assign caseBridgeType = false -%}\\n  {%- when \'standard\' -%}\\n  {%- assign caseBridgeType = false -%}\\n{%- else -%}\\n  {%- assign caseBridgeType = bridgeType -%}\\n{%- endcase -%}\\n{%- case specialProjectType %}\\n  {% when specialProjectType.blank? %}\\n  {%- assign caseSpecialProjectType = false -%}\\n  {% when \\"collaboration\\" %}\\n  {%- assign caseSpecialProjectType = specialProjectType -%}\\n  {%- case specialProjectCollection %}\\n    {% when specialProjectCollection.blank? %}\\n    {%- assign caseSpecialProjectCollection = false -%}\\n  {%- else -%}\\n    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}\\n  {%- endcase -%}\\n{%- else -%}\\n  {%- assign caseSpecialProjectType = false -%}\\n{%- endcase -%}\\n{%- case frontMaterial %}\\n  {% when frontMaterial.blank? %}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'nylon\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'injected\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'o_matter\' -%}\\n  {%- assign caseFrontMaterial = \'o matter\' -%}\\n{%- else -%}\\n  {%- assign caseFrontMaterial = frontMaterial | downcase -%}\\n{%- endcase -%}\\n{%- case frameShape %}\\n  {% when frameShape.blank? %}\\n  {%- assign caseFrameShape = false -%}\\n{%- else -%}\\n  {%- assign caseFrameShape = frameShape | downcase -%}\\n{%- endcase -%}\\n{%- case frontColor %}\\n  {% when frontColor.blank? %}\\n  {%- assign caseFrontColor = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColor = frontColor | downcase -%}\\n{%- endcase -%}\\n{%- case frontColorFinish %}\\n  {% when frontColorFinish.blank? %}\\n  {%- assign caseFrontColorFinish = false -%}\\n  {%- when \'NOT APPLICABLE\' -%}\\n  {%- assign caseFrontColorFinish = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}\\n{%- endcase -%}\\n\\n{%- case modelName %}\\n  {%- when modelName.blank? %}\\n  {%- assign caseModelName = false -%}\\n{%- else %}\\n  {%- assign caseModelName = modelName | append: \' \' | append: productGroupFixed -%}\\n{%- endcase -%}\\n\\n{%- if caseModelName == false %}\\n  {%- if modelCodeDisplay \041= blank %}\\n    {%- assign caseModelName = modelCodeDisplay | append: \' \' | append: productGroupFixed -%}\\n  {%- endif %}\\n{%- endif -%}\\n\\n{% if caseModelName %}\\n  {%- assign brandAndModelName = brand | append: \' \' | append: modelName -%}\\n  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}\\n  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}\\n  {%- if modelName -%}\\n    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}\\n  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}\\n  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}\\n  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}\\n  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}\\n  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}\\n  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}\\n  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}\\n  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}\\n  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}\\n  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}\\n  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}\\n  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}\\n  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}\\n  {% if frameFoldability %}It is foldable.{% endif %}\\n  ####\\n{% endif %}"},{"data":{"__typename":"Entity","id":"https://data.luxottica.com/eyewear-sun/0AR8107__5017R5","brand":"Giorgio Armani","name":"0AR8107__5017R5","type":"http://schema.org/Product","category":"Optical","productGroup":"sun","bridgeType":"key bridge","frameShape":"square","faceShape":"Oval-Round","frameFitting":"regular","frontColorFinish":"polished","macroAgeRange":"adult","ageGroupEnumeration":null,"lensAssemblyTypeOnFrame":"full rim","frameType":"full rim","eyewearLensMaterial":"crystal","eyewearTempleMaterial":"acetate","nosepadType":"standard","release":null,"specialProjectCollection":null,"specialProjectSponsor":null,"specialProjectType":null,"specialProjectFeaturesFlag":"False","lensTreatment":"solid color","lensColor":"blue","productStyleName":null,"productFamilyModel":null,"frameFoldability":null,"roXability":"True","isLensPhotochromic":"False","isLensPolar":"False","modelCodeDisplay":"AR8107","progressiveFriendly":"classic","materialType":"zpfn","maskShield":"False","strassPresence":"False","strassPosition":null,"lensContrastEnhancement":"False","lensBaseCurve":"base 6","isLensGradient":"False","isLensMirror":"False","modelFit":"high bridge fit","modelName":null,"frontMaterial":"acetate","lensProtection":null,"templeColor":"black","frontColor":"black","isLensBlueLightFiltered":"False","genderType":"man","channelAttributes":[{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null},{"__typename":"Entity","channel":null,"styleName":null}]},"template":"{%- case genderType -%}\\n  {%- when \'MAN\' or \'man\' -%}\\n  {%- assign genderTypeFixed = \'men\' -%}\\n  {%- when \'WOMAN\' or \'woman\' -%}\\n  {%- assign genderTypeFixed = \'women\' -%}\\n  {%- when \'UNISEX\' -%}\\n  {%- assign genderTypeFixed = \'unisex\' -%}\\n{%- else -%}\\n  {%- assign genderTypeFixed = genderType | downcase -%}\\n{%- endcase -%}\\n{%- case macroAgeRange -%}\\n  {%- when \'Children\' or \'children\' -%}\\n  {%- assign genderTypeFixed = \'children\' -%}\\n{%- endcase -%}\\n{%- case lensTreatment %}\\n  {% when lensTreatment.blank? %}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- when \'classic\' -%}\\n  {%- assign caseLensTreatment = false -%}\\n{%- else -%}\\n  {%- assign caseLensTreatment = lensTreatment | downcase -%}\\n{%- endcase -%}\\n{%- case isLensPolar %}\\n  {% when isLensPolar.blank? %}\\n  {%- assign caseIsLensPolar = false -%}\\n  {%- when \'False\' -%}\\n  {%- assign caseIsLensPolar = false -%}\\n{%- else -%}\\n  {%- assign caseIsLensPolar = isLensPolar -%}\\n{%- endcase -%}\\n{%- case productGroup %}\\n  {%- when \'pptical\' -%}\\n  {%- assign productGroupFixed = \'eyeglasses\' -%}\\n  {%- assign lensColor = false -%}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- assign isLensPolar = false -%}\\n  {%- when \'sun\' -%}\\n  {%- assign productGroupFixed = \'sunglasses\' -%}\\n{%- else -%}\\n  {%- assign productGroupFixed = productGroup -%}\\n{%- endcase -%}\\n{%- case frameTypeDowncase %}\\n  {%- when \'progressive eligible\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'full rim\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'semi rim\' -%}\\n  {%- assign frameTypeDowncase = \'semi-rimless\' -%}\\n{%- endcase -%}\\n{%- case templeColor %}\\n  {%- when frontColor -%}\\n  {%- assign templeColor = false -%}\\n{%- else -%}\\n  {%- assign templeColor = templeColor | downcase -%}\\n{%- endcase -%}\\n{%- case lensContrastEnhancement %}\\n  {% when lensContrastEnhancement.blank? %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n  {% when \\"False\\" %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n{%- else -%}\\n  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}\\n{%- endcase -%}\\n{%- case strassPresence %}\\n  {% when \\"False\\" %}\\n  {%- assign caseStrassPresence = false -%}\\n{%- else -%}\\n  {%- assign caseStrassPresence = strassPresence -%}\\n  {%- case strassPosition %}\\n    {% when \\"not present\\" %}\\n    {%- assign caseStrassPosition = false -%}\\n    {%- assign caseStrassPresence = false -%}\\n  {%- else -%}\\n    {%- assign caseStrassPresence = strassPosition -%}\\n    {%- assign caseStrassPosition = strassPresence -%}\\n  {%- endcase -%}\\n{%- endcase -%}\\n{%- case bridgeType %}\\n  {% when bridgeType.blank? %}\\n  {%- assign caseBridgeType = false -%}\\n  {%- when \'standard\' -%}\\n  {%- assign caseBridgeType = false -%}\\n{%- else -%}\\n  {%- assign caseBridgeType = bridgeType -%}\\n{%- endcase -%}\\n{%- case specialProjectType %}\\n  {% when specialProjectType.blank? %}\\n  {%- assign caseSpecialProjectType = false -%}\\n  {% when \\"collaboration\\" %}\\n  {%- assign caseSpecialProjectType = specialProjectType -%}\\n  {%- case specialProjectCollection %}\\n    {% when specialProjectCollection.blank? %}\\n    {%- assign caseSpecialProjectCollection = false -%}\\n  {%- else -%}\\n    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}\\n  {%- endcase -%}\\n{%- else -%}\\n  {%- assign caseSpecialProjectType = false -%}\\n{%- endcase -%}\\n{%- case frontMaterial %}\\n  {% when frontMaterial.blank? %}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'nylon\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'injected\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'o_matter\' -%}\\n  {%- assign caseFrontMaterial = \'o matter\' -%}\\n{%- else -%}\\n  {%- assign caseFrontMaterial = frontMaterial | downcase -%}\\n{%- endcase -%}\\n{%- case frameShape %}\\n  {% when frameShape.blank? %}\\n  {%- assign caseFrameShape = false -%}\\n{%- else -%}\\n  {%- assign caseFrameShape = frameShape | downcase -%}\\n{%- endcase -%}\\n{%- case frontColor %}\\n  {% when frontColor.blank? %}\\n  {%- assign caseFrontColor = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColor = frontColor | downcase -%}\\n{%- endcase -%}\\n{%- case frontColorFinish %}\\n  {% when frontColorFinish.blank? %}\\n  {%- assign caseFrontColorFinish = false -%}\\n  {%- when \'NOT APPLICABLE\' -%}\\n  {%- assign caseFrontColorFinish = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}\\n{%- endcase -%}\\n\\n{%- case modelName %}\\n  {%- when modelName.blank? %}\\n  {%- assign caseModelName = false -%}\\n{%- else %}\\n  {%- assign caseModelName = modelName | append: \' \' | append: productGroupFixed -%}\\n{%- endcase -%}\\n\\n{%- if caseModelName == false %}\\n  {%- if modelCodeDisplay \041= blank %}\\n    {%- assign caseModelName = modelCodeDisplay | append: \' \' | append: productGroupFixed -%}\\n  {%- endif %}\\n{%- endif -%}\\n\\n{% if caseModelName %}\\n  {%- assign brandAndModelName = brand | append: \' \' | append: modelName -%}\\n  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}\\n  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}\\n  {%- if modelName -%}\\n    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}\\n  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}\\n  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}\\n  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}\\n  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}\\n  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}\\n  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}\\n  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}\\n  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}\\n  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}\\n  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}\\n  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}\\n  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}\\n  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}\\n  {% if frameFoldability %}It is foldable.{% endif %}\\n  ####\\n{% endif %}"},{"data":{"__typename":"Entity","id":"https://data.luxottica.com/eyewear-sun/0AR8110__501787","brand":"Giorgio Armani","name":"0AR8110__501787","type":"http://schema.org/Product","category":"Optical","productGroup":"sun","bridgeType":"standard","frameShape":"square","faceShape":"Oval-Round","frameFitting":"wide","frontColorFinish":"polished","macroAgeRange":"adult","ageGroupEnumeration":null,"lensAssemblyTypeOnFrame":"full rim","frameType":"full rim","eyewearLensMaterial":"polyamide","eyewearTempleMaterial":"acetate","nosepadType":"standard","release":null,"specialProjectCollection":null,"specialProjectSponsor":null,"specialProjectType":null,"specialProjectFeaturesFlag":"False","lensTreatment":"solid color","lensColor":"grey","productStyleName":null,"productFamilyModel":null,"frameFoldability":null,"roXability":"True","isLensPhotochromic":"False","isLensPolar":"False","modelCodeDisplay":"AR8110","progressiveFriendly":"classic","materialType":"zpfn","maskShield":"False","strassPresence":"False","strassPosition":null,"lensContrastEnhancement":"False","lensBaseCurve":"base 6","isLensGradient":"False","isLensMirror":"False","modelFit":"high bridge fit","modelName":null,"frontMaterial":"acetate","lensProtection":null,"templeColor":"havana","frontColor":"black","isLensBlueLightFiltered":"False","genderType":"woman","channelAttributes":[{"__typename":"Entity","channel":"SGS - Sunglasses Shop","styleName":"AR8110"},{"__typename":"Entity","channel":"TO - Target Optical","styleName":"AR8110"},{"__typename":"Entity","channel":"VO - Vogue","styleName":"AR8110"},{"__typename":"Entity","channel":"AN - Arnette","styleName":"AR8110"},{"__typename":"Entity","channel":"OO - Oakley","styleName":"AR8110"},{"__typename":"Entity","channel":"FD - Frames Direct","styleName":"AR8110"},{"__typename":"Entity","channel":"SS - SmartShopper","styleName":"AR8110"},{"__typename":"Entity","channel":"AM - Alain Mikli","styleName":"AR8110"},{"__typename":"Entity","channel":"NA - Native","styleName":"AR8110"},{"__typename":"Entity","channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"AR8110"},{"__typename":"Entity","channel":"SGH - Sunglasshut","styleName":"AR8110"},{"__typename":"Entity","channel":"OPSM - OPSM","styleName":"AR8110"},{"__typename":"Entity","channel":"LC - Lens Crafters","styleName":"AR8110"},{"__typename":"Entity","channel":"GL - Glasses","styleName":"AR8110"},{"__typename":"Entity","channel":"OSI - OSI","styleName":"AR8110"},{"__typename":"Entity","channel":"CM - Costa Del Mar","styleName":"AR8110"},{"__typename":"Entity","channel":"MyLuxottica - MyLuxottica","styleName":"AR8110"},{"__typename":"Entity","channel":"PO - Persol","styleName":"AR8110"},{"__typename":"Entity","channel":"OP - Oliver People","styleName":"AR8110"},{"__typename":"Entity","channel":"RB - RayBan","styleName":"AR8110"},{"__typename":"Entity","channel":"VD - Vision Direct","styleName":"AR8110"},{"__typename":"Entity","channel":"CL - Clearly","styleName":"AR8110"},{"__typename":"Entity","channel":"DC - David Clulow","styleName":"AR8110"}]},"template":"{%- case genderType -%}\\n  {%- when \'MAN\' or \'man\' -%}\\n  {%- assign genderTypeFixed = \'men\' -%}\\n  {%- when \'WOMAN\' or \'woman\' -%}\\n  {%- assign genderTypeFixed = \'women\' -%}\\n  {%- when \'UNISEX\' -%}\\n  {%- assign genderTypeFixed = \'unisex\' -%}\\n{%- else -%}\\n  {%- assign genderTypeFixed = genderType | downcase -%}\\n{%- endcase -%}\\n{%- case macroAgeRange -%}\\n  {%- when \'Children\' or \'children\' -%}\\n  {%- assign genderTypeFixed = \'children\' -%}\\n{%- endcase -%}\\n{%- case lensTreatment %}\\n  {% when lensTreatment.blank? %}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- when \'classic\' -%}\\n  {%- assign caseLensTreatment = false -%}\\n{%- else -%}\\n  {%- assign caseLensTreatment = lensTreatment | downcase -%}\\n{%- endcase -%}\\n{%- case isLensPolar %}\\n  {% when isLensPolar.blank? %}\\n  {%- assign caseIsLensPolar = false -%}\\n  {%- when \'False\' -%}\\n  {%- assign caseIsLensPolar = false -%}\\n{%- else -%}\\n  {%- assign caseIsLensPolar = isLensPolar -%}\\n{%- endcase -%}\\n{%- case productGroup %}\\n  {%- when \'pptical\' -%}\\n  {%- assign productGroupFixed = \'eyeglasses\' -%}\\n  {%- assign lensColor = false -%}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- assign isLensPolar = false -%}\\n  {%- when \'sun\' -%}\\n  {%- assign productGroupFixed = \'sunglasses\' -%}\\n{%- else -%}\\n  {%- assign productGroupFixed = productGroup -%}\\n{%- endcase -%}\\n{%- case frameTypeDowncase %}\\n  {%- when \'progressive eligible\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'full rim\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'semi rim\' -%}\\n  {%- assign frameTypeDowncase = \'semi-rimless\' -%}\\n{%- endcase -%}\\n{%- case templeColor %}\\n  {%- when frontColor -%}\\n  {%- assign templeColor = false -%}\\n{%- else -%}\\n  {%- assign templeColor = templeColor | downcase -%}\\n{%- endcase -%}\\n{%- case lensContrastEnhancement %}\\n  {% when lensContrastEnhancement.blank? %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n  {% when \\"False\\" %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n{%- else -%}\\n  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}\\n{%- endcase -%}\\n{%- case strassPresence %}\\n  {% when \\"False\\" %}\\n  {%- assign caseStrassPresence = false -%}\\n{%- else -%}\\n  {%- assign caseStrassPresence = strassPresence -%}\\n  {%- case strassPosition %}\\n    {% when \\"not present\\" %}\\n    {%- assign caseStrassPosition = false -%}\\n    {%- assign caseStrassPresence = false -%}\\n  {%- else -%}\\n    {%- assign caseStrassPresence = strassPosition -%}\\n    {%- assign caseStrassPosition = strassPresence -%}\\n  {%- endcase -%}\\n{%- endcase -%}\\n{%- case bridgeType %}\\n  {% when bridgeType.blank? %}\\n  {%- assign caseBridgeType = false -%}\\n  {%- when \'standard\' -%}\\n  {%- assign caseBridgeType = false -%}\\n{%- else -%}\\n  {%- assign caseBridgeType = bridgeType -%}\\n{%- endcase -%}\\n{%- case specialProjectType %}\\n  {% when specialProjectType.blank? %}\\n  {%- assign caseSpecialProjectType = false -%}\\n  {% when \\"collaboration\\" %}\\n  {%- assign caseSpecialProjectType = specialProjectType -%}\\n  {%- case specialProjectCollection %}\\n    {% when specialProjectCollection.blank? %}\\n    {%- assign caseSpecialProjectCollection = false -%}\\n  {%- else -%}\\n    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}\\n  {%- endcase -%}\\n{%- else -%}\\n  {%- assign caseSpecialProjectType = false -%}\\n{%- endcase -%}\\n{%- case frontMaterial %}\\n  {% when frontMaterial.blank? %}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'nylon\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'injected\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'o_matter\' -%}\\n  {%- assign caseFrontMaterial = \'o matter\' -%}\\n{%- else -%}\\n  {%- assign caseFrontMaterial = frontMaterial | downcase -%}\\n{%- endcase -%}\\n{%- case frameShape %}\\n  {% when frameShape.blank? %}\\n  {%- assign caseFrameShape = false -%}\\n{%- else -%}\\n  {%- assign caseFrameShape = frameShape | downcase -%}\\n{%- endcase -%}\\n{%- case frontColor %}\\n  {% when frontColor.blank? %}\\n  {%- assign caseFrontColor = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColor = frontColor | downcase -%}\\n{%- endcase -%}\\n{%- case frontColorFinish %}\\n  {% when frontColorFinish.blank? %}\\n  {%- assign caseFrontColorFinish = false -%}\\n  {%- when \'NOT APPLICABLE\' -%}\\n  {%- assign caseFrontColorFinish = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}\\n{%- endcase -%}\\n\\n{%- case modelName %}\\n  {%- when modelName.blank? %}\\n  {%- assign caseModelName = false -%}\\n{%- else %}\\n  {%- assign caseModelName = modelName | append: \' \' | append: productGroupFixed -%}\\n{%- endcase -%}\\n\\n{%- if caseModelName == false %}\\n  {%- if modelCodeDisplay \041= blank %}\\n    {%- assign caseModelName = modelCodeDisplay | append: \' \' | append: productGroupFixed -%}\\n  {%- endif %}\\n{%- endif -%}\\n\\n{% if caseModelName %}\\n  {%- assign brandAndModelName = brand | append: \' \' | append: modelName -%}\\n  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}\\n  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}\\n  {%- if modelName -%}\\n    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}\\n  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}\\n  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}\\n  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}\\n  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}\\n  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}\\n  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}\\n  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}\\n  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}\\n  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}\\n  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}\\n  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}\\n  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}\\n  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}\\n  {% if frameFoldability %}It is foldable.{% endif %}\\n  ####\\n{% endif %}"}]'
```

* Generate a Preview Completion

```sh
curl 'https://api.wordlift.io/content-generation/completions' -X POST \
    -H 'Accept: text/plain' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"frequency_penalty":0.5,"stop":"###","prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####","max_tokens":110,"temperature":0.7,"model_id":162,"presence_penalty":0.5,"min_words":45,"logit_bias":{}}'
```


* Add Word Biases to a Content Generation Project

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/words/imports' -X PUT \
    -H 'Accept: */*' \
    -H 'content-type: text/csv' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw 'penalize,clear,2867,-3'
```

* List Rules

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/rules?limit=2147483647' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

* Create Field Rule

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/rules' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"name":"Frame Material is Required","level":"REQUIRED","what_operand_lhs":"EVERYWHERE","what_operator":"CONTAINS","what_operand_rhs":"{{frontMaterial}}","when_operand_lhs":"frontMaterial","when_operator":"NOT_EQUALS","when_operand_rhs":"plastic,nylon,injected,propionate","fixes":[{"type":"OPEN_AI","what":"As {{brand}} content editor, read the following sentence and rewrite it by adding a reference to frame material being {{frontMaterial}}: \"{{completion}}\"."}],"type":"field"}'
```

* Create a Word Rule

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/rules' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"name":"Logo words are not present","level":"RECOMMENDED","what_operand_lhs":"EVERYWHERE","what_operator":"DOESNT_CONTAIN","what_operand_rhs":"values:logo,signature,embleme,branding","when_operand_lhs":"","when_operator":"ALWAYS","when_operand_rhs":"","fixes":[{"type":"OPEN_AI","what":"As {{brand}} content editor, read the following sentence and rewrite it by removing any reference to the {{value}}: \"{{completion}}\""}],"type":"word"}'
```

* Sync

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/syncs' -X POST \
    -H 'Accept: */*' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
    -H 'Content-Length: 0'
```

* Load a Content Generation Project

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

* List Rules

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/rules?limit=2147483647' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

* List Content Generation Project's Record

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records-sse' \
    -H 'Accept: */*' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

* Get Project's Stats

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/stats' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

* Regenerate One Record Completion

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records/253191' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"id":253191,"prompt":"Costa Diego is a pair of sunglasses. Costa Diego are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####","completion":null,"data":{"id":"https://data.luxottica.com/eyewear-sun/06S9034__903417","name":"06S9034__903417","type":"http://schema.org/Product","brand":"Costa","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"gray silver mirror","modelName":"Diego","bridgeType":"standard","frameShape":"rectangle","frontColor":"matte black","genderType":"man","maskShield":"False","roXability":"True","isLensPolar":"True","nosepadType":"plastic standard","templeColor":"matte black","frameFitting":"wide","isLensMirror":"True","materialType":"zpfn","productGroup":"sun","frontMaterial":"injected","lensBaseCurve":"base 8 decentered","lensTreatment":"mirror","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":"not present","strassPresence":"False","frameFoldability":null,"frontColorFinish":"matte","modelCodeDisplay":"6S9034","productStyleName":null,"channelAttributes":[{"channel":"DC - David Clulow","styleName":"6S9034 Diego"},{"channel":"LC - Lens Crafters","styleName":"6S9034 Diego"},{"channel":"AN - Arnette","styleName":"Diego"},{"channel":"VO - Vogue","styleName":"Diego"},{"channel":"OP - Oliver People","styleName":"Diego"},{"channel":"VD - Vision Direct","styleName":"6S9034 Diego"},{"channel":"OSI - OSI","styleName":"Diego"},{"channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"6S9034 Diego"},{"channel":"FD - Frames Direct","styleName":"6S9034 Diego"},{"channel":"SS - SmartShopper","styleName":"6S9034 Diego"},{"channel":"OPSM - OPSM","styleName":"6S9034 Diego"},{"channel":"NA - Native","styleName":"Diego"},{"channel":"CM - Costa Del Mar","styleName":"Diego"},{"channel":"MyLuxottica - MyLuxottica","styleName":"6S9034 Diego"},{"channel":"OO - Oakley","styleName":"Diego"},{"channel":"SGH - Sunglasshut","styleName":"6S9034 Diego"},{"channel":"SGS - Sunglasses Shop","styleName":"6S9034 Diego"},{"channel":"CL - Clearly","styleName":"6S9034 Diego"},{"channel":"TO - Target Optical","styleName":"6S9034 Diego"},{"channel":"RB - RayBan","styleName":"Diego"},{"channel":"GL - Glasses","styleName":"6S9034 Diego"},{"channel":"PO - Persol","styleName":"Diego"},{"channel":"AM - Alain Mikli","styleName":"Diego"}],"isLensPhotochromic":"False","productFamilyModel":"Diego","specialProjectType":"collaboration","ageGroupEnumeration":null,"eyewearLensMaterial":"polycarbonate","progressiveFriendly":"classic","eyewearTempleMaterial":"injected","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"True","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":false,"modified_at":"2023-12-19T09:26:03.605418090Z","validated_at":"2023-12-19T09:26:03.605287189Z","status":"valid"}'
```

* Get a Record Validation Report

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records/253191/validations' -X POST \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
    -H 'Content-Length: 0'
```

* Bulk Operations on Record: Regenerate Completions

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records-collection' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '[{"id":253191,"prompt":"Costa Diego is a pair of sunglasses. Costa Diego are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####","completion":null,"data":{"id":"https://data.luxottica.com/eyewear-sun/06S9034__903417","name":"06S9034__903417","type":"http://schema.org/Product","brand":"Costa","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"gray silver mirror","modelName":"Diego","bridgeType":"standard","frameShape":"rectangle","frontColor":"matte black","genderType":"man","maskShield":"False","roXability":"True","isLensPolar":"True","nosepadType":"plastic standard","templeColor":"matte black","frameFitting":"wide","isLensMirror":"True","materialType":"zpfn","productGroup":"sun","frontMaterial":"injected","lensBaseCurve":"base 8 decentered","lensTreatment":"mirror","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":"not present","strassPresence":"False","frameFoldability":null,"frontColorFinish":"matte","modelCodeDisplay":"6S9034","productStyleName":null,"channelAttributes":[{"channel":"DC - David Clulow","styleName":"6S9034 Diego"},{"channel":"LC - Lens Crafters","styleName":"6S9034 Diego"},{"channel":"AN - Arnette","styleName":"Diego"},{"channel":"VO - Vogue","styleName":"Diego"},{"channel":"OP - Oliver People","styleName":"Diego"},{"channel":"VD - Vision Direct","styleName":"6S9034 Diego"},{"channel":"OSI - OSI","styleName":"Diego"},{"channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"6S9034 Diego"},{"channel":"FD - Frames Direct","styleName":"6S9034 Diego"},{"channel":"SS - SmartShopper","styleName":"6S9034 Diego"},{"channel":"OPSM - OPSM","styleName":"6S9034 Diego"},{"channel":"NA - Native","styleName":"Diego"},{"channel":"CM - Costa Del Mar","styleName":"Diego"},{"channel":"MyLuxottica - MyLuxottica","styleName":"6S9034 Diego"},{"channel":"OO - Oakley","styleName":"Diego"},{"channel":"SGH - Sunglasshut","styleName":"6S9034 Diego"},{"channel":"SGS - Sunglasses Shop","styleName":"6S9034 Diego"},{"channel":"CL - Clearly","styleName":"6S9034 Diego"},{"channel":"TO - Target Optical","styleName":"6S9034 Diego"},{"channel":"RB - RayBan","styleName":"Diego"},{"channel":"GL - Glasses","styleName":"6S9034 Diego"},{"channel":"PO - Persol","styleName":"Diego"},{"channel":"AM - Alain Mikli","styleName":"Diego"}],"isLensPhotochromic":"False","productFamilyModel":"Diego","specialProjectType":"collaboration","ageGroupEnumeration":null,"eyewearLensMaterial":"polycarbonate","progressiveFriendly":"classic","eyewearTempleMaterial":"injected","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"True","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":false,"modified_at":"2023-12-19T09:28:07.255285469Z","validated_at":"2023-12-19T09:28:06.817717Z","status":"valid"},{"id":253192,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####","completion":null,"data":{"id":"https://data.luxottica.com/eyewear-sun/0AR6123B__30028E","name":"0AR6123B__30028E","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"adjustable nosepads","faceShape":"Round-Oval-Square","frameType":"rimless","lensColor":"gradient green","modelName":null,"bridgeType":"standard","frameShape":"square","frontColor":"pale gold","genderType":"woman","maskShield":"False","roXability":"False","isLensPolar":"False","nosepadType":"metal standard","templeColor":"pale gold","frameFitting":"regular","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"metal","lensBaseCurve":"base 4","lensTreatment":"gradient","macroAgeRange":"adult","isLensGradient":"True","lensProtection":null,"strassPosition":"strass on metal component and","strassPresence":"True","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR6123B","productStyleName":null,"channelAttributes":[{"channel":null,"styleName":null},{"channel":"PO - Persol","styleName":"AR6123B"},{"channel":"MyLuxottica - MyLuxottica","styleName":"AR6123B"},{"channel":"SGH - Sunglasshut","styleName":"AR6123B"},{"channel":"OP - Oliver People","styleName":"AR6123B"},{"channel":"OPSM - OPSM","styleName":"AR6123B"},{"channel":"TO - Target Optical","styleName":"AR6123B"},{"channel":"FD - Frames Direct","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"CM - Costa Del Mar","styleName":"AR6123B"},{"channel":"VO - Vogue","styleName":"AR6123B"},{"channel":"SS - SmartShopper","styleName":"AR6123B"},{"channel":"LC - Lens Crafters","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"OSI - OSI","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"DC - David Clulow","styleName":"AR6123B"},{"channel":"OO - Oakley","styleName":"AR6123B"},{"channel":"AN - Arnette","styleName":"AR6123B"},{"channel":"NA - Native","styleName":"AR6123B"},{"channel":"RB - RayBan","styleName":"AR6123B"},{"channel":"GL - Glasses","styleName":"AR6123B"},{"channel":"AM - Alain Mikli","styleName":"AR6123B"}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":"event","ageGroupEnumeration":null,"eyewearLensMaterial":"polyamide","progressiveFriendly":"classic","eyewearTempleMaterial":"metal","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"rimless","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":false,"modified_at":"2023-12-19T09:26:03.688369862Z","validated_at":"2023-12-19T09:26:03.688220461Z","status":"valid"},{"id":253193,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is solid color. The lens color facet is blue. The frame material is acetate. The shape is square. The frame color finish is polished. The frame color is black. It features a key bridge. ####","completion":null,"data":{"id":"https://data.luxottica.com/eyewear-sun/0AR8107__5017R5","name":"0AR8107__5017R5","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"blue","modelName":null,"bridgeType":"key bridge","frameShape":"square","frontColor":"black","genderType":"man","maskShield":"False","roXability":"True","isLensPolar":"False","nosepadType":"standard","templeColor":"black","frameFitting":"regular","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"acetate","lensBaseCurve":"base 6","lensTreatment":"solid color","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":null,"strassPresence":"False","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR8107","productStyleName":null,"channelAttributes":[{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":null,"ageGroupEnumeration":null,"eyewearLensMaterial":"crystal","progressiveFriendly":"classic","eyewearTempleMaterial":"acetate","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"False"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":false,"modified_at":"2023-12-19T09:26:04.080491142Z","validated_at":"2023-12-19T09:26:04.080346940Z","status":"valid"},{"id":253194,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is solid color. The lens color facet is grey. The color of the temples is havana. The frame material is acetate. The shape is square. The frame color finish is polished. The frame color is black. ####","completion":null,"data":{"id":"https://data.luxottica.com/eyewear-sun/0AR8110__501787","name":"0AR8110__501787","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"grey","modelName":null,"bridgeType":"standard","frameShape":"square","frontColor":"black","genderType":"woman","maskShield":"False","roXability":"True","isLensPolar":"False","nosepadType":"standard","templeColor":"havana","frameFitting":"wide","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"acetate","lensBaseCurve":"base 6","lensTreatment":"solid color","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":null,"strassPresence":"False","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR8110","productStyleName":null,"channelAttributes":[{"channel":"SGS - Sunglasses Shop","styleName":"AR8110"},{"channel":"TO - Target Optical","styleName":"AR8110"},{"channel":"VO - Vogue","styleName":"AR8110"},{"channel":"AN - Arnette","styleName":"AR8110"},{"channel":"OO - Oakley","styleName":"AR8110"},{"channel":"FD - Frames Direct","styleName":"AR8110"},{"channel":"SS - SmartShopper","styleName":"AR8110"},{"channel":"AM - Alain Mikli","styleName":"AR8110"},{"channel":"NA - Native","styleName":"AR8110"},{"channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"AR8110"},{"channel":"SGH - Sunglasshut","styleName":"AR8110"},{"channel":"OPSM - OPSM","styleName":"AR8110"},{"channel":"LC - Lens Crafters","styleName":"AR8110"},{"channel":"GL - Glasses","styleName":"AR8110"},{"channel":"OSI - OSI","styleName":"AR8110"},{"channel":"CM - Costa Del Mar","styleName":"AR8110"},{"channel":"MyLuxottica - MyLuxottica","styleName":"AR8110"},{"channel":"PO - Persol","styleName":"AR8110"},{"channel":"OP - Oliver People","styleName":"AR8110"},{"channel":"RB - RayBan","styleName":"AR8110"},{"channel":"VD - Vision Direct","styleName":"AR8110"},{"channel":"CL - Clearly","styleName":"AR8110"},{"channel":"DC - David Clulow","styleName":"AR8110"}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":null,"ageGroupEnumeration":null,"eyewearLensMaterial":"polyamide","progressiveFriendly":"classic","eyewearTempleMaterial":"acetate","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"False"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":false,"modified_at":"2023-12-19T09:26:05.677712692Z","validated_at":"2023-12-19T09:26:05.677532790Z","status":"valid"}]'
```

* Accept a Record

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records/253191' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"id":253191,"prompt":"Costa Diego is a pair of sunglasses. Costa Diego are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####","completion":"Costa Diego are a stylish choice for those seeking a versatile everyday accessory. The matte black frames exude sophistication and feature lens contrast enhancement, while the gray silver mirror lenses offer a distinctive touch of style. These rectangle-shaped shades are designed for optimal comfort and feature polarized lenses that provide optimal protection from harmful UV rays and reduce glare.","data":{"id":"https://data.luxottica.com/eyewear-sun/06S9034__903417","name":"06S9034__903417","type":"http://schema.org/Product","brand":"Costa","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"gray silver mirror","modelName":"Diego","bridgeType":"standard","frameShape":"rectangle","frontColor":"matte black","genderType":"man","maskShield":"False","roXability":"True","isLensPolar":"True","nosepadType":"plastic standard","templeColor":"matte black","frameFitting":"wide","isLensMirror":"True","materialType":"zpfn","productGroup":"sun","frontMaterial":"injected","lensBaseCurve":"base 8 decentered","lensTreatment":"mirror","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":"not present","strassPresence":"False","frameFoldability":null,"frontColorFinish":"matte","modelCodeDisplay":"6S9034","productStyleName":null,"channelAttributes":[{"channel":"DC - David Clulow","styleName":"6S9034 Diego"},{"channel":"LC - Lens Crafters","styleName":"6S9034 Diego"},{"channel":"AN - Arnette","styleName":"Diego"},{"channel":"VO - Vogue","styleName":"Diego"},{"channel":"OP - Oliver People","styleName":"Diego"},{"channel":"VD - Vision Direct","styleName":"6S9034 Diego"},{"channel":"OSI - OSI","styleName":"Diego"},{"channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"6S9034 Diego"},{"channel":"FD - Frames Direct","styleName":"6S9034 Diego"},{"channel":"SS - SmartShopper","styleName":"6S9034 Diego"},{"channel":"OPSM - OPSM","styleName":"6S9034 Diego"},{"channel":"NA - Native","styleName":"Diego"},{"channel":"CM - Costa Del Mar","styleName":"Diego"},{"channel":"MyLuxottica - MyLuxottica","styleName":"6S9034 Diego"},{"channel":"OO - Oakley","styleName":"Diego"},{"channel":"SGH - Sunglasshut","styleName":"6S9034 Diego"},{"channel":"SGS - Sunglasses Shop","styleName":"6S9034 Diego"},{"channel":"CL - Clearly","styleName":"6S9034 Diego"},{"channel":"TO - Target Optical","styleName":"6S9034 Diego"},{"channel":"RB - RayBan","styleName":"Diego"},{"channel":"GL - Glasses","styleName":"6S9034 Diego"},{"channel":"PO - Persol","styleName":"Diego"},{"channel":"AM - Alain Mikli","styleName":"Diego"}],"isLensPhotochromic":"False","productFamilyModel":"Diego","specialProjectType":"collaboration","ageGroupEnumeration":null,"eyewearLensMaterial":"polycarbonate","progressiveFriendly":"classic","eyewearTempleMaterial":"injected","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"True","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":true,"has_upvote":false,"modified_at":"2023-12-19T09:28:29.669159280Z","validated_at":"2023-12-19T09:28:29.663376034Z","status":"valid"}'
```

* Upvote a Completion

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records/253192' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"id":253192,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####","completion":"Elevating the square metal frame to new heights of sophistication, Giorgio Armani presents a cutting-edge design with strass on metal component and strass on metal component embellishment. The sunglasses are crafted in a striking pale gold metal color and feature gradient green lenses for an extra dose of style. With its square shape and unique design details, this pair is sure to turn heads wherever you go.","data":{"id":"https://data.luxottica.com/eyewear-sun/0AR6123B__30028E","name":"0AR6123B__30028E","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"adjustable nosepads","faceShape":"Round-Oval-Square","frameType":"rimless","lensColor":"gradient green","modelName":null,"bridgeType":"standard","frameShape":"square","frontColor":"pale gold","genderType":"woman","maskShield":"False","roXability":"False","isLensPolar":"False","nosepadType":"metal standard","templeColor":"pale gold","frameFitting":"regular","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"metal","lensBaseCurve":"base 4","lensTreatment":"gradient","macroAgeRange":"adult","isLensGradient":"True","lensProtection":null,"strassPosition":"strass on metal component and","strassPresence":"True","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR6123B","productStyleName":null,"channelAttributes":[{"channel":null,"styleName":null},{"channel":"PO - Persol","styleName":"AR6123B"},{"channel":"MyLuxottica - MyLuxottica","styleName":"AR6123B"},{"channel":"SGH - Sunglasshut","styleName":"AR6123B"},{"channel":"OP - Oliver People","styleName":"AR6123B"},{"channel":"OPSM - OPSM","styleName":"AR6123B"},{"channel":"TO - Target Optical","styleName":"AR6123B"},{"channel":"FD - Frames Direct","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"CM - Costa Del Mar","styleName":"AR6123B"},{"channel":"VO - Vogue","styleName":"AR6123B"},{"channel":"SS - SmartShopper","styleName":"AR6123B"},{"channel":"LC - Lens Crafters","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"OSI - OSI","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"DC - David Clulow","styleName":"AR6123B"},{"channel":"OO - Oakley","styleName":"AR6123B"},{"channel":"AN - Arnette","styleName":"AR6123B"},{"channel":"NA - Native","styleName":"AR6123B"},{"channel":"RB - RayBan","styleName":"AR6123B"},{"channel":"GL - Glasses","styleName":"AR6123B"},{"channel":"AM - Alain Mikli","styleName":"AR6123B"}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":"event","ageGroupEnumeration":null,"eyewearLensMaterial":"polyamide","progressiveFriendly":"classic","eyewearTempleMaterial":"metal","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"rimless","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":true,"modified_at":"2023-12-19T09:28:29.951139704Z","validated_at":"2023-12-19T09:28:29.947073572Z","status":"valid"}'
```

* Manually set and accept a Completion

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records/253192' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"id":253192,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####","completion":"AAA Elevating the square metal frame to new heights of sophistication, Giorgio Armani presents a cutting-edge design with strass on metal component and strass on metal component embellishment. The sunglasses are crafted in a striking pale gold metal color and feature gradient green lenses for an extra dose of style. With its square shape and unique design details, this pair is sure to turn heads wherever you go.","data":{"id":"https://data.luxottica.com/eyewear-sun/0AR6123B__30028E","name":"0AR6123B__30028E","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"adjustable nosepads","faceShape":"Round-Oval-Square","frameType":"rimless","lensColor":"gradient green","modelName":null,"bridgeType":"standard","frameShape":"square","frontColor":"pale gold","genderType":"woman","maskShield":"False","roXability":"False","isLensPolar":"False","nosepadType":"metal standard","templeColor":"pale gold","frameFitting":"regular","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"metal","lensBaseCurve":"base 4","lensTreatment":"gradient","macroAgeRange":"adult","isLensGradient":"True","lensProtection":null,"strassPosition":"strass on metal component and","strassPresence":"True","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR6123B","productStyleName":null,"channelAttributes":[{"channel":null,"styleName":null},{"channel":"PO - Persol","styleName":"AR6123B"},{"channel":"MyLuxottica - MyLuxottica","styleName":"AR6123B"},{"channel":"SGH - Sunglasshut","styleName":"AR6123B"},{"channel":"OP - Oliver People","styleName":"AR6123B"},{"channel":"OPSM - OPSM","styleName":"AR6123B"},{"channel":"TO - Target Optical","styleName":"AR6123B"},{"channel":"FD - Frames Direct","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"CM - Costa Del Mar","styleName":"AR6123B"},{"channel":"VO - Vogue","styleName":"AR6123B"},{"channel":"SS - SmartShopper","styleName":"AR6123B"},{"channel":"LC - Lens Crafters","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"OSI - OSI","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"DC - David Clulow","styleName":"AR6123B"},{"channel":"OO - Oakley","styleName":"AR6123B"},{"channel":"AN - Arnette","styleName":"AR6123B"},{"channel":"NA - Native","styleName":"AR6123B"},{"channel":"RB - RayBan","styleName":"AR6123B"},{"channel":"GL - Glasses","styleName":"AR6123B"},{"channel":"AM - Alain Mikli","styleName":"AR6123B"}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":"event","ageGroupEnumeration":null,"eyewearLensMaterial":"polyamide","progressiveFriendly":"classic","eyewearTempleMaterial":"metal","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"rimless","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":false,"has_upvote":false,"modified_at":"2023-12-19T09:28:29.951139704Z","validated_at":"2023-12-19T09:28:29.947073572Z","status":"valid"}'
```

* Bulk Accept

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records-collection' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '[{"id":253191,"prompt":"Costa Diego is a pair of sunglasses. Costa Diego are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####","completion":"Costa Diego are a stylish choice for those seeking a versatile everyday accessory. The matte black frames exude sophistication and feature lens contrast enhancement, while the gray silver mirror lenses offer a distinctive touch of style. These rectangle-shaped shades are designed for optimal comfort and feature polarized lenses that provide optimal protection from harmful UV rays and reduce glare.","data":{"id":"https://data.luxottica.com/eyewear-sun/06S9034__903417","name":"06S9034__903417","type":"http://schema.org/Product","brand":"Costa","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"gray silver mirror","modelName":"Diego","bridgeType":"standard","frameShape":"rectangle","frontColor":"matte black","genderType":"man","maskShield":"False","roXability":"True","isLensPolar":"True","nosepadType":"plastic standard","templeColor":"matte black","frameFitting":"wide","isLensMirror":"True","materialType":"zpfn","productGroup":"sun","frontMaterial":"injected","lensBaseCurve":"base 8 decentered","lensTreatment":"mirror","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":"not present","strassPresence":"False","frameFoldability":null,"frontColorFinish":"matte","modelCodeDisplay":"6S9034","productStyleName":null,"channelAttributes":[{"channel":"DC - David Clulow","styleName":"6S9034 Diego"},{"channel":"LC - Lens Crafters","styleName":"6S9034 Diego"},{"channel":"AN - Arnette","styleName":"Diego"},{"channel":"VO - Vogue","styleName":"Diego"},{"channel":"OP - Oliver People","styleName":"Diego"},{"channel":"VD - Vision Direct","styleName":"6S9034 Diego"},{"channel":"OSI - OSI","styleName":"Diego"},{"channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"6S9034 Diego"},{"channel":"FD - Frames Direct","styleName":"6S9034 Diego"},{"channel":"SS - SmartShopper","styleName":"6S9034 Diego"},{"channel":"OPSM - OPSM","styleName":"6S9034 Diego"},{"channel":"NA - Native","styleName":"Diego"},{"channel":"CM - Costa Del Mar","styleName":"Diego"},{"channel":"MyLuxottica - MyLuxottica","styleName":"6S9034 Diego"},{"channel":"OO - Oakley","styleName":"Diego"},{"channel":"SGH - Sunglasshut","styleName":"6S9034 Diego"},{"channel":"SGS - Sunglasses Shop","styleName":"6S9034 Diego"},{"channel":"CL - Clearly","styleName":"6S9034 Diego"},{"channel":"TO - Target Optical","styleName":"6S9034 Diego"},{"channel":"RB - RayBan","styleName":"Diego"},{"channel":"GL - Glasses","styleName":"6S9034 Diego"},{"channel":"PO - Persol","styleName":"Diego"},{"channel":"AM - Alain Mikli","styleName":"Diego"}],"isLensPhotochromic":"False","productFamilyModel":"Diego","specialProjectType":"collaboration","ageGroupEnumeration":null,"eyewearLensMaterial":"polycarbonate","progressiveFriendly":"classic","eyewearTempleMaterial":"injected","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"True","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":true,"has_upvote":false,"modified_at":"2023-12-19T09:28:29.669159280Z","validated_at":"2023-12-19T09:28:29.663376034Z","status":"valid"},{"id":253192,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####","completion":"AAA Elevating the square metal frame to new heights of sophistication, Giorgio Armani presents a cutting-edge design with strass on metal component and strass on metal component embellishment. The sunglasses are crafted in a striking pale gold metal color and feature gradient green lenses for an extra dose of style. With its square shape and unique design details, this pair is sure to turn heads wherever you go.","data":{"id":"https://data.luxottica.com/eyewear-sun/0AR6123B__30028E","name":"0AR6123B__30028E","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"adjustable nosepads","faceShape":"Round-Oval-Square","frameType":"rimless","lensColor":"gradient green","modelName":null,"bridgeType":"standard","frameShape":"square","frontColor":"pale gold","genderType":"woman","maskShield":"False","roXability":"False","isLensPolar":"False","nosepadType":"metal standard","templeColor":"pale gold","frameFitting":"regular","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"metal","lensBaseCurve":"base 4","lensTreatment":"gradient","macroAgeRange":"adult","isLensGradient":"True","lensProtection":null,"strassPosition":"strass on metal component and","strassPresence":"True","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR6123B","productStyleName":null,"channelAttributes":[{"channel":null,"styleName":null},{"channel":"PO - Persol","styleName":"AR6123B"},{"channel":"MyLuxottica - MyLuxottica","styleName":"AR6123B"},{"channel":"SGH - Sunglasshut","styleName":"AR6123B"},{"channel":"OP - Oliver People","styleName":"AR6123B"},{"channel":"OPSM - OPSM","styleName":"AR6123B"},{"channel":"TO - Target Optical","styleName":"AR6123B"},{"channel":"FD - Frames Direct","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"CM - Costa Del Mar","styleName":"AR6123B"},{"channel":"VO - Vogue","styleName":"AR6123B"},{"channel":"SS - SmartShopper","styleName":"AR6123B"},{"channel":"LC - Lens Crafters","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"OSI - OSI","styleName":"AR6123B"},{"channel":null,"styleName":null},{"channel":"DC - David Clulow","styleName":"AR6123B"},{"channel":"OO - Oakley","styleName":"AR6123B"},{"channel":"AN - Arnette","styleName":"AR6123B"},{"channel":"NA - Native","styleName":"AR6123B"},{"channel":"RB - RayBan","styleName":"AR6123B"},{"channel":"GL - Glasses","styleName":"AR6123B"},{"channel":"AM - Alain Mikli","styleName":"AR6123B"}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":"event","ageGroupEnumeration":null,"eyewearLensMaterial":"polyamide","progressiveFriendly":"classic","eyewearTempleMaterial":"metal","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"rimless","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"True"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":true,"has_upvote":false,"modified_at":"2023-12-19T09:28:29.951139704Z","validated_at":"2023-12-19T09:28:29.947073572Z","status":"valid"},{"id":253193,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is solid color. The lens color facet is blue. The frame material is acetate. The shape is square. The frame color finish is polished. The frame color is black. It features a key bridge. ####","completion":"A modern take on a timeless square shape, Giorgio Armani sunglasses are perfect for those who want to make a statement without being too loud. The solid blue lenses and black acetate frames add a touch of sophistication, while the key bridge adds an extra dimension of style. These shades are ideal for those who want to make a fashionable yet understated statement.","data":{"id":"https://data.luxottica.com/eyewear-sun/0AR8107__5017R5","name":"0AR8107__5017R5","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"blue","modelName":null,"bridgeType":"key bridge","frameShape":"square","frontColor":"black","genderType":"man","maskShield":"False","roXability":"True","isLensPolar":"False","nosepadType":"standard","templeColor":"black","frameFitting":"regular","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"acetate","lensBaseCurve":"base 6","lensTreatment":"solid color","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":null,"strassPresence":"False","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR8107","productStyleName":null,"channelAttributes":[{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null},{"channel":null,"styleName":null}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":null,"ageGroupEnumeration":null,"eyewearLensMaterial":"crystal","progressiveFriendly":"classic","eyewearTempleMaterial":"acetate","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"False"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":true,"has_upvote":false,"modified_at":"2023-12-19T09:28:32.049780860Z","validated_at":"2023-12-19T09:28:32.045334725Z","status":"valid"},{"id":253194,"prompt":"Giorgio Armani is a pair of sunglasses. The lens treatment is solid color. The lens color facet is grey. The color of the temples is havana. The frame material is acetate. The shape is square. The frame color finish is polished. The frame color is black. ####","completion":"Elevate your style with Giorgio Armani sunglasses. The solid grey lens treatment exudes sophistication, while the square frame and havana temples add a touch of elegance. Made in black color with polished finish on the front and temples, this sophisticated design embodies timeless allure. Crafted from exquisite materials such as acetate, these sunglasses offer both comfort and durability. Experience exceptional quality paired with exquisite craftsmanship that epitomizes the essence of luxury.","data":{"id":"https://data.luxottica.com/eyewear-sun/0AR8110__501787","name":"0AR8110__501787","type":"http://schema.org/Product","brand":"Giorgio Armani","release":null,"category":"Optical","modelFit":"high bridge fit","faceShape":"Oval-Round","frameType":"full rim","lensColor":"grey","modelName":null,"bridgeType":"standard","frameShape":"square","frontColor":"black","genderType":"woman","maskShield":"False","roXability":"True","isLensPolar":"False","nosepadType":"standard","templeColor":"havana","frameFitting":"wide","isLensMirror":"False","materialType":"zpfn","productGroup":"sun","frontMaterial":"acetate","lensBaseCurve":"base 6","lensTreatment":"solid color","macroAgeRange":"adult","isLensGradient":"False","lensProtection":null,"strassPosition":null,"strassPresence":"False","frameFoldability":null,"frontColorFinish":"polished","modelCodeDisplay":"AR8110","productStyleName":null,"channelAttributes":[{"channel":"SGS - Sunglasses Shop","styleName":"AR8110"},{"channel":"TO - Target Optical","styleName":"AR8110"},{"channel":"VO - Vogue","styleName":"AR8110"},{"channel":"AN - Arnette","styleName":"AR8110"},{"channel":"OO - Oakley","styleName":"AR8110"},{"channel":"FD - Frames Direct","styleName":"AR8110"},{"channel":"SS - SmartShopper","styleName":"AR8110"},{"channel":"AM - Alain Mikli","styleName":"AR8110"},{"channel":"NA - Native","styleName":"AR8110"},{"channel":"SV - Salmoiraghi e Vigan&#xF2;","styleName":"AR8110"},{"channel":"SGH - Sunglasshut","styleName":"AR8110"},{"channel":"OPSM - OPSM","styleName":"AR8110"},{"channel":"LC - Lens Crafters","styleName":"AR8110"},{"channel":"GL - Glasses","styleName":"AR8110"},{"channel":"OSI - OSI","styleName":"AR8110"},{"channel":"CM - Costa Del Mar","styleName":"AR8110"},{"channel":"MyLuxottica - MyLuxottica","styleName":"AR8110"},{"channel":"PO - Persol","styleName":"AR8110"},{"channel":"OP - Oliver People","styleName":"AR8110"},{"channel":"RB - RayBan","styleName":"AR8110"},{"channel":"VD - Vision Direct","styleName":"AR8110"},{"channel":"CL - Clearly","styleName":"AR8110"},{"channel":"DC - David Clulow","styleName":"AR8110"}],"isLensPhotochromic":"False","productFamilyModel":null,"specialProjectType":null,"ageGroupEnumeration":null,"eyewearLensMaterial":"polyamide","progressiveFriendly":"classic","eyewearTempleMaterial":"acetate","specialProjectSponsor":null,"isLensBlueLightFiltered":"False","lensAssemblyTypeOnFrame":"full rim","lensContrastEnhancement":"False","specialProjectCollection":null,"specialProjectFeaturesFlag":"False"},"errors":null,"warnings":null,"content_generation_id":608,"not_in_prompt_words":[],"is_accepted":true,"has_upvote":false,"modified_at":"2023-12-19T09:28:32.680935945Z","validated_at":"2023-12-19T09:28:32.675429602Z","status":"valid"}]'
```

* Export

```sh
https://my.wordlift.io/assets/service-workers/download/content-generation/content-generations/608/records.tsv?apiUrl=https%3A%2F%2Fapi.wordlift.io&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjE2NTk5NDE5NTkifQ.eyJpZCI6InI4bWE4Ymxmc29rZHF4cmhvZzNodzI5eHRwM21wYWZvY2R2cGkyM3UiLCJqdGkiOiJyOG1hOGJsZnNva2RxeHJob2czaHcyOXh0cDNtcGFmb2NkdnBpMjN1IiwiaXNzIjoiaHR0cHM6XC9cL3Mud29yZGxpZnQuaW8iLCJhdWQiOiJaNXZFWmI3RzZVQkZ6OXFjR0kyU0pna0pnSVJValBMMzNrMjRnbHR1Iiwic3ViIjoiMTU4NiIsImV4cCI6MTcwMjk4NDAxNCwiaWF0IjoxNzAyOTgwNDE0LCJ0b2tlbl90eXBlIjoiYmVhcmVyIiwic2NvcGUiOiJvcGVuaWQgcm9sZTpzdWJzY3JpYmVyIiwicm9sZXMiOiJjb250ZW50LWdlbmVyYXRpb25zIG1lcmNoYW50cyIsInJvbGUiOiJ1c2VyIiwibG9nb3V0X3VybCI6Imh0dHBzOlwvXC9zLndvcmRsaWZ0LmlvXC93cC1sb2dpbi5waHA_YWN0aW9uPWxvZ291dCZhbXA7cmVkaXJlY3RfdG89aHR0cHMlM0ElMkYlMkZzLndvcmRsaWZ0LmlvJTJGd3AtbG9naW4ucGhwJmFtcDtfd3Bub25jZT0wN2JkMDA1NWM2IiwidXNlciI6eyJuYW1lIjoiZmVkZXJpY28gcmViZXNjaGluaSIsImZpcnN0X25hbWUiOiJmZWRlcmljbyIsImxhc3RfbmFtZSI6InJlYmVzY2hpbmkiLCJlbWFpbCI6IkZlZGVyaWNvLnJlYmVzY2hpbmktbHV4b3R0aWNhQHdvcmRsaWZ0LmlvIiwicGljdHVyZSI6Imh0dHBzOlwvXC9zZWN1cmUuZ3JhdmF0YXIuY29tXC9hdmF0YXJcLzA1NTY5ZWI2YTJjN2QyZmJhNTYzNDNlZTZiNTZkNTEyP3M9OTYmZD1tbSZyPWcifX0.eobIqlM-nP-VygdZ6jXJkd-6MbYqPuCZSe9h2d1tqdJJaypqa6ydLGfMbCqttyo8cGw8YMaWIXaWF13sPigZAQ8cQ-8lPz8uOxlIbPRDYB8tw2wzJICMkjsARHaxu1E78M-Jk-e1E608QtdqTfP4RPUGHPYUfd9G37JVRUWHnWJFKQMx1rrINlPdfb0omduH3l1vnuECuZHJRX6bPFm5S-U6hnCtUAf5iaXQFxHgKEA42aczECYlQzEY8G5nXdpPzlSBB9PS1U6zfcO8nlcF58Y4jDgb1Fv7MpZdMcFZvWGz9U244utRwGHydNq9laVEoPV6Lqbek9qvpqP337J7Ew```

* Delete a Project


```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'{"id":608,"name":"My Test Project (delete me)","penalty":0.5,"temperature":0.7,"stop":"###","deleted":true,"model_id":162,"max_tokens":110,"created_at":"2023-12-19T09:21:21.949851Z","modified_at":"2023-12-19T09:21:21.949851Z","deleted_at":null,"min_words":45,"graphql_query":"query {\\n\\tproducts(\\n\\tquery: {\\n  \\tnameConstraint: {\\n    \\tin: [\\n\\"0AR6123B__30028E\\",\\"0AR8107__5017R5\\",\\"0AR8110__501787\\",\\"06S9034__903417\\"]\\n  \\t}\\n\\t}\\n  ) {\\n\\tid: iri\\n\\tbrand: string(name: \\"schema:brand\\")\\n\\tname: string(name: \\"schema:name\\")\\n\\ttype: string(name: \\"rdf:type\\")\\n\\tcategory: string(name: \\"eyewear:category\\")\\n\\tproductGroup: string(name: \\"eyewear:eyewearProductGroup\\")\\n\\tbridgeType: string(name: \\"eyewear:bridgeType\\")\\n\\tframeShape: string(name: \\"eyewear:frameShape\\")\\n\\tfaceShape: string(name: \\"eyewear:faceShape\\")\\n\\tframeFitting: string(name: \\"eyewear:frameFitting\\")\\n\\tfrontColorFinish: string(name: \\"eyewear:frontColorFinish\\")\\n\\tmacroAgeRange: string(name: \\"eyewear:macroAgeRange\\")\\n\\tageGroupEnumeration: string(name: \\"eyewear:ageGroupEnumeration\\")\\n\\tlensAssemblyTypeOnFrame: string(name: \\"eyewear:lensAssemblyTypeOnFrame\\")\\n\\tframeType: string(name: \\"eyewear:frameType\\")\\n\\teyewearLensMaterial: string(name: \\"eyewear:eyewearLensMaterial\\")\\n\\teyewearTempleMaterial: string(name: \\"eyewear:eyewearTempleMaterial\\")\\n\\tnosepadType: string(name: \\"eyewear:nosepadType\\")\\n\\trelease: string(name: \\"eyewear:release\\")\\n\\tspecialProjectCollection: string(name: \\"eyewear:specialProjectCollection\\")\\n\\tspecialProjectSponsor: string(name: \\"eyewear:specialProjectSponsor\\")\\n\\tspecialProjectType: string(name: \\"eyewear:specialProjectType\\")\\n\\tspecialProjectFeaturesFlag: string(name: \\"eyewear:specialProjectFeaturesFlag\\")\\n\\tlensTreatment: string(name: \\"eyewear:lensTreatment\\")\\n\\tlensColor: string(name: \\"eyewear:lensColor\\")\\n\\tproductStyleName: string(name: \\"eyewear:productStyleName\\")\\n\\tproductFamilyModel: string(name: \\"eyewear:productFamilyModel\\")\\n\\tframeFoldability: string(name: \\"eyewear:frameFoldability\\")\\n\\troXability: string(name: \\"eyewear:roXability\\")\\n\\tisLensPhotochromic: string(name: \\"eyewear:isLensPhotochromic\\")\\n\\tisLensPolar: string(name: \\"eyewear:isLensPolar\\")\\n\\tmodelCodeDisplay: string(name: \\"eyewear:modelCodeDisplay\\")\\n\\tprogressiveFriendly: string(name: \\"eyewear:progressiveFriendly\\")\\n\\tmaterialType: string(name: \\"eyewear:materialType\\")\\n\\tmaskShield: string(name: \\"eyewear:maskShield\\")\\n\\tstrassPresence: string(name: \\"eyewear:strassPresence\\")\\n\\tstrassPosition: string(name: \\"eyewear:strassPosition\\")\\n\\tlensContrastEnhancement: string(name: \\"eyewear:lensContrastEnhancement\\")\\n\\tlensBaseCurve: string(name: \\"eyewear:lensBaseCurve\\")\\n\\tisLensGradient: string(name: \\"eyewear:isLensGradient\\")\\n\\tisLensMirror: string(name: \\"eyewear:isLensMirror\\")\\n\\tmodelFit: string(name: \\"eyewear:modelFit\\")\\n\\tmodelName: string(name: \\"eyewear:modelName\\")\\n\\tfrontMaterial: string(name: \\"eyewear:frontMaterial\\")\\n\\tlensProtection: string(name: \\"eyewear:lensProtection\\")\\n\\ttempleColor: string(name: \\"eyewear:templeColor\\")\\n\\tfrontColor: string(name: \\"eyewear:frontColor\\")\\n\\tisLensBlueLightFiltered: string(name: \\"eyewear:isLensBlueLightFiltered\\")\\n\\tgenderType: string(name: \\"eyewear:genderType\\")\\n\\tlensProtection: string(name: \\"eyewear:lensProtection\\")\\n\\tchannelAttributes: resources(name: \\"eyewear:channelAttributes\\") {\\n  \\tchannel: string(name: \\"eyewear:channel\\")\\n  \\tstyleName: string(name: \\"eyewear:styleName\\")\\n\\t}\\n  }\\n}\\n","prompt_template":"{%- case genderType -%}\\n  {%- when \'MAN\' or \'man\' -%}\\n  {%- assign genderTypeFixed = \'men\' -%}\\n  {%- when \'WOMAN\' or \'woman\' -%}\\n  {%- assign genderTypeFixed = \'women\' -%}\\n  {%- when \'UNISEX\' -%}\\n  {%- assign genderTypeFixed = \'unisex\' -%}\\n{%- else -%}\\n  {%- assign genderTypeFixed = genderType | downcase -%}\\n{%- endcase -%}\\n{%- case macroAgeRange -%}\\n  {%- when \'Children\' or \'children\' -%}\\n  {%- assign genderTypeFixed = \'children\' -%}\\n{%- endcase -%}\\n{%- case lensTreatment %}\\n  {% when lensTreatment.blank? %}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- when \'classic\' -%}\\n  {%- assign caseLensTreatment = false -%}\\n{%- else -%}\\n  {%- assign caseLensTreatment = lensTreatment | downcase -%}\\n{%- endcase -%}\\n{%- case isLensPolar %}\\n  {% when isLensPolar.blank? %}\\n  {%- assign caseIsLensPolar = false -%}\\n  {%- when \'False\' -%}\\n  {%- assign caseIsLensPolar = false -%}\\n{%- else -%}\\n  {%- assign caseIsLensPolar = isLensPolar -%}\\n{%- endcase -%}\\n{%- case productGroup %}\\n  {%- when \'pptical\' -%}\\n  {%- assign productGroupFixed = \'eyeglasses\' -%}\\n  {%- assign lensColor = false -%}\\n  {%- assign caseLensTreatment = false -%}\\n  {%- assign isLensPolar = false -%}\\n  {%- when \'sun\' -%}\\n  {%- assign productGroupFixed = \'sunglasses\' -%}\\n{%- else -%}\\n  {%- assign productGroupFixed = productGroup -%}\\n{%- endcase -%}\\n{%- case frameTypeDowncase %}\\n  {%- when \'progressive eligible\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'full rim\' -%}\\n  {%- assign frameTypeDowncase = false -%}\\n  {%- when \'semi rim\' -%}\\n  {%- assign frameTypeDowncase = \'semi-rimless\' -%}\\n{%- endcase -%}\\n{%- case templeColor %}\\n  {%- when frontColor -%}\\n  {%- assign templeColor = false -%}\\n{%- else -%}\\n  {%- assign templeColor = templeColor | downcase -%}\\n{%- endcase -%}\\n{%- case lensContrastEnhancement %}\\n  {% when lensContrastEnhancement.blank? %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n  {% when \\"False\\" %}\\n  {%- assign caseLensContrastEnhancement = false -%}\\n{%- else -%}\\n  {%- assign caseLensContrastEnhancement = lensContrastEnhancement -%}\\n{%- endcase -%}\\n{%- case strassPresence %}\\n  {% when \\"False\\" %}\\n  {%- assign caseStrassPresence = false -%}\\n{%- else -%}\\n  {%- assign caseStrassPresence = strassPresence -%}\\n  {%- case strassPosition %}\\n    {% when \\"not present\\" %}\\n    {%- assign caseStrassPosition = false -%}\\n    {%- assign caseStrassPresence = false -%}\\n  {%- else -%}\\n    {%- assign caseStrassPresence = strassPosition -%}\\n    {%- assign caseStrassPosition = strassPresence -%}\\n  {%- endcase -%}\\n{%- endcase -%}\\n{%- case bridgeType %}\\n  {% when bridgeType.blank? %}\\n  {%- assign caseBridgeType = false -%}\\n  {%- when \'standard\' -%}\\n  {%- assign caseBridgeType = false -%}\\n{%- else -%}\\n  {%- assign caseBridgeType = bridgeType -%}\\n{%- endcase -%}\\n{%- case specialProjectType %}\\n  {% when specialProjectType.blank? %}\\n  {%- assign caseSpecialProjectType = false -%}\\n  {% when \\"collaboration\\" %}\\n  {%- assign caseSpecialProjectType = specialProjectType -%}\\n  {%- case specialProjectCollection %}\\n    {% when specialProjectCollection.blank? %}\\n    {%- assign caseSpecialProjectCollection = false -%}\\n  {%- else -%}\\n    {%- assign caseSpecialProjectCollection = specialProjectCollection -%}\\n  {%- endcase -%}\\n{%- else -%}\\n  {%- assign caseSpecialProjectType = false -%}\\n{%- endcase -%}\\n{%- case frontMaterial %}\\n  {% when frontMaterial.blank? %}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'nylon\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'injected\' -%}\\n  {%- assign caseFrontMaterial = false -%}\\n  {%- when \'o_matter\' -%}\\n  {%- assign caseFrontMaterial = \'o matter\' -%}\\n{%- else -%}\\n  {%- assign caseFrontMaterial = frontMaterial | downcase -%}\\n{%- endcase -%}\\n{%- case frameShape %}\\n  {% when frameShape.blank? %}\\n  {%- assign caseFrameShape = false -%}\\n{%- else -%}\\n  {%- assign caseFrameShape = frameShape | downcase -%}\\n{%- endcase -%}\\n{%- case frontColor %}\\n  {% when frontColor.blank? %}\\n  {%- assign caseFrontColor = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColor = frontColor | downcase -%}\\n{%- endcase -%}\\n{%- case frontColorFinish %}\\n  {% when frontColorFinish.blank? %}\\n  {%- assign caseFrontColorFinish = false -%}\\n  {%- when \'NOT APPLICABLE\' -%}\\n  {%- assign caseFrontColorFinish = false -%}\\n{%- else -%}\\n  {%- assign caseFrontColorFinish = frontColorFinish | downcase -%}\\n{%- endcase -%}\\n\\n{%- case modelName %}\\n  {%- when modelName.blank? %}\\n  {%- assign caseModelName = false -%}\\n{%- else %}\\n  {%- assign caseModelName = modelName | append: \' \' | append: productGroupFixed -%}\\n{%- endcase -%}\\n\\n{%- if caseModelName == false %}\\n  {%- if modelCodeDisplay \041= blank %}\\n    {%- assign caseModelName = modelCodeDisplay | append: \' \' | append: productGroupFixed -%}\\n  {%- endif %}\\n{%- endif -%}\\n\\n{% if caseModelName %}\\n  {%- assign brandAndModelName = brand | append: \' \' | append: modelName -%}\\n  {{ brandAndModelName }} is a pair of {{ productGroupFixed }}. {{ modelNameFix }}\\n  {% if caseSpecialProjectCollection %}These {{ productGroupFixed }} are part of the special collaboration with {{ caseSpecialProjectCollection }}.{% endif %}\\n  {%- if modelName -%}\\n    {{ brandAndModelName }} are designed for {{ genderTypeFixed }}.{% endif %}\\n  {% if caseLensTreatment %}The lens treatment is {{ caseLensTreatment }}.{% endif %}\\n  {% if lensColor %}The lens color facet is {{ lensColor | downcase }}.{% endif %}\\n  {% if caseIsLensPolar %}The lenses are polarized.{% endif %}\\n  {% if templeColor %}The color of the temples is {{ templeColor }}.{% endif %}\\n  {% if caseFrontMaterial %}The frame material is {{ caseFrontMaterial }}.{% endif %}\\n  {% if caseFrameShape %}The shape is {{ caseFrameShape }}.{% endif %}\\n  {% if caseFrontColorFinish %}The frame color finish is {{ frontColorFinish }}.{% endif %}\\n  {% if caseFrontColor %}The frame color is {{ caseFrontColor }}.{% endif %}\\n  {% if caseBridgeType %}It features a {{ caseBridgeType | downcase }}.{% endif %}\\n  {% if frameTypeDowncase %}The type of the frame is {{ frameTypeDowncase | downcase }}.{% endif %}\\n  {% if caseLensContrastEnhancement %}This pair of sunglasses feature lens contrast enhancements.{% endif %}\\n  {% if caseStrassPosition %}There are strass on these {{ productGroupFixed }}.{% endif %}\\n  {% if caseStrassPresence %}These sunglasses feature strass on {{ strassPosition | downcase }}.{% endif %}\\n  {% if frameFoldability %}It is foldable.{% endif %}\\n  ####\\n{% endif %}","account_id":1504122,"words_to_ignore":["{Presented","Ideal","Break","Equipped","Adorned","Unleash","Capture","Complemented","Design","Made","Elevated","Moreover","Paired","Witness","Unveil","Meticulously","Finished","Enhance","Designed","Constructed","Make","Presenting","Discover","Offering","Perfect","Experience","Streamline","Customized","Get","Elevating","Show","Those","Immerse","Boasting","Lenses","A","Explore","Meet","In","Breathe","Complete","An","Grab","Uncover","Empower","Completing","Additionally","Adding","Stay","Express","Showcase","Complimented","Effortlessly","They","Featuring","When","Uniquely","Choose","Reflect","Comfort","Known","Meanwhile","Your","Standing","Achieve","Add","Take","Embody","Built","Its","Showcasing","Update","Durably","Shades","Enjoy","Introduce","This","To","Look","Plus","Incorporating","UV","Customize","Bring","For","Preserve","Furthermore","Not","These","And","Wear","Perfectly","Fully","Engineered","Drawing","Represent","Embrace","Elevate","Standard","Step","What","Whether","With","Crafted","Bringing","Personalize","Combining","Expertly","Introducing","Rollout","Pair","That","Characterized","Their","From","Commit","Find","Let","You}"]}'
```