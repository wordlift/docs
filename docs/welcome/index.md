---
sidebar_position: 1
hide_title: true
title: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

:::info Version Notice
Latest Release: 3.20.24 (October 2026) — Added a GraphSync guide to find the pages that changed since a date, with a sample GraphQL query and a curl example.
:::

# 👋 Welcome to WordLift

<div style={{textAlign: 'center', margin: '2rem 0'}}>
<p style={{fontSize: '1.2rem', color: 'var(--ifm-color-emphasis-600)'}}>
AI-Powered Platform / Knowledge Graph Builder for SEO & Marketing Teams
</p>

<div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap'}}>
<span className="badge badge--success">SEO Automation</span>
<span className="badge badge--primary">Marketing Automation</span>
<span className="badge badge--info">AI-Powered</span>
<span className="badge badge--warning">Edge AI</span>
</div>
</div>

## What's WordLift, anyway?

Think of WordLift as your AI-powered marketing companion that turns your content into a powerful Knowledge Graph. But what does that actually mean?

Imagine you're building with LEGO® blocks. Your content pieces are like individual LEGO® blocks, and WordLift helps you:

- 🔗 Connect them in meaningful ways (that's the Knowledge Graph part)
- 🔍 Make them discoverable by both humans and machines
- 🤖 Turn them into automated marketing workflows and AI applications

## How does it work?

### The Secret Sauce: Semantic Technology

Remember the LEGO® analogy? Here's what happens behind the scenes:

1. **Analyze Search Demand** 🔍
   - [Google Sheets Add-on](/tools/google-sheets-addon/) for keyword research

2. **Build Knowledge Graph** 🏗️
   - [GraphSync](/platform/knowledge-graph/graph-sync/) for scalable content Knowledge Graphs
   - [Product Knowledge Graph Builder](/platform/knowledge-graph/product-knowledge-graph/) for e-commerce using Google Merchant Center
   - [WordPress Plugin](/integrations/wordpress-plugin/) for editorial entity management
   - [Botify Connector](/platform/data-sources/botify/) for enterprise insights

   Use [Analytics Import](/apis-and-sdks/analytics-api/) after population when you need to add search performance data, and use [WordLift Cloud](/welcome/install-wordlift-cloud/) to publish and manage graph-backed annotations on a website.

3. **Optimize & Create** ✨
   - [Agent WordLift](/platform/agent-wordlift/) for AI SEO optimization
   - [MCP Integration](/tools/mcp-server/) to connect WordLift to Claude, ChatGPT, Copilot, or Gemini
   - [Agent WordLift Skill](/tools/agent-wordlift-skill/) for tool routing, SEO audits, workflow recipes, and a verified GraphQL reference in any MCP-capable assistant
   - [Content Generation](/platform/agent-wordlift/content-generation/) for creating new content at scale
   - [AI & LLM Integrations](/apis-and-sdks/llm-connectors/wordlift-reader/) for building AI applications using LlamaIndex 🦙

4. **Automate, Scale & Reporting** 🚀
   - [Zapier Integration](/integrations/zapier/) for workflow automation
   - [Power Automate Connector](/integrations/power-automate/) for Microsoft ecosystem
   - [Looker Studio Connector](/integrations/looker-studio/) for semantic analytics and dashboarding

## Who's it for?

### 🛠️ Technical Folks

You love APIs, code, and building things? We've got:

- [API Reference](/apis-and-sdks/api-reference/) for custom development
- [GraphQL API](/apis-and-sdks/api-reference/graphql/graphql-support/) for flexible queries
- [MCP Integration](/tools/mcp-server/) and the [Agent WordLift Skill](/tools/agent-wordlift-skill/) for AI assistants
- Custom integrations and enterprise solutions

### 📝 Content Teams

More into creating great content? Use our:

- [Agent WordLift](/platform/agent-wordlift/) for AI SEO optimization
- [WordPress Plugin](/integrations/wordpress-plugin/) for easy content optimization
- [WooCommerce SEO](/integrations/woocommerce/) for e-commerce
- [Google Sheets Add-on](/tools/google-sheets-addon/) for keyword research

### 🎯 Marketing Teams

Need to show results? Get:

- [Analytics Import](/apis-and-sdks/analytics-api/) for performance tracking
- [Zapier Integration](/integrations/zapier/) for automation
- [Looker Studio Connector](/integrations/looker-studio/) for reporting

### 🏢 Enterprise Teams

Looking to scale? Access:

- [WordLift Cloud](/welcome/install-wordlift-cloud/) for enterprise deployment
- [Botify Connector](/platform/data-sources/botify/) for enterprise SEO
- [Power Automate](/integrations/power-automate/) for Microsoft integration

## Quick Start Options

<Tabs>
  <TabItem value="agent" label="AI SEO Agent" default>

```bash
# Start with Agent WordLift
1. Open Agent WordLift
2. Get instant SEO optimization
3. Let AI work for you!
```

[Start with Agent WordLift →](/platform/agent-wordlift/)
  </TabItem>
  <TabItem value="cloud" label="Cloud script">

```html
<!-- Install the WordLift Cloud script in <head> -->
<script async type="text/javascript" src="https://cloud.wordlift.io/app/bootstrap.js"></script>
```

- Place in `<head>` on every page you want to annotate.
- Need details or GTM? See [WordLift Cloud](/welcome/install-wordlift-cloud/) or [install via GTM](/welcome/install-wordlift-cloud/google-tag-manager/).

[Install via WordLift Cloud guide →](/welcome/install-wordlift-cloud/)
  </TabItem>
  <TabItem value="api" label="API">

```bash
# For developers & custom integrations
pip install wordlift-sdk

# Python SDK with full API support
```

📦 [Python SDK on PyPI](https://pypi.org/project/wordlift-sdk/)

[Explore API Documentation →](/apis-and-sdks/api-reference/)
  </TabItem>
  <TabItem value="sheets" label="Google Sheets">

```bash
# Start with SEO analysis
1. Install the Google Sheets add-on
2. Connect your Search Console
3. Analyze your search data
```

[Start SEO Analysis →](/tools/google-sheets-addon/)
  </TabItem>
</Tabs>

## Key Features

<div className="row">
<div className="col col--4">

### 🔍 Search Intelligence

- Advanced entity-based gap analysis for SEO
- AI SEO Agent for search intent insights
- Tailored strategies for content discovery and visibility

</div>
<div className="col col--4">

### 🏗️ Knowledge Graph

- Fully automated RDF-based Knowledge Graph
- Schema.org markup for enhanced search visibility
- Advanced entity creation and management
- Product catalog enrichment with structured data and support for GS1 Digital Link

</div>
<div className="col col--4">

### 🤖 AI & Content Automation

- Scalable content generation and optimization workflows
- Neural search and Graph Retrieval Augmented Generation (RAG)
- AI-powered SEO Agent for smarter workflows
- End-to-end workflow automation with integrations (Zapier, Power Automate)

</div>
</div>

## Ready to start?

Choose your path:

### 🚀 Quick Start (No Code)

1. [Try Agent WordLift](/platform/agent-wordlift/) for instant SEO optimization
2. [Use Google Sheets Add-on](/tools/google-sheets-addon/) for search analysis
3. [Install WordPress Plugin](/integrations/wordpress-plugin/) for content optimization
4. Install the [WordLift Cloud script](/welcome/install-wordlift-cloud/) (or [via Google Tag Manager](/welcome/install-wordlift-cloud/google-tag-manager/))

### 💻 Developer Path

```bash
pip install wordlift-sdk  # It's that simple!
```

Then [grab your API key](https://wordlift.io/pricing/)

📦 [View on PyPI](https://pypi.org/project/wordlift-sdk/) | 📚 [Python SDK Documentation](https://github.com/wordlift/python-sdk)

For Business+ and Enterprise content graphs, start with the [Create a Knowledge Graph](/platform/knowledge-graph/create/) decision guide and [contact WordLift](https://wordlift.io/contact-us/) to plan a GraphSync pilot.

### 🤝 Enterprise Setup

[Let's talk!](https://wordlift.io/demo) We'll create a custom plan for you.

---

🎮 **Ready to level up your marketing game?**
Start by [understanding what your audience wants](/tools/google-sheets-addon/) →

Need help? [Drop us a line](mailto:support@wordlift.io) 💌
