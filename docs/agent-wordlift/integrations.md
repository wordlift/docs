---
title: ⚙️ Integrations
sidebar_position: 7
---

# Integrations

## Agent WordLift Chrome Extension

Supercharge your SEO workflow directly in your browser with the **Agent WordLift Chrome Extension!** This powerful, AI-driven tool helps content creators, SEO professionals, and marketers like you achieve better search rankings and more organic traffic by:

- **Optimizing content in real-time:** Receive instant feedback on keywords, readability, and semantic relevance as you write, ensuring your content is perfectly aligned with search engine best practices.
- **Automating key SEO tasks:** Effortlessly perform entity analysis, schema markup generation, and other time-consuming SEO tasks, freeing up your time to focus on what matters most: creating great content.
- **Uncovering hidden content opportunities:** Identify gaps in your existing content and receive actionable insights to create high-value content that resonates with your target audience.

Powered by cutting-edge AI and knowledge graph technology, the Agent WordLift Chrome Extension transforms how you create and optimize content, making it easier than ever to achieve your SEO goals.

Ready to see it in action? Watch this video tutorial.
<iframe width="100%" height="500" src="https://www.youtube.com/embed/Lmz6Kgi6HB0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[Install the Agent WordLift Chrome Extension here](https://chromewebstore.google.com/detail/agent-wordlift/jegfjceighmfpbklniiakflbhceejddb) and start boosting your SEO today!

## Agent WordLift Zapier Integration

Connect Agent WordLift to your favorite apps with our [Zapier integration](/marketing-automation/zapier/introduction/). This powerful integration allows you to:

- **Automate content analysis:** Automatically analyze new content as it's published
- **Extract entities and insights:** Process content through Agent WordLift and use the results in your workflows
- **Streamline SEO tasks:** Connect Agent WordLift's capabilities with over 6,000+ apps
- **Create custom workflows:** Build automated pipelines that leverage Agent WordLift's AI capabilities

Whether you're managing a content team, running an e-commerce site, or optimizing your SEO strategy, the Zapier integration helps you automate and scale your workflows. [Learn more about the Zapier integration](/marketing-automation/zapier/introduction/).

## Agent WordLift API Integration

The **WordLift Agent API** empowers developers and SEO professionals to programmatically interact with the Agent WordLift’s advanced AI capabilities. The newly introduced `/ask` endpoint allows users to send specific queries to the WordLift Agent and receive tailored responses that enhance their SEO workflows.

Key Features of the `/ask` Endpoint:

- **Customizable Interactions:** Send a message and specify a model (default: gpt-4o) to receive AI-powered insights tailored to your SEO needs.
- **Secure Queries:** Enable an optional security parameter to ensure sensitive requests are handled appropriately.
- **Seamless Integration:** Easily incorporate the endpoint into your existing tools or workflows to automate tasks such as content optimization, keyword research, and entity analysis.

### Example Use Case

With the `/ask` endpoint, you can create a chatbot-like feature within your application that provides instant SEO advice, content suggestions, or answers to technical queries based on the WordLift Agent’s expertise.

To get started, check out the [WordLift Agent API documentation](https://docs.wordlift.io/api/agent/wordlift-agent-api/) and explore how the `/ask` endpoint can revolutionize your SEO strategy!

## Agent WordLift Model Context Protocol (MCP) Integration

Your preferred AI models and agents can use our official MCP server to access your Knowledge Graph and leverage Agent WordLift in a simple and secure way.

Connect WordLift to various AI assistants through our **experimental Model Context Protocol (MCP) integration**. This integration enables AI models like Claude to directly interact with your content and knowledge graph, unlocking powerful new workflows.

Our MCP server is reachable at `https://mcp.wordlift.io/sse` and currently supports:
- Direct calls to Agent WordLift's capabilities
- Execution of GraphQL queries on your knowledge graph
- Seamless integration with supported AI assistants

Watch how Claude, integrated with WordLift via Model Context Protocol, analyzes the WordLift Blog to uncover actionable insights around the "Agentic SEO" content cluster:

<iframe width="100%" height="500" src="https://www.youtube.com/embed/6dz_-LbP3eQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Setup Instructions

**For Claude:**
1. Navigate to Settings in Claude
2. Scroll to Integrations at the bottom and click Add more
3. In the prompt, enter:
   - Integration name: WordLift
   - Integration URL: https://mcp.wordlift.io/sse
4. Make sure to enable the tools in any new chats

**For Cursor:**
1. Press CTRL/CMD+Shift+J to open Cursor Settings
2. Select MCP
3. Select Add new global MCP server
4. Add the following configuration:
```json
{
  "mcpServers": {
    "wordlift": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.wordlift.io/sse"]
    }
  }
}
```

**For Visual Studio:**
1. Press CTRL/CMD+P and search for "MCP: Add Server"
2. Select "Command (stdio)"
3. Enter the following configuration and hit enter:
   ```
   npx mcp-remote https://mcp.wordlift.io/sse
   ```
4. Enter the name "WordLift" and hit enter
5. Activate the server using "MCP: List Servers", selecting "WordLift", and selecting "Start Server"

**For Windsurf:**
1. Press CTRL/CMD+, to open Windsurf settings
2. Under Cascade -> MCP servers
3. Select Add Server -> Add custom server
4. Add the same JSON configuration as shown above for Cursor

This experimental integration opens up new possibilities by combining the reasoning capabilities of large language models with WordLift's structured knowledge and SEO expertise. From identifying content gaps to suggesting improvements, this integration showcases how symbolic AI and LLMs can work together to power the next generation of marketing strategies.

**🚀 New: AI Sub-Agent Workflows**
The MCP integration enables a new category of workflows where Agent WordLift operates as a specialized SEO sub-agent within other AI platforms. These workflows leverage the conversational capabilities of Claude, ChatGPT, Copilot, or Gemini while providing deep SEO expertise through WordLift. Explore our [Instagram Indexing Analysis workflow](./workflows/instagram-indexing-analysis.md) to see this in action.

:::note
The MCP integration is **currently experimental** and we're actively expanding its capabilities. If you have questions or feedback, please reach out to our support team.
:::
