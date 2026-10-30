---
title: "Knowledge graph"
description: "A knowledge graph describes entities and the relationships between them so machines can read them. Learn the building blocks and how WordLift stores your data."
last_updated: 2026-10-27
---

# Knowledge graph

A knowledge graph is a network of entities, such as people, places, products and content, together with the relationships between them, described so that machines can read and reason over it.

In these docs, lowercase "knowledge graph" is the general concept. Capitalized, Knowledge Graph is the WordLift product: it represents the entities that matter to a website or organization and the relationships between them.

## Why it matters

A knowledge graph gives you one shared, machine-readable description of your entities. The structured data on your pages, your internal links and the answers AI systems give about you can all draw on that single source instead of separate copies that drift apart. For the role the Knowledge Graph plays in the WordLift platform, read the [Knowledge Graph overview](/platform/knowledge-graph/).

## How it works: entities, properties and triples

A knowledge graph is built from three parts:

- **Entities.** The things the graph describes, each with its own identifier. Read [Entities](/concepts/entities/).
- **Properties.** The facts about an entity, such as its name or URL, and its links to other entities.
- **Triples.** Each fact is stored as a triple: a subject, a predicate and an object.

Triples link together into a graph that has no fixed hierarchy, that machines can read, and that software can use to infer new facts. Unlike a [vocabulary](/concepts/vocabulary/), a knowledge graph is not limited to concepts and terms: it also holds the instances it describes and the facts that connect them.

### Worked example

A web page about a topic, published by an organization, produces these triples:

| Subject | Predicate | Object |
| --- | --- | --- |
| Example page | `about` | Example topic |
| Example page | `publisher` | Example Organization |
| Example topic | `sameAs` | `https://www.wikidata.org/wiki/Q1492` |
| Example Organization | `url` | `https://example.org/` |

Read the rows together and you get a small graph: the page points to its topic and its publisher, and the topic points to the matching item in Wikidata. The same data, expressed as JSON-LD, is shown in [JSON-LD](/concepts/json-ld/).

## How WordLift stores and identifies data

- **Linked data.** WordLift stores the graph as linked data entities and exports it in standard RDF formats. Read [Linked data](/concepts/linked-data/).
- **Schema.org.** Entities are described with schema.org types and properties, so search engines and AI systems can read them. Read [Schema.org](/concepts/schema-org/).
- **Dataset URI.** Every entity identifier sits under the graph's dataset URI, for example `https://data.example.org/entity/page`. Enterprise customers can publish the graph under a [customer-controlled domain](/plans-and-pricing/custom-domain/). Choose the dataset URI strategy before production, because changing it later can require an identifier migration.
- **Graphs, languages and accounts.** Each website is linked to a graph, and each graph has one language and optionally a country. A multilingual website links one graph per language (read [Multilingual](/platform/knowledge-graph/multilingual/)). A Business+ account can include several Knowledge Graphs, each with its own dataset and API key.

You own the structured metadata you create with WordLift, and you can export the complete graph. Read [Data ownership and portability](/platform/knowledge-graph/#data-ownership-and-portability).

## Getting data in and out

### In

[GraphSync](/platform/knowledge-graph/graph-sync/) is the recommended way for Business+ and Enterprise customers to create and maintain a content Knowledge Graph. Narrower methods fit specific sources:

- **[Product Knowledge Graph Builder](/platform/knowledge-graph/product-knowledge-graph/)** when your main source is a Google Merchant Center product feed.
- **[WordPress plugin](/integrations/wordpress-plugin/)** when editors manage entities and annotations in WordPress.
- **[Botify Crawl Import](/platform/data-sources/botify/)** when Botify crawl data is the source.
- **[Sitemap Import](/platform/data-sources/sitemap/)** for a small, simple set of page entities, with a maximum of 50 web pages per synchronous request.
- **[Web Page Import](/platform/data-sources/web-page-import/)** for one or a few individual pages.
- **Direct APIs or SDKs** when your engineering team owns the entity model, identifiers and synchronization.

[Create a Knowledge Graph](/platform/knowledge-graph/create/) compares these methods in detail.

### Out

- **[GraphQL API](/apis-and-sdks/graphql-api/)** queries the data in the graph.
- **[KG-REST](/apis-and-sdks/kg-rest/)** handles graph operations and [exports the complete graph](/apis-and-sdks/kg-rest/#export) as RDF/XML, JSON-LD, Turtle or N3.
- **[Data API](/apis-and-sdks/data-api/)** publishes the structured data for a single web page from the graph, as JSON-LD.

## Related

- [Knowledge Graph overview](/platform/knowledge-graph/)
- [Create a Knowledge Graph](/platform/knowledge-graph/create/)
- [GraphSync](/platform/knowledge-graph/graph-sync/)
- [Entities](/concepts/entities/)
- [Linked data](/concepts/linked-data/)
- [JSON-LD](/concepts/json-ld/)
- [Vocabulary](/concepts/vocabulary/)
