---
title: Monitor
description: Monitor checks how well AI assistants and crawlers can reach your site and whether every page carries the structured data you expect.
sidebar_position: 0
last_updated: 2026-10-23
---

# Monitor

Monitor shows how ready your website is for search engines and AI assistants. It checks the whole site for AI access signals, and it checks every monitored page for technical health and for the structured data you define as your standard.

## What you can do with Monitor

- **See how AI can reach and act on your site.** AI readiness runs 6 site-wide checks, grouped into Reachability, Discoverability and Actionability. It shows which AI crawlers (such as GPTBot, ClaudeBot and PerplexityBot) your crawl rules allow, whether you publish `llms.txt`, and whether AI agents have tools and instructions to act on the site.
- **Confirm that every page is technically sound.** Bot readiness checks that structured data is valid, pages respond quickly with no broken resources, SEO fundamentals are present, and the WordLift script is installed.
- **Hold each kind of page to its own structured data standard.** Semantic data quality lets you group pages into segments (all products, all articles, all locations) and set the structured data every page in a segment must carry. Each run checks every page against its segment and scores each segment.
- **Catch markup drift early.** When a template, CMS or plugin update removes markup from many pages at once, the segment score drops and shows you which rule broke. You see it before rich results or AI citations disappear.
- **Build an optimization backlog.** Pages that have never met the standard show up as failing rules, ranked by segment. Segments use URL patterns, so new pages are held to the same standard automatically.
- **Ask your AI assistant about your site.** Bot readiness and semantic data quality results are available through the WordLift Model Context Protocol (MCP) Server, in ChatGPT, Claude and other MCP-compatible assistants. Ask "How is my site doing?" to see which checks pass, which segments meet their standard and where the gaps are.

Monitor re-checks your pages every 24 hours and keeps 90 days of history.

## Where to find Monitor

In the WordLift dashboard, select your Knowledge Graph, then select **Monitor** in the sidebar. Monitor has 3 tabs:

| Tab | Use it to |
| --- | --- |
| **Status** | Review AI readiness for the whole site, then bot readiness and semantic data quality by check and by segment. |
| **URLs** | Browse results page by page, with filters and a detail drawer for each URL. |
| **Segments** | Define the URL clusters and the structured data rules attached to them. |

The list of monitored pages, and whether site-wide checks run, is set up by WordLift for your account. To add or remove pages, contact your WordLift account team.

## Get started

Follow these guides in order:

1. [Define segments and expectations](./define-segments-and-expectations.md): group your pages and set the structured data rules they must meet.
2. [Read Monitor status](./read-monitor-status.md): review AI readiness, check the page-level scores and find the rules that fail.
3. [Inspect URL results](./inspect-url-results.md): look at one page's results, entities and JSON-LD.

For every check, rule kind, score and limit, see the [Monitor reference](./reference.md). To read results programmatically, see the [Monitoring API Guide](../developer-resources/monitoring.md).
