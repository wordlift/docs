---
title: "Get help with the WordPress plugin"
description: "Fix common classic WordLift plugin problems yourself, then contact support@wordlift.io or report a bug or security issue with the details needed to act."
sidebar_label: "Support"
sidebar_position: 50
last_updated: 2026-10-27
---

# Get help with the WordPress plugin

When something in the classic WordLift plugin isn't working, check the common fixes first, then contact the right channel with the details it needs. This page supports existing installs of the classic plugin. New customers start with [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/).

## Check these first

- **[Troubleshooting](/integrations/wordpress-plugin/troubleshooting/):** Fixes for known problems with the plugin's structured data.
- **[FAQ](/support/faq/):** Answers about languages, entities, links to entities and JSON-LD.
- **A page linked by WordLift returns a 404 error:** In the WordPress dashboard, go to **Settings > Permalinks** and select **Save Changes**. WordPress regenerates the permalinks and the page loads.
- **The author's `@id` is null in the structured data:** Set a valid author on the post. See [Author's @id is null](/integrations/wordpress-plugin/troubleshooting/#authors-id-is-null).

## Contact WordLift support

If the fixes above don't solve the problem, email [support@wordlift.io](mailto:support@wordlift.io). For all contact options, see [Contact support](/support/contact/).

Business+ includes a dedicated project manager, and Enterprise includes dedicated onboarding and support.

:::warning[Review needed]
TODO [Jason]: Should Business+ and Enterprise customers contact their project manager first, and which public channels should this page advertise besides support@wordlift.io (WordPress.org forum, GitHub issues, Stack Overflow)?
:::

## What to include in your request

Include these details so support can reproduce the problem:

1. The URL of the affected site and page.
2. The plugin version, the WordPress version and the PHP version.
3. The steps that reproduce the problem, what you expected and what happened instead.
4. Screenshots of the problem, including any error messages.
5. Whether **Send Diagnostic Data** is turned on in the plugin [Settings](/integrations/wordpress-plugin/getting-started/#configuration). This setting shares diagnostic data with WordLift to speed up support.

## Report a bug

- **GitHub:** Open an issue in the [WordLift plugin issue tracker](https://github.com/insideout10/wordlift-plugin/issues).
- **WordPress.org:** Post in the [WordLift plugin support forum](https://wordpress.org/support/plugin/wordlift/).

## Report a security issue

Report security vulnerabilities through the Patchstack Vulnerability Disclosure Program, which is linked from the [WordLift plugin page on WordPress.org](https://wordpress.org/plugins/wordlift/).

## Related

- [Support](/support/)
- [Contact support](/support/contact/)
- [Troubleshooting](/support/troubleshooting/)
