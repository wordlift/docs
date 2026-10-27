---
title: "Billing"
description: "How WordLift billing works: monthly or yearly cycles, what a Smart Credit buys and when it expires, usage allowances, and closing an account."
last_updated: 2026-10-27
---

# Billing

This page covers billing cycles, Smart Credits, usage allowances, plan changes and account closure for Business+ and Enterprise. Current prices are on the [WordLift pricing page](https://wordlift.io/pricing/), not in the docs.

## Billing cycles

| Plan | Billing cycle | Source |
| --- | --- | --- |
| Business+ | Monthly or yearly | [Pricing page](https://wordlift.io/pricing/) |
| Enterprise | Per contract (custom quote) | [Pricing page](https://wordlift.io/pricing/) |

The pricing page shows the current difference between monthly and yearly billing.

You can also subscribe to the Product Knowledge Graph Builder through Microsoft Marketplace and manage that subscription through your Microsoft account. See [Microsoft Marketplace integration](/platform/knowledge-graph/product-knowledge-graph/#microsoft-marketplace-integration).

:::warning[Review needed]
TODO [Jason]: confirm what the docs can say about invoices, payment methods, VAT, currency options, renewal and notice periods, or whether all of it routes to the account manager.
:::

## Smart Credits

Smart Credits give you access to WordLift's AI features, such as content generation, SEO optimization and internal link suggestions. Every package includes credits.

| One Smart Credit buys | Amount |
| --- | --- |
| Q&A pairs | 25 |
| Short product descriptions | 20 |
| Internal link suggestions | 60 |
| Agent WordLift interactions | 10 |

Source: [WordLift pricing page](https://wordlift.io/pricing/).

| Subscription | When credits expire |
| --- | --- |
| Yearly | At the end of the subscription year |
| Monthly | At the end of each month |

To buy more credits, contact your account manager. You can buy more at any time.

Some tools consume credits on every run. For example, [worai web-pages](/tools/worai-cli/commands/web-pages/#credit-confirmation) asks you to confirm before it runs because each run consumes agent credits.

## Usage allowances

- **URL allowance.** On Business+, the URL allowance is shared across all Knowledge Graphs on the account, not multiplied by the number of graphs. See [how URL allowances work across multiple Knowledge Graphs](/plans-and-pricing/business-plus/#how-are-url-allowances-handled-across-multiple-knowledge-graphs).
- **Agent WordLift interactions.** Agent WordLift tells you in the chat when you reach your interaction limit. Interactions reset at the start of each month. See the [Agent WordLift FAQ](/platform/agent-wordlift/faq/).
- **Resolve API requests.** The Resolve API has its own monthly allowance, counted in requests, not credits. See [Requests and limits](/apis-and-sdks/resolve/#requests-and-limits).

The [Feature Matrix](/plans-and-pricing/feature-matrix/) lists the allowances for each plan.

## Change or cancel your plan

To change your plan, add credits or discuss renewal, contact your account manager. If you do not have one, use the sales routes on [Contact WordLift](/support/contact/).

The [WordLift terms of service](https://wordlift.io/terms-of-service/) set these rules for closing an account:

- **Closing.** You can close your account through the online account interface.
- **Refunds.** WordLift does not issue a refund when you close your account.

:::warning[Review needed]
TODO [Jason]: confirm whether the 48-hour refund window from the 2024 marketing FAQ is still policy; the pricing page does not mention it.
:::

## Your data when an account closes

Export your Knowledge Graph before you close the account. The [Knowledge Graph export answer in the FAQ](/support/faq/#how-can-i-download-my-knowledge-graph-data) gives the endpoint, header and formats, and [Data ownership and portability](/platform/knowledge-graph/#data-ownership-and-portability) explains what you own.

After closure, WordLift deletes the data related to the account, as described in the [terms of service](https://wordlift.io/terms-of-service/).

:::warning[Review needed]
TODO [Jason]: the terms say deletion can take up to 90 days, while the Knowledge Graph overview says the docs define no retention period after the service ends. Confirm which line the docs use.
:::

## Billing questions

For billing questions, contact your account manager or use [Contact WordLift](/support/contact/) to find the right channel.
