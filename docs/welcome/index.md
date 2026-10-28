---
title: "Welcome to WordLift"
description: "Start here: learn what the WordLift knowledge graph platform does, pick the path for your role and follow the onboarding steps from credentials to Agent WordLift."
sidebar_position: 1
last_updated: 2026-10-27
---

# Welcome to WordLift

WordLift is a knowledge graph technology and platform. It has two pillars. The **Knowledge Graph** is the memory: Data Sources feed it your content, products and search data, and it stores them as entities and relationships. **Agent WordLift** is the agentic AI that operates on the graph. SEO and AI visibility are one application of the platform, and these docs show you how to set it up and use it.

## What you can do with WordLift

<Cards cols={2}>
  <Card title="Build and sync a Knowledge Graph">
    Turn your website content and product catalog into a graph of entities and relationships, and keep it current with GraphSync. Start at [Knowledge Graph](/platform/knowledge-graph/).
  </Card>
  <Card title="Publish structured data">
    Deliver schema.org JSON-LD from your graph to your pages with [WordLift Cloud](/welcome/install-wordlift-cloud/), or server side through the Data API. See [Schema publishing](/platform/knowledge-graph/schema-publishing/).
  </Card>
  <Card title="Put Agent WordLift to work">
    Run workflows that evaluate content, build internal links, research keywords and write product descriptions from your graph. Start at [Agent WordLift](/platform/agent-wordlift/).
  </Card>
  <Card title="Connect from your own tools">
    Query and update the graph through the [APIs and SDKs](/apis-and-sdks/), use it from AI assistants and the command line with the [interfaces and tools](/tools/), or wire it into [integrations](/integrations/) such as Zapier and Looker Studio.
  </Card>
</Cards>

## Choose your path

Each path is a short, ordered list of the pages that matter for your role, from first look to advanced use.

<Cards cols={3}>
  <Card title="Business+" href="/welcome/paths/business-plus/" eyebrow="Plan" accent="moss">
    Get a growing team from account setup to a live Knowledge Graph and Agent WordLift workflows.
  </Card>
  <Card title="Enterprise" href="/welcome/paths/enterprise/" eyebrow="Plan" accent="moss">
    Coordinate onboarding, SAML SSO, custom domain, data and Agent setup across your organization.
  </Card>
  <Card title="Developer" href="/welcome/paths/developer/" eyebrow="Role" accent="sky">
    Go straight to access, authentication, the APIs, the MCP Server and the worai CLI.
  </Card>
  <Card title="Content team" href="/welcome/paths/content-team/" eyebrow="Role" accent="sky">
    Evaluate content, match search intent and build internal links with Agent WordLift workflows.
  </Card>
  <Card title="Marketing team" href="/welcome/paths/marketing-team/" eyebrow="Role" accent="sky">
    Produce campaign content and bring WordLift data into your automation and reporting tools.
  </Card>
  <Card title="E-commerce" href="/welcome/paths/e-commerce/" eyebrow="Role" accent="sky">
    Build a Product Knowledge Graph from your Google Merchant Center feed and generate product content.
  </Card>
</Cards>

## Onboarding overview {#onboarding-overview}

Follow these steps in order. Steps 4 and 5 apply to Enterprise only, and step 7 applies to teams with a product catalog.

<Steps>

<Step title="Receive your credentials">

Your WordLift key comes with your subscription and gives you access to the Dashboard. See [Plans and pricing](/plans-and-pricing/).

:::warning[Review needed]
TODO [SME]: confirm how Business+ and Enterprise customers receive their credentials today (automatic email with the key, or handover from the account team).
:::

</Step>

<Step title="Log in to the Dashboard">

Sign in at [my.wordlift.io](https://my.wordlift.io) to reach your Knowledge Graphs and settings. See [Dashboard](/platform/dashboard/).

</Step>

<Step title="Connect Data Sources">

Authorize Google Search Console and Google Analytics, the primary supported sources. See [Data Sources](/platform/data-sources/).

</Step>

<Step title="Configure SSO" tag="enterprise">

Set up SAML single sign-on for your organization. See [SAML SSO](/plans-and-pricing/sso-saml/).

</Step>

<Step title="Configure a custom domain" tag="enterprise">

Decide your dataset URI strategy before production, because changing it later can require an identifier migration. See [Custom domain](/plans-and-pricing/custom-domain/).

</Step>

<Step title="Install WordLift Cloud">

Add the `bootstrap.js` launcher to the head of every page, or load it with Google Tag Manager or the WordLift Cloud WordPress plugin. The script publishes what your graph holds for each URL, so JSON-LD appears once steps 7 or 8 populate the graph. See [Install WordLift Cloud](/welcome/install-wordlift-cloud/).

</Step>

<Step title="Configure a Product Knowledge Graph">

In the Dashboard, select **+ Add Merchant** and connect your Google Merchant Center feed. See [Product Knowledge Graph](/platform/knowledge-graph/product-knowledge-graph/).

</Step>

<Step title="Synchronize your Knowledge Graph">

GraphSync is the recommended way for Business+ and Enterprise customers to build and maintain a content graph. See [Create a Knowledge Graph](/platform/knowledge-graph/create/) and [GraphSync](/platform/knowledge-graph/graph-sync/).

</Step>

<Step title="Explore your Knowledge Graph">

Review the entities and relationships your graph now holds.

:::warning[Review needed]
TODO [SME]: name the page this step links to; no explorer or Dashboard graph-browsing page exists, and the GraphQL reference and KG-REST pages are developer-level.
:::

</Step>

<Step title="Monitor visibility" tag="early-access">

Check that your pages carry the structured data you expect and that AI assistants and crawlers can reach them. See [Monitor](/platform/monitor/).

</Step>

<Step title="Start using Agent WordLift">

Open [agent.wordlift.io](https://agent.wordlift.io) and enter your WordLift key in the Settings panel. See [Get started with Agent WordLift](/platform/agent-wordlift/getting-started/).

</Step>

</Steps>

## Compare plans and get access

WordLift has two plans, Business+ and Enterprise. Enterprise includes everything in Business+, and Agent WordLift is included in both. Compare what each plan includes in the [Feature Matrix](/plans-and-pricing/feature-matrix/), or read [Plans and pricing](/plans-and-pricing/).

Access starts with a conversation with WordLift: Business+ begins with a discovery session, and Enterprise with an enquiry to the sales team. The Resolve API is the exception. Developers can get Resolve API access directly, without a sales conversation. See [Get access](/apis-and-sdks/#get-access).

## What's new

Read [What's New](/whats-new/) for the latest product releases across the platform.

## Get help

- **Support.** Find guides, status and troubleshooting on the [Support](/support/) page.
- **Common questions.** Check the [FAQ](/support/faq/) for quick answers.
- **Contact.** Email support@wordlift.io or use the [contact page](/support/contact/).
