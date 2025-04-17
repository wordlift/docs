---
title: Align Content with the Intended Search Query
sidebar_position: 9
---

# Search Intent Match

This workflow is designed to help us **align our content with the intended search query** to ensure maximum relevance and engagement from our target audience. By understanding and [matching the search intent](https://wordlift.io/blog/en/search-intent-optimization/), we can create content that not only ranks well but also satisfies the user's informational needs.

## Here are the steps

To ensure your webpage aligns perfectly with the intended search query, follow this streamlined workflow:

## 1. Identify the Core Query and Intent

Start by pinpointing the exact query you aim to target. Understand the intent behind the search - is it informational, navigational, transactional, or investigational? You can try a prompt like the one below:

```md className=wlx-send-to-agent
evaluate the content quality for the keyword 'Future-Proof Your Content From Google Core Updates' in relation to the content on 'https://wordlift.io/blog/en/google-core-update-ai-interview/' the intent is to gain information on how to improve existing content.
```

With this prompt, we define the **query**, the **url** as well as the narrative behind the searcher's intent.

### Here is what we get

![image](../images/agent-wordlift-query-match.png)

## 2. Expand the content based on the analysis

Within the first response, we can now proceed with the following step to gain new insights on how to improve the article in order to match the provided query and search intent:

```md className=wlx-send-to-agent
Can you help me improve and expand the blog post to match the query?
```

### Here are the suggestions

![image](../images/agent-wordlift-query-match-expansion.png)

### Can we do it all in one step?

Of course you can. Here is the prompt:

```md className=wlx-send-to-agent
evaluate the content quality for the keyword 'Future-Proof Your Content From Google AI Core Updates' in relation to the content on 'https://wordlift.io/blog/en/google-core-update-ai-interview/' the intent is to gain information on how to improve content. After that help me improve and expand the blog post accordingly.
```

### Here is the result

![image](../images/agent-wordlift-query-match-expansion-one-shot.gif)

:::info

The [Content Evaluations API](https://docs.wordlift.io/api/content-evaluations/wordlift-content-evaluations-api/) powering this workflow provides a comprehensive assessment of your content quality, readability, and SEO performance. This advanced tool evaluates multiple dimensions including content purpose, accuracy, depth, readability metrics, and search optimization factors to provide actionable insights for improvement.

The tool visualizes your content's performance through a radar chart that displays scores across key metrics, making it easy to identify areas for enhancement. By focusing on these metrics, you can create more relevant, engaging, and search-optimized content that better addresses your audience's needs. Read more about [Content Quality Evaluation](./content-evaluation.md) for a comprehensive guide to this feature.

:::
