---
title: "What's new"
description: "The WordLift product release feed: dated entries for platform, Agent WordLift, API, SDK and tool changes and deprecations, with links to the updated docs."
last_updated: 2026-10-27
---

# What's new

This is the product release feed for WordLift customers. Each entry gives the release date, the type of change, what changed in the product, who it affects and a link to the page that documents it. Entries are listed newest first.

:::warning[Review needed]
TODO [SME]: this page is a placeholder for the feed until the What's New blog plugin instance (routeBasePath `whats-new`, tags file and RSS feed) is configured; tag filters and the RSS link go live with it.
:::

## Filter by type

Every entry carries one or more type tags.

| Type | What it covers |
| --- | --- |
| Platform | The Dashboard, Knowledge Graph, Monitor and other platform features. |
| Agent | Agent WordLift, its tools and workflows. |
| API | WordLift APIs, such as the Data API, GraphQL API and Resolve API. |
| SDK | Client libraries, such as the Python SDK. |
| Tool | Interfaces and tools, such as the MCP Server, worai CLI and Agent WordLift Skill. |
| Deprecation | Features or endpoints that are being retired, with the date and the replacement. |

## Subscribe

Check this page for new releases.

:::warning[Review needed]
TODO [SME]: the RSS and Atom feeds (`/whats-new/rss.xml`, `/whats-new/atom.xml`) exist only once the What's New blog plugin instance is configured. Add the subscribe instructions back when the feed is live.
:::

For releases of the classic WordPress plugin, which is supported for existing installs, see the [wordlift-plugin repository on GitHub](https://github.com/insideout10/wordlift-plugin).

## Releases

:::warning[Review needed]
TODO [Jason]: confirm each release month below (they come from documentation dates) and how far back the seed entries should go at cutover.
:::

### October 2026: Resolve API

**Type:** API

The Resolve API takes a text and returns a stable identifier for each mention it can resolve, from Wikidata, your Knowledge Graph or an inline vocabulary. When it cannot resolve a mention, it returns `unresolved` with a reason. Every error is an RFC 9457 Problem Details document with a stable code. A free developer key includes 1,000 requests a month.

**Who is affected:** developers who need entity linking, including teams moving from Azure Entity Linking.

See the [Resolve API guide](/apis-and-sdks/resolve/), [Resolve API errors](/apis-and-sdks/resolve/errors/) and [Migrate from Azure Entity Linking](/apis-and-sdks/resolve/migrate-from-azure-entity-linking/).

### October 2026: MCP Server on streamable HTTP

**Type:** Tool

The WordLift MCP Server is reachable at `https://mcp.wordlift.io/streamable-http`.

**Who is affected:** anyone who connects an AI assistant or MCP client to WordLift. Check that your client configuration uses this URL.

See [MCP Server](/tools/mcp-server/).

### September 2026: Microsoft 365 Copilot through Copilot Studio

**Type:** Tool

You can connect WordLift's MCP tools to Microsoft 365 Copilot. Build an agent in Copilot Studio, connect it to the WordLift MCP Server with OAuth 2.0, and publish it to Microsoft 365 Copilot.

**Who is affected:** teams that use Microsoft 365 Copilot.

See [Microsoft 365 Copilot](/tools/mcp-server/microsoft-365-copilot/).

### July 2026: Data API out-of-band cache prefill and Cloudflare integration

**Type:** API

Two new server-side delivery options for Data API JSON-LD. Out-of-band cache prefill refreshes JSON-LD on a schedule and serves it from your application cache, so pages do not call the Data API while rendering. The Cloudflare integration fetches JSON-LD at the edge and injects it into the initial HTML response.

**Who is affected:** teams that need WordLift JSON-LD in the initial HTML response.

See [Out-of-band cache prefill](/apis-and-sdks/data-api/out-of-band-cache-prefill/) and [Cloudflare integration](/apis-and-sdks/data-api/cloudflare-integration/).

### July 2026: Agent WordLift Skill 1.1.0

**Type:** Tool

Version 1.1.0 of the Agent WordLift Skill brings the SEO Audit Skill into one unified skill. The skill teaches an MCP-capable AI assistant how to use WordLift's tools.

**Who is affected:** users of the standalone SEO Audit Skill, which is now part of the Agent WordLift Skill.

See [Agent WordLift Skill](/tools/agent-wordlift-skill/).

### June 2026: worai CLI installers

**Type:** Tool

Public installer scripts install or upgrade the worai CLI through `pipx` and add it to your shell path when needed.

**Who is affected:** anyone who installs or upgrades the worai CLI.

See [Install the worai CLI](/tools/worai-cli/install/).

### May 2026: Data API client-side and server-side injection

**Type:** API

The Data API returns the JSON-LD that WordLift generates for a URL. You can inject it in the browser with WordLift Cloud, or on the server in your own rendering layer.

**Who is affected:** teams choosing how to deliver structured data to their pages.

See [Data API](/apis-and-sdks/data-api/).

### February 2026: Monitor API

**Type:** API

The Monitor API returns the latest Monitor results for a URL in a Knowledge Graph, through `GET /monitor/graphs/{graph_id}/urls/results`.

**Who is affected:** developers who want Monitor results in their own reports or pipelines.

See [Monitoring API guide](/apis-and-sdks/monitoring/).
