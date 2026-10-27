---
title: "WordLift Vector Store for LlamaIndex"
description: "Use your WordLift Knowledge Graph as a LlamaIndex vector store to add nodes and run retrieval-augmented generation from your own code."
sidebar_label: "WordLift Vector Store"
sidebar_position: 1
last_updated: 2026-10-27
---

# WordLift Vector Store for LlamaIndex

[WordLift Vector Store](https://llamahub.ai/l/vector_stores/llama-index-vector-stores-wordlift?from=) is a **Knowledge Graph-based vector store for LlamaIndex**. This integration enables WordLift to be used as a vector store for LlamaIndex, allowing you to **work with your Knowledge Graph directly from your codebase**.

With WordLift Vector Store, you can:

- Perform **Knowledge Graph retrieval-augmented generation (Knowledge-enabled RAG)** using your Knowledge Graph data directly in your codebase.
- Add new nodes and search within your Knowledge Graph.

## Getting started

To start using the WordLift Vector Store, you need to configure your LlamaIndex project. Read the [documentation on the LlamaIndex website](https://docs.llamaindex.ai/en/stable/getting_started/installation/).

:::note

To use the WordLift Vector Store, you need your WordLift Key. You get a WordLift Key with a Business+ or Enterprise plan; see [Get access](/apis-and-sdks/#get-access). Use the key to access the Vector Store and other features.

:::

## Usage

See the example below to set up your first project.

```python
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

## Additional resources

For more information on using WordLift Vector Store, check out:

- our [Python Notebook](https://github.com/run-llama/llama_index/blob/main/docs/docs/examples/vector_stores/WordLiftDemo.ipynb)
- our blog post about [LLMs for SEO & Marketing Automation](https://wordlift.io/blog/en/semantic-search-with-wordlift-vector-store/), introducing the WordLift Vector Store and its advantages,
- the [official documentation from LlamaIndex](https://docs.llamaindex.ai/en/stable/community/integrations/vector_stores/).
