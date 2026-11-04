---
title: "Vocabulary"
description: "Vocabulary means two things in WordLift: your collection of entities, and schema vocabularies such as schema.org. Learn how each works and how entities link."
last_updated: 2026-10-27
---

# Vocabulary

In WordLift, your vocabulary is the collection of entities you create and describe: the people, organizations, places, products and topics your content is about. The same word also names schema vocabularies, such as schema.org, which define types and properties instead of things.

This page uses "your vocabulary" for the first sense and "schema vocabulary" for the second.

## Why it matters

- **Consistent tagging.** Each thing exists once in your vocabulary, so every post that refers to it points to the same entity instead of a new variant.
- **Reuse across sites.** You can export a vocabulary and import it on another site, and the entities stay linked to their originals.
- **Unambiguous identity.** Linking your entities to the same things in public datasets tells machines exactly what you mean.

A vocabulary is not the same as a [knowledge graph](/concepts/knowledge-graph/). A knowledge graph also holds the instances it describes and all the facts that connect them.

## How it works: your vocabulary in WordLift

You build your vocabulary by creating [entities](/concepts/entities/) and describing their properties. Create a new entity only when it is relevant to your content and does not already exist; otherwise edit the entity WordLift already recognizes.

In the WordPress plugin, each entity has its own entity page:

- **Where to find it.** You reach every entity from the **Vocabulary** item in the WordPress dashboard menu. This menu exists only in the WordPress plugin.
- **Entity page URLs.** By default, entity pages use the pattern `www.domain.com/vocabulary/name-of-the-entity-page`. You can remove the word "vocabulary" or replace it with another word of your choice.
- **Editing.** You edit an entity's name, description, image and other properties on the [Edit entity](/integrations/wordpress-plugin/edit-entity/) page.

## Linking vocabulary entities {#linking-vocabulary-entities}

When WordLift links two entities that describe the same thing, it uses the `owl:sameAs` property: both entities share the same identity. This process is called reconciliation or disambiguation. Read [Reconciliation and sameAs](/concepts/entities/#reconciliation-and-sameas).

Linking also works across your own sites. When you [import a vocabulary](/integrations/wordpress-plugin/import-export-vocabulary/) into a site with a different URL, WordLift adds `sameAs` links from each imported entity to the original on the source site. When you import into a site with the same URL, for example after a server migration, no `sameAs` links are added.

:::warning
Sharing one vocabulary on several websites carries a high risk of duplicate content. Instead of copying entities between sites, configure the analysis to use several datasets for content analysis and reconciliation. Entities created on one site then become available on the other, with `sameAs` links that point back to the source.
:::

## Other vocabularies you will meet {#other-vocabularies}

- **Schema.org.** The schema vocabulary WordLift uses for entity types and properties. Read [Schema.org](/concepts/schema-org/).
- **Prefixed properties in GraphQL.** Queries use a prefix to show which vocabulary a property comes from. `schema:name` comes from schema.org. Properties such as `seovoc:seoKeywords` and `seovoc:3MonthsImpressions` come from WordLift's `seovoc:` namespace for search data, and GraphSync records `seovoc:importHash` and `seovoc:dateImported` in a private part of the same namespace.
- **An inline vocabulary in the Resolve API.** The [Resolve API](/apis-and-sdks/resolve/#three-worlds-to-resolve-against) can resolve mentions against a vocabulary you send in the request, with up to 5,000 entities, instead of Wikidata or your graph. When it resolves against your graph, it reads SKOS (Simple Knowledge Organization System) labels and definitions as aliases and descriptions.

:::warning[Review needed]
TODO [SME]: confirm whether `seovoc:` has a published namespace URL that these docs can link to.
:::

## Related

- [Entities](/concepts/entities/)
- [Schema.org](/concepts/schema-org/)
- [Linked data](/concepts/linked-data/)
- [Import and export the vocabulary](/integrations/wordpress-plugin/import-export-vocabulary/)
- [Edit entity](/integrations/wordpress-plugin/edit-entity/)
- [Resolve API guide](/apis-and-sdks/resolve/)
