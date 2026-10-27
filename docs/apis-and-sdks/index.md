---
title: "APIs and SDKs"
description: "Pick the WordLift API for your job, get access, and make an authenticated call, with the shared rules for keys, errors, pagination and limits."
last_updated: 2026-10-27
---

# APIs and SDKs

Program the Knowledge Graph and Agent WordLift from your own stack. Each Knowledge Graph has its own dataset and its own key, so every call you make with a key reads or writes one graph.

## What you can build {#what-you-can-build}

Pick the surface that matches the job, then follow its guide.

- **Publish JSON-LD in your pages with the [Data API](/apis-and-sdks/data-api/).** Fetch the JSON-LD for any page URL and inject it server-side, at the edge or from a prefilled cache, so it is in the initial HTML response.
- **Query the graph with the [GraphQL API](/apis-and-sdks/graphql-api/).** Select the fields you need from entities, products, articles and FAQ pages, page by page.
- **Write and export entities with [KG-REST](/apis-and-sdks/kg-rest/).** Create, read, update and delete entities, send batches, and export the whole dataset in an RDF format.
- **Resolve mentions in text with the [Resolve API](/apis-and-sdks/resolve/).** Map each mention to an identifier in Wikidata, your Knowledge Graph or an inline vocabulary, or get `unresolved` with a reason.
- **Import search analytics with the [Analytics API](/apis-and-sdks/analytics-api/).** Connect Google Search Console to your Knowledge Graph and import analytics data for the URLs in the graph.
- **Script imports and validation with the [Python SDK](/apis-and-sdks/python-sdk/).** Import pages from a sitemap, validate JSON-LD and call WordLift APIs from your own scripts or CI.
- **Feed LLM applications with the [LLM connectors](/apis-and-sdks/llm-connectors/wordlift-reader/).** Load Knowledge Graph records into LlamaIndex with WordLift Reader, or use the [WordLift Vector Store](/apis-and-sdks/llm-connectors/wordlift-vector-store/).
- **Read page checks with the [Monitoring API](/apis-and-sdks/monitoring/).** Get the latest monitor results for a URL, including status, title, canonical, performance and structured data checks.
- **Transform product data with [Product Knowledge Graph webhooks](/platform/knowledge-graph/product-knowledge-graph/webhooks/).** Receive the RDF generated during product synchronization and return a transformed version before it is written to the graph.
- **Look up every endpoint in the [API reference](/apis-and-sdks/api-reference/).** The reference is generated from the WordLift OpenAPI specifications.

## Get access {#get-access}

How you get access depends on the API.

- **Business+ and Enterprise APIs are sales-led.** Book a discovery session or [contact WordLift sales](https://wordlift.io/contact-us/). Compare what each plan includes in the [Feature Matrix](/plans-and-pricing/feature-matrix/) and on [Plans and pricing](/plans-and-pricing/).
- **The Resolve API is self-serve.** Request a free developer key at [wordlift.io/resolve](https://wordlift.io/resolve/#access) without a sales conversation. The key includes 1,000 Resolve requests a month and is delivered immediately. This allowance applies to the Resolve API only.

Business+ supports headless and API-only implementations with no dependency on the WordPress plugin. Enterprise adds guaranteed throughput, higher concurrency and dedicated SLAs.

## Authentication and API keys {#authentication}

Most WordLift APIs authenticate with your WordLift key in the `Authorization` header, prefixed with `Key`:

```http
Authorization: Key <your-wordlift-key>
```

A missing `Key` prefix is a common cause of `403` responses.

- **Find your key in the Dashboard.** Sign in at [my.wordlift.io](https://my.wordlift.io); your keys are listed on the home page. See [Dashboard](/platform/dashboard/).
- **Use one key per Knowledge Graph.** Each graph has its own dataset and key. Business+ can include several graphs, each with its own key.
- **Check which account a key belongs to.** `GET https://api.wordlift.io/accounts/me` returns the account for the key, including its `accountId` and dataset URI.

```bash
curl -s https://api.wordlift.io/accounts/me \
  -H "Authorization: Key $WL_KEY"
```

:::warning[Review needed]
TODO [SME]: confirm that "WordLift key", "Graph Key" and "API key" name the same credential (the Python SDK reads `WORDLIFT_KEY`, the worai CLI reads `WORDLIFT_API_KEY`) and which name the docs use.
:::

### Other authentication methods {#other-authentication-methods}

- **OAuth2.** The Manager and Content Generation APIs also accept OAuth2 with the authorization code flow. The authorization URL is `https://s.wordlift.io/oauth/authorize/` and the token URL is `https://s.wordlift.io/oauth/token/`. The Manager API also lists Basic authentication.
- **Bearer tokens.** Some product APIs, such as Content Generation and Monitoring, take `Authorization: Bearer <token>`. Each API's guide states which methods it accepts.

:::warning[Review needed]
TODO [SME]: confirm whether the Data API needs a key; its examples send none and the out-of-band cache guide says not to forward authorization headers.
:::

### Handle keys as secrets {#handle-keys-as-secrets}

Apply these rules before any production integration:

- **Store keys in a secret manager.** Use a secret manager your organization approves.
- **Keep keys out of client-side code.** Never ship a key to the browser.
- **Keep keys out of shared places.** Do not put keys in documentation, tickets, chat threads, shared spreadsheets or repositories.
- **Separate environments.** Use different keys for staging and production when the environments are separate.
- **Name an owner.** Decide who can rotate, revoke and audit each key.

The full credential checklist is part of [Enterprise onboarding](/plans-and-pricing/enterprise/).

## Base URL and versions {#base-url-and-versions}

Most APIs use the base URL `https://api.wordlift.io`. A few use a path prefix or another host:

| API | Base URL |
| --- | --- |
| Most APIs, including Data, GraphQL, KG-REST, Manager, Monitor and Resolve | `https://api.wordlift.io` |
| Agent API | `https://api.wordlift.io/agent` |
| Analysis | `https://api.wordlift.io/analysis` |
| Inspector | `https://api.wordlift.io/inspector` |
| Long Tail | `https://api.wordlift.io/longtail` |
| Sitemap Generator | `https://wl-sitemap-generator.azurewebsites.net` |

Each OpenAPI specification carries its own version number, shown in the [API reference](/apis-and-sdks/api-reference/). The Manager API also versions responses with vendor media types, such as `application/vnd.wordlift.account-info.v2+json`.

:::warning[Review needed]
TODO [SME]: state the API versioning and deprecation policy, if there is one.
:::

## Errors {#errors}

Check the HTTP status code first. The response body format depends on the API.

| API | Error format |
| --- | --- |
| Resolve API | RFC 9457 Problem Details (`application/problem+json`) with a stable `code` and a `type` URL under `https://docs.wordlift.io/problems/`. See [Resolve API errors](/apis-and-sdks/resolve/errors/). |
| Monitor, Crawler, Web Page Imports and other FastAPI-style APIs | `422` with an `HTTPValidationError` body when the request does not validate. |
| GraphQL API | `200`, `401`, `403` or `404`. A `401` means the key is missing; a `403` means the key is invalid or lacks the `Key` prefix. |

Only the Resolve API is documented as returning Problem Details. Do not assume the same body from other APIs.

:::warning[Review needed]
TODO [SME]: confirm whether APIs on api.wordlift.io other than Resolve share a common error body.
:::

## Pagination {#pagination}

APIs use one of two pagination styles.

| Style | Where | Parameters | Response |
| --- | --- | --- | --- |
| Cursor | Manager list endpoints | `cursor`, `limit` (default 10) | `first`, `last`, `next`, `prev`, `self` and `items` |
| Cursor | Monitor API | `cursor`, `limit` (up to 10,000) | `next_cursor` |
| Page | GraphQL API | `page` (starts at 0), `rows` | The requested page of results |

To read every page of a cursor-paginated list, pass the `next` value (or `next_cursor`) as `cursor` until it is empty. On large graphs, paginate GraphQL queries with `page` and `rows` to avoid timeouts.

## Usage and rate limits {#rate-limits}

WordLift does not publish a platform-wide rate limit. Business+ supports normal API-first use within your plan's URL allowance. Choose Enterprise when you need guaranteed throughput, higher concurrency and dedicated SLAs.

Some APIs and connectors document their own limits:

- **Resolve API.** Every plan includes a monthly allowance. A call counts as one request plus one per 1,000 characters of text. Each response reports the cost in `X-Wordlift-Cost` and the allowance in `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset`. When the allowance is used up, the API answers `429 Too Many Requests` until the monthly reset. See [Resolve API](/apis-and-sdks/resolve/).
- **Power Automate connector.** The connector allows 100 API calls per connection every 60 seconds. See [Power Automate](/integrations/power-automate/).

:::warning[Review needed]
TODO [SME]: confirm whether APIs other than Resolve apply a default rate limit and how they signal it (status code and headers).
:::

## Other ways to connect {#other-ways-to-connect}

- **[MCP Server](/tools/mcp-server/).** Connect AI assistants to WordLift through the Model Context Protocol (MCP).
- **[worai CLI](/tools/worai-cli/install/).** Run Knowledge Graph and SEO tasks from the command line.
- **[Zapier](/integrations/zapier/) and [Power Automate](/integrations/power-automate/).** Use Knowledge Graph data in no-code automations.

If WordLift crawlers analyze your site, allow their IP addresses and user agent in your firewall. See [IP and User-Agent whitelist](/apis-and-sdks/ip-user-agent-whitelist/).

## Next steps {#next-steps}

- **Start with the [Developer path](/welcome/paths/developer/).** It orders the pages a developer reads first.
- **Make your first call.** Send a query with the [GraphQL API](/apis-and-sdks/graphql-api/) or fetch a page's JSON-LD with the [Data API](/apis-and-sdks/data-api/).
