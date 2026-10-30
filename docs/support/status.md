---
title: "Service status"
description: "Check status.wordlift.io to see whether WordLift services are operational before you debug your own setup, and learn what to do next."
last_updated: 2026-10-27
---

# Service status

WordLift publishes the current state of its services at [status.wordlift.io](https://status.wordlift.io). Check it first when WordLift calls fail or the Dashboard misbehaves, so you can tell a WordLift incident from a problem on your side.

## What the status page shows

| Section | What it tells you |
| --- | --- |
| Current state | Whether the system is operational right now. |
| Past incidents | A day-by-day history of recent incidents. |

:::warning[Review needed]
TODO [SME]: confirm that status.wordlift.io is the official, maintained status page, which services it covers (APIs, Dashboard, Agent WordLift, WordLift Cloud) and whether you can subscribe to updates.
:::

## If status is operational

When the status page shows no incident but the problem continues, the cause is more likely in your setup or request:

1. Find your symptom in [Troubleshooting](/support/troubleshooting/).
2. If an API returned an error, read the response. Resolve API errors carry a stable `code`; look it up in [Resolve API errors](/apis-and-sdks/resolve/errors/).
3. If the Resolve API returned `429 Too Many Requests`, your monthly allowance is used up. The `X-RateLimit-*` headers show when it resets. See [Resolve API requests and limits](/apis-and-sdks/resolve/#requests-and-limits).

## Report an incident

If the problem persists, email [support@wordlift.io](mailto:support@wordlift.io) or see [Contact WordLift](/support/contact/). Include the affected page URL or API endpoint, the exact error text, and the date and time with your time zone. See [what to include in a support request](/support/contact/#technical-support).

SLAs, where they apply, are set in your individual contract.
