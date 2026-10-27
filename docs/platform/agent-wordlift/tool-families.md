---
title: "Agent WordLift tool families"
description: "See how Agent WordLift groups its tools into families for search, AI visibility, analytics, entities, content, local SEO and automation, and how they combine."
sidebar_label: "Tool families"
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 2
last_updated: 2026-10-27
---

# Agent WordLift tool families

Agent WordLift gives SEO, content and technical teams specialized tools for search analysis, analytics, Knowledge Graph research, content optimization, local SEO, content generation and automation. This page groups those tools into families and explains how they fit into the WordLift platform, so you know what Agent WordLift can do before you pick a prompt or a workflow.

The families describe what the tools do. They are not a complete list of individual tools.

:::warning[Review needed]
TODO [Jason]: Agree the canonical Agent WordLift capability inventory (the open "20+ tools" versus listed-tools question) before this page states any tool count.
:::

For ready-to-use prompts, see the [Prompt Library](/platform/agent-wordlift/prompt-library/). For end-to-end recipes, see [Agent WordLift workflows](/platform/agent-wordlift/workflows/). For MCP Server, CLI, API and automation setup, see [Agent WordLift integrations](/platform/agent-wordlift/integrations/).

## How tools fit into Agent WordLift

Agent WordLift is built on two layers:

- **The Knowledge Graph, or memory layer,** stores entities, relationships, structured data, search signals, provenance and reusable context.
- **The agentic AI layer** uses specialized tools to retrieve evidence, analyze content, reason over entities, generate outputs, validate claims and automate SEO workflows.

A single workflow can combine tools from several families. For example, a [rankings drop audit](/platform/agent-wordlift/workflows/rankings-drop-audit/) can use Google Search Console analysis, analytics signals, query analysis, entity analysis, content evaluation and internal linking recommendations.

## Terms and concepts

| Term | Meaning |
| --- | --- |
| Tool | A specific callable capability Agent WordLift can use to perform a task. |
| Tool family | A group of related tools, such as search performance, content evaluation and optimization, Knowledge Graph and entity intelligence, or local SEO. |
| Data source | A connected source of evidence used by one or more tools, such as Google Search Console, Google Analytics, Google Ads, a sitemap, Botify data or the WordLift Knowledge Graph. |
| Workflow | A repeatable process that combines several tools to complete an SEO, content or marketing task. |
| Prompt Library | The canonical place for ready-to-use prompts that activate Agent WordLift capabilities. |
| Integration surface | The place where you reach the tools, such as the Agent WordLift web app, wordlift-cli, the MCP Server, the Agent WordLift API, Zapier, Power Automate or Google Sheets. |

## Tool families

Each family below lists the typical capabilities its tools provide. For the full prompt inventory, use the [Prompt Library](/platform/agent-wordlift/prompt-library/).

### Search performance

Tools for understanding how pages, queries and search opportunities perform in organic search.

Typical capabilities include Google Search Console analysis, query performance, CTR analysis, ranking movement, Google Discover analysis and opportunity discovery.

### AI visibility

Tools for understanding how your content appears in AI-powered search surfaces and generative answers.

Typical capabilities include checking whether a query triggers a Google AI Overview, inspecting the sources cited in AI-generated answers, querying Google AI Mode (SGE) for conversational responses, and analyzing AI Shopping results to see which products and brands appear.

### Analytics and engagement

Tools for connecting search visibility with post-click behavior and business outcomes.

Typical capabilities include Google Analytics analysis, landing page engagement analysis, qualified traffic analysis, and combined Google Search Console (GSC) and Google Analytics (GA) investigations.

### How GSC and GA work together

Agent WordLift combines Google Search Console data (impressions, clicks, queries, pages and CTR) with Google Analytics data (sessions, engagement and conversion-oriented behavior) to diagnose cause and impact in one workflow.

In practice, you can trace a change in search visibility to what users then do on your site and to business outcomes, instead of reviewing the two data sources separately.

### How to configure GSC and GA

- **Connect Google Search Console** as a WordLift data source from the WordLift Dashboard.
- **Connect Google Analytics** as a WordLift data source from the WordLift Dashboard.
- **For the setup flow and API-based connector options,** see [Data sources: OAuth2 connections](/platform/data-sources/oauth2/).

### Keyword and search demand

Tools for discovering, expanding, clustering and mapping search demand.

Typical capabilities include keyword suggestions, keyword discovery, intent grouping, Google Trends analysis, Google Ads insights and cannibalization analysis.

### Knowledge Graph and entity intelligence

Tools for analyzing entities, relationships, topical coverage and Knowledge Graph context.

Typical capabilities include entity extraction, entity gap analysis, enhanced entity lookup, corporate intelligence research, person entity research, relationship mapping and Knowledge Graph retrieval.

### Content evaluation and optimization

Tools for evaluating whether content is useful, complete, trustworthy and aligned with search intent.

Typical capabilities include content quality evaluation, query match analysis, SEO score analysis, readability checks, internal linking opportunities and page differentiation.

### Fact-checking and trust

Tools for reducing factual risk and improving source quality.

Typical capabilities include claim detection, fact-checking, citation gap detection, factual risk analysis and safer wording recommendations.

### Content generation

Tools for generating and expanding content with search signals, entities and Knowledge Graph context.

Typical capabilities include content expansion, content creation, meta title and description generation, product descriptions, product highlights, FAQ generation, social posts, content buckets, newsletters and multi-platform content adaptation. For content at scale from your Knowledge Graph, see [Content Generation](/platform/agent-wordlift/content-generation/).

### Local SEO

Tools for local search visibility and Google Business Profile analysis.

Typical capabilities include Google Business Profile analysis, Local Pack analysis, business ranking tracking, local competitor comparison and Q&A analysis.

### Social, community and external signals

Tools for using external signals to find content and visibility opportunities.

Typical capabilities include Reddit content research, Instagram indexing analysis, cross-platform content strategy, SERP monitoring and community-driven topic discovery.

### Technical SEO and structured data

Tools for technical SEO, markup, schema and machine-readability analysis.

Typical capabilities include markup audits, schema type analysis, structured data validation, authorship markup, technical SEO health checks and site performance analysis.

### Automation and integration

Tools and integration surfaces that make Agent WordLift available in developer, automation and AI assistant workflows.

Typical surfaces include wordlift-cli, the MCP Server, the Agent WordLift API, GraphQL queries on the WordLift Knowledge Graph, Zapier, Power Automate, Google Sheets, Looker Studio and batch processing.

For setup instructions, see [Agent WordLift integrations](/platform/agent-wordlift/integrations/).

## Where to find prompts

The [Prompt Library](/platform/agent-wordlift/prompt-library/) is the canonical reference for ready-to-use prompts. Use it when you want to:

- **Run a specific task.** Find the prompt for an SEO or content task.
- **Match a prompt to a capability.** See which prompt activates which capability.
- **Adapt a prompt.** Copy a prompt and change it for your site.
- **Explore what Agent WordLift can do.** Browse the full set of user-facing capabilities.

Each section of the Agent WordLift docs has one job:

- **Tool families** (this page) explain how the capabilities are organized.
- **The [Prompt Library](/platform/agent-wordlift/prompt-library/)** explains how to run each capability.
- **[Workflows](/platform/agent-wordlift/workflows/)** explain how several tools combine in repeatable SEO and content processes.
- **[Integrations](/platform/agent-wordlift/integrations/)** explain where and how you can reach the tools.
