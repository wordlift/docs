---
title: "The WordLift platform"
description: "See how the Knowledge Graph and Agent WordLift fit together, how Data Sources feed the graph, and where to start with the Dashboard, tools and APIs."
sidebar_label: "Platform"
last_updated: 2026-10-27
---

# The WordLift platform

A knowledge graph for the agentic web. WordLift is one platform with two pillars: the Knowledge Graph, which is the memory, and Agent WordLift, which is the agentic AI that works on it. SEO and generative engine optimization (GEO) are one application of the platform.

:::warning[Review needed]
TODO [Jason]: confirm that "A knowledge graph for the agentic web. One platform, two pillars" is approved as public lede wording.
:::

## How the platform fits together

Data Sources bring your site, search, analytics and product data into the Knowledge Graph. The Knowledge Graph stores the entities that matter to your organization, their relationships, structured data, search signals, provenance and reusable context. Agent WordLift uses specialized tools on top of the graph to retrieve evidence, analyze content, reason over entities, generate outputs, validate claims and automate workflows. WordLift Cloud and the Data API publish graph-backed structured data on your website, and you reach everything through the Dashboard, your own tools and the APIs.

```text
Data Sources  ->  Knowledge Graph (memory)  ->  Agent WordLift (agentic AI)
                         |
                         v
          Structured data published on your website

Access: Dashboard, Interfaces and tools, Integrations, APIs and SDKs
```

## Knowledge Graph

- **[Knowledge Graph](/platform/knowledge-graph/):** Represents the people, places, products, content and other entities that matter to your website or organization, with the relationships between them. You own the structured metadata you create and can export the complete graph as RDF/XML, JSON-LD, Turtle or N3.
- **[GraphSync](/platform/knowledge-graph/graph-sync/):** Creates and maintains a content Knowledge Graph from your pages or other approved sources. It is the recommended route for Business+ and Enterprise customers.
- **[Product Knowledge Graph](/platform/knowledge-graph/product-knowledge-graph/):** Builds a Knowledge Graph of your catalog from a Google Merchant Center feed and publishes structured product data on your site.
- **[Schema publishing](/platform/knowledge-graph/schema-publishing/):** Compares the ways WordLift delivers JSON-LD from the graph to your pages, client-side or server-side.

## Agent WordLift

- **[Agent WordLift](/platform/agent-wordlift/):** Puts the Knowledge Graph to work for SEO, content and marketing tasks. Agent WordLift is a product included in both Business+ and Enterprise.
- **[Getting started](/platform/agent-wordlift/getting-started/):** Opens Agent WordLift at agent.wordlift.io and connects it to your Knowledge Graph with your WordLift Key.
- **[Workflows](/platform/agent-wordlift/workflows/):** Combine several tools into repeatable processes, such as a rankings drop audit or keyword discovery.
- **[Integrations](/platform/agent-wordlift/integrations/):** Reach Agent WordLift through the MCP Server, wordlift-cli, the Agent API and Zapier.

## Set up and operate

- **[Dashboard](/platform/dashboard/):** Sign in at my.wordlift.io, choose a Knowledge Graph, find your WordLift Key and reach the tools and settings.
- **[Data Sources](/platform/data-sources/):** Connect Google Search Console and Google Analytics, and import web pages, Botify crawl data and product feeds into the graph.
- **[Monitor](/platform/monitor/) (Early Access):** Check how ready your site is for search engines and AI assistants, and whether every page carries the structured data you expect.

## Work from your own tools

- **[Interfaces and tools](/tools/):** Operate WordLift from an AI assistant through the MCP Server, or from the command line with the worai CLI and wordlift-cli.
- **[Integrations](/integrations/):** Connect WordLift to your CMS, store, automation or reporting tool.
- **[APIs and SDKs](/apis-and-sdks/):** Program the Knowledge Graph and Agent WordLift from your own stack.

## What's new

See the latest product releases in [What's new](/whats-new/).

:::warning[Review needed]
TODO [SME]: confirm how the latest three What's New entries auto-feed onto this page (component, tag filter or manual list), then replace the link above with the feed.
:::

## Next steps

Follow the [onboarding overview](/welcome/#onboarding-overview) to set up your account step by step. To see what each plan includes, compare Business+ and Enterprise in the [Feature Matrix](/plans-and-pricing/feature-matrix/).
