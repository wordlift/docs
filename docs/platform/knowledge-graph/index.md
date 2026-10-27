---
title: "Knowledge Graph"
description: "Build, maintain, publish and export your WordLift Knowledge Graph, the memory layer that stores your entities and the context Agent WordLift works on."
sidebar_position: 0
last_updated: 2026-10-27
---

# Knowledge Graph

The Knowledge Graph represents the people, places, products, content and other entities that matter to your website or organization, together with the relationships between them. It is the memory layer of the WordLift platform: Data Sources feed it, Agent WordLift works on it and your website publishes it as structured data.

This page covers how you build, use and own your WordLift Knowledge Graph. For what a knowledge graph is in general, see [Knowledge graph](/concepts/knowledge-graph/) in Concepts.

## The memory layer

WordLift is built on two layers. The Knowledge Graph is the memory layer: it stores entities, relationships, structured data, search signals, provenance and reusable context. The agentic layer, [Agent WordLift](/platform/agent-wordlift/), uses specialized tools to retrieve evidence from that memory, analyze content, reason over entities, generate outputs, validate claims and automate workflows.

Because the memory is one shared graph, the same entities serve several uses:

- **Structured data on your pages:** WordLift Cloud and the [Data API](/apis-and-sdks/data-api/) publish graph-backed JSON-LD for each URL. See [Schema publishing](/platform/knowledge-graph/schema-publishing/).
- **Queries from your own stack:** The [GraphQL API](/apis-and-sdks/graphql-api/) gives query access to the data in the graph, and [KG-REST](/apis-and-sdks/kg-rest/) provides graph operations and a full export.
- **Context for Agent WordLift:** Agent WordLift draws on the entities, relationships and search signals stored in your graph.

## Build and maintain the graph

For Business+ and Enterprise customers, start with [Create a Knowledge Graph](/platform/knowledge-graph/create/) to compare population methods. [GraphSync](/platform/knowledge-graph/graph-sync/) is the recommended way to create and maintain a content Knowledge Graph, while specialized alternatives fit narrower sources and use cases.

Once the graph is populated, use the [Analytics API](/apis-and-sdks/analytics-api/) to add search performance data when your use case requires it.

Use [Data Sources](/platform/data-sources/oauth2/) to connect OAuth2-based search and analytics providers from the WordLift Dashboard or through the Manager API.

Go further with these pages:

- **[Product Knowledge Graph](/platform/knowledge-graph/product-knowledge-graph/):** Build a graph of your catalog from a Google Merchant Center feed.
- **[Entity management](/platform/knowledge-graph/entity-management/):** Create, edit, link and clean up the entities in your graph.
- **[Schema publishing](/platform/knowledge-graph/schema-publishing/):** Choose how JSON-LD from the graph reaches your pages.
- **[Multilingual](/platform/knowledge-graph/multilingual/):** Link a multilingual website to one graph per language.

## Data ownership and portability {#data-ownership-and-portability}

WordLift hosts and operates the managed Knowledge Graph while the service is active. You own the structured metadata you create with WordLift. [GraphQL](/apis-and-sdks/api-reference/graphql/graphql-support/) provides query access to data in the Knowledge Graph, while KG-REST provides graph operations and a [complete dataset export](/apis-and-sdks/kg-rest/#export).

The export includes the entities, properties and relationships in the graph and is available as RDF/XML, JSON-LD, Turtle or N3. These open RDF serializations and the use of Schema.org make the data portable to other RDF-compatible systems. WordLift hosting, publishing, synchronization, monitoring and other managed capabilities depend on an active service; this documentation does not define a post-service retention period.

For long-term control of entity identifiers, Enterprise customers can publish the graph under a [customer-controlled domain](/plans-and-pricing/custom-domain/). Choose the dataset URI strategy before production, because changing it later can require an identifier migration.

## Frequently asked questions

### How can WordLift JSON-LD be delivered to a page?

WordLift supports client-side delivery with `bootstrap.js` and server-side, build-time or edge delivery through the Data API. See [Ways to inject structured data](/apis-and-sdks/data-api/#ways-to-inject-structured-data) for the supported patterns and their tradeoffs, or [Schema publishing](/platform/knowledge-graph/schema-publishing/) for a comparison.

### Which delivery method should I use for crawlers that do not execute JavaScript?

Use server-side, build-time or edge delivery so the JSON-LD is present in the initial HTML response. See [Choosing client-side or server-side injection](/apis-and-sdks/data-api/#choosing-client-side-or-server-side-injection).

### How can I inject WordLift JSON-LD at the Cloudflare edge?

Use a Cloudflare Worker to retrieve page-specific JSON-LD and insert it into the origin HTML with `HTMLRewriter`. Follow [Cloudflare integration](/apis-and-sdks/data-api/cloudflare-integration/) for the request boundaries, caching pattern, reference implementation and validation checklist.

### Who owns Knowledge Graph data, and how can it be exported or migrated?

You own the structured metadata you create with WordLift and can export the complete graph in standard RDF formats. Review [Data ownership and portability](#data-ownership-and-portability), the [dataset export endpoint](/apis-and-sdks/kg-rest/#export) and [customer-controlled domains](/plans-and-pricing/custom-domain/) for identifier continuity.

### How does GraphSync reuse mappings across pages that share a template?

GraphSync reuses a validated source-specific mapping across pages with the same structure while producing page-specific entities and relationships for every URL. See [How GraphSync reuses mappings](/platform/knowledge-graph/graph-sync/#how-does-graphsync-reuse-mappings-across-pages-that-share-a-template).
