---
title: "RAG and LLMs"
description: "Retrieval-augmented generation grounds a large language model in your own data. Learn what a WordLift Knowledge Graph adds and which connectors support it."
last_updated: 2026-10-27
---

# RAG and LLMs

Retrieval-augmented generation (RAG) grounds the answers of a large language model (LLM) in your own data. This page explains how RAG works with a WordLift Knowledge Graph and which WordLift surfaces you can use to build it.

## Definition

RAG is a pattern for LLM applications. Before the model answers, the application retrieves relevant facts from a data source and passes them to the model as context, so the answer draws on that data. Graph RAG uses a knowledge graph as the source, so the retrieved facts come with entity identities and relationships, not only passages of text.

## Why it matters

A language model on its own answers from what it learned in training. It does not know your catalog, your articles or your organization. RAG gives it your data at the moment it answers. A [knowledge graph](/concepts/knowledge-graph/) adds structure that text-only retrieval lacks:

- **Stable identities.** Each [entity](/concepts/entities/) has its own identifier, so "Apple" the company and "Apple" the fruit stay separate when the application retrieves facts about them.
- **Relationships.** The graph records how things connect, such as a product to its brand or an article to its author, so retrieval can follow those links.
- **Structured facts.** Properties such as a name, a URL or an offer come back as typed values, not sentences the model has to interpret.

Grounding makes answers more likely to reflect your data. It does not guarantee accuracy, so validate outputs that matter.

## How it works with a WordLift Knowledge Graph

You can retrieve from a WordLift Knowledge Graph in two ways, and combine them.

- **Structured retrieval with GraphQL.** The [GraphQL API](/apis-and-sdks/graphql-api/) queries entities and properties by their prefixed names, such as `schema:name`, `schema:url` or `schema:offers`. Use it for exact facts, inventories, counts and lookups by URL.
- **Vector retrieval with embeddings.** An embedding is a list of numbers that represents the meaning of a piece of text, so passages with similar meaning sit close together. Vector retrieval finds the passages closest to a question, which suits open-ended questions phrased in the reader's own words.
- **Both together.** An application can use GraphQL for precise facts and vector retrieval for open questions. The [Agent WordLift Skill](/tools/agent-wordlift-skill/) works this way: it routes each request to Agent WordLift, to a GraphQL query on the Knowledge Graph, or to semantic retrieval with neural search.

:::warning[Review needed]
TODO [SME]: confirm whether vector or neural search is exposed to customers (for example through GraphQL) and which properties are embedded by default.
:::

## Embeddings in the Knowledge Graph

Embeddings have to exist in the graph before vector retrieval can use them. These population methods can create them:

- **[Web Page Import](/platform/data-sources/web-page-import/)** can optionally generate vector embeddings for semantic search and AI applications when it imports a page.
- **[Botify Crawl Import](/platform/data-sources/botify/)** can optionally create embeddings for vector search from the properties you list, for example `schema:headline` and `schema:text`.
- **The [Python SDK](/apis-and-sdks/python-sdk/)** has an `EMBEDDING_PROPERTIES` setting that lists the schema properties to embed.

Embedding generation can be asynchronous. For Botify Crawl Import, embeddings are generated from a queue, so they may not be available for vector search right away. Depending on the queue size, generation can take up to an hour.

## Connectors and surfaces

[LlamaIndex](https://docs.llamaindex.ai/) is a framework for connecting data sources to LLMs. WordLift integrates with it for semantic search, AI agents and Knowledge Graph RAG applications through two connectors published in the LlamaIndex ecosystem.

- **[WordLift Reader](/apis-and-sdks/llm-connectors/wordlift-reader/).** Loads data from a WordLift Knowledge Graph through GraphQL and turns the results into LlamaIndex documents (package `llama-index-readers-wordlift`).
- **[WordLift Vector Store](/apis-and-sdks/llm-connectors/wordlift-vector-store/).** Uses the Knowledge Graph as a LlamaIndex vector store, so you can add nodes and search the graph from your code. Each document you add carries an `entity_id` built from your dataset URI.
- **[MCP Server](/tools/mcp-server/).** The Model Context Protocol (MCP) Server gives an MCP-capable AI assistant access to Agent WordLift tools and your Knowledge Graph.
- **[Agent WordLift Skill](/tools/agent-wordlift-skill/).** Teaches an MCP-capable assistant how to use those tools well, including when to query the graph and when to use semantic retrieval.

:::warning[Review needed]
TODO [SME]: confirm that the WordLift Reader and WordLift Vector Store are still supported, and whether LangChain is supported directly or only through LlamaIndex.
:::

### Choose a surface

| You want to | Use |
| --- | --- |
| Load graph data into a LlamaIndex RAG or semantic search app | WordLift Reader |
| Store and search embeddings alongside entity relationships from your code | WordLift Vector Store |
| Query exact facts, inventories or counts in the graph | GraphQL API |
| Give an AI assistant access to WordLift tools and your graph | MCP Server, with the Agent WordLift Skill |
| Run SEO and content workflows over your graph in conversation | [Agent WordLift](/platform/agent-wordlift/) |

## Related

- [Knowledge graph](/concepts/knowledge-graph/) and [Entities](/concepts/entities/) explain the structure that retrieval draws on.
- [GraphQL API](/apis-and-sdks/graphql-api/) and [Python SDK](/apis-and-sdks/python-sdk/) cover the developer interfaces.
- [Concepts](/concepts/) lists the other key terms.
- Background reading on the WordLift blog: [knowledge graphs and LLMs](https://wordlift.io/blog/en/knowledge-graph-and-llm/) and [semantic search with the WordLift Vector Store](https://wordlift.io/blog/en/semantic-search-with-wordlift-vector-store/).
