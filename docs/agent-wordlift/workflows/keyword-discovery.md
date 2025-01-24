---
title: Run a keyword research
sidebar_position: 17
---

# Keyword Discovery with WordLift AI SEO Agent

Let’s work together on **keyword research** with WordLift AI SEO Agent. Keyword research provides valuable insight into **how a target audience searches on Google**. The insight from these queries helps us inform the content strategy and can also be applied to our day-to-day marketing efforts.

## Query Analysis for Entity Extraction

Let’s combine the query analysis tool to extract the main entities behind each query with keyword suggestions to identify relevant keywords and understand the context and intent behind search queries.

### Example Prompt for Analyzing a Query

```md className=wlx-send-to-agent
Analyze the query “aromatherapy” on google.com.
```

WordLift AI SEO Agent will now use WordLift Content Analysis to understand top-ranking results on google.com. This will shed some light on the context behind this query.

![image](../images/agent-wordlift-query-analysis.png)

To gain a deeper understanding of the interest patterns for this query, we can analyze the seasonal trends using the WordLift Google Trends API:

```md className=wlx-send-to-agent
Thanks, now analyze the seasonal trends in the US for "aromatherapy".
```

By examining seasonal trends, we can identify peak times for interest in “aromatherapy” which can help us plan our content marketing efforts more effectively.

![image](../images/agent-wordlift-keyword-seasonal-trends.png)

## Deep Dive into Keyword Suggestions

Let’s now dive deeper into keywords (how people are searching on Google) with a different prompt:

```md className=wlx-send-to-agent
Now, propose three keyword ideas for "aromatherapy" for each keyword, provide suggestions, extract the topics, and present all the data in a table highlighting the opportunities.
```

![image](../images/agent-wordlift-keyword-ideas.png)

This approach helps us explore the search landscape more comprehensively, identifying opportunities and understanding user intent.

## Sophisticated Prompt for Blog Post Outline

We can also venture into a more sophisticated prompt that will automatically run the analysis and draft the outline of a blog post:

```md className=wlx-send-to-agent
Propose three keyword ideas for "aromatherapy". For each keyword, provide suggestions, extract the topics, and present all the data in a table highlighting the opportunities. Then provide me with the outline for a blog post on the keyword that has the highest chance, keeping in mind the seasonality of the main keyword.
```

![image](../images/agent-wordlift-outline-ideas.png)

This prompt not only seeks keyword opportunities but also aims at creating actionable content strategy outputs, like drafting a blog post outline based on the keyword with the highest potential.

By employing WordLift **AI SEO Agent for keyword discovery**, we can **gain a competitive edge in content creation**, ensuring that our strategies align with actual search behaviors and audience needs.
