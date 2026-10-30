---
title: "Agent WordLift workflows"
description: "Find a tested Agent WordLift recipe for your SEO or content job, grouped by task, with the data connections each workflow needs."
sidebar_label: "Workflows"
sidebar_position: 8
last_updated: 2026-10-27
---

# Agent WordLift workflows

Workflows are end-to-end recipes that combine several Agent WordLift tools to finish a specific SEO or content job. For single prompts, use the [Prompt Library](/platform/agent-wordlift/prompt-library/); to see how the capabilities are organized, see [Agent WordLift tool families](/platform/agent-wordlift/tool-families/).

Some workflows need a connection first. The **Needs** column tells you which:

- **Search Console** means a Google Search Console property connected in the WordLift Dashboard. See [Data sources: OAuth2 connections](/platform/data-sources/oauth2/).
- **Analytics** means a Google Analytics property connected in the WordLift Dashboard, through the same OAuth2 flow.
- **MCP Server** means an AI assistant connected to Agent WordLift through the [MCP Server](/tools/mcp-server/).

## Analyze search demand

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [Keyword discovery](/platform/agent-wordlift/workflows/keyword-discovery/) | Find keywords and the entities and intent behind each query. | None |
| [Keyword cannibalization](/platform/agent-wordlift/workflows/keyword-cannibalization/) | Find pages that compete for the same keyword and differentiate them. | None |
| [Google Search Console](/platform/agent-wordlift/workflows/google-search-console/) | Analyze your Search Console performance data with Agent WordLift. | Search Console |
| [Rankings drop audit](/platform/agent-wordlift/workflows/rankings-drop-audit/) | Find which topics and pages lost rankings, and why, in an interactive report. | Search Console |

## Measure AI visibility

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [AI visibility analysis](/platform/agent-wordlift/workflows/ai-visibility-analysis/) | Measure traffic from AI assistants and check whether you are cited in Google AI Overviews and AI Mode. | Analytics |

## Research content

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [Research content ideas using Reddit](/platform/agent-wordlift/workflows/research-content-ideas/) | Find topics and questions from Reddit discussions. | None |
| [Enhanced entity research](/platform/agent-wordlift/workflows/enhanced-entity-research/) | Build detailed entity profiles from Google Knowledge Graph data enriched by WordLift. | None |

## Create content

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [Social media posts](/platform/agent-wordlift/workflows/create-social-media-posts/) | Turn content on your website into LinkedIn posts. | None |
| [Social media content buckets](/platform/agent-wordlift/workflows/create-social-media-content-buckets/) | Organize your social content into content buckets. | None |
| [Newsletter ideas](/platform/agent-wordlift/workflows/ideas-for-newsletters/) | Plan a newsletter on a topic your audience follows. | None |
| [Generate FAQs](/platform/agent-wordlift/workflows/generate-faqs/) | Write FAQs from the entity gap between a page and a query. | None |
| [Product descriptions](/platform/agent-wordlift/workflows/create-product-description/) | Write e-commerce product descriptions from keyword insights. | None |

## Optimize content

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [Content quality evaluation](/platform/agent-wordlift/workflows/content-evaluation/) | Assess a page for quality, readability and SEO performance. | None |
| [Align content with a search query](/platform/agent-wordlift/workflows/analyzing-query-match/) | Check and improve how well a page matches the intent of its target query. | None |
| [Authorship markup](/platform/agent-wordlift/workflows/adding-authorship-markup/) | Create authorship markup that supports E-E-A-T. | None |
| [Internal links](/platform/agent-wordlift/workflows/create-internal-links/) | Find and add internal links between related pages. | None |

:::warning[Review needed]
TODO [SME]: The previous index listed "Analyze SEO Score" as a separate entry pointing to the query match workflow; confirm whether SEO score analysis needs its own workflow or belongs to query match.
:::

## Optimize local presence

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [Local SEO analysis](/platform/agent-wordlift/workflows/local-seo-analysis/) | Review your Google Business Profile, Local Pack results and local competitors. | None |
| [Local SEO tools reference](/platform/agent-wordlift/workflows/local-seo-tools-guide/) | Look up what each Local SEO tool does and what it returns. | None |

## Run workflows from an AI assistant

In these workflows, Agent WordLift works as an SEO sub-agent inside an AI assistant such as Claude, ChatGPT, Copilot or Gemini, connected through the [MCP Server](/tools/mcp-server/). Install the [Agent WordLift Skill](/tools/agent-wordlift-skill/) to give the assistant the Prompt Library, workflow recipes, SEO audits and a verified GraphQL reference.

| Workflow | What it helps you do | Needs |
| --- | --- | --- |
| [Instagram indexing analysis](/platform/agent-wordlift/workflows/instagram-indexing-analysis/) | Audit how your Instagram content is indexed and how it aligns with your website. | MCP Server, Search Console |
| [Instagram indexing report](/platform/agent-wordlift/workflows/instagram-indexing-report/) | Compare your Instagram content with your website and organic rankings in a report. | MCP Server, Search Console |

## Related

- [Prompt Library](/platform/agent-wordlift/prompt-library/): single prompts you can copy and adapt.
- [Agent WordLift tool families](/platform/agent-wordlift/tool-families/): how the capabilities are organized.
- [Agent WordLift integrations](/platform/agent-wordlift/integrations/): every way to reach Agent WordLift outside the web app.
