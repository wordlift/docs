---
title: "Create internal links"
description: "Find related articles, choose keywords and anchor texts, and generate the HTML for internal links on one or many pages with Agent WordLift."
sidebar_position: 10
last_updated: 2026-10-27
---

# Create internal links

[Internal linking](https://wordlift.io/blog/en/dynamic-internal-links-in-seo/) is a critical part of SEO: it establishes site architecture and spreads link equity. With [Agent WordLift](/platform/agent-wordlift/), you can streamline creating internal links to improve your website's SEO and user experience. This guide shows you how to use Agent WordLift to create internal links on your website.

## Overview of internal linking

Internal links are hyperlinks that point to other pages on the same website. They are crucial for helping search engines understand the structure and content hierarchy of your site, as well as for guiding visitors to related content. Effective internal linking can improve your site's SEO by ensuring that link equity is passed to the most important pages.

## Steps to create internal links with Agent WordLift

### Step 1: Identify content for internal linking

First, identify the pages on your website that you want to enrich by adding internal links. These could be cornerstone content, high-traffic pages, or pages you want to improve with links pointing to other relevant pages.

### Example prompt for identifying related articles

The example below uses the WordLift blog as a reference.

```md className=wlx-send-to-agent
Find content on my website from the “What is structured data?” page (https://wordlift.io/blog/en/entity/structured-data/). Analyze the text to identify up to 5 related articles. For each article, determine a relevant keyword, generate keyword suggestions for each keyword, and create an anchor text of no more than 30 characters. Finally, compile the HTML for all 5 links with their respective anchor texts.
```

![image](./images/agent-wordlift-internal-links_01.png)

### Step 2: Batch processing for multiple pages

If you need to create internal links for multiple pages, you can use a more comprehensive prompt to handle this in batches.

### Example prompt for batch processing

```md className=wlx-send-to-agent
Find content on my website from the “What is structured data?” page (https://wordlift.io/blog/en/entity/structured-data/). Analyze the text to identify up to 5 related articles. For each article, determine a relevant keyword, generate keyword suggestions for each keyword, and create an anchor text of no more than 30 characters. Finally, compile the HTML for all 5 links with their respective anchor texts. Do the same work also for the pages: "The GS1 Digital Link explained for SEO Jedis (and their clients)" (https://wordlift.io/blog/en/gs1-digital-link-seo/), "Dynamic Internal Links in SEO: Your Superhero in the Generative AI Era" (https://wordlift.io/blog/en/dynamic-internal-links-in-seo/), "Understanding LLM Optimization: Ethical AI and Protecting Your Content" (https://wordlift.io/blog/en/understanding-llm-optimization/) and "From Harold Cohen to Modern AI: The Power of Symbolic Reasoning" (https://wordlift.io/blog/en/the-power-of-symbolic-reasoning/). Remember the following rules: never link to the homepage of the blog (https://wordlift.io/blog/en/) choose carefully the anchor based on the content relevancy and keyword opportunity analysis.
```

### Step 3: Run the prompt with Agent WordLift {#step-3-execute-the-prompt-with-wordlift-ai-seo-agent}

Run the prompts above with Agent WordLift. The tool will analyze the specified pages, identify related articles, and generate appropriate internal links along with suggested anchor texts.

### Step 4: Review and implement the suggestions

Once the internal links and anchor texts are generated, review them to ensure they align with your content strategy and SEO goals. Make any necessary adjustments before implementing them on your website.

## Best practices for internal linking

1. **Use descriptive anchor texts:** Ensure that the anchor texts are descriptive and relevant to the linked content.
2. **Link to relevant content:** Only link to pages that are contextually relevant to the content on the source page.
3. **Avoid over-linking:** Do not overcrowd your content with too many internal links, as this can dilute their value and affect readability.
4. **Update links regularly:** Periodically review and update your internal links to ensure they are still relevant and effective.

:::info

By following these steps with Agent WordLift, you can create a strong internal linking structure that enhances your website's SEO performance and provides a better user experience. To scale internal linking across many pages on your website, read the full details from WordLift's blog on [dynamic internal links](https://wordlift.io/blog/en/dynamic-internal-links-in-seo/) and [get in contact with our SEO management service](https://wordlift.io/seo-management-service/).

:::
