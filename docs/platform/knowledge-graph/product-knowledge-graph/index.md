---
title: "Product Knowledge Graph"
description: "Build the e-commerce part of your Knowledge Graph from a Google Merchant Center feed and publish structured product data on your website."
sidebar_position: 10
toc_min_heading_level: 2
toc_max_heading_level: 3
last_updated: 2026-10-27
---

# Product Knowledge Graph

The Product Knowledge Graph is the e-commerce part of your WordLift [Knowledge Graph](/platform/knowledge-graph/). It describes your catalog as structured product data that search engines can understand, and it can make products eligible for supported search and shopping experiences.

**Product Knowledge Graph Builder** uses your Google Merchant feed to [create a Product Knowledge Graph](https://wordlift.io/blog/en/how-build-product-knowledge-graph/) and publish structured product data on your website. It imports product data from Merchant Center, maps it to Schema.org and synchronizes the resulting product graphs with your WordLift Knowledge Graph.

Use it when your primary source is a Google Merchant Center product feed. For content pages, use [GraphSync](/platform/knowledge-graph/graph-sync/), and compare every population method in [Create a Knowledge Graph](/platform/knowledge-graph/create/).

## Compatibility across platforms

Product Knowledge Graph Builder supports e-commerce websites. The generated structured data is added with a script, so the setup is not tied to a specific content management system.

## Get started

When your WordLift subscription includes Product Knowledge Graph Builder, you receive a key that gives you access to the [WordLift Dashboard](/platform/dashboard/).

In the Dashboard, select **+ Add Merchant** in the left navigation and follow the setup wizard.

### 1. Link your Google account

Sign in with the Google account that can access the Merchant Center account you want to use.

![Google account connection step in Product Knowledge Graph Builder](./images/PKGBuilder_1.png)

> **Behind the scenes:**
> Product Knowledge Graph Builder uses OAuth 2.0 to request access to your Merchant Center data without collecting your Google password.

### 2. Choose the Merchant feed

Select the Merchant feed you want to import.

![Merchant feed selection step in Product Knowledge Graph Builder](./images/PKGBuilder_2.png)

Each import supports one language. If your feed contains multiple languages, use **Path** to filter one language, such as `/en`, and create a separate configuration for each additional language.

> **Behind the scenes:**
> The tool validates and maps the feed data to create a consistent structure for your Product Knowledge Graph. Language filters make sure that the correct version of your content is imported.

### 3. Create your Product Knowledge Graph

Link your website to the selected Merchant feed, then add the script provided by the wizard to your website.

Select **Finish** to save the configuration. Product Knowledge Graph Builder can then import the products, create their structured data, and synchronize them with the Knowledge Graph.

Use the WordLift Dashboard to start and monitor import synchronization.

> **Behind the scenes:**
> The script retrieves the structured product data generated from your Merchant feed and makes it available on the corresponding product pages.

### Configuration and enrichment capabilities

Product Knowledge Graph Builder provides the following configuration and enrichment options:

- Preserve the Google product category as a structured `CategoryCode` and apply dated sale prices during their validity window. See [Feed specifications](./feed-specifications.md) for mappings and examples.
- Reassign an existing Merchant feed configuration to another Google account.
- Configure a custom domain and select the dataset to use. See [Custom domain](/plans-and-pricing/custom-domain/) for setup details.
- Monitor import synchronization from the Dashboard.
- Customize the seller name independently of the Merchant feed.

## Advanced integration

Use the [webhooks integration](./webhooks.md) to transform RDF generated from Merchant Center product data before Product Knowledge Graph Builder writes it to the Graph store.

## Configure canonical product URLs

Set the Google Merchant Center `canonical_link` attribute to the stable product URL that Google should associate with the product. Keep this value consistent with the canonical URL declared on the product page. See Google's [Google Search index link documentation](https://support.google.com/merchants/answer/9340054?hl=en) for requirements and examples.

## Microsoft Marketplace integration

Product Knowledge Graph Builder is also available through Microsoft Marketplace for customers who want to manage the subscription through their Microsoft account.

To get started:

1. Open the [WordLift Product Knowledge Graph Builder listing](https://marketplace.microsoft.com/en-us/product/web-apps/wordlift1610701057853.seo-merchant-feed?tab=Overview).
2. Review the available plans and select **Get it now** to activate the service.
3. Follow the standard setup process described above.
