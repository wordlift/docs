---
title: "GraphQL API"
description: "Read your Knowledge Graph over GraphQL from your own stack: the endpoint at a glance, the full guide, the API reference and the WordLift tools that use it."
sidebar_label: "GraphQL API"
last_updated: 2026-10-28
---

# GraphQL API

The GraphQL API reads the entities in your Knowledge Graph and returns JSON shaped like your query, so your application fetches exactly the fields it needs. It is read-only. To create, update or delete entities, or to export the whole graph, use [KG-REST](/apis-and-sdks/kg-rest/).

The full guide lives with the Knowledge Graph, in [Query the Knowledge Graph](/platform/knowledge-graph/query/).

## At a glance {#at-a-glance}

- **Endpoint.** Send `POST` requests to `https://api.wordlift.io/graphql` with a JSON body that holds `query`, and optionally `variables` and `operationName`.
- **Authentication.** Send `Authorization: Key <your key>` or `X-API-Key: <your key>`. The key selects your Knowledge Graph. See [Authentication and API keys](/apis-and-sdks/#authentication).
- **Access.** Business+ and Enterprise both include the GraphQL API. See [Get access](/apis-and-sdks/#get-access).

## Where to go next {#where-to-go-next}

<Cards cols={2}>
  <Card title="GraphQL guide" href="/platform/knowledge-graph/query/graphql/" eyebrow="Guide" accent="sky">
    Your first query, entry points, filters, paging, vector search, private data and errors.
  </Card>
  <Card title="Query the Knowledge Graph" href="/platform/knowledge-graph/query/" eyebrow="Overview">
    Choose between GraphQL and SPARQL for the job.
  </Card>
  <Card title="SPARQL guide" href="/platform/knowledge-graph/query/sparql/" eyebrow="Guide">
    Query the same graph with SPARQL 1.1.
  </Card>
  <Card title="GraphQL API reference" href="/apis-and-sdks/api-reference/graphql/graphql-support/" eyebrow="Reference">
    The request and response schema, generated from the OpenAPI specification.
  </Card>
</Cards>

## Tools that use GraphQL {#tools-that-use-graphql}

- **[WordLift Reader](/apis-and-sdks/llm-connectors/wordlift-reader/).** Loads GraphQL results into LlamaIndex applications.
- **[Zapier](/integrations/zapier/) and [Power Automate](/integrations/power-automate/).** Run GraphQL queries inside your automations.
- **[Content Generation API](/platform/agent-wordlift/content-generation/api-guide/#graphql-presets).** Uses GraphQL presets, sample queries for common content scenarios.
- **[worai CLI](/tools/worai-cli/install/).** Commands such as `dedupe` query `https://api.wordlift.io/graphql` by default.
