---
title: Llama Index - WordLift Vector Store
sidebar_position: 1
---

# WordLift Vector Store for LlamaIndex 🦙

[WordLift Vector Store](https://llamahub.ai/l/vector_stores/llama-index-vector-stores-wordlift?from=) is a **Knowledge Graph-based Vector SLlamaIndex**. This integration enables WordLift to be used as a vector store for LlamaIndex, allowing you to **work with your knowledge graph directly from your codebase**.

With WordLift Vector Store, you can:

- Perform **Knowledge Graph retrieval-augmented generation (Knowledge-enabled RAG)** using your knowledge graph data directly in your codebase.
- Add new nodes and search within your knowledge graph effortlessly.

## Getting Started

To start using the WordLift Vector Store, you need to configure your LlamaIndex project. Please read the [documentation on the LlamaIndex website](https://docs.llamaindex.ai/en/stable/getting_started/installation/).

⚠️ To use the WordLift Vector Store, you will need your WordLift Key. You can obtain a WordLift Key by subscribing to one of WordLift's plans. Start using this and other integrations by choosing the [**WordLift Business Plan**](https://s.wordlift.io/get-started/?product_id=51698&lang=en&_ga=2.229910552.580544220.1719219882-1472873283.1715336664). Once subscribed, you will receive your WordLift Key, which you can use to access the Vector Store and other features.

## Usage

See the example below to set up your first project.

```
# import the necessary modules
from llama_index.core import SimpleDirectoryReader, StorageContext
from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.wordlift import WordliftVectorStore


# set the openAI key to use GPT as LLM (the default LlamaIndex LLM)
import os
import openai

openai.api_key = os.environ["your_openAI_key"]

# download a sample file and create documents from it
!mkdir 'data\paul_graham\'
!curl 'https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt' -O 'data/paul_graham/paul_graham_essay.txt'

documents = SimpleDirectoryReader("./data/paul_graham").load_data()


# Wordlift Knowledge Graphs are built on the principles of fully Linked Data,
# where each entity is assigned a permanent dereferentiable URI.

# When adding nodes to an existing Knowledge Graph, it's essential to include
# an "entity_id" in the metadata of each loaded document.

# For further insights into Fully Linked Data, explore these resources:
# [W3C Linked Data](https://www.w3.org/DesignIssues/LinkedData.html),
# [5 Star Data](https://5stardata.info/en/).

!curl https://api.wordlift.io/accounts/me -H 'Authorization: Key your_key' | jq .

# To generate the entity_id, concatenate the datasetURI with the normalized
# filename.

# For instance, if your datasetURI is `https://data.wordlift.io/wl0000000/` and # your text file is named `sample-file.txt`, the entity_id can be constructed
# as follows:
# `entity_id = datasetURI + normalize(filename)`
# which results in `https://data.wordlift.io/wl0000000/sample-file-txt`.

dataset_uri = "your_dataset_uri"

for document in documents:
 norm_filename = document.metadata["file_name"].replace(".", "-")
 entity_id = dataset_uri + norm_filename
 document.metadata["entity_id"] = entity_id

# Create an instance of Wordlift Vector Store
vector_store = WordliftVectorStore.create("your_key")

# set Wordlift vector store instance as the vector store
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_documents(documents, storage_context=storage_context)

# test the vector store query
query_engine = index.as_query_engine()
response = query_engine.query("What did the author do growing up?")
print(response)

```

## Additional Resources

For more information on using WordLift Reader, check out:

- our [Python Notebook](https://github.com/run-llama/llama_index/blob/main/docs/docs/examples/vector_stores/WordLiftDemo.ipynb)
- our blog post about [LLMs for SEO & Marketing Automation](https://wordlift.io/blog/en/semantic-search-with-wordlift-vector-store/), introducing the WordLift Vectore Store and its advantages,
- the [official documentation from LlamaIndex](https://docs.llamaindex.ai/en/stable/community/integrations/vector_stores/).

## Conclusion

**WordLift Vector Store** represents a significant leap forward in our mission to make the web more intelligent and accessible. By transforming your knowledge graph into interactive and contextually aware conversations, we are not only enhancing the user experience but also paving the way for more effective and precise SEO strategies.

This integration is meticulously designed for SEO and marketing automation, **ensuring that your content is not only optimized but also dynamically adaptable to the ever-evolving digital landscape**. With WordLift Vector Store, you gain the ability to harness the power of AI, natural language processing, and high-dimensional vector spaces, **making your search capabilities more robust and your marketing efforts more impactful**.

By leveraging this cutting-edge technology, you can achieve **scalability and precision**, ultimately driving better engagement and higher conversion rates. WordLift Vector Store is your gateway to a smarter, more efficient web presence, tailored to meet the demands of modern SEO and marketing automation.
