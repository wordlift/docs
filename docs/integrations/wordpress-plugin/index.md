---
title: "WordPress plugin"
description: "Support for existing installs of the classic WordLift plugin: install it, annotate content, publish structured data, add widgets and customize output."
sidebar_position: 0
last_updated: 2026-10-27
---

# WordPress plugin

:::info[For existing installs]
This section supports sites that already run the classic WordLift plugin. If you are a new customer, start with [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/).
:::

The classic WordLift plugin analyzes your WordPress posts and pages, helps you build a vocabulary of entities that becomes your Knowledge Graph, publishes schema.org markup as JSON-LD, and adds blocks and widgets that help readers discover related content. It requires WordPress 5.3 or higher and PHP 7.4 or higher.

## Identify your plugin {#which-plugin-do-you-have}

WordLift has two separate WordPress plugins. Check which one your site runs before you follow a guide.

| Plugin | How to recognize it | Who it is for | Where to start |
| --- | --- | --- | --- |
| Classic WordLift plugin | Installed from the [WordPress plugin directory](https://wordpress.org/plugins/wordlift/). Adds a WordLift menu to the WordPress dashboard, a setup wizard and content analysis in the editor. | Existing customers | This section, starting with [Get started with the WordPress plugin](/integrations/wordpress-plugin/getting-started/) |
| WordLift Cloud plugin | Listed as **WordLift Cloud** in **Plugins > Installed Plugins**. Loads the WordLift Cloud `bootstrap.js` script and adds an **Entity Types** panel to the editor. | New customers and sites on WordLift Cloud | [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/), then [Select entity types for a web page](/integrations/wordpress-plugin/entity-types/) |

## Get started

- **[Get started with the WordPress plugin](/integrations/wordpress-plugin/getting-started/):** Install, activate and configure the classic plugin on a site.

## Create and annotate content

- **[User manual](/integrations/wordpress-plugin/user-manual/):** Find every editing guide for the classic plugin in one list.
- **[Editors](/integrations/wordpress-plugin/editors/):** Use WordLift in the Classic Editor and the Block Editor.
- **[Sidebar](/integrations/wordpress-plugin/sidebar/):** Review, select and add the entities WordLift suggests for a post.
- **[Analysis](/integrations/wordpress-plugin/analysis/):** See how WordLift analyzes a post and annotates it with entities.
- **[Edit entity](/integrations/wordpress-plugin/edit-entity/):** Edit entity properties, descriptions and links to other entities.
- **[Import and export the vocabulary](/integrations/wordpress-plugin/import-export-vocabulary/):** Move your entities between sites with the WordPress export and import tools.

## Publish structured data

- **[Publish and check structured data](/integrations/wordpress-plugin/publishing/):** Check the structured data and Linked Data a post or entity publishes.
- **[JSON-LD output](/integrations/wordpress-plugin/jsonld/):** Learn the rules that decide what goes into a post's JSON-LD.
- **[Mappings](/integrations/wordpress-plugin/mappings/):** Map your content and custom fields to schema.org types and properties.

## Engage readers

- **[Widgets and shortcodes](/integrations/wordpress-plugin/widgets/):** Add the Navigator, Faceted Search, Timeline, Geomap and other entity-driven widgets to posts, pages and sidebars.
- **[Semantic analytics](/integrations/wordpress-plugin/semantic-analytics/):** Build an entity-based web analytics dashboard.

## Customize and extend

- **[Customize the WordPress plugin](/integrations/wordpress-plugin/customization/):** Choose the right hook, template or filter to change WordLift output without editing plugin code.
- **[Theme development](/integrations/wordpress-plugin/theme-development/):** Work with the WordLift data model and entity page templates in your theme.
- **[Advanced topics](/integrations/wordpress-plugin/advanced-topics/):** Read about the Knowledge Graph, RDF, dereferencing and other concepts behind the plugin.

The plugin source code and issue tracker are on [GitHub](https://github.com/insideout10/wordlift-plugin).

## Get help

- **[Troubleshooting](/integrations/wordpress-plugin/troubleshooting/):** Fix common problems with the plugin's structured data.
- **[Get help with the WordPress plugin](/integrations/wordpress-plugin/support/):** Choose the right channel and gather the details support needs.
- **[FAQ](/support/faq/):** Find answers about languages, entities, links and JSON-LD.
