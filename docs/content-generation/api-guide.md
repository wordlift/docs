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

## Create a Project

A the very core of the Content Generation API, there are Projects which define the configuration.

### Project Model

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


### New Project

To create a Project the following parameters are required:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'...json request payload...'
```

This is an example **request** JSON payload:

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

This is an example **response** JSON payload:

```json
{
  "id": 123,
  "name": "A Project Label",
  "penalty": 0.5,
  "temperature": 0.4,
  "stop": "###",
  "deleted": false,
  "model_id": 123,
  "max_tokens": 119,
  "created_at": "2023-12-20T10:25:31.607727576Z",
  "modified_at": "2023-12-20T10:25:31.607727576Z",
  "deleted_at": null,
  "min_words": 45,
  "graphql_query": "...graphql query...",
  "prompt_template": "...prompt template...",
  "account_id": 123,
  "words_to_ignore": null
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

In order to retrieve the list of available fields it is possible to use the [Fields API](#list-fields). A template can be tested with actual data by calling the [Template Render API](#render-template).

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


## Run the Project

### Load the KG Data into the Project's Records

This will finally load the data from the Knowledge Graph based on the GraphQL query into the Project's records.

:::info

This step is required in order to create the completions.

:::

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/syncs' -X POST \
    -H 'Accept: */*' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

### List Completions

Once the Records have been imported, it is possible to access them along with their completion. This endpoint returns a JSONL formatted response which allows client to read the response as it loads without waiting for all the completions to be generated.

:::info

JSONL means JSON lines, that is one self-standing JSON per line.

:::

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records-sse' \
    -H 'Accept: */*' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

###  Get Stats

Once the Project runs, the completions are generated and they're validated against the [Rules](#rules). For each completion a state is assigned: error, warning, valid and accepted. The Stats endpoint will provide a summary of these states for the Project:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/stats' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

### Regenerate a Record Completion

To regenerate a Completion, just update it by setting the `completion` to `null`. The API will then regenerate and return the Record with the new Completion.

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/608/records/253191' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '...json payload...'
```

Example JSON Payload, note the `completion` set to `null`:

```json
{
  "id": 253191,
  "prompt": "Acme Glasses is a pair of sunglasses. Las Vegas are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####",
  "completion": null,
  "data": {
    "id": "https://data.example.org/example-dataset/gtin",
    "name": "gtin",
    "type": "http://schema.org/Product",
    "brand": "Brand",
    "release": null,
    "category": "Optical",
    "modelFit": "high bridge fit",
    "faceShape": "Oval-Round",
    "frameType": "full rim",
    "lensColor": "gray silver mirror",
    "modelName": "Las Vegas",
    "bridgeType": "standard",
    "frameShape": "rectangle",
    "frontColor": "matte black",
    "genderType": "man",
    "maskShield": "False",
    "roXability": "True",
    "isLensPolar": "True",
    "nosepadType": "plastic standard",
    "templeColor": "matte black",
    "frameFitting": "wide",
    "isLensMirror": "True",
    "materialType": "zpfn",
    "productGroup": "sun",
    "frontMaterial": "injected",
    "lensBaseCurve": "base 8 decentered",
    "lensTreatment": "mirror",
    "macroAgeRange": "adult",
    "isLensGradient": "False",
    "lensProtection": null,
    "strassPosition": "not present",
    "strassPresence": "False",
    "frameFoldability": null,
    "frontColorFinish": "matte",
    "modelCodeDisplay": "123",
    "productStyleName": null,
    "channelAttributes": [
      { "channel": "AB - ABC", "styleName": "MyStyleName" },
      { "channel": "AB - ABC", "styleName": "MyStyleName" }
    ],
    "isLensPhotochromic": "False",
    "productFamilyModel": "Las Vegas",
    "specialProjectType": "collaboration",
    "ageGroupEnumeration": null,
    "eyewearLensMaterial": "polycarbonate",
    "progressiveFriendly": "classic",
    "eyewearTempleMaterial": "injected",
    "specialProjectSponsor": null,
    "isLensBlueLightFiltered": "False",
    "lensAssemblyTypeOnFrame": "full rim",
    "lensContrastEnhancement": "True",
    "specialProjectCollection": null,
    "specialProjectFeaturesFlag": "True"
  },
  "errors": null,
  "warnings": null,
  "content_generation_id": 123,
  "not_in_prompt_words": [],
  "is_accepted": false,
  "has_upvote": false,
  "modified_at": "2023-12-19T09:26:03.605418090Z",
  "validated_at": "2023-12-19T09:26:03.605287189Z",
  "status": "valid"
}
```

### Get a Record Validation Report

Get a Record validation report with details about the Rules that failed:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records/<record-id>/validations' -X POST \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

### Bulk Operations on Record: Regenerate Completions

It is also possible to regenerate completions in bulk:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records-collection' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '[...json payload 1...,...json payload 2...,...,...json payload n....]'
```

### Accept a Record

To mark a Record as Accepted, set `is_accepted` to `true`:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records/<record-id>' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '...json payload...'
```

Example JSON Payload:

```json
{
  "prompt": "Acme Glasses is a pair of sunglasses. Las Vegas are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####",
  "completion": "...example completion...",
  "data": {
    "id": "https://data.example.org/example-dataset/gtin",
    "name": "gtin",
    "type": "http://schema.org/Product",
    "brand": "Brand",
    "release": null,
    "category": "Optical",
    "modelFit": "high bridge fit",
    "faceShape": "Oval-Round",
    "frameType": "full rim",
    "lensColor": "gray silver mirror",
    "modelName": "Las Vegas",
    "bridgeType": "standard",
    "frameShape": "rectangle",
    "frontColor": "matte black",
    "genderType": "man",
    "maskShield": "False",
    "roXability": "True",
    "isLensPolar": "True",
    "nosepadType": "plastic standard",
    "templeColor": "matte black",
    "frameFitting": "wide",
    "isLensMirror": "True",
    "materialType": "zpfn",
    "productGroup": "sun",
    "frontMaterial": "injected",
    "lensBaseCurve": "base 8 decentered",
    "lensTreatment": "mirror",
    "macroAgeRange": "adult",
    "isLensGradient": "False",
    "lensProtection": null,
    "strassPosition": "not present",
    "strassPresence": "False",
    "frameFoldability": null,
    "frontColorFinish": "matte",
    "modelCodeDisplay": "123",
    "productStyleName": null,
    "channelAttributes": [
      { "channel": "AB - ABC", "styleName": "MyStyleName" },
      { "channel": "AB - ABC", "styleName": "MyStyleName" }
    ],
    "isLensPhotochromic": "False",
    "productFamilyModel": "Las Vegas",
    "specialProjectType": "collaboration",
    "ageGroupEnumeration": null,
    "eyewearLensMaterial": "polycarbonate",
    "progressiveFriendly": "classic",
    "eyewearTempleMaterial": "injected",
    "specialProjectSponsor": null,
    "isLensBlueLightFiltered": "False",
    "lensAssemblyTypeOnFrame": "full rim",
    "lensContrastEnhancement": "True",
    "specialProjectCollection": null,
    "specialProjectFeaturesFlag": "True"
  },
  "errors": null,
  "warnings": null,
  "content_generation_id": 123,
  "not_in_prompt_words": [],
  "is_accepted": true,
  "has_upvote": false,
  "modified_at": "2023-12-19T09:26:03.605418090Z",
  "validated_at": "2023-12-19T09:26:03.605287189Z",
  "status": "valid"
}
```

### Upvote a Completion

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records/<record-id>' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '...json payload...'
```

Example JSON Payload:

```json
{
  "prompt": "Acme Glasses is a pair of sunglasses. Las Vegas are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####",
  "completion": "...example completion...",
  "data": {
    "id": "https://data.example.org/example-dataset/gtin",
    "name": "gtin",
    "type": "http://schema.org/Product",
    "brand": "Brand",
    "release": null,
    "category": "Optical",
    "modelFit": "high bridge fit",
    "faceShape": "Oval-Round",
    "frameType": "full rim",
    "lensColor": "gray silver mirror",
    "modelName": "Las Vegas",
    "bridgeType": "standard",
    "frameShape": "rectangle",
    "frontColor": "matte black",
    "genderType": "man",
    "maskShield": "False",
    "roXability": "True",
    "isLensPolar": "True",
    "nosepadType": "plastic standard",
    "templeColor": "matte black",
    "frameFitting": "wide",
    "isLensMirror": "True",
    "materialType": "zpfn",
    "productGroup": "sun",
    "frontMaterial": "injected",
    "lensBaseCurve": "base 8 decentered",
    "lensTreatment": "mirror",
    "macroAgeRange": "adult",
    "isLensGradient": "False",
    "lensProtection": null,
    "strassPosition": "not present",
    "strassPresence": "False",
    "frameFoldability": null,
    "frontColorFinish": "matte",
    "modelCodeDisplay": "123",
    "productStyleName": null,
    "channelAttributes": [
      { "channel": "AB - ABC", "styleName": "MyStyleName" },
      { "channel": "AB - ABC", "styleName": "MyStyleName" }
    ],
    "isLensPhotochromic": "False",
    "productFamilyModel": "Las Vegas",
    "specialProjectType": "collaboration",
    "ageGroupEnumeration": null,
    "eyewearLensMaterial": "polycarbonate",
    "progressiveFriendly": "classic",
    "eyewearTempleMaterial": "injected",
    "specialProjectSponsor": null,
    "isLensBlueLightFiltered": "False",
    "lensAssemblyTypeOnFrame": "full rim",
    "lensContrastEnhancement": "True",
    "specialProjectCollection": null,
    "specialProjectFeaturesFlag": "True"
  },
  "errors": null,
  "warnings": null,
  "content_generation_id": 123,
  "not_in_prompt_words": [],
  "is_accepted": true,
  "has_upvote": true,
  "modified_at": "2023-12-19T09:26:03.605418090Z",
  "validated_at": "2023-12-19T09:26:03.605287189Z",
  "status": "valid"
}
```

### Manually set and accept a Completion

It is also possible to manually update and accept a completion by setting the `completion` property to the desired value and `is_accepted` to `true`:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records/<record-id>' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '...json payload...'
```

Example JSON Payload:

```json
{
  "prompt": "Acme Glasses is a pair of sunglasses. Las Vegas are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####",
  "completion": "...manually set completion...",
  "data": {
    "id": "https://data.example.org/example-dataset/gtin",
    "name": "gtin",
    "type": "http://schema.org/Product",
    "brand": "Brand",
    "release": null,
    "category": "Optical",
    "modelFit": "high bridge fit",
    "faceShape": "Oval-Round",
    "frameType": "full rim",
    "lensColor": "gray silver mirror",
    "modelName": "Las Vegas",
    "bridgeType": "standard",
    "frameShape": "rectangle",
    "frontColor": "matte black",
    "genderType": "man",
    "maskShield": "False",
    "roXability": "True",
    "isLensPolar": "True",
    "nosepadType": "plastic standard",
    "templeColor": "matte black",
    "frameFitting": "wide",
    "isLensMirror": "True",
    "materialType": "zpfn",
    "productGroup": "sun",
    "frontMaterial": "injected",
    "lensBaseCurve": "base 8 decentered",
    "lensTreatment": "mirror",
    "macroAgeRange": "adult",
    "isLensGradient": "False",
    "lensProtection": null,
    "strassPosition": "not present",
    "strassPresence": "False",
    "frameFoldability": null,
    "frontColorFinish": "matte",
    "modelCodeDisplay": "123",
    "productStyleName": null,
    "channelAttributes": [
      { "channel": "AB - ABC", "styleName": "MyStyleName" },
      { "channel": "AB - ABC", "styleName": "MyStyleName" }
    ],
    "isLensPhotochromic": "False",
    "productFamilyModel": "Las Vegas",
    "specialProjectType": "collaboration",
    "ageGroupEnumeration": null,
    "eyewearLensMaterial": "polycarbonate",
    "progressiveFriendly": "classic",
    "eyewearTempleMaterial": "injected",
    "specialProjectSponsor": null,
    "isLensBlueLightFiltered": "False",
    "lensAssemblyTypeOnFrame": "full rim",
    "lensContrastEnhancement": "True",
    "specialProjectCollection": null,
    "specialProjectFeaturesFlag": "True"
  },
  "errors": null,
  "warnings": null,
  "content_generation_id": 123,
  "not_in_prompt_words": [],
  "is_accepted": true,
  "has_upvote": false,
  "modified_at": "2023-12-19T09:26:03.605418090Z",
  "validated_at": "2023-12-19T09:26:03.605287189Z",
  "status": "valid"
}
```

### Bulk Operations

It is always possible to combine several updates in one call:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/records-collection' -X PUT \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '[...json payload 1...,...json payload 2...,...,...json payload n...]'
```

### Export

Finally it is possible to export the Records:

```sh
curl https://api.wordlift.io/content-generation/content-generations/<project-id>/records.tsv \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
```

This will export a tabulated file with all the Records.


## Rules

### List Rules

List the Rules connected to a Project:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/rules?limit=2147483647' \
    -H 'Accept: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>'
```

### Create a Field Rule

Create a Field Rule for the Project:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/rules' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"name":"Frame Material is Required","level":"REQUIRED","what_operand_lhs":"EVERYWHERE","what_operator":"CONTAINS","what_operand_rhs":"{{frontMaterial}}","when_operand_lhs":"frontMaterial","when_operator":"NOT_EQUALS","when_operand_rhs":"plastic,nylon,injected,propionate","fixes":[{"type":"OPEN_AI","what":"As {{brand}} content editor, read the following sentence and rewrite it by adding a reference to frame material being {{frontMaterial}}: \"{{completion}}\"."}],"type":"field"}'
```

### Create a Word Rule

Create a Word Rule for the Project:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/rules' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"name":"Logo words are not present","level":"RECOMMENDED","what_operand_lhs":"EVERYWHERE","what_operator":"DOESNT_CONTAIN","what_operand_rhs":"values:logo,signature,embleme,branding","when_operand_lhs":"","when_operator":"ALWAYS","when_operand_rhs":"","fixes":[{"type":"OPEN_AI","what":"As {{brand}} content editor, read the following sentence and rewrite it by removing any reference to the {{value}}: \"{{completion}}\""}],"type":"word"}'
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


### Get an existing Project

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

### GraphQL Queries and Pagination

Following are a couple of GraphQL sample queries using pagination (`page` and `rows` parameters).

:::danger

On large datasets, GraphQL queries may take time to load and may timeout. In this case we recommend to use pagination like in the following examples.

:::

Page 0:

```sh
curl 'https://api.wordlift.io/graphql' -X POST \
    -H 'Accept: application/json' \
    -H 'Authorization: Key <wordlift-key>' \
    -H 'Content-Type: application/json' \
     --data-raw '{"variables":{},"query":"{\n  products(\n    query: {nameConstraint: {in: [\"0AR6123B__30028E\", \"0AR8107__5017R5\", \"0AR8110__501787\", \"06S9034__903417\"]}}\n    page: 0\n    rows: 1000\n  ) {\n    id: iri\n    brand: string(name: \"schema:brand\")\n    name: string(name: \"schema:name\")\n    type: string(name: \"rdf:type\")\n    category: string(name: \"eyewear:category\")\n    productGroup: string(name: \"eyewear:eyewearProductGroup\")\n    bridgeType: string(name: \"eyewear:bridgeType\")\n    frameShape: string(name: \"eyewear:frameShape\")\n    faceShape: string(name: \"eyewear:faceShape\")\n    frameFitting: string(name: \"eyewear:frameFitting\")\n    frontColorFinish: string(name: \"eyewear:frontColorFinish\")\n    macroAgeRange: string(name: \"eyewear:macroAgeRange\")\n    ageGroupEnumeration: string(name: \"eyewear:ageGroupEnumeration\")\n    lensAssemblyTypeOnFrame: string(name: \"eyewear:lensAssemblyTypeOnFrame\")\n    frameType: string(name: \"eyewear:frameType\")\n    eyewearLensMaterial: string(name: \"eyewear:eyewearLensMaterial\")\n    eyewearTempleMaterial: string(name: \"eyewear:eyewearTempleMaterial\")\n    nosepadType: string(name: \"eyewear:nosepadType\")\n    release: string(name: \"eyewear:release\")\n    specialProjectCollection: string(name: \"eyewear:specialProjectCollection\")\n    specialProjectSponsor: string(name: \"eyewear:specialProjectSponsor\")\n    specialProjectType: string(name: \"eyewear:specialProjectType\")\n    specialProjectFeaturesFlag: string(name: \"eyewear:specialProjectFeaturesFlag\")\n    lensTreatment: string(name: \"eyewear:lensTreatment\")\n    lensColor: string(name: \"eyewear:lensColor\")\n    productStyleName: string(name: \"eyewear:productStyleName\")\n    productFamilyModel: string(name: \"eyewear:productFamilyModel\")\n    frameFoldability: string(name: \"eyewear:frameFoldability\")\n    roXability: string(name: \"eyewear:roXability\")\n    isLensPhotochromic: string(name: \"eyewear:isLensPhotochromic\")\n    isLensPolar: string(name: \"eyewear:isLensPolar\")\n    modelCodeDisplay: string(name: \"eyewear:modelCodeDisplay\")\n    progressiveFriendly: string(name: \"eyewear:progressiveFriendly\")\n    materialType: string(name: \"eyewear:materialType\")\n    maskShield: string(name: \"eyewear:maskShield\")\n    strassPresence: string(name: \"eyewear:strassPresence\")\n    strassPosition: string(name: \"eyewear:strassPosition\")\n    lensContrastEnhancement: string(name: \"eyewear:lensContrastEnhancement\")\n    lensBaseCurve: string(name: \"eyewear:lensBaseCurve\")\n    isLensGradient: string(name: \"eyewear:isLensGradient\")\n    isLensMirror: string(name: \"eyewear:isLensMirror\")\n    modelFit: string(name: \"eyewear:modelFit\")\n    modelName: string(name: \"eyewear:modelName\")\n    frontMaterial: string(name: \"eyewear:frontMaterial\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    templeColor: string(name: \"eyewear:templeColor\")\n    frontColor: string(name: \"eyewear:frontColor\")\n    isLensBlueLightFiltered: string(name: \"eyewear:isLensBlueLightFiltered\")\n    genderType: string(name: \"eyewear:genderType\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    channelAttributes: resources(name: \"eyewear:channelAttributes\") {\n      channel: string(name: \"eyewear:channel\")\n      styleName: string(name: \"eyewear:styleName\")\n      __typename\n    }\n    __typename\n  }\n}"}'
```

Page 1:

```sh
curl 'https://api.wordlift.io/graphql' -X POST \
    -H 'Accept: application/json' \
    -H 'Authorization: Key <wordlift-key>' \
    -H 'Content-Type: application/json' \
     --data-raw '{"variables":{},"query":"{\n  products(\n    query: {nameConstraint: {in: [\"0AR6123B__30028E\", \"0AR8107__5017R5\", \"0AR8110__501787\", \"06S9034__903417\"]}}\n    page: 1\n    rows: 1000\n  ) {\n    id: iri\n    brand: string(name: \"schema:brand\")\n    name: string(name: \"schema:name\")\n    type: string(name: \"rdf:type\")\n    category: string(name: \"eyewear:category\")\n    productGroup: string(name: \"eyewear:eyewearProductGroup\")\n    bridgeType: string(name: \"eyewear:bridgeType\")\n    frameShape: string(name: \"eyewear:frameShape\")\n    faceShape: string(name: \"eyewear:faceShape\")\n    frameFitting: string(name: \"eyewear:frameFitting\")\n    frontColorFinish: string(name: \"eyewear:frontColorFinish\")\n    macroAgeRange: string(name: \"eyewear:macroAgeRange\")\n    ageGroupEnumeration: string(name: \"eyewear:ageGroupEnumeration\")\n    lensAssemblyTypeOnFrame: string(name: \"eyewear:lensAssemblyTypeOnFrame\")\n    frameType: string(name: \"eyewear:frameType\")\n    eyewearLensMaterial: string(name: \"eyewear:eyewearLensMaterial\")\n    eyewearTempleMaterial: string(name: \"eyewear:eyewearTempleMaterial\")\n    nosepadType: string(name: \"eyewear:nosepadType\")\n    release: string(name: \"eyewear:release\")\n    specialProjectCollection: string(name: \"eyewear:specialProjectCollection\")\n    specialProjectSponsor: string(name: \"eyewear:specialProjectSponsor\")\n    specialProjectType: string(name: \"eyewear:specialProjectType\")\n    specialProjectFeaturesFlag: string(name: \"eyewear:specialProjectFeaturesFlag\")\n    lensTreatment: string(name: \"eyewear:lensTreatment\")\n    lensColor: string(name: \"eyewear:lensColor\")\n    productStyleName: string(name: \"eyewear:productStyleName\")\n    productFamilyModel: string(name: \"eyewear:productFamilyModel\")\n    frameFoldability: string(name: \"eyewear:frameFoldability\")\n    roXability: string(name: \"eyewear:roXability\")\n    isLensPhotochromic: string(name: \"eyewear:isLensPhotochromic\")\n    isLensPolar: string(name: \"eyewear:isLensPolar\")\n    modelCodeDisplay: string(name: \"eyewear:modelCodeDisplay\")\n    progressiveFriendly: string(name: \"eyewear:progressiveFriendly\")\n    materialType: string(name: \"eyewear:materialType\")\n    maskShield: string(name: \"eyewear:maskShield\")\n    strassPresence: string(name: \"eyewear:strassPresence\")\n    strassPosition: string(name: \"eyewear:strassPosition\")\n    lensContrastEnhancement: string(name: \"eyewear:lensContrastEnhancement\")\n    lensBaseCurve: string(name: \"eyewear:lensBaseCurve\")\n    isLensGradient: string(name: \"eyewear:isLensGradient\")\n    isLensMirror: string(name: \"eyewear:isLensMirror\")\n    modelFit: string(name: \"eyewear:modelFit\")\n    modelName: string(name: \"eyewear:modelName\")\n    frontMaterial: string(name: \"eyewear:frontMaterial\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    templeColor: string(name: \"eyewear:templeColor\")\n    frontColor: string(name: \"eyewear:frontColor\")\n    isLensBlueLightFiltered: string(name: \"eyewear:isLensBlueLightFiltered\")\n    genderType: string(name: \"eyewear:genderType\")\n    lensProtection: string(name: \"eyewear:lensProtection\")\n    channelAttributes: resources(name: \"eyewear:channelAttributes\") {\n      channel: string(name: \"eyewear:channel\")\n      styleName: string(name: \"eyewear:styleName\")\n      __typename\n    }\n    __typename\n  }\n}"}'
```

### Render Template {#render-template}

When writing a Liquid template, it is helpful to test it with actual data. By providig a `template` and a `data` map, this API will return the rendered prompt:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/renders' -X POST \
    -H 'Accept: text/plain' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'...json payload...'
```

This is the example **request** JSON payload:

```json
{
  "template": "...liquid template...",
  "data": {
    "__typename": "Entity",
    "id": "https://data.example.org/example-dataset/gtin",
    "brand": "MyEyeglasses",
    "name": "ProductCode",
    "type": "http://schema.org/Product",
    "category": "Optical",
    "productGroup": "sun",
    "bridgeType": "standard",
    "frameShape": "rectangle",
    "faceShape": "Oval-Round",
    "frameFitting": "wide",
    "frontColorFinish": "matte",
    "macroAgeRange": "adult",
    "ageGroupEnumeration": null,
    "lensAssemblyTypeOnFrame": "full rim",
    "frameType": "full rim",
    "eyewearLensMaterial": "polycarbonate",
    "eyewearTempleMaterial": "injected",
    "nosepadType": "plastic standard",
    "release": null,
    "specialProjectCollection": null,
    "specialProjectSponsor": null,
    "specialProjectType": "collaboration",
    "specialProjectFeaturesFlag": "True",
    "lensTreatment": "mirror",
    "lensColor": "gray silver mirror",
    "productStyleName": null,
    "productFamilyModel": "Las Vegas",
    "frameFoldability": null,
    "roXability": "True",
    "isLensPhotochromic": "False",
    "isLensPolar": "True",
    "modelCodeDisplay": "123",
    "progressiveFriendly": "classic",
    "materialType": "zpfn",
    "maskShield": "False",
    "strassPresence": "False",
    "strassPosition": "not present",
    "lensContrastEnhancement": "True",
    "lensBaseCurve": "base 8 decentered",
    "isLensGradient": "False",
    "isLensMirror": "True",
    "modelFit": "high bridge fit",
    "modelName": "Las Vegas",
    "frontMaterial": "injected",
    "lensProtection": null,
    "templeColor": "matte black",
    "frontColor": "matte black",
    "isLensBlueLightFiltered": "False",
    "genderType": "man",
    "channelAttributes": [
      {
        "__typename": "Entity",
        "channel": "AB - ABC",
        "styleName": "MyStyleName"
      },
      {
        "__typename": "Entity",
        "channel": "AB - ABC",
        "styleName": "MyStyleName"
      }
    ]
  }
}
```

The is an example **response** payload, it is a plain text with the rendition:

```text
Las Vegas is a pair of sunglasses. Las Vegas are designed for men. The lens treatment is mirror. The lens color facet is gray silver mirror. The lenses are polarized. The shape is rectangle. The frame color finish is matte. The frame color is matte black. This pair of sunglasses feature lens contrast enhancements. ####
```


#### Render a Collection of Templates

It is also possible to generate multiple renders at once by using the Bulk API:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/renders-collection' -X POST \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw $'[...json payload 1...,...json payload 2...,...,...json payload n...]'
```

See [Render Template](#render-template) for the JSON payload structure.

This is an example **response** JSON payload:

```json
[
  ...rendition 1...,
  ...rendition 2...,
  ...,
  ...rendition n...
]
```


### Generate a Preview Completion

It is possible to test different settings by create a completion on the fly:

```sh
curl 'https://api.wordlift.io/content-generation/completions' -X POST \
    -H 'Accept: text/plain' \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw '{"frequency_penalty":0.5,"stop":"###","prompt":"John Smith is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####","max_tokens":110,"temperature":0.7,"model_id":162,"presence_penalty":0.5,"min_words":45,"logit_bias":{}}'
```

This an example **request** JSON payload:

```json
{
  "frequency_penalty": 0.5,
  "stop": "###",
  "prompt": "John Smith is a pair of sunglasses. The lens treatment is gradient. The lens color facet is gradient green. The frame material is metal. The shape is square. The frame color finish is polished. The frame color is pale gold. There are strass on these sunglasses. These sunglasses feature strass on strass on metal component and. ####",
  "max_tokens": 110,
  "temperature": 0.7,
  "model_id": 162,
  "presence_penalty": 0.5,
  "min_words": 45,
  "logit_bias": {}
}
```

This is an example **response**, it's plain text with the completion:

```text
 Experience the perfect synergy of style and performance with Las Vegas sunglasses. The rectangle shape and matte black frame offer a sleek, modern look, while the polarized gray silver mirror lenses provide excellent glare reduction and superior clarity. The lens treatment is mirrored for added protection against the sun's rays. These shades also feature contrast enhancements, making them ideal for any outdoor activity.
 ```


### Add Word Biases to a Content Generation Project

Once the Project is created and its ID is known, to add Word Biases to a Project use the following API:

```sh
curl 'https://api.wordlift.io/content-generation/content-generations/<project-id>/words/imports' -X PUT \
    -H 'Accept: */*' \
    -H 'content-type: text/csv' \
    -H 'Authorization: Bearer <your-oauth2-access-token>' \
     --data-raw 'penalize,clear,2867,-3'
```
