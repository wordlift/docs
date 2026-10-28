---
title: "Data privacy and security in Agent WordLift"
description: "What Agent WordLift stores and for how long, how connected data is encrypted, and why the data you submit is not used to train models."
sidebar_label: "Data privacy and security"
sidebar_position: 4
last_updated: 2026-10-27
---

# Data privacy and security in Agent WordLift

Agent WordLift keeps your files in a temporary workspace that is deleted after inactivity, and encrypts connected data at rest with AES-256. The model provider behind Agent WordLift does not use the data you submit to train or improve its models.

This page describes how Agent WordLift handles your prompts, files and connected data. The [WordLift Terms of Service](https://wordlift.io/terms-of-service/) and the [WordLift Privacy Policy](https://wordlift.io/privacy-policy/) govern that handling.

## What Agent WordLift stores {#our-security-measures}

- **A temporary workspace per user.** Each user has a dedicated, temporary workspace that stores files only during active use. Agent WordLift deletes the workspace after a period of inactivity, which keeps data retention to a minimum.
- **Encrypted connected data.** All data sources connected to WordLift are encrypted at rest with the AES-256 algorithm. This includes any personally identifiable information (PII) that is detected, such as names, addresses or social security numbers.

:::warning[Review needed]
TODO [SME]: State how long the inactivity window is before a workspace is deleted, whether it holds uploads, chat history or both, and whether and in which region conversation histories are stored.
:::

## How the model provider handles your data {#our-service-providers-data-security}

Agent WordLift uses language models from a model provider. That provider commits to these principles for the data Agent WordLift sends to it:

- **No training on your data.** The provider does not use the data you submit (prompts, completions, embeddings or training data) to train or improve its models.
- **Limited retention.** The provider keeps prompts and completions for up to 30 days, only for abuse monitoring, and then deletes them unless legal requirements say otherwise.
- **Encryption at rest.** The provider encrypts your data at rest.
- **Limited human access.** Only authorized provider personnel can access flagged data for abuse monitoring, through secure methods with strict access controls.

WordLift has no access to your prompts and completions unless you and WordLift both agree to it, to improve the service.

:::warning[Review needed]
TODO [SME]: Legal review: confirm the page may state these provider-level commitments (no training use, up to 30 days of abuse-monitoring retention, limited human access) without naming the provider.
:::

## Connected data sources

When you connect a data source such as Google Search Console or Google Analytics, access follows the provider's OAuth2 consent model:

- **The account owner grants consent.** The owner of the provider account grants access on the provider's consent screen.
- **Access is limited to the requested scopes.** The connector can use only the permissions it asked for.
- **Tokens stay hidden.** WordLift stores the authorization state for your account, and Dashboard users never see the raw provider tokens.
- **Disconnecting has two sides.** Disconnecting a source removes the authorization in WordLift. You may still need to revoke access in the provider account.

For setup steps, see [Data sources: OAuth2 connections](/platform/data-sources/oauth2/).

Treat your WordLift Key and any tokens as secrets. Store them in a secret manager your organization approves, and never expose them in client-side code.

## Using Agent WordLift through other assistants

You can reach Agent WordLift from AI assistants such as Claude, ChatGPT or Microsoft 365 Copilot through the [MCP Server](/tools/mcp-server/). This page describes how Agent WordLift handles data. It does not describe how the assistant you connect handles the data you send to it, so review that assistant's own terms.

:::warning[Review needed]
TODO [SME]: Describe what data flows between the assistant, the MCP Server and Agent WordLift, and which terms apply when Agent WordLift is used through the MCP Server in Claude, ChatGPT or Microsoft 365 Copilot.
:::

## Policies and terms {#transparency-and-access-to-information}

- **[WordLift Terms of Service](https://wordlift.io/terms-of-service/)** set out WordLift's commitments on data privacy and security in detail.
- **[WordLift Privacy Policy](https://wordlift.io/privacy-policy/)** explains how WordLift collects, uses and protects data.

## Related

- [Agent WordLift FAQ](/platform/agent-wordlift/faq/): short answers on data, usage and output.
- [Security operating rules](/plans-and-pricing/enterprise/#security-operating-rules): how Enterprise teams store and rotate keys and credentials.
- [Data ownership and portability](/platform/knowledge-graph/#data-ownership-and-portability): who owns your Knowledge Graph data and how to export it.
