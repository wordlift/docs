---
title: "Troubleshooting"
description: "Find your WordLift symptom by area, from key and access errors to markup, data sources and API limits, and follow the link to the page with the fix."
last_updated: 2026-10-27
---

# Troubleshooting

Check [status.wordlift.io](https://status.wordlift.io) first. If it shows an incident, the problem is with a WordLift service, not your setup. If it shows no incident, find your symptom below. Each row gives the first thing to check and links to the page that has the full fix.

## Keys and access

| Symptom | What to check | Full fix |
| --- | --- | --- |
| An API call returns 401 Unauthenticated | The request carries no key, or an empty one. Send your WordLift key in the `Authorization` header. | [APIs and SDKs: authentication](/apis-and-sdks/#authentication) |
| An API call returns 403 Access Denied | The key is not valid, or the header value is missing the `Key` prefix (`Authorization: Key <your key>`). | [APIs and SDKs: authentication](/apis-and-sdks/#authentication) |
| You cannot reach the Dashboard | Your account has no Dashboard access yet. Contact your WordLift account team or [support@wordlift.io](mailto:support@wordlift.io). | [Enterprise onboarding guide](/plans-and-pricing/enterprise/#access-and-credential-ownership) |

## Structured data and markup

| Symptom | What to check | Full fix |
| --- | --- | --- |
| The WordLift Cloud script or its API requests are blocked | Your Content Security Policy and any ad blockers. | [Install WordLift Cloud](/welcome/install-wordlift-cloud/#validate-the-markup) |
| Google misses the markup, or the markup loads late | `bootstrap.js` must be loaded directly in the page `<head>`. Google Tag Manager is the only supported alternative loader. | [Install WordLift Cloud](/welcome/install-wordlift-cloud/#validate-the-markup) |
| The WordLift Cloud widget does not open | You are logged in, and the launcher is present in `<head>`. | [Install WordLift Cloud](/welcome/install-wordlift-cloud/#validate-the-markup) |
| Markup appears in the wrong language | The `lang` attribute on the `<html>` element. The launcher reads the language from it. | [Install WordLift Cloud](/welcome/install-wordlift-cloud/#validate-the-markup) |
| The WordPress plugin outputs an Author whose `@id` is null | The post still points to an author who was removed. Select a valid author on the Edit Post screen and update the post. | [WordPress plugin troubleshooting](/integrations/wordpress-plugin/troubleshooting/) |
| Pages linked by the WordPress plugin return a 404 error | Open **Settings > Permalinks** in WordPress and select **Save Changes**. | [FAQ: 404 errors](/support/faq/#why-do-i-get-404-error-on-pages-linked-by-wordlift) |

## Knowledge Graph and data sources

| Symptom | What to check | Full fix |
| --- | --- | --- |
| The analysis returns a Bad Request error | The dataset may be corrupted, for example a post URI that lacks the domain name. [Contact support](/support/contact/) to have the dataset rebuilt. | [Contact WordLift](/support/contact/) |
| A data source is not available in the Dashboard | The selected account supports the connector, and you have permission to manage the account. | [Data Sources: OAuth2](/platform/data-sources/oauth2/) |
| Authorization succeeds but no sites or properties appear | The provider account used during consent has access to the expected resource. | [Data Sources: OAuth2](/platform/data-sources/oauth2/) |
| The API reports that a source is not authorized | Start a new authorization request and complete the provider consent flow again. | [Data Sources: OAuth2](/platform/data-sources/oauth2/) |
| A field value is saved but the Dashboard still asks for configuration | Read the connector fields through the API and confirm the `field_name` and value for the same `account_id` and `connector_id`. | [Data Sources: OAuth2](/platform/data-sources/oauth2/) |
| A provider returns a permission error | The permissions granted to the provider and the resource-level permissions in the provider account. | [Data Sources: OAuth2](/platform/data-sources/oauth2/) |
| Web page import returns 403 Access Denied | If the automatic retry in `default` mode still fails, set `mode: premium_scraper` with `premium_proxy: true`. | [Web page import](/platform/data-sources/web-page-import/) |
| Web page import returns incomplete content | Pages that render on the client need `render_js` set to `true`. | [Web page import](/platform/data-sources/web-page-import/) |

:::warning[Review needed]
TODO [SME]: confirm that a corrupted dataset is still the usual cause of a Bad Request error during analysis, and that a dataset rebuild is still the fix.
:::

## Custom domain

DNS, CNAME, HTTPS and reverse proxy symptoms for Enterprise custom domains have their own table. See [custom domain troubleshooting](/plans-and-pricing/custom-domain/#troubleshooting).

## APIs and integrations

| Symptom | What to check | Full fix |
| --- | --- | --- |
| Power Automate returns 401 Unauthenticated | The connection includes your WordLift key. | [Power Automate connector](/integrations/power-automate/#common-issues-and-solutions) |
| Power Automate returns 403 Access Denied | The key is valid and includes the `Key` prefix. | [Power Automate connector](/integrations/power-automate/#common-issues-and-solutions) |
| Power Automate calls time out | Add the `rows` and `page` parameters to limit the result size. | [Power Automate connector](/integrations/power-automate/#common-issues-and-solutions) |
| The Resolve API returns an error | Compare the `code` in the Problem Details response with the error catalog. | [Resolve API errors](/apis-and-sdks/resolve/errors/) |
| The Resolve API returns 429 Too Many Requests | The monthly allowance is used up. The `X-RateLimit-*` headers show the limit and when it resets. | [Resolve API requests and limits](/apis-and-sdks/resolve/#requests-and-limits) |

## Agent WordLift

| Symptom | What to check | Full fix |
| --- | --- | --- |
| Agent WordLift says you reached your interaction limit | Interactions reset at the start of each month. To add credits, contact your account manager. | [Billing: usage allowances](/plans-and-pricing/billing/#usage-allowances) |
| The Instagram indexing report fails | The workflow's own troubleshooting section. | [Instagram indexing report](/platform/agent-wordlift/workflows/instagram-indexing-report/#troubleshooting) |
| A local SEO tool returns an error | The workflow's own error troubleshooting section. | [Local SEO tools guide](/platform/agent-wordlift/workflows/local-seo-tools-guide/#common-error-troubleshooting) |

## Still stuck? {#still-stuck}

Email [support@wordlift.io](mailto:support@wordlift.io), or see [Contact WordLift](/support/contact/) for other request types. Include:

- **Account.** Your account or Knowledge Graph (dataset) name. Do not send your API key.
- **Where.** The page URL or API endpoint involved.
- **Steps.** What you did, in order, and what you expected.
- **Error.** The exact error text or response, including any `code` value.
- **When.** The date and time it happened, with your time zone.
