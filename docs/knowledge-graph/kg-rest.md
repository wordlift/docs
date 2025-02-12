---
sidebar_position: 50
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# KG-REST

A RESTful API for interacting with and managing knowledge graphs. KG-REST provides a standardized interface to perform operations on complex graph-based data, making it easier to create, read, update, and delete graph elements while supporting batch processing and query-based interactions.

## Introduction

Welcome to the KG-REST API documentation. KG-REST is designed to seamlessly integrate the principles of Representational State Transfer (REST) with Knowledge Graphs (KGs). Our goal is to provide developers with a straightforward and intuitive API to perform Create, Read, Update, and Delete (CRUD) operations on Knowledge Graphs.

Knowledge Graphs are powerful tools for structuring and interlinking data, enabling complex relationships and insights. However, interacting with them can often be complex and challenging. KG-REST addresses these challenges by offering a RESTful interface, making it easier to manage and manipulate knowledge graph data within your applications.

## Getting Started

We'll assist you in setting up and performing Create, Read, Update, and Delete (CRUD) operations on your Knowledge Graph using two methods:

1. **Using `curl`**
2. **Using the WordLift Python Client**

### Prerequisites

Before you begin, ensure you have the following:

- **API Key:** An active API key is required for authentication. If you don't have one, please request it from the [WordLift website](https://wordlift.io). he API key is used to authenticate your requests to the KG-REST API.
- **HTTP Client:** Tools like [`curl`](https://curl.se/) can be used to send HTTP requests to the API.
- **Python Environment:** If you prefer using Python, ensure you have Python installed along with the WordLift Python Client.

### Obtaining Your API Key

To interact with the KG-REST API, you'll need an API key:

- **Requesting an API Key:** isit the [WordLift website](https://wordlift.io) and sign up or log in to your account.

### Base URL

All API requests are made to the following base URL:

```
https://api.wordlift.io
```

### Authentication

KG-REST uses API keys to authenticate requests. Include your API key in the `Authorization` header of each request:

```
Authorization: Key YOUR_API_KEY
```

### Making Your First Request Using `curl`

Here's how to make a simple `GET` request to retrieve entities from your Knowledge Graph:

**Request:**

```
GET /entities?id=ENTITY_ID
```

**Example using `curl`:**

```bash
curl -X GET "https://api.wordlift.io/entities?id=ENTITY_ID" \
  -H "Authorization: Key YOUR_API_KEY"
```

**Response:**

```json
{
  "@id": "ENTITY_ID",
  "@type": "schema:Thing",
  "schema:name": "Entity Name",
  "schema:description": "Entity Description"
}
```

### Using the WordLift Python Client

If you prefer to use Python, follow these steps:

**a. Install the WordLift Python Client:**

```bash
pip install wordlift
```

**b. Initialize the Client:**

```python
import wordlift_client
from wordlift_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.wordlift.io
# See configuration.py for a list of all supported configuration parameters.
configuration = wordlift_client.Configuration(host="https://api.wordlift.io")

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure API key authorization: ApiKey
configuration.api_key["ApiKey"] = (
    "YOUR_API_KEY"
)

# Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
configuration.api_key_prefix["ApiKey"] = "Key"

# Enter a context with an instance of the API client
async with wordlift_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = wordlift_client.EntitiesApi(api_client)

    try:
        # Get
        api_response = await api_instance.create_or_update_entities(
            body="""
            <https://data.wordlift.io/lucky777/01/test> a <http://schema.org/Product>;
                <http://schema.org/description> "Upgrade your Acme Inc. BlastShades™ with precision-engineered BoomVision™ replacement lenses. Designed for extreme conditions, these lenses enhance explosion contrast, improve visibility in dynamic light scenarios, and provide superior impact resistance. With 100% UV filtering and built to withstand the most intense detonations, BoomVision™ lenses ensure top-tier optical performance. Important Note: Replacement lenses cannot be returned if mounted or scratched.";
                <http://schema.org/gtin> "123456789012";
                <http://schema.org/hasGS1DigitalLink> "https://data.wordlift.io/lucky777/01/123456789012";
                <http://schema.org/image> "https://assets.example.org/blastshades/lens_replacement.png";
                <http://schema.org/itemCondition> "http://schema.org/NewCondition";
                <http://schema.org/name> "Acme Inc. BlastShades™ BoomVision™ Replacement Lenses";
                <http://schema.org/offers> <https://data.wordlift.io/lucky777/01/123456789012/offers> .
            """,
            _content_type="text/turtle",
        )
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling create_or_update_entities: %s\n" % e)
```

## API Endpoints

KG-REST provides a comprehensive set of endpoints to perform Create, Read, Update, and Delete (CRUD) operations on your Knowledge Graph. Below is an overview of the available endpoints:

### Read

**Endpoint:** `GET /entities`

**Description:** Retrieves details of a specific entity by its ID.

**Request Example:**

```http
GET /entities?id=https://example.com/entity1 HTTP/1.1
Host: api.wordlift.io
Authorization: Key YOUR_API_KEY
```

**Response Example:**

```json
{
  "@id": "https://example.com/entity1",
  "@type": "schema:Thing",
  "schema:name": "Entity One",
  "schema:description": "An example entity."
}
```

### Update

**Endpoint:** `PUT /entities`

**Description:** Creates or updates an entity in the Knowledge Graph.

**Request Example:**

```http
PUT /entities HTTP/1.1
Host: api.wordlift.io
Authorization: Key YOUR_API_KEY
Content-Type: application/ld+json

{
  "@id": "https://example.com/entity1",
  "@type": "schema:Thing",
  "schema:name": "Updated Entity One",
  "schema:description": "Updated description."
}
```

**Response Example:**

If successful the response will return OK 200.

### Delete

**Endpoint:** `DELETE /entities`

**Description:** Removes an entity from the Knowledge Graph.

**Request Example:**

```http
DELETE /entities?id=https://example.com/entity1 HTTP/1.1
Host: api.wordlift.io
Authorization: Key YOUR_API_KEY
```

**Response Example:**

If successful the response will return OK 200.

### Batch Processing

**Endpoint:** `POST /dataset/batch`

**Description:** Allows batch creation or updating of entities.

**Request Example:**

```http
POST /dataset/batch HTTP/1.1
Host: api.wordlift.io
Authorization: Key YOUR_API_KEY
Content-Type: application/json

[
  {
    "uri": "https://example.com/entity2",
    "model": "schema:Thing",
    "private": false
  },
  {
    "uri": "https://example.com/entity3",
    "model": "schema:Organization",
    "private": true
  }
]
```

**Response Example:**

```json
{
  "message": "Batch processing completed",
  "entities": [
    {
      "uri": "https://example.com/entity2",
      "model": "schema:Thing",
      "private": false
    },
    {
      "uri": "https://example.com/entity3",
      "model": "schema:Organization",
      "private": true
    }
  ]
}
```
