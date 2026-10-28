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
| **Platform access** | | | |
| Agent WordLift | <Yes /> | <Yes /> | [Agent WordLift](/platform/agent-wordlift/) |
| MCP Server | <Yes /> | <Yes /> | [MCP Server](/tools/mcp-server/) |
| Google Sheets add-on | <Yes /> | <Yes /> | [Google Sheets add-on](/tools/google-sheets-addon/) |
| **Knowledge Graph** | | | |
| Knowledge Graph | <Yes /> | <Yes /> | [Knowledge Graph](/platform/knowledge-graph/) |
| GraphSync | <Yes /> | <Yes /> | [GraphSync](/platform/knowledge-graph/graph-sync/) |
| Product Knowledge Graph Builder | <Yes /> | <Yes /> | [Product Knowledge Graph](/platform/knowledge-graph/product-knowledge-graph/) |
| Data Sources | <Yes /> | <Yes /> | [Data Sources](/platform/data-sources/) |
| **Publishing and content** | | | |
| Schema markup and structured data publishing | <Yes /> | <Yes /> | [Schema publishing](/platform/knowledge-graph/schema-publishing/) |
| WordLift Cloud | <Yes /> | <Yes /> | [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/) |
| AI content creation | <Yes /> | <Yes /> | [Content generation](/platform/agent-wordlift/content-generation/) |
| **Visibility** | | | |
| Monitor <Tag type="early-access" /> | <Yes /> | <Yes /> | [Monitor](/platform/monitor/) |
| **APIs and tooling** | | | |
| Data API | <Yes /> | <Yes /> | [Data API](/apis-and-sdks/data-api/) |
| GraphQL API | <Yes /> | <Yes /> | [GraphQL API](/apis-and-sdks/graphql-api/) |
| Resolve API | <Yes>Monthly allowance</Yes> | <Yes>Monthly allowance</Yes> | [Resolve API](/apis-and-sdks/resolve/) |
| worai CLI | <Yes /> | <Yes /> | [worai CLI](/tools/worai-cli/install/) |
| **Service** | | | |
| Dedicated project manager, strategy sessions and guided implementation | <Yes /> | <Yes /> | [Business+](/plans-and-pricing/business-plus/) |
| **Security and governance** | | | |
| SAML single sign-on <Tag type="enterprise" /> | <No /> | <Yes /> | [SAML single sign-on](/plans-and-pricing/sso-saml/) |
| Custom domain for Knowledge Graph publishing <Tag type="enterprise" /> | <No /> | <Yes /> | [Custom domain](/plans-and-pricing/custom-domain/) |

The Model Context Protocol (MCP) Server is an access surface, not a plan. It can authenticate with your WordLift API key.

## Usage and allowances

- **URL allowance.** Business+ includes 2,500 URLs and 5 Knowledge Graphs in total. Each Knowledge Graph has its own dataset and key, and the URL allowance is shared across the account, not multiplied by the number of graphs.
- **Smart Credits.** Every plan includes Smart Credits for AI features, and you can buy more. See [Billing](/plans-and-pricing/billing/) for what a credit buys and when credits expire.
- **Resolve API.** Every plan includes a monthly allowance of Resolve API requests. A free developer key includes 1,000 requests a month, outside the two plans.
- **API capacity.** Business+ supports API-first use within its usage limits; its rate limits are not published. Enterprise adds higher throughput and concurrency, dedicated SLAs and custom integrations, scoped per contract.

:::warning[Review needed]
TODO [SME]: confirm the Enterprise URL and Knowledge Graph allowances (custom per contract, or a published figure).
:::

## Enterprise-only features

Two capabilities are available only on Enterprise:

<Cards cols={2}>
  <Card title="SAML single sign-on" href="/plans-and-pricing/sso-saml/" tag="enterprise">
    Your team signs in through your organization's identity provider.
  </Card>
  <Card title="Custom domain" href="/plans-and-pricing/custom-domain/" tag="enterprise">
    WordLift publishes your Knowledge Graph data under a domain you own.
  </Card>
</Cards>

## Related

- [Plans and pricing](/plans-and-pricing/)
- [Business+](/plans-and-pricing/business-plus/)
- [Enterprise onboarding guide](/plans-and-pricing/enterprise/)
