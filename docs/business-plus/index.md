---
title: Business+
description: An introduction to WordLift Business+ for growing businesses scaling AI Search and SEO.
sidebar_position: 0
---

# Business+

Business+ is for growing businesses that are ready to scale AI Search and SEO with WordLift.

It provides access to WordLift's AI tools and dedicated strategic support to help teams improve AI search visibility, organic reach, qualified traffic, and product discovery with a [Knowledge Graph](/knowledge-graph/).

Learn more on the [WordLift Business+ page](https://wordlift.io/business-plus-get-started/).

## Frequently asked questions

### Is headless or API-only usage supported on Business+?

Yes. Business+ supports headless implementations with no dependency on the WordPress plugin.

A Business+ API key can access the relevant WordLift APIs for a headless setup, including [Sitemap Import](/knowledge-graph/sitemap-import/), Analysis, [GraphQL](/api/graphql/graphql-support/), Manager, and Internal Linking, subject to the plan's usage limits, quotas, and standard platform safeguards.

The [Enterprise plan](/enterprise/onboarding/) provides more advanced API capacity, higher throughput, dedicated SLAs, custom integrations, and tailored operational support for teams with larger or more complex workloads. Business+ still supports API-first and headless implementations; it is not limited to WordPress-only usage.

### What is the recommended way to bulk import initial URLs?

For a headless setup, use the [Sitemap Import API](/knowledge-graph/sitemap-import/) to jumpstart the [Knowledge Graph](/knowledge-graph/).

Where possible, provide a clean `sitemap.xml` URL. The API also supports sending URLs directly in the request body.

The sitemap importer supports a simple sitemap with a list of URLs. Sitemap indexes that reference other sitemap files are not supported by default, so validate that format before using it for an import.

For large initial imports, batch imports rather than sending very large single payloads. Share the expected number of URLs and import cadence with WordLift so the best batching strategy can be confirmed for the account.

### Is a hosted SPARQL endpoint included in Business+?

Business+ provides access to the [GraphQL endpoint](/api/graphql/graphql-support/) for live queries against the [Knowledge Graph](/knowledge-graph/).

### How are URL allowances handled across multiple Knowledge Graphs?

Business+ can include multiple Knowledge Graph instances, each with its own dataset and API key.

The contracted URL allowance should be treated as shared across the Business+ account, not multiplied by the number of Knowledge Graphs. For example, a 2,500 URL allowance should be planned as 2,500 URLs across the account unless a different allocation model is explicitly included in the agreement.

For most initial implementations, WordLift recommends starting with a single [Knowledge Graph](/knowledge-graph/) and adding more only when there is a clear operational reason, such as separate environments, brands, countries, or business units. E-commerce teams can also review the [Product Knowledge Graph Builder](/product-knowledge-graph-builder/introduction/).

### Are Business+ API rate limits published?

Business+ is designed to help teams bootstrap a headless AI Search and SEO workflow quickly, learn from real usage, and grow from there.

Business+ supports normal API-first operational usage within the URL allowance. The [Enterprise plan](/enterprise/onboarding/) is for guaranteed throughput, higher concurrency, dedicated SLAs, and custom infrastructure.
