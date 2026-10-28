---
title: "Connect AI assistants with the MCP Server"
description: "Connect Claude, Cursor, Visual Studio Code, Windsurf or Microsoft 365 Copilot to WordLift's MCP Server to use Agent WordLift and your Knowledge Graph from chat."
sidebar_label: "MCP Server"
last_updated: 2026-10-27
---

# Connect AI assistants with the MCP Server

The WordLift MCP Server lets AI assistants and IDEs work with your WordLift data. MCP stands for Model Context Protocol, the protocol these clients use to call external tools. Once you connect a client, you can run WordLift work from the chat instead of switching to the dashboard.

The MCP Server exposes two things to your assistant:

- **Agent WordLift capabilities:** Your assistant can call Agent WordLift directly, for example for SEO research and analysis.
- **GraphQL queries on your Knowledge Graph:** Your assistant can query the entities and content in your Knowledge Graph.

The MCP Server is an access surface, not a plan. It is available on Business+ and Enterprise.

:::warning[Review needed]
TODO [SME]: confirm whether the MCP Server is still labeled experimental; if so, add a one-line note here.
:::

Watch Claude, connected to WordLift through the MCP Server, analyze the WordLift blog to find insights about the "Agentic SEO" content cluster:

<iframe width="100%" height="500" src="https://www.youtube.com/embed/6dz_-LbP3eQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>

## Before you begin

- **A Business+ or Enterprise account:** You need a WordLift account on either plan.
- **Your WordLift API key:** Find it on your user dashboard at [my.wordlift.io](https://my.wordlift.io). It is the same key you use for your Knowledge Graph.
- **An MCP-capable client:** This page covers Claude, Cursor, Visual Studio Code, Windsurf and Microsoft 365 Copilot.
- **Node.js, for some clients:** Cursor, Visual Studio Code and Windsurf run the connection through `npx mcp-remote`, so Node.js must be installed on your machine.

:::warning[Review needed]
TODO [SME]: confirm which clients are officially supported. Other pages name ChatGPT and Gemini as clients, but no setup steps exist for them.
:::

## Server URL and authentication {#setup-instructions}

Every client connects to the same server URL:

```text
https://mcp.wordlift.io/streamable-http
```

The default setup uses only the server URL. For programmatic use or advanced configurations, you can pass your API key directly in an `Authorization` header instead. In clients that use a JSON configuration, such as Cursor and Windsurf, add the `--header` flag and your key to `args`:

```json
{
  "mcpServers": {
    "wordlift": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.wordlift.io/streamable-http",
        "--header",
        "Authorization: Key YOUR_WORDLIFT_API_KEY_HERE"
      ]
    }
  }
}
```

Replace `YOUR_WORDLIFT_API_KEY_HERE` with your WordLift API key.

:::warning[Review needed]
TODO [SME]: describe what the default flow (no header) asks for in Claude and Cursor, list the MCP tool names the server exposes, and say whether the older `https://mcp.wordlift.io/sse` URL still works for existing configurations.
:::

## Connect Claude

1. In Claude, open **Settings** and add a new integration.
2. Enter the integration details:
   - **Integration name:** `WordLift`
   - **Integration URL:** `https://mcp.wordlift.io/streamable-http`
3. Start a new chat and enable the WordLift tools. Enable them in every new chat where you want to use WordLift.

:::warning[Review needed]
TODO [SME]: confirm the current Claude menu path. The source reads Settings, then Integrations at the bottom, then Add more; Claude may now call this Connectors.
:::

## Connect Cursor

1. Press `Ctrl+Shift+J` (Windows and Linux) or `Cmd+Shift+J` (macOS) to open Cursor Settings.
2. Select **MCP**.
3. Select **Add new global MCP server**.
4. Add this configuration:

   ```json
   {
     "mcpServers": {
       "wordlift": {
         "command": "npx",
         "args": ["-y", "mcp-remote", "https://mcp.wordlift.io/streamable-http"]
       }
     }
   }
   ```

To pass your API key in a header instead, use the configuration in [Server URL and authentication](#setup-instructions).

## Connect Visual Studio Code

1. Open the Command Palette and run **MCP: Add Server**.
2. Select **Command (stdio)**.
3. Enter this command and press Enter:

   ```bash
   npx mcp-remote https://mcp.wordlift.io/streamable-http
   ```

4. Enter the name `WordLift` and press Enter.
5. Run **MCP: List Servers**, select **WordLift**, then select **Start Server**.

:::warning[Review needed]
TODO [SME]: confirm these steps are for Visual Studio Code (the source says "Visual Studio") and the shortcut that opens the command search (the source says Ctrl/Cmd+P).
:::

## Connect Windsurf

1. Press `Ctrl+,` (Windows and Linux) or `Cmd+,` (macOS) to open Windsurf settings.
2. Go to **Cascade** > **MCP servers**.
3. Select **Add Server** > **Add custom server**.
4. Add the same JSON configuration shown in [Connect Cursor](#connect-cursor).

## Connect Microsoft 365 Copilot

Microsoft 365 Copilot connects through Copilot Studio. You build a Copilot Studio agent, add the WordLift MCP Server as a tool with OAuth 2.0 dynamic discovery, and publish the agent to Microsoft 365 Copilot. Follow the full walkthrough in [Connect Microsoft 365 Copilot to WordLift](/tools/mcp-server/microsoft-365-copilot/).

## Check the connection

1. Open a new chat or session in your client.
2. Make sure the WordLift tools are enabled for that chat.
3. Ask a question that needs your WordLift data, for example: `What's in my knowledge graph? Give me an inventory by type.`

The assistant calls the WordLift tools and answers from your Knowledge Graph. If it answers without calling a WordLift tool, check that the WordLift tools are enabled in that chat. In Visual Studio Code, also check that the WordLift server is started.

## Next steps

- **[Agent WordLift Skill](/tools/agent-wordlift-skill/):** Install the Skill so your assistant knows which WordLift tool to use for each job and how to format audit reports.
- **[Instagram indexing analysis](/platform/agent-wordlift/workflows/instagram-indexing-analysis/):** See a workflow where Agent WordLift works as a specialized SEO sub-agent inside another AI assistant.
- **[Ask your AI assistant about Monitor](/platform/monitor/ask-your-ai-assistant/):** Query your Monitor results through the MCP Server.
- **[Prompt Library](/platform/agent-wordlift/prompt-library/):** Find ready-to-use prompts for Agent WordLift.
- **[wordlift-cli](/tools/wordlift-cli/):** Use Agent WordLift from a terminal through the same MCP Server.

:::note
The worai CLI runs its own local MCP server (`worai agent mcp serve`), which exposes `worai_*` Knowledge Graph tools on your machine. It is a different tool from the WordLift MCP Server on this page. See the [worai agent command](/tools/worai-cli/commands/agent/).
:::
