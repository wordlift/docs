---
title: Llama Index - WordLift Vector Store
sidebar_position: 1
---

# WordLift Reader for LlamaIndex 🦙
[WordLift Reader](https://llamahub.ai/l/readers/llama-index-readers-wordlift) is a robust **connector for the LlamaHub library**, compatible with LlamaIndex and LangChain. The **WordLift Reader** interacts explicitly with any Knowledge Graph built using WordLift, **transforming semantically structured data into engaging conversations** by bringing data into LlamaIndex and LangChain, two popular frameworks for developing Large Language Model (LLM) applications.

## Getting Started
To start using WordLift Reader, you need to configure your LlamaIndex project. Please read the documentation on the LlamaIndex website.
To use the WordLift Reader, you will need your WordLift Key, and you can  GraphQL to extract the data needed inside your project.

## Usage
WordLift Reader works seamlessly with LlamaIndex and LangChain, two orchestration frameworks for developing LLM-powered applications. See the example below to set up your first project.

```
!pip install llama-index
!pip install llama-index-readers-wordlift # this will import WordLiftLoader

# Make the imports
from llama_index.core import settings
from llama_index.core import VectorStoreIndex, StorageContext, load_index_from_storage
from llama_index.llms.openai import OpenAI
from llama_index.readers.wordlift import WordLiftLoader

# Set up the necessary configuration options
endpoint = "https://api.wordlift.io/graphql/graphql"
headers = { "Authorization": "[YOUR_WORDLIFT_KEY]", "Content-Type": "application/json" } query = """[YOUR_GRAPHQL_QUERY_GOES_HERE]"""
fields = "<YOUR_FIELDS>"
config_options = { 'text_fields': ['[ADD_HERE_THE_FIELDS_TO_BE_INDEXED]'], 'metadata_fields': ['[ADD_HERE_THE_FIELDS_TO_BE_USED_AS_METADATA]'] }

# Create an instance of the WordLiftLoader
reader = WordLiftLoader(
    endpoint, headers, query, "products", config_options)

# Load the data
documents = reader.load_data()

# Build the index
try:
# initialize storage context
  storage_context = StorageContext.from_defaults(persist_dir="./")
  index = load_index_from_storage(storage_context)

# If the index is not present on the disk, create the storage context and add the documents
except FileNotFoundError:
  storage_context = StorageContext.from_defaults()
  index = VectorStoreIndex.from_documents(
                documents)
  index.storage_context.persist(persist_dir="./")

# Create the query engine
query_engine = index.as_query_engine()

# Ask your question
result = query_engine.query("[YOUR_QUERY]") # Process the result as needed print("Result: %s", result)

```

## Loading Data from the Knowledge Graph
WordLift Reader uses GraphQL, a query language introduced by Facebook, to load data from the knowledge graph. With GraphQL, you can specify exactly what data you need in your LlamaIndex application, eliminating the over-fetching or under-fetching of data that can occur with traditional REST APIs.

To load data from the knowledge graph, you need to construct a GraphQL query.

Here are a few examples of queries that you can use to get started:

### Products
```query{
    products(page: 0, rows: 100){
    id: iri
    url: strings(name: "schema:url")
    gtin: strings(name: "schema:gtin")
    names: strings(name:"schema:name")
    description: strings(name:"schema:description")
    brand: resource(name:"schema:brand"){
        brand: string(name: "schema:name")
      }
    price: resource(name:"schema:offers"){
        price: string(name: "schema:price")}
    image: string(name: "schema:image")
}
}
```
### FAQs
```  faqPages{
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
### Articles
```query {
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

🚨 Be aware that data inside your knowledge graph might have a different structure and you might need to adapt these queries. Always look at the URI behind each entity (iri) to make sure you fully understand how data is organized.

Once you have constructed the query, you can submit it to the WordLift Reader, which will retrieve the specified data from the knowledge graph and pass it to LlamaIndex for creating the indices.

## Additional Resources
For more information on using WordLift Reader, check out:
- our [Colab Notebook](https://wor.ai/wl-reader-demo),
- a variant [Colab Notebook](https://wor.ai/matryoshka) using Matryoshka embeddings by Nomic
- our blog post about [utilizing knowledge graph for conversational experience and SEO](https://wordlift.io/blog/en/knowledge-graph-and-llm/),
- the [official documentation from LlamaIndex](https://gpt-index.readthedocs.io/en/latest/index.html),
- the page of [WordLift reader on LlamaHub](https://llama-hub-ui.vercel.app/l/wordlift),
- how to use [LlamaIndex with LangChain](https://gpt-index.readthedocs.io/en/latest/community/integrations/using_with_langchain.html)

## Conclusion
**WordLift Reader** represents a significant step in our mission to make the web more intelligent and accessible. By **transforming your knowledge graph into interactive conversations**, we're enhancing the user experience and paving the way for **more effective SEO strategies**.
