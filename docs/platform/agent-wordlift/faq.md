---
title: "Agent WordLift FAQ"
description: "Short answers about Agent WordLift: what it does, which plans include it, how usage is counted, how your data is handled and how to export output."
sidebar_label: "FAQ"
sidebar_position: 9
last_updated: 2026-10-27
---

# Agent WordLift FAQ

Quick answers to common questions about Agent WordLift, each with a link to the detail. For an overview of the product, see [Agent WordLift](/platform/agent-wordlift/). If your question is not here, contact [support@wordlift.io](mailto:support@wordlift.io).

## About Agent WordLift {#about-agent-wordlift}

### What is Agent WordLift? {#what-is-agent-wordlift}

Agent WordLift is the AI assistant of the WordLift platform for SEO, content and marketing work. You give it instructions in plain language, and it uses your Knowledge Graph, WordLift APIs and connected data to research, analyze, create and optimize content.

Agent WordLift is an assistant, not a replacement for your judgment. Review what it produces and verify critical information before you publish.

### How does Agent WordLift use my Knowledge Graph? {#how-does-agent-wordlift-work}

Agent WordLift combines Knowledge Graph data, WordLift APIs and language models. Your Knowledge Graph holds information about your site in structured form: entities, their relationships and their attributes. Agent WordLift reads that structure to ground its analysis and output in your own content, and uses language models and WordLift APIs to process queries and text in natural language.

To learn how the capabilities are organized, see [Agent WordLift tool families](/platform/agent-wordlift/tool-families/).

### What can I do with Agent WordLift? {#what-can-i-do-with-agent-wordlift}

You can use Agent WordLift for these tasks, among others. Each one belongs to a tool family.

| Task | What Agent WordLift does | Tool family |
| --- | --- | --- |
| Content analysis | Analyzes a text or a web page and extracts insights such as entities and keywords. | Knowledge Graph and entity intelligence |
| Entity and keyword extraction | Identifies the entities and keywords in a piece of content. | Knowledge Graph and entity intelligence |
| Entity gap analysis | Compares the entities in your content with those in top-ranking content for a query. | Knowledge Graph and entity intelligence |
| Keyword suggestions | Suggests related keywords with search volume and other metrics. | Keyword and search demand |
| Google Trends analysis | Analyzes the seasonality of keywords through the WordLift Google Trends API. | Keyword and search demand |
| SEO score analysis | Assesses how relevant and trustworthy content is for a keyword and its search intent. | Content evaluation and optimization |
| Content expansion | Expands the content of a URL using the entities you specify. | Content generation |
| Content creation | Helps you create new content from domain-specific searches and analysis. | Content generation |
| Fact-checking | Checks statements or claims and returns a factuality score. | Fact-checking and trust |

For end-to-end recipes that combine several of these tasks, see [Agent WordLift workflows](/platform/agent-wordlift/workflows/). For single prompts you can copy, see the [Prompt Library](/platform/agent-wordlift/prompt-library/).

### What powers Agent WordLift? {#what-is-the-technology-behind-the-agent-which-ai-model-are-you-using-here}

Agent WordLift runs on three things working together: the data in your Knowledge Graph, WordLift APIs, and language models that process queries and text in natural language. The Knowledge Graph supplies structured facts about your content, the APIs supply specialized SEO and content capabilities, and the language models interpret your instructions and write the output.

## Plans and usage {#plans-and-usage}

### Which plans include Agent WordLift? {#how-much-does-agent-wordlift-cost}

Agent WordLift is included in both WordLift plans, Business+ and Enterprise. It is a product within those plans, not a plan of its own. Access starts with a discovery session or a conversation with sales. To compare plans, see [Plans and pricing](/plans-and-pricing/).

### How is Agent WordLift usage counted? {#where-can-i-see-the-interaction-limits}

Business+ includes a monthly allowance of Smart Credits, and Agent WordLift interactions consume those credits. Unused credits expire at the end of the month on monthly billing, or at the end of the subscription year on yearly billing. To add credits, contact your account manager.

:::warning[Review needed]
TODO [SME]: Confirm whether the docs may state "1 credit = 10 Agent interactions" from the pricing page, and how Agent WordLift usage is counted on Enterprise.
:::

### What happens when I reach my limit? {#what-happens-when-i-reach-my-limit}

:::warning[Review needed]
TODO [SME]: Confirm what Agent WordLift shows when you reach your credit or interaction limit, and whether the count still resets at the start of each month under the Smart Credits model.
:::

## Working with output {#working-with-output}

### How do I import the output into a Google Doc? {#how-do-i-import-the-output-into-a-google-doc}

Paste the output as Markdown so Google Docs keeps the formatting:

1. [Enable Markdown support](https://support.google.com/docs/answer/12014036) in Google Docs.
2. Copy the output with the clipboard icon below the answer.
3. In your Google Doc, select **Edit** > **Paste from Markdown**.

### Can Agent WordLift write FAQs for my pages? {#can-agent-wordlift-write-faqs-for-my-pages}

Yes. Agent WordLift analyzes the entity gap between one of your pages and a search query, picks the top missing entities and turns them into three questions. It then drafts answers in the writing style of your page, using your website and other relevant sources. Follow the steps in the [Generate FAQs workflow](/platform/agent-wordlift/workflows/generate-faqs/).

## Languages {#languages}

### Which languages does Agent WordLift support? {#which-languages-does-agent-wordlift-support}

Language support can vary by task. If a task does not work as expected in your language, contact [support@wordlift.io](mailto:support@wordlift.io).

:::warning[Review needed]
TODO [SME]: Confirm which languages have known limits (the previous docs said some text and query analysis tasks do not support Chinese) and whether that limit is still current.
:::

## Data and privacy {#data-and-privacy}

### Is my data used to train models? {#what-are-the-ethical-implications-of-using-agent-wordlift}

No. The model provider that Agent WordLift uses does not use the data you submit to train or improve its models. WordLift has no access to your prompts and completions unless both parties agree to it to improve the service.

:::warning[Review needed]
TODO [SME]: These provider commitments are pending the same legal review as the data privacy page; confirm they may be stated without naming the provider.
:::

### What does Agent WordLift store? {#what-does-agent-wordlift-store}

Each user has a dedicated, temporary workspace that stores files only during active use and is deleted after a period of inactivity. Data sources connected to WordLift are encrypted at rest with AES-256, including any personally identifiable information that is detected.

For the full description, see [Data privacy and security in Agent WordLift](/platform/agent-wordlift/data-privacy/) and the [WordLift Privacy Policy](https://wordlift.io/privacy-policy/).

## Keyword research and optimization {#keyword-research-and-optimization}

### How can Agent WordLift help with keyword research? {#how-can-an-ai-seo-agent-help-with-keyword-research}

Agent WordLift combines query analysis, keyword suggestions, entity analysis and your Search Console data to help you find, group and prioritize keywords. Start with the workflow that matches your task:

- **Find new keywords.** The [keyword discovery workflow](/platform/agent-wordlift/workflows/keyword-discovery/) extracts the entities behind each query and adds keyword suggestions.
- **Stop pages competing with each other.** The [keyword cannibalization workflow](/platform/agent-wordlift/workflows/keyword-cannibalization/) compares the entities, keywords and search intent of your pages to find overlaps.
- **Use your own search data.** The [Google Search Console workflow](/platform/agent-wordlift/workflows/google-search-console/) analyzes your Search Console performance data once you connect it.
- **Match content to search intent.** The [query match workflow](/platform/agent-wordlift/workflows/analyzing-query-match/) checks how well a page aligns with the query you want it to rank for.
- **Find content gaps.** The [content evaluation workflow](/platform/agent-wordlift/workflows/content-evaluation/) assesses the quality, readability and SEO performance of a page.

For every workflow, see [Agent WordLift workflows](/platform/agent-wordlift/workflows/).

## Get help {#get-help}

Email [support@wordlift.io](mailto:support@wordlift.io), or visit [Support](/support/) for troubleshooting and contact options.
