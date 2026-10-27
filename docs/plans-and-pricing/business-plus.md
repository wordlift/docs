---
title: "Business+"
description: "Business+ gives growing businesses every WordLift AI tool, including Agent WordLift, plus dedicated strategic support to scale AI Search and SEO."
sidebar_position: 0
last_updated: 2026-10-27
---

# Business+

Business+ is one of WordLift's two plans. It is for growing businesses that are ready to scale AI Search and SEO with WordLift. The other plan, [Enterprise](/plans-and-pricing/enterprise/), includes everything in Business+ and adds a custom scope.

Business+ gives you WordLift's AI tools, including Agent WordLift, and dedicated strategic support. Your team uses them to improve AI search visibility, organic reach, qualified traffic and product discovery with a [Knowledge Graph](/platform/knowledge-graph/).

To see what Business+ includes next to Enterprise, use the [Feature Matrix](/plans-and-pricing/feature-matrix/). To get started, [book a discovery session on the WordLift Business+ page](https://wordlift.io/business-plus-get-started/). For technical help on an existing Business+ account, email [support@wordlift.io](mailto:support@wordlift.io).

## Frequently asked questions

### Is headless or API-only usage supported on Business+?

Yes. Business+ supports headless implementations with no dependency on the WordPress plugin.

A Business+ API key can access the WordLift APIs a headless setup needs, including Analysis, [GraphQL](/apis-and-sdks/api-reference/graphql/graphql-support/), Manager, Internal Linking and limited page-import workflows such as [Sitemap Import](/platform/data-sources/sitemap/). Use is subject to the plan's usage limits, quotas and standard platform safeguards.

The [Enterprise plan](/plans-and-pricing/enterprise/) adds more advanced API capacity, higher throughput, dedicated SLAs, custom integrations and tailored operational support for teams with larger or more complex workloads. Business+ supports API-first and headless implementations and is not limited to WordPress.

### What is the recommended way to bulk import initial URLs?

Use GraphSync to create and maintain a Business+ content Knowledge Graph. GraphSync supports source-specific mappings, multiple connected entities, stable identities and repeatable synchronization, instead of treating the graph as a flat list of imported pages.

See [GraphSync](/platform/knowledge-graph/graph-sync/) for the onboarding process, and [contact WordLift](https://wordlift.io/contact-us/) to plan the first pilot.

The [Sitemap Import API](/platform/data-sources/sitemap/) remains available for small, simple page-oriented imports. It defaults to one `WebPage`-oriented entity per URL and does not replace GraphSync when the graph needs custom multi-entity mappings or recurring synchronization.

### Is a hosted SPARQL endpoint included in Business+?

Business+ provides access to the [GraphQL endpoint](/apis-and-sdks/api-reference/graphql/graphql-support/) for live queries against the [Knowledge Graph](/platform/knowledge-graph/).

### How are URL allowances handled across multiple Knowledge Graphs?

Business+ can include multiple Knowledge Graph instances, each with its own dataset and API key.

Treat the contracted URL allowance as shared across the Business+ account, not multiplied by the number of Knowledge Graphs. For example, plan a 2,500 URL allowance as 2,500 URLs across the account, unless your agreement includes a different allocation model. See [Billing](/plans-and-pricing/billing/) for Smart Credits and other usage allowances.

For most initial implementations, WordLift recommends starting with a single [Knowledge Graph](/platform/knowledge-graph/) and adding more only when there is a clear operational reason, such as separate environments, brands, countries or business units. E-commerce teams can also review the [Product Knowledge Graph Builder](/platform/knowledge-graph/product-knowledge-graph/).

### Are Business+ API rate limits published?

No. Business+ is designed to help teams start a headless AI Search and SEO workflow quickly, learn from real usage and grow from there.

Business+ supports normal API-first operational usage within the URL allowance. The [Enterprise plan](/plans-and-pricing/enterprise/) is for guaranteed throughput, higher concurrency, dedicated SLAs and custom infrastructure.
