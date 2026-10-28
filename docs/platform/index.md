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

<PlatformDiagram />

## Knowledge Graph

<Cards cols={2}>
  <Card title="Knowledge Graph" href="/platform/knowledge-graph/" accent="sky">
    Represents the people, places, products, content and other entities that matter to your website or organization, with the relationships between them. You own the structured metadata you create and can export the complete graph as RDF/XML, JSON-LD, Turtle or N3.
  </Card>
  <Card title="GraphSync" href="/platform/knowledge-graph/graph-sync/" accent="sky">
    Creates and maintains a content Knowledge Graph from your pages or other approved sources. It is the recommended route for Business+ and Enterprise customers.
  </Card>
  <Card title="Product Knowledge Graph" href="/platform/knowledge-graph/product-knowledge-graph/" accent="sky">
    Builds a Knowledge Graph of your catalog from a Google Merchant Center feed and publishes structured product data on your site.
  </Card>
  <Card title="Schema publishing" href="/platform/knowledge-graph/schema-publishing/" accent="sky">
    Compares the ways WordLift delivers JSON-LD from the graph to your pages, client-side or server-side.
  </Card>
</Cards>

## Agent WordLift

<Cards cols={2}>
  <Card title="Agent WordLift" href="/platform/agent-wordlift/" accent="moss">
    Puts the Knowledge Graph to work for SEO, content and marketing tasks. Agent WordLift is a product included in both Business+ and Enterprise.
  </Card>
  <Card title="Getting started" href="/platform/agent-wordlift/getting-started/" accent="moss">
    Opens Agent WordLift at agent.wordlift.io and connects it to your Knowledge Graph with your WordLift Key.
  </Card>
  <Card title="Workflows" href="/platform/agent-wordlift/workflows/" accent="moss">
    Combine several tools into repeatable processes, such as a rankings drop audit or keyword discovery.
  </Card>
  <Card title="Integrations" href="/platform/agent-wordlift/integrations/" accent="moss">
    Reach Agent WordLift through the MCP Server, wordlift-cli, the Agent API and Zapier.
  </Card>
</Cards>

## Set up and operate

<Cards cols={2}>
  <Card title="Dashboard" href="/platform/dashboard/">
    Sign in at my.wordlift.io, choose a Knowledge Graph, find your WordLift Key and reach the tools and settings.
  </Card>
  <Card title="Data Sources" href="/platform/data-sources/">
    Connect Google Search Console and Google Analytics, and import web pages, Botify crawl data and product feeds into the graph.
  </Card>
  <Card title="Monitor" href="/platform/monitor/" tag="early-access">
    Check how ready your site is for search engines and AI assistants, and whether every page carries the structured data you expect.
  </Card>
</Cards>

## Work from your own tools

<Cards cols={2}>
  <Card title="Interfaces and tools" href="/tools/">
    Operate WordLift from an AI assistant through the MCP Server, or from the command line with the worai CLI and wordlift-cli.
  </Card>
  <Card title="Integrations" href="/integrations/">
    Connect WordLift to your CMS, store, automation or reporting tool.
  </Card>
  <Card title="APIs and SDKs" href="/apis-and-sdks/">
    Program the Knowledge Graph and Agent WordLift from your own stack.
  </Card>
</Cards>

## What's new

See the latest product releases in [What's new](/whats-new/).

:::warning[Review needed]
TODO [SME]: confirm how the latest three What's New entries auto-feed onto this page (component, tag filter or manual list), then replace the link above with the feed.
:::

## Next steps

Follow the [onboarding overview](/welcome/#onboarding-overview) to set up your account step by step. To see what each plan includes, compare Business+ and Enterprise in the [Feature Matrix](/plans-and-pricing/feature-matrix/).
