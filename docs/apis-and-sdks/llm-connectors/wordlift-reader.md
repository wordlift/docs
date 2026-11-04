---
title: "Load Knowledge Graph data into LlamaIndex with WordLift Reader"
description: "Use WordLift Reader to load Knowledge Graph records into LlamaIndex as documents with a GraphQL query, then index and query them in your own application."
sidebar_label: "WordLift Reader"
sidebar_position: 2
last_updated: 2026-10-27
---

# Load Knowledge Graph data into LlamaIndex with WordLift Reader

WordLift Reader is a LlamaIndex data loader. It runs a GraphQL query against your WordLift Knowledge Graph and returns the results as LlamaIndex documents, so you can index and query your product, FAQ or article data without writing your own loader. The reader only reads from the graph.

Use WordLift Reader when you want to build your own index from selected graph records. To use WordLift itself as the vector store, and add nodes to the graph from LlamaIndex, use the [WordLift Vector Store](/apis-and-sdks/llm-connectors/wordlift-vector-store/) instead.

## Prerequisites {#prerequisites}

- **Python 3.10 or later.**
- **LlamaIndex.** See the [LlamaIndex installation guide](https://docs.llamaindex.ai/en/stable/getting_started/installation/).
- **A WordLift key for the graph.** See [Authentication and API keys](/apis-and-sdks/#authentication).
- **A GraphQL query that works on your graph.** Test it first with the [GraphQL API](/apis-and-sdks/graphql-api/).
- **An LLM and embedding model of your choice, configured in LlamaIndex.** WordLift Reader does not set one.

## Install the reader {#install-the-reader}

```bash
pip install llama-index
pip install llama-index-readers-wordlift
```

In a notebook, prefix each command with `!`.

## Configure and load documents {#configure-and-load-documents}

Create a `WordLiftLoader` with five arguments, then call `load_data()`:

| Argument | Value |
| --- | --- |
| `endpoint` | The GraphQL endpoint, `https://api.wordlift.io/graphql`. |
| `headers` | The `Authorization` header with your WordLift key, and `Content-Type: application/json`. |
| `query` | Your GraphQL query, as a string. |
| `fields` | The name of the root field your query returns, for example `products`. |
| `config_options` | `text_fields`: the fields to index as document text. `metadata_fields`: the fields to keep as document metadata. |

```python
from llama_index.readers.wordlift import WordLiftLoader

endpoint = "https://api.wordlift.io/graphql"
headers = {
    "Authorization": "Key <YOUR_WORDLIFT_KEY>",
    "Content-Type": "application/json",
}
query = """
query {
  products(page: 0, rows: 100) {
    id: iri
    names: strings(name: "schema:name")
    description: strings(name: "schema:description")
    url: strings(name: "schema:url")
  }
}
"""
config_options = {
    "text_fields": ["description"],
    "metadata_fields": ["id", "names", "url"],
}

reader = WordLiftLoader(endpoint, headers, query, "products", config_options)
documents = reader.load_data()
```

:::warning[Review needed]
TODO [SME]: confirm the endpoint and header format WordLiftLoader 0.6.0 needs (the package README sends the bare key, other docs require the `Key` prefix) and what the `fields` argument means.
:::

## Build an index and query it {#build-an-index-and-query-it}

Build a vector index from the documents, persist it, and reload it on later runs:

```python
from llama_index.core import VectorStoreIndex, StorageContext, load_index_from_storage

try:
    storage_context = StorageContext.from_defaults(persist_dir="./")
    index = load_index_from_storage(storage_context)
except FileNotFoundError:
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir="./")

query_engine = index.as_query_engine()
result = query_engine.query("<YOUR_QUESTION>")
print(result)
```

LlamaIndex uses the LLM and embedding model you configured. The answer comes from the documents the reader loaded.

## Example queries {#example-queries}

Data in your Knowledge Graph can use a different structure from these examples. Open the IRI of a few entities to see how your data is organized, then adapt the property names.

### Products {#products}

```graphql
query {
  products(page: 0, rows: 100) {
    id: iri
    url: strings(name: "schema:url")
    gtin: strings(name: "schema:gtin")
    names: strings(name: "schema:name")
    description: strings(name: "schema:description")
    brand: resource(name: "schema:brand") {
      brand: string(name: "schema:name")
    }
    price: resource(name: "schema:offers") {
      price: string(name: "schema:price")
    }
    image: string(name: "schema:image")
  }
}
```

### FAQ pages {#faqs}

```graphql
query {
  faqPages {
    url: string(name: "schema:url")
    title: string(name: "schema:name")
    questions: resources(name: "schema:mainEntity") {
      question: string(name: "schema:name")
      answer: resources(name: "schema:acceptedAnswer") {
        text: string(name: "schema:text")
      }
    }
  }
}
```

### Articles {#articles}

```graphql
query {
  articles(page: 0, rows: 25) {
    id: iri
    title: string(name: "schema:headline")
    date: string(name: "schema:datePublished")
    author_id: string(name: "schema:author")
    article_author: resource(name: "schema:author") {
      id: iri
      name: string(name: "schema:name")
    }
    article_url: string(name: "schema:mainEntityOfPage")
    article_about: resource(name: "schema:about") {
      names: string(name: "schema:name")
    }
    article_desc: string(name: "schema:description")
    mentions: resources(name: "schema:mentions") {
      names: strings(name: "schema:name")
    }
    body: string(name: "wordpress:content")
  }
}
```

## Troubleshooting {#troubleshooting}

| Symptom | Cause and fix |
| --- | --- |
| `401` Unauthorized | The request has no key. Check the `Authorization` header. |
| `403` Forbidden | The key is invalid or lacks the `Key` prefix. Check that the key belongs to the graph you query. |
| Documents are empty | The field names in `config_options` do not match the aliases in your query, or your graph uses other properties. Compare the aliases with `text_fields` and `metadata_fields`, and check an entity's IRI. |
| The query times out | The query returns too much data. Use `page` and `rows` to load the data in smaller pages. |

## Related {#related}

- [Query your Knowledge Graph with GraphQL](/apis-and-sdks/graphql-api/)
- [RAG and LLMs](/concepts/rag-and-llms/)
- [WordLift Vector Store](/apis-and-sdks/llm-connectors/wordlift-vector-store/)
- [llama-index-readers-wordlift on PyPI](https://pypi.org/project/llama-index-readers-wordlift/)
- Colab demos: [WordLift Reader demo](https://wor.ai/wl-reader-demo) and a [variant using Matryoshka embeddings](https://wor.ai/matryoshka)
- [Knowledge graphs and LLMs](https://wordlift.io/blog/en/knowledge-graph-and-llm/) on the WordLift blog

:::warning[Review needed]
TODO [SME]: confirm the wor.ai Colab notebooks (wl-reader-demo, matryoshka) are live and maintained.
:::
