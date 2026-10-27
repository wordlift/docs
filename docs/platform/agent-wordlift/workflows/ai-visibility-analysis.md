---
title: "Analyze your AI visibility"
description: "Measure AI referral traffic, check AI Overview and AI Mode citations for your key queries, and turn the gaps into a ranked fix list with Agent WordLift."
sidebar_label: "AI visibility analysis"
sidebar_position: 6
last_updated: 2026-10-27
---

# Analyze your AI visibility

Use this workflow to see how much traffic AI assistants send you, whether Google's AI Overview and AI Mode cite you for your key queries, and which entities your pages miss. Run it when you need to report on AI visibility or decide which pages to fix first.

## Before you start

You need:

- **Google Analytics connected as a data source.** Connect it in the WordLift dashboard. See [OAuth2 connections](/platform/data-sources/oauth2/).
- **Access to Agent WordLift.** Agent WordLift is included in Business+ and Enterprise. See [Get started with Agent WordLift](/platform/agent-wordlift/getting-started/).
- **Your domain.** The example prompts use `wordlift.io`. Replace it with your own domain.
- **A short list of priority queries.** Pick the commercial or core topic queries you most want AI answers to cite you for.
- **A target country.** The example prompts check results in the US.

:::warning[Review needed]
TODO [SME]: confirm which location and language inputs the AI Overview and AI Mode tools accept (country only, or locale and language).
:::

## Measure AI referral traffic

Start with the traffic AI assistants already send you. Agent WordLift queries your connected Google Analytics property and isolates sessions that arrive from AI sources such as ChatGPT, Perplexity, Gemini, Copilot and Claude.

```md className=wlx-send-to-agent
Using Google Analytics, show me sessions from AI assistants (ChatGPT, Perplexity, Gemini, Copilot, Claude) over the last 28 days. Break it down by source and by landing page, and tell me what share of total sessions this represents.
```

Agent WordLift filters your property data to AI referral sources and reports:

- **The trend.** AI referral sessions over the last 28 days, by source.
- **The top landing pages.** The pages AI assistants already send real visitors to.
- **Your AI traffic share.** AI referral sessions as a share of total sessions.

Google Analytics may not capture every visit that comes from an AI assistant, so treat the result as the AI traffic you can measure.

## Check AI Overview citations

Referral traffic is only part of the picture. Many searchers read the AI Overview inside Google's results and never click through, so check whether the AI Overview cites you for a core query.

```md className=wlx-send-to-agent
Get me the organic AI overview for "knowledge graph for SEO" in the US. Tell me whether wordlift.io is cited, and list every source the AI Overview references.
```

Agent WordLift uses the AI Overview tool to return the live AI Overview, its summary and the full list of cited sources. Read the answer for two things: whether your domain is in the source list, and which other sites are.

A core query where the AI Overview cites other sites but not yours is a gap worth fixing.

## Check AI Mode citations

Next, check how Google's AI Mode answers the same query as a conversation, and which sources it uses.

```md className=wlx-send-to-agent
Get the AI mode result for "knowledge graph for SEO". List the sources it cites and tell me whether wordlift.io appears.
```

The AI Mode tool returns the conversational answer and its sources. Compare the result with the AI Overview for the same query. A site can appear in one surface and not the other, so check both before you report on a query.

In the example run, the AI Overview did not cite wordlift.io for "knowledge graph for SEO" and AI Mode did. Citations change over time, so record the date and country of every check.

:::warning[Review needed]
TODO [Jason]: keep wordlift.io as a dated worked example in this section, or replace it with a placeholder domain.
:::

## Find the entity gap

When a query should cite you and doesn't, find out what your page is missing. Agent WordLift runs an entity gap analysis: it compares the entities covered by the top-cited content with the entities on your page and lists what is missing.

```md className=wlx-send-to-agent
Perform an entity gap analysis for "https://wordlift.io/blog/en/knowledge-graph-seo/" against the query "knowledge graph for SEO". Which entities do the top-cited sources cover that our page does not, and what should we add to close the gap?
```

Replace the URL and the query with your own page and query. Turn the result into a to-do list:

- **Add** the missing entities and topics to the page content.
- **Reinforce** entities the page mentions only briefly.
- **Mark up** the entities in your structured data so AI systems can recognize the page as a relevant answer.

Closing an entity gap makes the page a more complete answer for the query. It does not make a citation certain, so re-run the AI Overview and AI Mode checks after you update the page.

## Build a full AI visibility report

To produce a shareable deliverable, chain the whole analysis into one prompt.

```md className=wlx-send-to-agent
Run an AI visibility report for the last 28 days. First, use Google Analytics to measure AI referral traffic by source and landing page. Then, for my top commercial queries, get the organic AI Overview and the AI Mode result, and for each tell me whether wordlift.io is cited and which competitors are. For every query where we're not cited, run an entity gap analysis to identify what's missing. Present everything as an interactive HTML report with a KPI header, a traffic trend, a per-query citation matrix, and a prioritized remediation list ranked by traffic and citation gap. Note the inspection date and locale.
```

The report contains:

- **A KPI header and traffic trend.** Your AI referral traffic for the last 28 days.
- **A citation matrix.** For each query, whether the AI Overview and AI Mode cite your domain, and which competitors they cite.
- **A remediation list.** The pages to fix, ranked by traffic and citation gap, with the entities to add for each.
- **The inspection date and locale.** Keep these with the report so you can compare future runs.

## Next steps

- **Improve the pages on your fix list.** Use the [content evaluation workflow](/platform/agent-wordlift/workflows/content-evaluation/) to score and improve each page.
- **Show who wrote the content.** Follow the [authorship markup workflow](/platform/agent-wordlift/workflows/adding-authorship-markup/).
- **Publish the structured data.** See [Schema publishing](/platform/knowledge-graph/schema-publishing/).
- **Read the definitions.** See [Concepts](/concepts/) for AI visibility and related terms.
