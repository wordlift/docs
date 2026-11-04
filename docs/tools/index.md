---
title: "Interfaces and tools"
description: "Use Agent WordLift and your Knowledge Graph from an AI assistant, a terminal, Google Sheets or Chrome. Compare each surface and open its setup guide."
last_updated: 2026-10-27
---

# Interfaces and tools

Work with Agent WordLift and your Knowledge Graph from the tools you already use: an AI assistant or IDE connected through the Model Context Protocol (MCP), a terminal, a spreadsheet or your browser. Each one is an integration surface, the place where you reach WordLift's tools, so you can keep working where you are instead of switching to the dashboard.

These surfaces are not plans or paid add-ons. They are ways to access the platform, available on Business+ and Enterprise. Most of them need your WordLift API key, which you find on your user dashboard at [my.wordlift.io](https://my.wordlift.io).

## Choose a surface

| Surface | Best for | Where it runs | What you need |
|---|---|---|---|
| [MCP Server](/tools/mcp-server/) | Asking Agent WordLift and querying your Knowledge Graph from an AI assistant or IDE | Claude, Cursor, Visual Studio Code, Windsurf, Microsoft 365 Copilot | An MCP-capable client and a WordLift API key |
| [Agent WordLift Skill](/tools/agent-wordlift-skill/) | Repeatable SEO audits and multi-tool workflows without writing the method each time | Your AI assistant, on top of the MCP Server | A connected MCP Server |
| [worai CLI](/tools/worai-cli/install/) | Building, syncing and auditing your Knowledge Graph, checking structured data and running SEO checks from scripts | Terminal on macOS, Linux or Windows PowerShell | The worai installer scripts or `pipx`, and a WordLift API key |
| [wordlift-cli](/tools/wordlift-cli/) | Chatting with Agent WordLift in a terminal and saving or chaining the results | Terminal | Node.js 20 or later and a WordLift API key |
| [Google Sheets add-on](/tools/google-sheets-addon/) | Semantic keyword research and entity analysis in a spreadsheet | Google Sheets | The add-on from Google Workspace Marketplace and a WordLift key |
| [Chrome Extension](/tools/chrome-extension/) | Checking that WordLift Cloud is set up on the page you are viewing | Google Chrome | The Agent WordLift extension from the Chrome Web Store |

## Connect AI assistants

- **[MCP Server](/tools/mcp-server/):** Connect Claude, Cursor, Visual Studio Code or Windsurf to WordLift's MCP Server. Your assistant can then call Agent WordLift's capabilities and run GraphQL queries on your Knowledge Graph from the chat.
- **[Microsoft 365 Copilot](/tools/mcp-server/microsoft-365-copilot/):** Build a Copilot Studio agent connected to the MCP Server and publish it, so your team can ask Agent WordLift questions in Copilot chat.
- **[Agent WordLift Skill](/tools/agent-wordlift-skill/):** Install the Skill in an MCP-connected assistant. It teaches the assistant which WordLift tool to use for each job and how to structure SEO audit reports.

## Work from the command line

WordLift has two command-line tools. They do different jobs.

- **[worai CLI](/tools/worai-cli/install/):** A Python tool for operating your Knowledge Graph. Use it to sync your graph, validate and inventory structured data, run `seocheck` and `seoreport`, work with Search Console data and fix canonicals. `worai agent` also starts the Codex, Claude or Gemini CLIs with a local worai MCP server.
- **[wordlift-cli](/tools/wordlift-cli/):** A Node.js tool for chatting with Agent WordLift in a terminal. Run interactive sessions or one-shot prompts, then redirect the output to a file or pipe it into another prompt. It reaches Agent WordLift through the MCP Server.

## Work in spreadsheets and the browser

- **[Google Sheets add-on](/tools/google-sheets-addon/):** Analyze the entities behind a search query or a web page, then generate the JSON-LD for the entities you select, without leaving Google Sheets.
- **[Chrome Extension](/tools/chrome-extension/):** See at a glance whether WordLift Cloud `bootstrap.js` is present and configured on a page. A red, orange or green icon shows the status.

## Looking for something else

- **[Integrations](/integrations/):** Connect WordLift to another product or move data between systems, for example the WordPress plugin, Zapier, Power Automate or Looker Studio.
- **[APIs and SDKs](/apis-and-sdks/):** Call WordLift from your own code with the Data API, GraphQL API, Python SDK and the rest of the developer reference.
