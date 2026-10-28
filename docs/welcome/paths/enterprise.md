---
title: "Enterprise path"
description: "Route an Enterprise team through onboarding, SAML SSO, custom domain, data and Agent WordLift setup in order, so each step reaches the right owner."
last_updated: 2026-10-27
---

# Enterprise path

This path is for the people who run Enterprise onboarding: SEO leads, platform and data owners, and the IT and security teams they work with. It lists the pages to read in order and links out to each one. Different owners take different steps, so share each link with the person responsible.

## Discover

Frame the platform for the people evaluating fit and scale.

<Cards cols={2}>
  <Card title="Platform overview" href="/platform/">
    See how Data Sources, the Knowledge Graph and Agent WordLift work together.
  </Card>
  <Card title="Feature Matrix" href="/plans-and-pricing/feature-matrix/">
    Compare what Business+ and Enterprise include. Enterprise includes everything in Business+.
  </Card>
</Cards>

:::warning[Review needed]
TODO [Jason]: confirm the Feature Matrix (or Plans and pricing) replaces the journey map's self-referencing "Enterprise path" item in Discover.
:::

## Onboard

Set up the workspace, then the identity and domain pieces your IT and admin teams own. Decide your dataset URI and custom domain before you populate the graph, because changing them later can require an identifier migration.

<Cards cols={2}>
  <Card title="Onboarding overview" href="/welcome/#onboarding-overview">
    Follow the onboarding steps in order.
  </Card>
  <Card title="Enterprise Onboarding Guide" href="/plans-and-pricing/enterprise/">
    Plan the four phases (alignment, access validation, graph population and operations) and assign owners.
  </Card>
  <Card title="Dashboard" href="/platform/dashboard/">
    Sign in and find your Knowledge Graphs, tools and settings.
  </Card>
  <Card title="SAML SSO" href="/plans-and-pricing/sso-saml/" tag="enterprise">
    Connect WordLift to your identity provider.
  </Card>
  <Card title="Custom domain" href="/plans-and-pricing/custom-domain/" tag="enterprise">
    Publish your graph under a domain you control.
  </Card>
  <Card title="Install WordLift Cloud" href="/platform/knowledge-graph/schema-publishing/wordlift-cloud/">
    After the domain decision, add the launcher script that publishes your graph's structured data.
  </Card>
</Cards>

## Configure

Stand up the data and Knowledge Graph layers at the scale of your organization.

<Cards cols={2}>
  <Card title="Data Sources" href="/platform/data-sources/">
    Connect the sources that feed your Knowledge Graph.
  </Card>
  <Card title="Knowledge Graph" href="/platform/knowledge-graph/">
    Learn how the graph stores your entities and relationships.
  </Card>
  <Card title="Create a Knowledge Graph" href="/platform/knowledge-graph/create/">
    Choose one primary ingestion path and validate it first.
  </Card>
  <Card title="GraphSync" href="/platform/knowledge-graph/graph-sync/">
    Build and maintain your content graph with GraphSync, the recommended path for Enterprise.
  </Card>
</Cards>

## Activate

Run Agent WordLift on the same core SEO and content jobs, across a large estate. Agent WordLift is included in Enterprise.

<Cards cols={2}>
  <Card title="Agent WordLift" href="/platform/agent-wordlift/">
    See what Agent WordLift does and how to reach it.
  </Card>
  <Card title="Workflows" href="/platform/agent-wordlift/workflows/">
    Pick a ready-made workflow for a specific SEO or content task.
  </Card>
  <Card title="Content Generation" href="/platform/agent-wordlift/content-generation/">
    Generate content from the data in your Knowledge Graph.
  </Card>
</Cards>

## Expand

Extend the platform programmatically once it is part of your stack.

<Cards cols={2}>
  <Card title="APIs and SDKs" href="/apis-and-sdks/">
    Connect your graph to your own systems and applications.
  </Card>
</Cards>

## Other paths

- [Business+ path](/welcome/paths/business-plus/)
- [Developer path](/welcome/paths/developer/)
- [Content team path](/welcome/paths/content-team/)
- [Marketing team path](/welcome/paths/marketing-team/)
- [E-commerce path](/welcome/paths/e-commerce/)
- [Welcome to WordLift](/welcome/)
