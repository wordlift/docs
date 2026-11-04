---
title: "Agent WordLift Extension"
description: "Install the Agent WordLift Extension for Chrome to check WordLift Cloud setup on any page and use Agent WordLift from your browser."
sidebar_label: "Chrome Extension"
sidebar_position: 1
last_updated: 2026-10-27
---

# Agent WordLift Extension

The Agent WordLift Extension brings Agent WordLift into Chrome. Use it to check whether WordLift Cloud is set up correctly on the page you are viewing, and to work with Agent WordLift without leaving your browser.

:::warning[Review needed]
TODO [SME]: confirm what the extension does beyond the WordLift Cloud status check. The previous version of this page claimed real-time feedback on keywords, readability and semantic relevance, entity analysis and schema workflows, and content gap insights.
:::

## Watch the extension in action

<iframe width="100%" height="500" src="https://www.youtube.com/embed/Lmz6Kgi6HB0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>

## Install

[Install the Agent WordLift Extension from the Chrome Web Store](https://chromewebstore.google.com/detail/agent-wordlift/jegfjceighmfpbklniiakflbhceejddb).

## Icon status line

The icon status line is a quick health check for your WordLift Cloud setup. It checks whether `bootstrap.js` is present and correctly configured on the current page.

| Status | Icon | Meaning | What to do |
|---|---|---|---|
| **Red** | <img src="/img/agent-wordlift-extension/status-red.png" alt="Red status icon" width="64" /> | `bootstrap.js` is missing. | [Add the script to the page](/platform/knowledge-graph/schema-publishing/wordlift-cloud/) and reload. |
| **Orange** | <img src="/img/agent-wordlift-extension/status-orange.png" alt="Orange status icon" width="64" /> | `bootstrap.js` is present but the configuration is likely incorrect and may fail. | Contact [support@wordlift.io](mailto:support@wordlift.io) or your account manager to validate the configuration. |
| **Green** | <img src="/img/agent-wordlift-extension/status-green.png" alt="Green status icon" width="64" /> | The configuration is valid. | No action needed. WordLift Cloud `bootstrap.js` is configured correctly. |

## Pin in Chrome

To pin the extension icon to the Chrome toolbar:

1. Select the Extensions icon (puzzle piece) in Chrome.
2. Find **Agent WordLift** in the list.
3. Select the pin icon next to it.

For more help, see Google's guide [Install and manage extensions](https://support.google.com/chrome/answer/2664769?hl=en).

## Related docs

- [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/)
- [Interfaces and tools](/tools/)
- [Prompt Library](/platform/agent-wordlift/prompt-library/)
- [All Agent WordLift integrations](/platform/agent-wordlift/integrations/)
