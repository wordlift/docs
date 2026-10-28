---
title: Monitor
description: Monitor checks how well AI assistants and crawlers can reach your site, whether every page is technically sound, and whether it carries the structured data you expect.
sidebar_position: 0
last_updated: 2026-10-27
---

# Monitor

Monitor shows how ready your website is for search engines and AI assistants. It checks the whole site for AI access signals. It also checks every monitored page for technical health and for the structured data you define as your standard.

## What you can do with Monitor

- **See how AI can reach and act on your site.** AI readiness runs 6 site-wide checks, grouped into Reach, Understand and Act. It shows which AI crawlers your crawl rules allow, such as GPTBot, ClaudeBot and PerplexityBot. It also shows whether you publish `llms.txt`, and whether AI agents have tools and instructions to act on the site.
- **Confirm that every page is technically sound.** Bot readiness checks that structured data is valid and that pages respond quickly with no broken resources. It also checks that SEO fundamentals are present and the WordLift script is installed.
- **Hold each kind of page to its own structured data standard.** Semantic data quality lets you group pages into segments, such as all products, all articles or all locations. You then set the structured data every page in a segment must carry. Each run checks every page against its segment and scores each segment.
- **Catch markup drift early.** A template, content management system (CMS) or plugin update can remove markup from many pages at once. When it does, the segment score drops and shows you which rule broke. You see it before rich results or AI citations disappear.
- **Build an optimization backlog.** Pages that have never met the standard show up as failing rules, ranked by segment. Segments use URL patterns, so new pages are held to the same standard automatically.
- **Ask your AI assistant about your site.** Bot readiness and semantic data quality results are available through the WordLift Model Context Protocol (MCP) Server, in ChatGPT, Claude and other MCP-compatible assistants. Ask "How is my website doing?" to see which checks pass, which segments meet their standard and where the gaps are. See [Ask your AI assistant about Monitor](./ask-your-ai-assistant.md).

Monitor re-checks your pages every 24 hours and keeps 90 days of history.

## Where to find Monitor

In the WordLift dashboard, select your Knowledge Graph, then select **Monitor** in the sidebar. Monitor has 3 tabs:

| Tab | Use it to |
| --- | --- |
| **Status** | Review AI readiness for the whole site, then bot readiness and semantic data quality by check and by segment. |
| **URLs** | Browse results page by page, with filters and a detail drawer for each URL. |
| **Segments** | Define the URL clusters and the structured data rules attached to them. |

WordLift sets up your list of monitored pages and turns the site-wide checks on or off for your account. To add or remove pages, contact your WordLift account team.

## Get started

Follow these guides in order:

1. [Define segments and expectations](./define-segments-and-expectations.md): group your pages and set the structured data rules they must meet.
2. [Read Monitor status](./read-monitor-status.md): review AI readiness, check the page-level scores and find the rules that fail.
3. [Inspect URL results](./inspect-url-results.md): look at one page's results, entities and JSON-LD.
4. [Ask your AI assistant about Monitor](./ask-your-ai-assistant.md): get the same results in plain language through the MCP Server.

For every check, rule kind, score and limit, see the [Monitor reference](./reference.md). To read results programmatically, see the [Monitoring API Guide](../developer-resources/monitoring.md).
