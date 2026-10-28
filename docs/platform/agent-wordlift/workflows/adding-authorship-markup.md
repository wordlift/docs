---
title: "Add authorship markup"
description: "Create, store and update authorship markup with Agent WordLift to show who wrote your content and support its E-E-A-T signals."
sidebar_position: 19
last_updated: 2026-10-27
---

# Add authorship markup

Author credibility matters for SEO. Google's January 2025 update to the Search Quality Rater Guidelines puts more emphasis on E-E-A-T principles. This workflow shows how to use Agent WordLift to create comprehensive authorship markup that makes your content more trustworthy.

:::warning[Review needed]
TODO [SME]: confirm the January 2025 Search Quality Rater Guidelines update this page cites, and link the source.
:::

## Watch the workflow in action

See how Agent WordLift creates and manages authorship markup automatically:

<iframe
  width="100%"
  height="500"
  src="https://www.youtube.com/embed/osj2RJ6gPfM"
  frameborder="0"
  allow="autoplay; encrypted-media"
  allowfullscreen referrerpolicy="strict-origin-when-cross-origin">
</iframe>

## Quick start

Begin with this simple prompt to create authorship markup:

```md className=wlx-send-to-agent
Create authorship markup for [Author Name]. Include their professional background, current role, and significant achievements.
```

## How it works

Agent WordLift follows a comprehensive process to create authoritative authorship markup:

1. **Information gathering**
   - Scans trusted sources (Bing, Google, LinkedIn, Google Books)
   - Verifies professional information
   - Identifies key achievements and credentials

2. **Markup generation**
   - Creates JSON-LD structured data
   - Includes verified professional details
   - Links to authoritative profiles

3. **Knowledge Graph integration**
   - Stores data as RDF triples
   - Maintains data consistency
   - Enables future updates

## Advanced usage

### Create author biographies {#creating-author-biographies}

After storing the authorship markup, generate a biography:

```md className=wlx-send-to-agent
Generate a concise, professional biography using the stored information for [Author Name].
```

### Update existing markup {#updating-existing-markup}

Keep author information current with this prompt:

```md className=wlx-send-to-agent
Update the authorship markup for [Author Name] with their latest achievements and roles.
```

## Best practices

- **Verification**: Always verify author information from multiple authoritative sources
- **Completeness**: Include all relevant professional credentials and achievements
- **Consistency**: Maintain consistent author information across your website
- **Updates**: Regularly review and update author information to reflect current roles and achievements

## The impact on SEO

Proper authorship markup contributes to your content's E-E-A-T signals by:

- Establishing author expertise and credibility
- Creating verifiable connections to professional profiles
- Supporting content trustworthiness
- Enhancing structured data for better search visibility

:::tip

For scaled content operations, consider using [Content Generation](/platform/agent-wordlift/content-generation/) in conjunction with authorship markup to maintain consistent author attribution across your website.

:::

## Next steps

Learn more about E-E-A-T and structured data on the WordLift blog:

- [What is E-A-T and why is it important?](https://wordlift.io/blog/en/entity/e-a-t/): this article discusses the importance of including structured data in your E-A-T strategy to enhance your overall efforts.
- [Elevate Performance with Entity-Based SEO](https://wordlift.io/blog/en/entity-based-seo/): this article highlights how structured data enhances search engine visibility and is crucial for building E-E-A-T, especially for content on critical subjects like health and finance.
- [What Is E-E-A-T, 2E-A-T Or Double E-A-T?](https://wordlift.io/blog/en/product-knowledge-graph-and-eeat/): this article explores the combination of E-E-A-T principles with product knowledge graphs to improve SEO and assess the credibility of websites.
