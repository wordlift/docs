---
title: Rankings Drop Audit
sidebar_position: 8
---

# Rankings Drop Audit

The Rankings Drop Audit workflow uses Agent WordLift's Multi-Agent System (MAS) to perform an autonomous, in-depth analysis of ranking drops in your Google Search Console data. Instead of static dashboards, it provides a dynamic reasoning engine that converts raw GSC data into a client-ready, interactive report.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/-cYW_uNRucE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>

## The Three-Stage Process

This workflow moves through three key stages to deliver actionable insights:

### 1. Data Grounding & Tool Activation

When you run the audit prompt, the Agent activates a specialized Multi-Agent System designed for "Traffic Triage":

- **GSC Connectivity:** The Agent connects to your Google Search Console via a secure API
- **Temporal Normalization:** It automatically segments the data into pre-period (before the drop date) and post-period (after the drop) segments, normalizing by days to ensure an accurate comparison despite differing window lengths
- **Knowledge Graph Integration:** It maps URLs and queries against your site's unique Knowledge Graph, allowing it to understand *entities* (e.g., "Knowledge Graph," "AI Audit") rather than just individual keywords

### 2. Autonomous Analysis (The Triage)

The Agent doesn't just display a list of losers; it performs a reasoning loop to determine the *nature* of the drop:

- **Cluster Identification:** Groups URLs into topical clusters (e.g., "Italian Glossary," "Core Product") to see if the drop is site-wide or localized to a specific niche
- **Impact Correlation:** Separates "false drops" (shorter reporting windows or lower demand) from "true ranking hits"
- **Gap Detection:** For declining clusters, it crawls the SERP to identify if competitors have gained an edge through better E-E-A-T signals or more comprehensive structured data

### 3. Interactive HTML Output & Recovery Plan

Instead of a simple text reply, the Agent generates a shareable, interactive HTML report:

- **Client-Ready Visualization:** The HTML report includes dynamic charts showing clicks, impressions, and CTR shifts per cluster
- **Surgical Recovery Plan:** For every cluster identified as a "loser," the Agent provides a specific roadmap:
  - **Snippet Optimization:** Rewriting titles and meta descriptions for high-impression, low-CTR pages
  - **Content Enrichment:** Identifying entity gaps to better align with current search intent
  - **Technical Hardening:** Suggesting schema updates (like FAQ or Person) to recover rich results
- **Collaborative Sharing:** This report is designed to be downloaded and shared directly with team members or clients, bridging the gap between raw analysis and stakeholder communication

## Workflow Summary

| Step | Action | Output |
| --- | --- | --- |
| **Trigger** | Prompt: "Run a rankings drop audit..." | Agent confirms GSC access |
| **Triage** | Data segmentation & cluster mapping | Identification of "Winning" vs "Losing" clusters |
| **Reasoning** | Correlate drops with CTR, intent, or rankings | Deep-dive into specific cluster failures |
| **Deliver** | Generate `report.html` | **Interactive Report & Strategic Recovery Plan** |

## Example Prompt

Here's the simple prompt structure that triggers this powerful workflow:

```
Run a rankings drop audit of https://wordlift.io/blog/en starting Jan 19, 2026
and provide an in-depth analysis of the clusters that lost the most (if any).
Identify both impact and the recovery plan.
```

## Key Benefits

The core value of this workflow lies in its ability to:

- Move beyond static dashboards to provide dynamic reasoning
- Convert raw Google Search Console data into client-ready insights
- Identify not just what dropped, but *why* and *how to fix it*
- Generate shareable reports that bridge technical analysis and stakeholder communication
- Provide surgical, cluster-specific recovery plans rather than generic recommendations

## Prerequisites

- Active [Google Search Console integration](./google-search-console.md)
- Access to Agent WordLift
- Website with established Knowledge Graph

## Getting Started

1. Ensure your Google Search Console is connected via the [WordLift Dashboard](https://my.wordlift.io)
2. Note the date when you observed the rankings drop
3. Use the prompt structure above, replacing the URL and date with your specific parameters
4. Review the generated HTML report and implement the recovery plan recommendations
