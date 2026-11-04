---
title: "Developer path"
description: "Go from access and authentication to the WordLift APIs, MCP Server and worai CLI, with one line on what each programmable surface is for."
last_updated: 2026-10-27
---

# Developer path

This path is for developers and technical SEO engineers who integrate WordLift into their own stack: a headless site, an application, an AI assistant or a data pipeline. It starts with the programmable surfaces and links out to each page in order. Business+ and Enterprise access is sales-led. The Resolve API is self-serve, so you can get access without a sales conversation.

## Discover

Start with the programmable surface, not the marketing introduction.

<Cards cols={2}>
  <Card title="APIs and SDKs" href="/apis-and-sdks/">
    See the APIs, SDKs and connectors WordLift offers and what each one is for.
  </Card>
  <Card title="Get access" href="/apis-and-sdks/#get-access">
    Find out how to get access for your plan, and how to get Resolve API access directly.
  </Card>
</Cards>

## Onboard

Get your API key first, then connect WordLift to your own tools.

<Cards cols={2}>
  <Card title="Authentication and API keys" href="/apis-and-sdks/#authentication">
    Find your WordLift key at [my.wordlift.io](https://my.wordlift.io) and learn how requests authenticate.
  </Card>
  <Card title="MCP Server" href="/tools/mcp-server/">
    Connect AI assistants such as Claude, Cursor or Visual Studio Code to Agent WordLift and your Knowledge Graph through the Model Context Protocol (MCP).
  </Card>
  <Card title="Install the worai CLI" href="/tools/worai-cli/install/">
    Install the command-line tool on your machine.
  </Card>
</Cards>

## Configure

Work with the core programmable surfaces.

<Cards cols={2}>
  <Card title="Data API" href="/apis-and-sdks/data-api/">
    Fetch the JSON-LD for a page, for client-side or server-side injection.
  </Card>
  <Card title="GraphQL reference" href="/apis-and-sdks/api-reference/graphql/graphql-support/">
    Query your Knowledge Graph with flexible GraphQL queries.
  </Card>
  <Card title="KG-REST" href="/apis-and-sdks/kg-rest/">
    Create, read, update and delete graph data over REST.
  </Card>
  <Card title="worai CLI configuration" href="/tools/worai-cli/configuration/">
    Configure the CLI, then run the commands listed under worai CLI in the sidebar.
  </Card>
  <Card title="Python SDK" href="/apis-and-sdks/python-sdk/">
    Call WordLift from Python.
  </Card>
  <Card title="Errors and rate limits" href="/apis-and-sdks/#errors">
    Handle error responses and stay within [usage limits](/apis-and-sdks/#rate-limits).
  </Card>
</Cards>

## Activate

Build applications on top of your graph.

<Cards cols={2}>
  <Card title="WordLift Reader" href="/apis-and-sdks/llm-connectors/wordlift-reader/">
    Load Knowledge Graph data into LlamaIndex and LangChain applications.
  </Card>
  <Card title="WordLift Vector Store" href="/apis-and-sdks/llm-connectors/wordlift-vector-store/">
    Use your Knowledge Graph as a vector store for LlamaIndex applications.
  </Card>
  <Card title="Migrate to the server-side Data API" href="/apis-and-sdks/data-api/migrate/">
    Move an existing client-side implementation to server-side injection.
  </Card>
  <Card title="Resolve API" href="/apis-and-sdks/resolve/">
    Resolve mentions in a text to identifiers in Wikidata, your Knowledge Graph or an inline vocabulary. Access is self-serve.
  </Card>
</Cards>

:::warning[Review needed]
TODO [SME]: confirm how a developer obtains a Resolve API key (the APIs and SDKs landing names wordlift.io/resolve, but the Resolve guide does not say), then remove this note.
:::

## Expand

Go deep on custom integration work.

<Cards cols={2}>
  <Card title="API reference" href="/apis-and-sdks/api-reference/">
    Look up every endpoint, parameter and response.
  </Card>
</Cards>

## Other paths

- [Business+ path](/welcome/paths/business-plus/)
- [Enterprise path](/welcome/paths/enterprise/)
- [Content team path](/welcome/paths/content-team/)
- [Marketing team path](/welcome/paths/marketing-team/)
- [E-commerce path](/welcome/paths/e-commerce/)
- [Welcome to WordLift](/welcome/)
