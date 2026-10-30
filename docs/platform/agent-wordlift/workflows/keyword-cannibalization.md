---
title: "Avoid keyword cannibalization"
description: "Find pages that compete for the same keywords with Agent WordLift by comparing their entities, keywords and search intent, then differentiate them."
sidebar_position: 16
last_updated: 2026-10-27
---

# Avoid keyword cannibalization

This workflow shows how to identify and resolve **keyword cannibalization** issues with Agent WordLift. Keyword cannibalization occurs when multiple pages on your website target the same keyword, causing them to compete against each other in search engine rankings. This can dilute your SEO efforts and confuse search engines about which page to rank for the keyword.

## Identify keyword overlap between pages {#identifying-keyword-overlap-between-pages}

Use the content analysis tools to extract entities and keywords, and to understand the detailed search intent behind each page. This helps you identify overlapping areas and develop strategies to differentiate the content.

### Example prompt for analyzing and differentiating pages

```md className=wlx-send-to-agent
Search the following pages from the website using the search tool:

- **URL1:** Article: https://wordlift.io/blog/en/underutilized-schema-markups-for-publishers/
  - **Title1:** Underutilized Schema Markups for Publishers

- **URL2:** Article: https://wordlift.io/blog/en/structured-data-for-personal-branding/
  - **Title2:** Structured Data for Personal Branding

For each page, perform the following analyses:

- **Extract Entities:**
  - Use the content analysis tool to extract entities mentioned in each page.

- **Identify Keywords:**
  - Determine the primary and secondary keywords based on the content and metadata.

- **Determine Detailed Search Intent:**
  - Present a detailed description of the search (user) intent, going beyond simple categories.

**Present the analysis results in a table**, including:

- URL
- Title
- Primary Keywords
- Secondary Keywords
- Extracted Entities
- Detailed Search Intent

**Propose strategies to differentiate the pages:**

- Suggest ways to distinguish each page's content, focusing on unique aspects of content, keywords, and entities.
- Recommend optimizations to improve SEO performance, prevent keyword cannibalization, and enhance user experience.
```

With this prompt, Agent WordLift analyzes each page and provide insights into potential overlaps and differentiation opportunities.

## Understand the analysis {#understanding-the-analysis}

The analysis helps you:

- **Identify keyword overlaps:** See if both pages are targeting the same primary or secondary keywords.
- **Compare extracted entities:** Determine if the pages mention the same entities, indicating content overlap.
- **Understand detailed search intent:** Understand the specific goals and needs of users for each page, going beyond generic intent categories.

## Develop strategies to differentiate content {#developing-strategies-to-differentiate-content}

Based on the analysis, you can implement the right strategy to prevent keyword cannibalization and consolidate or differentiate content.

By following this workflow, you can effectively identify and resolve keyword cannibalization issues. Differentiating your content not only improves SEO performance but also enhances user experience by providing clear, distinct information on each page.

:::info

Remember to monitor the performance of these pages after making changes to ensure that the strategies are effective and adjust as necessary.

:::
