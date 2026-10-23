---
title: Read Monitor status
description: Use the Monitor Status tab to review AI readiness for your site, then find the page checks and segment rules that lower your scores.
sidebar_position: 2
last_updated: 2026-10-23
---

# Read Monitor status

Use the **Status** tab to decide what to work on next. It shows your site in 3 panels:

- **AI readiness** shows how AI assistants and agents can reach, understand and act on the whole site.
- **Bot readiness** shows the technical health of every monitored page.
- **Semantic data quality** shows how well each segment's pages meet their structured data standard.

## Prerequisites

- You have access to the Knowledge Graph in the WordLift dashboard.
- At least 1 monitoring run has finished since WordLift set up your pages.
- For AI readiness, site-wide checks are turned on for your account. Your WordLift account team can turn them on.
- For semantic data quality, you have segments with expectations (see [Define segments and expectations](./define-segments-and-expectations.md)).

## Review AI readiness

AI readiness has no score, because the right answer depends on your goals. A publisher may block AI crawlers on purpose, and not every site wants agents to act on it. Monitor shows a gap as an opportunity, not a failure.

1. Select your Knowledge Graph, then select **Monitor** > **Status**.
2. Read the **AI readiness** header. It shows how many of the 6 site-wide checks are in each state, and when Monitor last checked the site.

   ![The AI readiness panel](/img/monitor/status-ai-readiness.jpg)

   Until the first audit finishes, the panel shows **No results yet**. The first audit can take up to 24 hours.

   ![AI readiness before the first audit](/img/monitor/status-ai-readiness-no-results.jpg)

3. Review the checks in each of the 3 areas. Monitor lists opportunities first and highlights them. Each check shows one of these states:

   | State | Meaning |
   | --- | --- |
   | **In place** | The signal or interface is present. |
   | **Opportunity** | It is missing, and adding it could help, depending on your goals. |
   | **Your policy** | It is missing on purpose, for example AI crawlers blocked in `robots.txt`. |
   | **Couldn't verify** | Monitor couldn't run the check, for example because the site's bot protection refused the request. |
   | **Not checked yet** | There is no result yet. |

   | Area | Question | Checks |
   | --- | --- | --- |
   | **Reachability** | Can AI reach your content? | Crawl rules (`robots.txt`), AI crawler access (`robots.txt` user agents) |
   | **Discoverability** | Can AI find and understand you? | Content guide for AI (`llms.txt`) |
   | **Actionability** | Can AI agents act for your customers? | Tools for AI agents (MCP), In-browser agent actions (WebMCP), Agent instructions (`SKILL.md`) |

   Actionability matters only if you want agents to act on your site, for example to check availability, request a quote or book. Many sites choose not to.

4. Select a check to open its details. The details explain what Monitor found, why it matters, and a suggested next step: **How to add it**, **How to fix it** or **If this is intentional**. **Raw check result** shows the output of the check.

   ![Details of an Actionability check](/img/monitor/status-ai-readiness-check-details.jpg)

   For **AI crawler access**, the details also list which known AI bots your `robots.txt` allows and which it blocks.

   ![AI crawler access with allowed and blocked bots](/img/monitor/status-ai-readiness-crawler-access.jpg)

5. To continue at page level, follow the links at the bottom of the panel: **Bot readiness** under Reachability and **Semantic data quality** under Discoverability.

## Review bot readiness

1. In **Bot readiness**, read the score. It measures the technical foundation (valid markup, fast responses, clean delivery) that crawlers and AI need to reach and parse every page.
2. Find the check that lowers the score. Checks are grouped into Markup, Delivery, SEO fundamentals and WordLift, and each check shows its own pass, warning and fail counts.

   ![The bot readiness panel](/img/monitor/status-bot-readiness.jpg)

## Review semantic data quality

1. In **Semantic data quality**, read the score and the bar at the top. The bar splits evaluations into passing, required failing and recommended failing.
2. Under **Breakdown by segment**, find the segment with the lowest score. A drop in a segment that used to score well usually means drift: a template, CMS or plugin update has removed markup from many pages at once.

   ![Semantic data quality with a segment expanded](/img/monitor/status-semantic-data-quality.jpg)

3. Expand the segment. It lists every expectation, its severity, and how many of the segment's URLs pass it, so you can see which rule causes the low score.
4. Use the links at the end of the expanded segment:
   - **Open segment** opens the segment so you can edit its rules.
   - **Inspect URLs** opens the segment's pages. Open a failing page to see its details (see [Inspect URL results](./inspect-url-results.md)).

   ![Rule-level breakdown and the drill-down links](/img/monitor/status-segment-rules.jpg)

The usual path is score, then segment, then failing rule, then URLs, then a single URL.

For how each score is calculated and which checks belong to each area and category, see [Scores in the Monitor reference](./reference.md#scores).

## Result

You know what to work on: which AI readiness opportunities fit your goals, and which page checks and segment rules fail.

Results reflect the last finished run. Changes you make to your site or your segments show up after the next run.

## Next steps

- [Inspect URL results](./inspect-url-results.md) to see why a single page fails.
- [Define segments and expectations](./define-segments-and-expectations.md) to adjust the rules for a segment.
