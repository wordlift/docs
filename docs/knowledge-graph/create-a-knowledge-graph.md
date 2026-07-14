---
title: Create a Knowledge Graph
description: Choose the right way to create and populate a WordLift Knowledge Graph, with GraphSync as the recommended path for Business+ and Enterprise customers.
sidebar_position: 1
keywords:
  - create a Knowledge Graph
  - GraphSync
  - Business+ Knowledge Graph
  - Enterprise Knowledge Graph
---

# Create a Knowledge Graph

Use this guide to choose the population method that fits your source, graph model, and operating requirements.

For Business+ and Enterprise content graphs, **[GraphSync](./graphsync.md) is the recommended way to jumpstart and maintain the graph**. Specialized alternatives are appropriate when the source or use case matches their narrower purpose.

:::tip Recommended next step

[Learn how GraphSync works](./graphsync.md), or review the comparison below before [contacting WordLift](https://wordlift.io/contact-us/) to plan your onboarding.

:::

## Choose the right population method

| Method | Use it when | Important boundary |
| --- | --- | --- |
| **[GraphSync](./graphsync.md)** | You need a scalable content graph with custom mappings, stable identities, multiple connected entities, or recurring synchronization. | This is the recommended general path for Business+ and Enterprise content graphs. [Contact WordLift](https://wordlift.io/contact-us/) to get started. |
| [Product Knowledge Graph Builder](/product-knowledge-graph-builder/introduction/) | Your primary source is a Google Merchant Center product feed. | It is specialized for product catalogs and commerce data. |
| [WordPress Plugin](/wordpress-plugin/) | Editors manage entities and annotations directly in WordPress. | It is designed for WordPress editorial workflows rather than headless, source-mapped synchronization. |
| [Botify Crawl Import](./botify.md) | Botify crawl data is the source you want to map into WordLift. | It requires an existing Botify setup and is specific to Botify crawl fields. |
| [Sitemap Import](./sitemap-import.md) | You need to seed a small, simple set of page-oriented entities from a sitemap or URL list. | It creates one page-oriented entity per URL, defaults to `WebPage`, does not provide custom multi-entity mappings, and supports a maximum of 50 web pages per synchronous request. |
| [Web Page Import](./web-page-import.md) | You need to import one or a few individual pages, or use page import as a narrow integration primitive. | It is page-oriented and defaults to `WebPage`; it is not the recommended way to model and synchronize a complete graph. |
| Direct APIs or SDKs | Your engineering team already owns the entity model, identifiers, validation, and synchronization lifecycle. | Your team is responsible for graph consistency and operational maintenance. |

Different methods can coexist after onboarding. Start with one primary population workflow, validate it, and add specialized sources only when the graph has a clear need for them.

## Services that do not bootstrap a graph

Some related APIs and tools are useful around a Knowledge Graph but are not alternatives to GraphSync:

- [Web Page Scrape](/api/manager/create-web-page-scrape/) retrieves extracted page content but does not write it to the graph.
- [GraphQL](/api/graphql/graphql-support/) queries data that is already in the graph.
- [Analytics Import](./analytics-api.md) and [Data Sources](./data-sources-oauth2.md) enrich graph pages with authorized search or analytics data after the page entities exist.
- [WordLift Cloud](/cloud/) and the [Data API](./data-api.md) publish graph-backed structured data on a website; they do not define the source-to-graph model.
