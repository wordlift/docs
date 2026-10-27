---
title: "Agent WordLift integrations"
description: "Use Agent WordLift in AI assistants, the terminal, your own code and automation tools. Pick the integration that fits and go to its setup guide."
sidebar_label: "Integrations"
sidebar_position: 7
last_updated: 2026-10-27
---

# Agent WordLift integrations

Agent WordLift works outside its web app too: in AI assistants, in the terminal, in your own applications and in automation tools. Use the table to pick an integration, then follow its guide.

| Integration | Use it when | Guide |
| --- | --- | --- |
| MCP Server | You want an AI assistant such as Claude, Cursor or Windsurf to call Agent WordLift and query your Knowledge Graph. | [MCP Server](/tools/mcp-server/) |
| Microsoft 365 Copilot | You want Agent WordLift inside Copilot chat through a Copilot Studio agent. | [Microsoft 365 Copilot](/tools/mcp-server/microsoft-365-copilot/) |
| Agent WordLift Skill | You want an MCP-capable assistant to follow WordLift tool routing, SEO audits and workflow recipes. | [Agent WordLift Skill](/tools/agent-wordlift-skill/) |
| wordlift-cli | You want to work with Agent WordLift from the terminal. | [wordlift-cli](/tools/wordlift-cli/) |
| Agent WordLift API | You want to send messages to Agent WordLift from your own application. | [Agent WordLift API](#agent-wordlift-api-integration) |
| Zapier | You want to run Agent WordLift in automated workflows with other apps. | [Zapier](/integrations/zapier/) |
| Chrome Extension | You want to use Agent WordLift in your browser. | [Agent WordLift Extension](/tools/chrome-extension/) |
| Google AI Edge GraphQL | You are building agentic workflows on edge-capable models and want to query WordLift GraphQL. | [Google AI Edge GraphQL](#agent-wordlift-google-ai-edge-graphql-integration) |

For how the capabilities are organized, see [Agent WordLift tool families](/platform/agent-wordlift/tool-families/). For ready-to-use prompts, see the [Prompt Library](/platform/agent-wordlift/prompt-library/), and for end-to-end recipes, see [Agent WordLift workflows](/platform/agent-wordlift/workflows/).

## MCP Server {#agent-wordlift-model-context-protocol-mcp-integration}

The WordLift MCP Server connects AI assistants to Agent WordLift through the Model Context Protocol (MCP). It is reachable at `https://mcp.wordlift.io/streamable-http` and supports direct calls to Agent WordLift capabilities and GraphQL queries on your Knowledge Graph. The MCP Server is currently experimental.

Setup steps for each assistant now live on their own page: [MCP Server](/tools/mcp-server/).

:::warning[Review needed]
TODO [SME]: Confirm whether the MCP Server is still experimental.
:::

## Microsoft 365 Copilot {#microsoft-365-copilot-via-copilot-studio}

You can bring Agent WordLift into Microsoft 365 Copilot by building a Copilot Studio agent that connects to the MCP Server with OAuth 2.0, then publishing it to Copilot.

The step-by-step walkthrough now lives on its own page: [Microsoft 365 Copilot](/tools/mcp-server/microsoft-365-copilot/).

## Agent WordLift Skill {#agent-wordlift-claude-skill}

The Agent WordLift Skill teaches an MCP-capable AI assistant how to use WordLift's tools well. It adds tool routing, SEO audits, a verified GraphQL reference, the Prompt Library and workflow recipes on top of the MCP Server connection.

Installation, contents and example prompts now live on their own page: [Agent WordLift Skill](/tools/agent-wordlift-skill/).

## Command line {#agent-wordlift-cli-integration}

wordlift-cli runs Agent WordLift in your terminal. Install it with `npm install -g wordlift-cli`, or run it without installing with `npx wordlift-cli`.

Installation, usage and examples now live on their own page: [wordlift-cli](/tools/wordlift-cli/).

For Knowledge Graph and site operations from the command line, use the separate worai CLI. See [Install the worai CLI](/tools/worai-cli/install/).

## Agent WordLift API {#agent-wordlift-api-integration}

The Agent WordLift API lets you work with Agent WordLift from your own code. Its `/ask` endpoint takes a message and returns Agent WordLift's response.

- **Send a message.** Post your request in the `message` field and read the answer from the response.
- **Flag sensitive requests.** Set the optional `security` parameter for requests that need it.
- **Build it into your tools.** Call the endpoint from your applications or scripts to automate tasks such as content optimization, keyword research and entity analysis.

:::warning[Review needed]
TODO [SME]: Confirm whether `/ask` still accepts a `model` parameter and how to document it without naming a model, and what the `security` parameter does.
:::

### Example use case {#example-use-case}

Use the `/ask` endpoint to add a chat feature to your application that answers SEO questions, suggests content or answers technical queries with Agent WordLift.

For request and response details, see the [Agent WordLift API reference](/apis-and-sdks/api-reference/agent/wordlift-agent-api/).

## Zapier {#agent-wordlift-zapier-integration}

The Agent WordLift Zapier integration connects Agent WordLift to the other apps your team uses:

- **Analyze new content automatically.** Run Agent WordLift on content as soon as it is published.
- **Use the results elsewhere.** Extract entities and insights with Agent WordLift and pass them to the next step in your workflow.
- **Build your own pipelines.** Combine Agent WordLift with other Zapier apps to automate SEO tasks.

For setup steps, see [Zapier](/integrations/zapier/).

## Chrome Extension {#agent-wordlift-chrome-extension}

The Agent WordLift Extension brings Agent WordLift into your browser, and its icon checks your WordLift Cloud setup on the page you are viewing.

For install steps, icon status states and usage, see [Agent WordLift Extension](/tools/chrome-extension/).

## Google AI Edge GraphQL {#agent-wordlift-google-ai-edge-graphql-integration}

The Google AI Edge integration runs Agent WordLift GraphQL capabilities in AI-powered workflows. Use it to connect WordLift GraphQL to AI assistants and edge-driven pipelines for semantic SEO and Knowledge Graph use cases.

:::note[Experimental]
This integration is experimental and intended for early adopters building agentic workflows on edge-capable models.
:::

- **Repository:** [wordlift/google-ai-edge/tree/main/wordlift-graphql](https://github.com/wordlift/google-ai-edge/tree/main/wordlift-graphql)
- **Google announcement:** [Bring state-of-the-art agentic skills to the edge with Gemma 4](https://developers.googleblog.com/bring-state-of-the-art-agentic-skills-to-the-edge-with-gemma-4/)
- **Model reference:** [Gemma 4 E2B on Hugging Face](https://huggingface.co/google/gemma-4-E2B)

Watch the walkthrough video:

<iframe width="100%" height="500" src="https://www.youtube.com/embed/kpE8Qs-HVw4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>

To get started, follow the setup instructions and examples in the GitHub repository.

:::warning[Review needed]
TODO [Jason]: Keep Google AI Edge GraphQL on this page, or move it to Interfaces and tools or Integrations?
:::
