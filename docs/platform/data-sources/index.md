---
title: "Data Sources"
description: "Bring site, search, analytics and product data into WordLift, and choose the right route for each source: OAuth2, page import, Botify, product feed or GraphSync."
last_updated: 2026-10-27
---

# Data Sources

Data Sources bring your site, search, analytics and product data into WordLift. They feed the [Knowledge Graph](/platform/knowledge-graph/) that Agent WordLift works on.

Each kind of source has its own route. Use this page to pick the right one before you connect anything.

## Connect search and analytics accounts

- **[OAuth2 connections](/platform/data-sources/oauth2/):** Connect Google Search Console and Google Analytics, the primary supported sources, through OAuth2. Connect them in the [Dashboard](/platform/dashboard/) (select the account or graph, then open **Data Sources**) or through the Manager API. Both use the same connector model, and the connectors available to your account can vary.

Disconnecting a source removes the authorization in WordLift. You may also need to revoke access in the provider account.

To add search performance data to the pages in your graph, use the [Analytics API](/apis-and-sdks/analytics-api/) after the graph is populated. Google Search Console is the main source.

## Import web pages

- **[Sitemap Import](/platform/data-sources/sitemap/):** Seeds a small, simple set of page entities from a `sitemap.xml` file or a URL list. It creates one entity per URL (type `WebPage` by default), accepts at most 50 pages per request and does not support sitemap indexes.
- **[Web Page Import](/platform/data-sources/web-page-import/):** Imports one or a few individual pages as `WebPage` entities, with optional vector embeddings. It is not the way to model and synchronize a complete graph.

For more than 50 pages, use [GraphSync](/platform/knowledge-graph/graph-sync/) instead of splitting the work across Sitemap Import requests.

## Import Botify crawl data

- **[Botify Crawl Imports](/platform/data-sources/botify/):** Creates web page entities with headline, abstract, text and URL from an existing Botify crawl. You need your Botify username, project and token, and a WordLift Key.

## Import product data

- **[Product Knowledge Graph](/platform/knowledge-graph/product-knowledge-graph/):** Imports a Google Merchant Center feed and builds a Knowledge Graph of your catalog. Start with **+ Add Merchant** in the Dashboard.

## Choose a population method

Data Sources add data to a graph, but most of them are not the way to build a full content graph. GraphSync is the recommended route for Business+ and Enterprise content graphs: it applies source-specific mappings, creates connected entities, keeps identifiers stable and resynchronizes as your content changes. GraphSync projects can use explicit URL lists, sitemaps or approved Google Sheets sources.

Compare every method in [Create a Knowledge Graph](/platform/knowledge-graph/create/), or go straight to [GraphSync](/platform/knowledge-graph/graph-sync/).

:::warning[Review needed]
TODO [Jason]: the IA lists "Custom Imports" as a data source, but no page or route exists. Confirm whether to add it here at cutover or leave it out.
:::

## Next steps

- **[Knowledge Graph overview](/platform/knowledge-graph/):** See how WordLift stores, publishes and exports the data your sources bring in.
- **[Agent WordLift workflows](/platform/agent-wordlift/workflows/):** Use your connected Search Console and Analytics data in workflows such as keyword discovery and rankings drop audits.
