---
title: 🧰 Tools
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 2
---

Agent WordLift gives SEO, content, and technical teams access to **20+ specialized tools** for search analysis, analytics, knowledge graph research, content optimization, local SEO, content generation, and automation.

This page explains how Agent WordLift tools are organized and how they fit into the WordLift platform architecture.

For ready-to-use prompts, see the [Prompt Library](./prompt-reference.md).

For end-to-end recipes, see [Workflows](./workflows.md).

For MCP, CLI, API, and automation setup, see [Integrations](./integrations.md).

## How tools fit into Agent WordLift

Agent WordLift is built on a dual-stack architecture:

- **Knowledge Graph / Memory Layer**
- **Agentic AI Layer**

The Knowledge Graph / Memory Layer stores entities, relationships, structured data, search signals, provenance, and reusable context.

The Agentic AI Layer uses specialized tools to retrieve evidence, analyze content, reason over entities, generate outputs, validate claims, and automate SEO workflows.

A single workflow can combine multiple tools. For example, a rankings drop audit can use Google Search Console analysis, analytics signals, query analysis, entity analysis, content evaluation, and internal linking recommendations.

## Terms and Concepts

| Term | Meaning |
| --- | --- |
| Tool | A specific callable capability Agent WordLift can use to perform a task. |
| Tool family | A group of related tools, such as Search Performance, Content Optimization, Knowledge Graph Research, or Local SEO. |
| Data source | A connected source of evidence used by one or more tools, such as Google Search Console, Google Analytics, Google Ads, a sitemap, Botify data, or the WordLift Knowledge Graph. |
| Workflow | A repeatable process that combines multiple tools to complete an SEO, content, or marketing task. |
| Prompt Library | The canonical place for ready-to-use prompts that activate Agent WordLift capabilities. |
| Integration surface | The place where tools are accessed, such as Agent WordLift UI, WordLift CLI, MCP, API, Zapier, Power Automate, or Google Sheets. |

## Tool Families

The sections below describe high-level tool families. They are not the full list of individual tools.

For the full prompt inventory, use the [Prompt Library](./prompt-reference.md).

### Search Performance

Tools for understanding how pages, queries, and search opportunities perform across organic search.

Typical capabilities include Google Search Console analysis, query performance, CTR analysis, ranking movement, Google Discover analysis, and opportunity discovery.

### Analytics and Engagement

Tools for connecting search visibility with post-click behavior and business outcomes.

Typical capabilities include Google Analytics analysis, landing page engagement analysis, qualified traffic analysis, and combined GSC + GA investigations.

### How GSC and GA Work Together

Agent WordLift connects Google Search Console (impressions, clicks, queries, pages, and CTR) with Google Analytics (sessions, engagement, and conversion-oriented behavior) to diagnose cause and impact in one workflow.

In practice, this means teams can trace a visibility change in search results to downstream user behavior and business outcomes, instead of reviewing the two data sources separately.

### How to Configure GSC and GA

- Connect Google Search Console as a WordLift data source from the WordLift Dashboard.
- Connect Google Analytics as a WordLift data source from the WordLift Dashboard.
- For the dashboard setup flow and API-based connector options, see [Data Sources: OAuth2 Connections](https://docs.wordlift.io/knowledge-graph/data-sources-oauth2/).

### Keyword and Search Demand

Tools for discovering, expanding, clustering, and mapping search demand.

Typical capabilities include keyword suggestions, keyword discovery, intent grouping, Google Trends analysis, Google Ads insights, and cannibalization analysis.

### Knowledge Graph and Entity Intelligence

Tools for analyzing entities, relationships, topical coverage, and Knowledge Graph context.

Typical capabilities include entity extraction, entity gap analysis, enhanced entity lookup, corporate intelligence research, person entity research, relationship mapping, and Knowledge Graph retrieval.

### Content Evaluation and Optimization

Tools for evaluating whether content is useful, complete, trustworthy, and aligned with search intent.

Typical capabilities include content quality evaluation, query-match analysis, SEO score analysis, readability checks, internal linking opportunities, and page differentiation.

### Fact-Checking and Trust

Tools for reducing factual risk and improving source quality.

Typical capabilities include claim detection, fact-checking, citation gap detection, factual risk analysis, and safer wording recommendations.

### Content Generation

Tools for generating and expanding content using search signals, entities, and Knowledge Graph context.

Typical capabilities include content expansion, content creation, meta title and description generation, product descriptions, product highlights, FAQ generation, social posts, content buckets, newsletters, and multi-platform content adaptation.

### Local SEO

Tools for local search visibility and Google Business Profile analysis.

Typical capabilities include Google Business Profile analysis, Local Pack analysis, business ranking tracking, local competitor comparison, and Q&A analysis.

### Social, Community, and External Signals

Tools for using external signals to identify content and visibility opportunities.

Typical capabilities include Reddit content research, Instagram indexing analysis, cross-platform content strategy, SERP monitoring, and community-driven topic discovery.

### Technical SEO and Structured Data

Tools for technical SEO, markup, schema, and machine-readability analysis.

Typical capabilities include markup audits, schema type analysis, structured data validation, authorship markup, technical SEO health checks, and site performance analysis.

### Automation and Integration

Tools and integration surfaces that make Agent WordLift available inside developer, automation, and AI assistant workflows.

Typical surfaces include WordLift CLI, MCP, Agent WordLift API, GraphQL queries on the WordLift Knowledge Graph, Zapier, Power Automate, Google Sheets, Looker Studio, and batch processing.

See [Integrations](./integrations.md) for setup instructions.

## Where to Find Prompts

The [Prompt Library](./prompt-reference.md) is the canonical reference for ready-to-use prompts.

Use the Prompt Library when you want to:

- run a specific SEO or content task
- understand which prompt to use for a capability
- copy and adapt a prompt for Agent WordLift
- explore the full set of user-facing Agent WordLift capabilities

The Tools page explains architecture and capability organization.

The Prompt Library explains how to run capabilities.

The Workflows section explains how multiple tools combine in repeatable SEO and content processes.

The Integrations section explains where and how tools can be accessed.
