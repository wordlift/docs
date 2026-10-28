---
title: "Entity management"
description: "Learn how entities are identified in your Knowledge Graph and which WordLift surface to use to create, edit, link, deduplicate or remove them at your scale."
last_updated: 2026-10-27
---

# Entity management

An [entity](/concepts/#entity) is a thing such as a person, place, product or organization, with a stable identifier, a schema.org type, properties and relationships to other entities. Entity management is how you create, edit, link, deduplicate and remove the entities in your Knowledge Graph.

## Why it matters

Entities are what WordLift publishes. The [Data API](/apis-and-sdks/data-api/) returns the entities linked to each URL as JSON-LD, so a wrong, duplicated or missing entity shows up in the structured data on your pages. Entities are also the context Agent WordLift reasons over when it analyzes content and generates outputs.

Managing entities with the right surface lets you fix the graph without breaking identifiers or the markup that is already published.

## How entities are identified

- **Stable identifier:** Each entity has an `@id`, an IRI under your dataset URI. Other entities, your published JSON-LD and external systems refer to the entity by this identifier, so keep it stable. Choose the dataset URI strategy before production, because changing it later can require an identifier migration.
- **Type:** Each entity has one or more schema.org types. WordLift supports all schema.org types.
- **Same as:** The `sameAs` property links an entity to the same thing described elsewhere, for example in another dataset or on another website. WordLift uses `owl:sameAs` to say that two descriptions share one identity.
- **Customer-controlled domain:** Enterprise customers can publish the graph under their own domain for long-term control of identifiers. See [Custom domain](/plans-and-pricing/custom-domain/).

For the related ideas, see the [entity](/concepts/#entity) and [vocabulary](/concepts/#vocabulary) definitions in Concepts.

## Ways to manage entities

Pick the surface that matches how your graph is built and how many entities you need to change.

| Surface | Best for | Guide |
| --- | --- | --- |
| WordPress plugin (existing installs) | Editing single entities and their entity pages in WordPress, from the Edit Post widget or the entity page. You can edit the name, description, image, entity types, permalink and same-as links. Publish or Update saves the change to WordPress and the graph. | [Edit entity](/integrations/wordpress-plugin/edit-entity/) and [Import and export the vocabulary](/integrations/wordpress-plugin/import-export-vocabulary/) |
| WordLift Cloud sidebar | Annotating a page that has the WordLift Cloud script installed. Press `Ctrl + Alt + W`, point and click the area to annotate and pick entities. WordLift saves and publishes the JSON-LD. | [Annotate a page](/platform/knowledge-graph/schema-publishing/wordlift-cloud/#annotate-a-page) |
| WordLift Cloud WordPress plugin | Setting entity types on a post or page through the Entity Types panel. The plugin outputs a `wl:entity_type` meta tag for each selected type. | [Select entity types](/integrations/wordpress-plugin/entity-types/) |
| GraphSync | Creating and updating entities for many pages from source-specific mappings. GraphSync keeps entity identities stable across synchronization runs. | [GraphSync](/platform/knowledge-graph/graph-sync/) |
| KG-REST | Programmatic create, read, update and delete: `GET /entities?id=...`, `PUT /entities` (JSON-LD), `DELETE /entities?id=...` and `POST /dataset/batch` for batches. | [KG-REST](/apis-and-sdks/kg-rest/) |
| worai CLI | Bulk changes from files: `worai patch` from Turtle or JSON-LD, `worai upload-entities-from-turtle` and `worai delete-entities-from-csv`. | [patch](/tools/worai-cli/commands/patch/), [upload-entities-from-turtle](/tools/worai-cli/commands/upload-entities-from-turtle/), [delete-entities-from-csv](/tools/worai-cli/commands/delete-entities-from-csv/) |

The classic WordPress plugin is documented for existing installs. New customers start with [WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/).

Don't assume that an edit in one surface reaches the others. For example, an entity you change in WordPress or through KG-REST is not documented to keep that change after a GraphSync run.

:::warning[Review needed]
TODO [SME]: confirm whether manual entity edits are preserved, overwritten or flagged when GraphSync runs next.
:::

:::warning[Review needed]
TODO [SME]: confirm whether the Dashboard has an entity editor for headless (non-WordPress) graphs, and add it to the table if so.
:::

## Keep the graph clean

Export the graph before any bulk change. The KG-REST [dataset export](/apis-and-sdks/kg-rest/#export) returns the complete graph as RDF/XML, JSON-LD, Turtle or N3.

Then use the worai CLI to find and fix common problems:

- **Duplicates:** `worai dedupe` finds entities that share the same `schema:url` and deletes the duplicates. Run it with `--dry-run` first to see the delete calls. See [dedupe](/tools/worai-cli/commands/dedupe/).
- **Missing names:** `worai find-missing-names` lists `CollectionPage` entities that have neither `schema:name` nor `schema:headline`. See [find-missing-names](/tools/worai-cli/commands/find-missing-names/).
- **Entities outside your dataset:** `worai list-entities-outside-dataset` lists entities whose IRI does not start with your dataset URI. See [list-entities-outside-dataset](/tools/worai-cli/commands/list-entities-outside-dataset/).
- **Validation:** `worai graph validate` checks RDF files or URLs against validation shapes. See [graph](/tools/worai-cli/commands/graph/).

## Resolve mentions to entities

The [Resolve API](/apis-and-sdks/resolve/) links the mentions in a text to entities in Wikidata, your WordLift Knowledge Graph or an inline vocabulary. When it can't identify a mention with confidence, it returns `unresolved` with a reason instead of guessing.

## Related

- **[Concepts](/concepts/):** Definitions of entities, vocabulary and the Knowledge Graph.
- **[Schema publishing](/platform/knowledge-graph/schema-publishing/):** How your entities become JSON-LD on your pages.
- **[GraphSync](/platform/knowledge-graph/graph-sync/):** Build and maintain a content graph with stable identifiers.
- **[KG-REST](/apis-and-sdks/kg-rest/):** Endpoint reference for entity operations and export.
- **[worai CLI](/tools/worai-cli/install/):** Install and configure the command-line tool.
