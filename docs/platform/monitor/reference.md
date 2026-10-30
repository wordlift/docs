---
title: Monitor reference
description: Every Monitor check, segment matcher, expectation kind, severity, score and default limit, plus the current limitations of the feature and how to reach the API.
sidebar_position: 5
last_updated: 2026-10-27
---

# Monitor reference

This page lists what Monitor checks, how it scores results, and its limits. For an introduction, see [Monitor](./index.md).

## Site-wide checks

Site-wide checks run once per account against your website. The dashboard shows them in the **AI readiness** panel, grouped by area.

| Check | Area | Dashboard name | What it verifies |
| --- | --- | --- | --- |
| `account_robots_check` | Reach | Crawl rules | `robots.txt` is published. |
| `ai_bot_access_check` | Reach | AI crawler access | Which known AI bots `robots.txt` allows or blocks. |
| `account_llms_txt_check` | Understand | Content guide for AI | `llms.txt` is published. |
| `account_mcp_check` | Act | Tools for AI agents | A Model Context Protocol (MCP) manifest (`mcp.json` or an MCP server card) is published under `/.well-known`. |
| `account_webmcp_check` | Act | In-browser agent actions | A WebMCP discovery surface is published. |
| `account_skill_md_check` | Act | Agent instructions | `SKILL.md` or an agent skills index is published. |

Each site-wide check shows one of these states:

| State | Meaning |
| --- | --- |
| **In place** | The signal or interface is present. |
| **Opportunity** | It is missing, and adding it could help, depending on your goals. |
| **Your policy** | It is missing on purpose, for example AI crawlers blocked in `robots.txt`. |
| **Couldn't verify** | The check couldn't run, for example because the site's bot protection refused the request. |
| **Not checked yet** | There is no result yet. |

## Page checks

Page checks run on every monitored URL. The dashboard shows them in the **Bot readiness** panel, grouped by category.

| Check | Category | What it verifies |
| --- | --- | --- |
| `structured_data_check` | Markup | JSON-LD is present and syntactically valid (it passes the Shapes Constraint Language (SHACL) constraints). |
| `status_check` | Delivery | The page responds with HTTP 2xx or 3xx. |
| `performance_check` | Delivery | Time to first byte (warning above 800 ms, fail above 1800 ms) and total response time (warning above 2500 ms, fail above 4000 ms). |
| `resource_404_check` | Delivery | No sub-resources (scripts, images, styles) fail to load. |
| `title_check` | SEO fundamentals | A `<title>` is present. |
| `canonical_check` | SEO fundamentals | A canonical link is present. |
| `page_meta_check` | SEO fundamentals | A meta description is present. |
| `wordlift_bootstrap_check` | WordLift | The WordLift script is installed. |

Each page check returns `OK`, `WARN` or `FAIL`. Monitor also evaluates the expectations of every segment the page matches.

## Segments

A segment matches a URL if any of its glob patterns or static URLs matches it. A URL can belong to several segments, and Monitor evaluates it against the expectations of each one.

| Matcher | Syntax |
| --- | --- |
| Glob pattern | `*` matches any characters and `?` matches a single character, for example `https://www.example.com/blog/*`. |
| Static URL | The exact URL. |

## Expectations

| Kind | Meaning |
| --- | --- |
| **Type present** | The entity type must appear on the page. |
| **Type absent** | The entity type must not appear on the page. |
| **Property present** | The property must be set on the given type. |
| **Property absent** | The property must not be set on the given type. |

Use the 2 absent kinds when a markup pattern is wrong for a kind of page. Property rules take a type and a property name. Nested properties use dot notation, for example `publisher.name` on a `BlogPosting`.

| Severity | Effect |
| --- | --- |
| **Required** | Affects the page status and counts toward the semantic data quality score. |
| **Recommended** | Affects the page status but does not count toward the score. |

## Scores

AI readiness has no score. The 2 page-level panels are scored as follows:

| Score | Calculated as |
| --- | --- |
| Bot readiness | The share of page checks that pass, across all URLs. |
| Semantic data quality | The share of required expectation evaluations that pass, overall and per segment. Recommended rules affect status but not the score. |

The dashboard colors both scores by the same bands: green from 80%, amber from 50% and red below 50%.

## Defaults and limits

| Setting | Value |
| --- | --- |
| Run frequency | Every 24 hours per account |
| Result history | 90 days |
| Segments per account | 25 |
| Glob patterns per segment | 20 |
| Static URLs per segment | 50 |
| Expectations per segment | 20 |

To change the run frequency or history for your account, contact your WordLift account team.

## API

To read the latest results for a URL from your own code, use the Monitor API. See the [Monitoring API Guide](../../apis-and-sdks/monitoring.md).

## Current limitations

- **You can't add pages from the dashboard.** WordLift sets up the monitored pages for your account.
- **Results are not instant.** You can't start a run manually. Changes show up after the next scheduled run.
- **Monitor reports issues but doesn't fix them.** It shows where structured data falls short. Fixing it is a separate step.
- **AI readiness is not yet available through the MCP Server.** Bot readiness and semantic data quality are (see [Ask your AI assistant about Monitor](./ask-your-ai-assistant.md)).
- **You write expectations by hand.** Monitor doesn't propose rules from your site's content.
