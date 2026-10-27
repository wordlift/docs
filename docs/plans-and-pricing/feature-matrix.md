---
title: "Feature Matrix"
description: "Check which WordLift capabilities are in Business+ and Enterprise. Every capability is in both plans except SAML single sign-on and custom domains."
last_updated: 2026-10-27
---

# Feature Matrix

WordLift has two plans, Business+ and Enterprise, and Enterprise includes everything in Business+. Agent WordLift is included in both plans; there is no separate Agent plan. Every capability below is in both plans except SAML single sign-on and custom domains, which are Enterprise only. Current prices are on the [WordLift pricing page](https://wordlift.io/pricing/).

## Capabilities by plan

| Capability | Business+ | Enterprise | Docs |
| --- | --- | --- | --- |
| Agent WordLift | Included | Included | [Agent WordLift](/platform/agent-wordlift/) |
| Knowledge Graph | Included | Included | [Knowledge Graph](/platform/knowledge-graph/) |
| GraphSync | Included | Included | [GraphSync](/platform/knowledge-graph/graph-sync/) |
| Product Knowledge Graph Builder | Included | Included | [Product Knowledge Graph](/platform/knowledge-graph/product-knowledge-graph/) |
| Schema markup and structured data publishing | Included | Included | [Schema publishing](/platform/knowledge-graph/schema-publishing/) |
| WordLift Cloud | Included | Included | [Install WordLift Cloud](/welcome/install-wordlift-cloud/) |
| Data Sources | Included | Included | [Data Sources](/platform/data-sources/) |
| AI content creation | Included | Included | [Content generation](/platform/agent-wordlift/content-generation/) |
| Monitor (Early Access) | Included | Included | [Monitor](/platform/monitor/) |
| Data API | Included | Included | [Data API](/apis-and-sdks/data-api/) |
| GraphQL API | Included | Included | [GraphQL API](/apis-and-sdks/graphql-api/) |
| Resolve API | Monthly allowance | Monthly allowance | [Resolve API](/apis-and-sdks/resolve/) |
| MCP Server | Included | Included | [MCP Server](/tools/mcp-server/) |
| worai CLI | Included | Included | [worai CLI](/tools/worai-cli/install/) |
| Google Sheets add-on | Included | Included | [Google Sheets add-on](/tools/google-sheets-addon/) |
| Dedicated project manager, strategy sessions and guided implementation | Included | Included | [Business+](/plans-and-pricing/business-plus/) |
| SAML single sign-on | Not included | Included | [SAML single sign-on](/plans-and-pricing/sso-saml/) |
| Custom domain for Knowledge Graph publishing | Not included | Included | [Custom domain](/plans-and-pricing/custom-domain/) |

The Model Context Protocol (MCP) Server is an access surface, not a plan. It can authenticate with your WordLift API key.

## Usage and allowances

- **URL allowance.** Business+ includes 2,500 URLs and 5 Knowledge Graphs in total. Each Knowledge Graph has its own dataset and key, and the URL allowance is shared across the account, not multiplied by the number of graphs.
- **Smart Credits.** Every plan includes Smart Credits for AI features, and you can buy more. See [Billing](/plans-and-pricing/billing/) for what a credit buys and when credits expire.
- **Resolve API.** Every plan includes a monthly allowance of Resolve API requests. A free developer key includes 1,000 requests a month, outside the two plans.
- **API capacity.** Business+ supports API-first use within its usage limits; its rate limits are not published. Enterprise adds higher throughput and concurrency, dedicated SLAs and custom integrations, scoped per contract.

:::warning[Review needed]
TODO [Jason]: confirm the Enterprise URL and Knowledge Graph allowances (custom per contract, or a published figure).
:::

## Enterprise-only features

Two capabilities are available only on Enterprise:

- **[SAML single sign-on](/plans-and-pricing/sso-saml/).** Your team signs in through your organization's identity provider.
- **[Custom domain](/plans-and-pricing/custom-domain/).** WordLift publishes your Knowledge Graph data under a domain you own.

## Related

- [Plans and pricing](/plans-and-pricing/)
- [Business+](/plans-and-pricing/business-plus/)
- [Enterprise onboarding guide](/plans-and-pricing/enterprise/)
