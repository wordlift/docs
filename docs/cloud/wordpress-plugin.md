---
sidebar_position: 20
---

# WordPress Plugin

Use the WordLift Cloud plugin to:

- load the WordLift Cloud `bootstrap.js` script on the frontend (enabled by default),
- assign semantic Entity Types directly in WordPress, and
- expose selected entity types in page metadata.

## What this plugin adds

- A dedicated **Entity Types** panel in the post and page editors.
- A managed `wl_entity_type` taxonomy based on a distilled Schema.org dataset.
- Front-end metadata output for selected entity types.
- Plugin settings with:
  - **Enable frontend cloud features** (controls `bootstrap.js` frontend loading)
  - **Enable telemetry** (optional admin-only usage telemetry)

## Open plugin settings

1. Go to **Plugins > Installed Plugins**.
2. Find **WordLift Cloud** and click **Settings**.

![WordLift Cloud plugin row with Settings link](/img/cloud-plugin/step-1-plugins-page.png)

3. Review settings in **Settings > WordLift Cloud**.

![WordLift Cloud settings page](/img/cloud-plugin/step-2-settings-page.png)

## Settings behavior

- **Enable frontend cloud features**:
  - enabled by default.
  - when disabled, the plugin does not inject `https://cloud.wordlift.io/app/bootstrap.js` and WordLift Cloud frontend structured data output is disabled.
- **Enable telemetry**:
  - optional and admin-only.
  - tracks authenticated backend feature usage; no public frontend telemetry snippet is injected.

## Next steps

- To assign Entity Types to a web page, follow [Select Entity Types for a Web Page](./wordpress-plugin-entity-types.md).
- To load WordLift Cloud using GTM, see [WordLift Cloud via GTM](./google-tag-manager.md).
