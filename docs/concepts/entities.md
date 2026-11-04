---
title: "Entities"
description: "An entity is a real-world thing described with a stable identifier, a type and properties. Learn how WordLift identifies, reconciles and links entities."
last_updated: 2026-10-27
---

# Entities

An entity is a thing that exists in the real world, such as a person, organization, place, product, event or work of art. In a [knowledge graph](/concepts/knowledge-graph/), an entity is a node with a stable identifier, one or more types and a set of properties.

## Why entities matter

A keyword is a string of characters. An entity is a meaning. The word "Apple" in an article can refer to a band, a technology company or a fruit, and the text alone does not say which. When you describe the entity with an identifier, a type and links to public datasets, search engines and AI systems can tell which "Apple" you mean and connect your content to what they already know about it.

Entities also let you describe the same thing once and reuse it. Every post about a person, product or topic can point to the same entity instead of repeating its details.

## How it works: identity, types and properties

Every entity has three parts:

- **Identity.** A stable identifier (an IRI, a web identifier like a URI) stored in `@id`. WordLift creates identifiers under your graph's dataset URI, for example `https://data.example.org/entity/example-topic`. The identifier stays the same while the facts around it change.
- **Types.** One or more schema.org types, such as `Person`, `Organization` or `Product`, that say what kind of thing the entity is. Read [Schema.org](/concepts/schema-org/).
- **Properties.** Facts about the entity, such as `name`, `description`, `url` and `image`, and relationships to other entities.

This excerpt from a [Data API](/apis-and-sdks/data-api/) response shows one entity with all three parts and a link to Wikidata:

```json
{
  "@type": "Thing",
  "@id": "https://data.example.org/entity/example-topic",
  "name": "Example topic",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q1492"
  ]
}
```

When you add documents to the graph through the [WordLift Vector Store](/apis-and-sdks/llm-connectors/wordlift-vector-store/), you build the identifier yourself: the dataset URI plus a normalized name. With the dataset URI `https://data.wordlift.io/wl0000000/` and a file named `sample-file.txt`, the identifier is `https://data.wordlift.io/wl0000000/sample-file-txt`.

## Reconciliation and sameAs {#reconciliation-and-sameas}

Reconciliation, also called disambiguation, links an entity in your data to the same entity in another dataset. It gives computers an unambiguous identification of the thing you mean. WordLift records the match with a `sameAs` link, which states that two identifiers refer to the same thing.

The [Resolve API](/apis-and-sdks/resolve/) shows how reconciliation works. It takes a text and, for each mention, returns either an entity or `unresolved`. In the sentence "Tim Cook said Apple will open a store in Rome.", it resolves:

| Mention | Entity | Type |
| --- | --- | --- |
| Tim Cook | Tim Cook (`Q265852`) | Person |
| Apple | Apple Inc. (`Q312`) | Organization |
| Rome | Rome (`Q220`) | City |

A resolved mention carries the entity's identifier, label, types and `same_as` links to Wikidata and DBpedia. When you resolve against your own graph, the answer carries your identifiers, and `same_as` bridges them to the Wikidata and DBpedia identifiers.

A resolver is allowed to abstain. When the evidence is weak, Resolve returns `unresolved` with a reason, such as `no_candidates`, `no_suitable_candidate`, `type_conflict` or `low_relevance`. It never returns the least-bad candidate as a match. Reconciliation is not always automatic or always right, so review the matches that matter to you.

:::warning[Review needed]
TODO [SME]: confirm whether reconciliation in the Dashboard, GraphSync and the Product Knowledge Graph uses the Resolve engine, so this page can describe one mechanism.
:::

## Entities on a page {#entities-on-a-page}

The entities used to annotate a post or page are its related entities. JSON-LD distinguishes two kinds of relationship between a page and its entities:

- **`about`** points to the entities the page is mainly about.
- **`mentions`** points to entities the page refers to without being about them.

In the [WordPress plugin](/integrations/wordpress-plugin/jsonld/), an entity linked to a post goes to `about` when the entity's title matches part or all of the post title, and to `mentions` otherwise. A post titled "Apples: Benefits, nutrition, and tips" that is linked to an "Apple" entity lists that entity under `about`.

Create a new entity only when it is relevant to your content and does not already exist. When WordLift already recognizes the entity, edit it instead of creating a duplicate.

## Related

- [Knowledge graph](/concepts/knowledge-graph/)
- [Schema.org](/concepts/schema-org/)
- [Vocabulary](/concepts/vocabulary/)
- [Linked data](/concepts/linked-data/)
- [Resolve API guide](/apis-and-sdks/resolve/)
- [Edit entity in the WordPress plugin](/integrations/wordpress-plugin/edit-entity/)
