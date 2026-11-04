---
title: "Customize the WordPress plugin"
description: "Pick the right CSS class, template, filter or API to change the classic WordLift plugin's widgets, entity pages and JSON-LD without editing plugin code."
sidebar_label: "Customization"
sidebar_position: 40
last_updated: 2026-10-27
---

# Customize the WordPress plugin

Change how the classic WordLift plugin's widgets, entity pages and JSON-LD look and behave without editing plugin code. This page lists the supported routes and links to the details and sample code. It is for developers working on existing installs of the classic plugin. New customers start with [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/).

## Choose your approach

| Goal | Approach | Where it is documented |
| --- | --- | --- |
| Change how widgets look | CSS classes and Mustache templates | [Widgets and shortcodes](/integrations/wordpress-plugin/widgets/#navigator) |
| Change the posts and entities the Navigator returns | Navigator filters | [Navigator](/integrations/wordpress-plugin/widgets/#navigator-widget) |
| Turn off Context Cards or change how they load | Context Card filters | [Context Cards](/integrations/wordpress-plugin/widgets/#context-cards) |
| Change JSON-LD without code | Mappings, in **Dashboard > WordLift > Mappings** | [Mappings](/integrations/wordpress-plugin/mappings/) |
| Change or turn off JSON-LD in code | JSON-LD filters | [JSON-LD output](/integrations/wordpress-plugin/jsonld/) |
| Design entity pages | The theme's Single Post template | [Theme development](/integrations/wordpress-plugin/theme-development/) |
| Read or write entity data | WordPress functions plus the Properties API and Relations API | [Theme development](/integrations/wordpress-plugin/theme-development/) |

## Style widgets and Context Cards

Each widget and Context Card has CSS classes you can style in your theme. The Navigator is wrapped in `wl-navigator`, Context Cards in `wl-context-card`, and entity links carry `wl-entity-page-link`. To give one Navigator its own layout, write a Mustache template and pass its ID in the `template_id` parameter.

For the full class list, the template sample and every widget parameter, see [Widgets and shortcodes](/integrations/wordpress-plugin/widgets/).

## Filters reference

These are the filters documented for the classic plugin. The plugin may provide others.

| Filter | Type | What it changes | Details |
| --- | --- | --- | --- |
| `wl_navigator_data_post` | Not documented | Each post item in the Navigator. | [Navigator filters](/integrations/wordpress-plugin/widgets/#navigator-widget) |
| `wl_navigator_data_entity` | Not documented | Each entity item in the Navigator. | [Navigator filters](/integrations/wordpress-plugin/widgets/#navigator-widget) |
| `wl_navigator_data_placeholder` | Not documented | The complete Navigator result array, for example to seed it with placeholder data. | [Navigator filters](/integrations/wordpress-plugin/widgets/#navigator-widget) |
| `wl_context_cards_show` | PHP | Whether Context Cards appear. Return `false` to turn them off. | [Context Cards](/integrations/wordpress-plugin/widgets/#context-cards) |
| `wl_context_cards_load_fn_supplier` | JavaScript | The function that loads Context Card data. It must return a fetch promise. | [Theme development](/integrations/wordpress-plugin/theme-development/) |
| `wl_anchor_data_attributes` | PHP | The data attributes on `wl-anchor` links in a post. | [Theme development](/integrations/wordpress-plugin/theme-development/) |
| `wl_jsonld_enabled` | PHP | Whether WordLift outputs JSON-LD. Return `false` to turn it off. | [JSON-LD output](/integrations/wordpress-plugin/jsonld/) |
| `wl_post_jsonld` | PHP | A post's JSON-LD before WordLift sends it to the browser. | [JSON-LD output](/integrations/wordpress-plugin/jsonld/) |
| `wl_http_api_allowed_actions` | Not documented | The actions allowed on the `wl-api` endpoint, so add-ons can register their own (added in version 3.54.18). | Plugin source on [GitHub](https://github.com/insideout10/wordlift-plugin) |

:::warning[Review needed]
TODO [SME]: Confirm the type (PHP or JavaScript) of the Navigator filters and `wl_http_api_allowed_actions`, whether a maintained list of public filters and actions exists, and how the production URL override for headless installs (3.51.3) is configured.
:::

## Customize JSON-LD output

You have four ways to change the JSON-LD WordLift adds to a page:

- **Turn it off.** Add `add_filter( 'wl_jsonld_enabled', '__return_false' );` to your theme.
- **Edit it in code.** Use the `wl_post_jsonld` filter, for example to change `@type` from `Article` to `NewsArticle`.
- **Edit it without code.** Use Mappings in **Dashboard > WordLift > Mappings**.
- **Add to it.** Publish your own JSON-LD with the same `@id`. Google merges your data with the data from WordLift.

For the rules behind the output and the full `wl_post_jsonld` example, see [JSON-LD output](/integrations/wordpress-plugin/jsonld/).

## Work with the data model

The classic plugin stores its data in standard WordPress structures, so you can read it with standard WordPress functions such as `get_posts` and `get_post_meta`.

- **Entities** are custom posts of post type `entity`. Posts and pages turned into entities keep their own post type.
- **Entity properties** are stored as post metadata.
- **Entity types and Topics** are custom taxonomies.
- **Relations** between posts and entities are stored in the custom table `wl_relation_instances`.
- **Entity pages** use your theme's Single Post template.

The plugin also provides a Properties API, to read and write entity properties by schema.org property name, and a Relations API, to access the relations between posts and entities. For details and code, see [Theme development](/integrations/wordpress-plugin/theme-development/).

## Related

- [Theme development](/integrations/wordpress-plugin/theme-development/)
- [Widgets and shortcodes](/integrations/wordpress-plugin/widgets/)
- [JSON-LD output](/integrations/wordpress-plugin/jsonld/)
- [Mappings](/integrations/wordpress-plugin/mappings/)
- [APIs and SDKs](/apis-and-sdks/)
- [WordLift plugin source on GitHub](https://github.com/insideout10/wordlift-plugin)
