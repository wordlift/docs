---
title: "Connect Microsoft 365 Copilot to WordLift"
description: "Build a Copilot Studio agent connected to WordLift's MCP Server and publish it, so your team can ask Agent WordLift questions inside Microsoft 365 Copilot chat."
sidebar_label: "Microsoft 365 Copilot"
last_updated: 2026-10-27
---

# Connect Microsoft 365 Copilot to WordLift

Give your team WordLift's tools inside Microsoft 365 Copilot chat. You build an agent in Copilot Studio, connect it to WordLift's Model Context Protocol (MCP) Server, and publish it to Microsoft 365 Copilot. Colleagues can then ask the agent about your site and Knowledge Graph without leaving Copilot.

The setup has three stages: build the agent, publish it, then use it in Copilot chat.

## Before you begin

- **Microsoft 365 account:** You need a Microsoft 365 account with access to [Copilot Studio](https://copilotstudio.microsoft.com).
- **WordLift API key:** Find it on your user dashboard at [my.wordlift.io](https://my.wordlift.io).
- **MCP Server basics:** For the server URL and the other supported clients, see [Connect AI assistants with the MCP Server](/tools/mcp-server/).

:::warning[Review needed]
TODO [SME]: state which Microsoft licenses are required and whether publishing to the Agent Store needs tenant admin approval.
:::

## Build the agent in Copilot Studio

1. Go to `https://copilotstudio.microsoft.com` and sign in with your Microsoft 365 account.
2. Open **Agents** in the left menu. Select the arrow next to **New agent**, then choose **Build using standard orchestration**.

   ![The New agent menu in Copilot Studio with Build using standard orchestration selected](../../platform/agent-wordlift/images/agent-wordlift-copilot-02-copilot-studio-new-agent.jpg)

3. Give the agent a name and continue.
4. In the agent's header menu, select **Tools**, then select **Add a tool**.
5. In the **Add tool** panel, under **Create new**, select **Model Context Protocol**.

   ![The Add tool panel in Copilot Studio with the Model Context Protocol option highlighted](../../platform/agent-wordlift/images/agent-wordlift-copilot-05-copilot-studio-add-mcp-tool.jpg)

6. Enter the server details:
   - **Server URL:** `https://mcp.wordlift.io/streamable-http`
   - **Authentication:** **OAuth 2.0**, type **Dynamic discovery**

   ![The Model Context Protocol server details form in Copilot Studio, filled in with the WordLift server URL and OAuth 2.0 authentication](../../platform/agent-wordlift/images/agent-wordlift-copilot-06-copilot-studio-mcp-server-details.jpg)

7. Copilot Studio opens a WordLift sign-in popup. Paste your **WordLift API Key** and select **Authenticate & Approve**.

   ![The WordLift sign-in popup asking for the WordLift API key, with the Authenticate and Approve button](/img/agent-wordlift-copilot/agent-wordlift-copilot-07-copilot-studio-authenticate-wordlift.jpg)

The agent now has WordLift as a tool.

## Publish to Microsoft 365 Copilot

8. In the header menu, select **Channels**. Under **Microsoft channels**, open the **Microsoft 365 and Microsoft Teams** tile.
9. Check **Make agent available in Microsoft 365 Copilot** and select **Add channel**. Then select **Publish** at the top of the page.

   ![The Microsoft 365 and Microsoft Teams channel panel with the Make agent available in Microsoft 365 Copilot checkbox and the Add channel button highlighted](../../platform/agent-wordlift/images/agent-wordlift-copilot-10-copilot-studio-m365-teams-channel.jpg)

10. In the same channel panel, select **See agent in Microsoft 365**. The agent opens in Microsoft 365 Copilot.
11. Microsoft 365 Copilot shows the agent's card in the Agent Store. Select **Add**.

## Use it in Copilot chat

12. Optional: pin the agent. Hover over the agent under **Agents** in the left sidebar and select the pin icon. The agent now stays under **Pinned**.
13. Ask the agent a question. The first time you use a WordLift tool in a chat, or after a connection expires, Copilot may ask you to connect first. Select **Open connection manager**.
14. Find **WordLift MCP** in the list. Select **Connect**, then **Submit**. Back in the chat, select **Retry** to run your question again.

    ![The Manage your connections page with WordLift MCP listed and the Connect and Submit buttons highlighted](../../platform/agent-wordlift/images/agent-wordlift-copilot-15-m365-copilot-manage-connections.jpg)

## Check that it works

Ask the agent a question about your WordLift account, for example:

```text
Ask wordlift agent what is my domain url
```

The agent calls WordLift's tools over the MCP connection and replies with the domain connected to your WordLift account. It cites its source beneath the answer.

![An agent answering a question inside Microsoft 365 Copilot chat, with the cited source shown beneath the answer](../../platform/agent-wordlift/images/agent-wordlift-copilot-16-m365-copilot-chat-answer.jpg)

## Update the agent

Any change you make to the agent later, such as its tools, instructions or knowledge, stays local until you select **Publish** again. If people are already using the agent, for example in Microsoft Teams conversations, also check **Force newest version** in the publish dialog. People then get the update right away instead of finishing their current session on the old version.

<img src="/img/agent-wordlift-copilot/agent-wordlift-copilot-09-copilot-studio-publish-force-newest.jpg" alt="The Publish this agent dialog in Copilot Studio with Force newest version checked" width="360" />

## Related

- [Connect AI assistants with the MCP Server](/tools/mcp-server/)
- [Agent WordLift Skill](/tools/agent-wordlift-skill/)
- [Prompt Library](/platform/agent-wordlift/prompt-library/)
