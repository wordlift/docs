---
title: 🧰 Tools
sidebar_position: 6
---

# Agent WordLift Tools

Agent WordLift can use specialized SEO, analytics, and knowledge graph tools to ground its answers in your website data, search performance, and structured content. Use this page as a reference for what each tool does, how to configure it, and which prompts to try first.

## Google Search Console

### Description

The Google Search Console tool helps Agent WordLift analyze search queries, landing pages, impressions, clicks, click-through rate, and ranking changes. Use it to discover opportunities, diagnose traffic drops, and prioritize content updates with real search data.

### How to configure it

Connect Google Search Console as a WordLift Data Source from the WordLift Dashboard. See [Data Sources: OAuth2 Connections](/knowledge-graph/data-sources-oauth2/) for the dashboard setup flow and API-based connector options.

### Sample prompts

```md
Show me the top 10 queries with high impressions and low CTR over the last 30 days.
```

```md
Find keywords where my site ranks between positions 11 and 20 and suggest content improvements.
```

```md
Analyze my Google Search Console data and identify pages that lost clicks in the last 28 days.
```

### Related workflows

- [Google Search Console Integration](./workflows/google-search-console.md)
- [Rankings Drop Audit](./workflows/rankings-drop-audit.md)
- [Keyword Discovery](./workflows/keyword-discovery.md)

## Google Analytics

### Description

The Google Analytics tool helps Agent WordLift interpret user engagement, traffic patterns, and content performance after users reach your site. Use it with Google Search Console to connect search visibility with behavior such as engagement, landing-page performance, and conversion-oriented content analysis.

### How to configure it

Connect Google Analytics as a WordLift Data Source from the WordLift Dashboard. See [Data Sources: OAuth2 Connections](/knowledge-graph/data-sources-oauth2/) for the dashboard setup flow and API-based connector options.

### Sample prompts

```md
Compare organic landing pages by engagement and identify pages that need content improvements.
```

```md
Combine Google Search Console and Google Analytics data to find pages with strong impressions but weak engagement.
```

```md
Analyze which organic pages bring qualified traffic and suggest next content actions.
```

### Related workflows

- [Google Search Console Integration](./workflows/google-search-console.md)
- [Rankings Drop Audit](./workflows/rankings-drop-audit.md)
- [Analyze SEO Score](./workflows/analyzing-query-match.md)

## Content Evaluation

### Description

The Content Evaluation tool reviews content quality, readability, depth, accuracy, and SEO alignment. Use it to understand whether a page satisfies the target intent and where the content needs stronger coverage.

### How to configure it

No separate data source configuration is required. You need access to Agent WordLift and a page, text passage, or target keyword to evaluate. For website-aware analysis, make sure your site is connected to WordLift as described in [Getting Started](./getting-started.md).

### Sample prompts

```md
Evaluate the content quality for the keyword "semantic SEO" in relation to this URL: https://example.com/page
```

```md
Review this article for readability, depth, accuracy, and SEO alignment. Suggest the top improvements.
```

```md
Compare these two pages for content quality and explain which one better satisfies the search intent.
```

### Related workflows

- [Content Quality Evaluation](./workflows/content-evaluation.md)
- [Analyze SEO Score](./workflows/analyzing-query-match.md)
- [Align Content with Search Query](./workflows/analyzing-query-match.md)

## Keyword Suggestions

### Description

The Keyword Suggestions tool expands a topic or seed keyword into related search terms, semantic variants, and content opportunities. Use it to plan briefs, refine page targeting, and find new angles for existing content.

### How to configure it

No separate setup is required. For stronger recommendations, connect your website and search data through WordLift and the relevant Data Sources.

### Sample prompts

```md
Generate keyword suggestions based on "entity SEO" and group them by search intent.
```

```md
Suggest keywords I should include in an article about "structured data for ecommerce".
```

```md
Create a keyword map for this topic and recommend which keywords belong in the same article.
```

### Related workflows

- [Keyword Discovery](./workflows/keyword-discovery.md)
- [Keyword Cannibalization](./workflows/keyword-cannibalization.md)
- [Create Product Descriptions](./workflows/create-product-description.md)

## Entity Analysis

### Description

The Entity Analysis tool identifies the people, organizations, places, products, concepts, and other entities mentioned in text or on a webpage. Use it to understand topical coverage, compare pages, and align content with your knowledge graph.

### How to configure it

No separate setup is required for basic text or URL analysis. To ground analysis in your own website knowledge graph, connect your website to WordLift as described in [Getting Started](./getting-started.md).

### Sample prompts

```md
Analyze the entities on this webpage: https://example.com/article
```

```md
Extract the main entities from this text and explain which ones should be strengthened for SEO.
```

```md
Compare the entities covered by these two pages and identify overlap or missing topics.
```

### Related workflows

- [Keyword Cannibalization](./workflows/keyword-cannibalization.md)
- [Create Internal Links](./workflows/create-internal-links.md)
- [Instagram Indexing Analysis](./workflows/instagram-indexing-analysis.md)

## Fact-Checking

### Description

The Fact-Checking tool reviews claims and highlights whether they need verification, correction, or stronger sourcing. Use it before publishing content that includes factual statements, statistics, or expert claims.

### How to configure it

No separate setup is required. Provide the claim, source text, or page URL you want Agent WordLift to check.

### Sample prompts

```md
Fact-check this statement: "Structured data directly increases Google rankings."
```

```md
Review this paragraph and identify claims that need citations or verification.
```

```md
Check this article for factual risks and suggest safer wording where needed.
```

### Related workflows

- [Content Quality Evaluation](./workflows/content-evaluation.md)
- [Research Using Reddit Discussions](./workflows/research-content-ideas.md)
- [Enhanced Entity Research](./workflows/enhanced-entity-research.md)

## Local SEO Tools

### Description

Local SEO tools help Agent WordLift analyze Google Business Profiles, local pack results, local rankings, and customer questions and answers. Use them to understand local visibility, compare competitors, and prioritize local search improvements.

### How to configure it

No dashboard data source is required for the basic local SEO prompts. Provide the business name, target keyword, and location in the format `City,State,Country`. For detailed syntax and limitations, see the [Local SEO Tools Reference](./workflows/local-seo-tools-guide.md).

### Sample prompts

```md
Analyze the Google Business Profile for "Mountain View Cafe" in "Denver,Colorado,United States".
```

```md
Show me the Local Pack results for "best coffee shop" in "Denver,Colorado,United States".
```

```md
Track the rankings of "Mountain View Cafe" for "best coffee shop" in "Denver,Colorado,United States".
```

### Related workflows

- [Local SEO Analysis](./workflows/local-seo-analysis.md)
- [Local SEO Tools Reference](./workflows/local-seo-tools-guide.md)

## Enhanced Knowledge Graph Research

### Description

The Enhanced Knowledge Graph Research tool enriches entity research with semantic attributes, relationships, and context from knowledge graph sources. Use it for content research, entity profiles, competitive intelligence, and topical authority planning.

### How to configure it

No separate setup is required for general entity research. To compare results with your own content graph, connect your website to WordLift as described in [Getting Started](./getting-started.md).

### Sample prompts

```md
Research the entity "Marie Curie" and summarize the most important semantic attributes and relationships.
```

```md
Map the key entities related to "agentic SEO" and explain how they connect.
```

```md
Compare these organizations as entities and identify content angles for an SEO article.
```

### Related workflows

- [Enhanced Entity Research](./workflows/enhanced-entity-research.md)
- [Research Using Reddit Discussions](./workflows/research-content-ideas.md)
- [Keyword Discovery](./workflows/keyword-discovery.md)
