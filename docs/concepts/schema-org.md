---
title: "Schema.org"
description: "Schema.org is the shared vocabulary of types and properties behind structured data. Learn how WordLift uses it and how your markup is validated."
last_updated: 2026-10-27
---

# Schema.org

[Schema.org](https://schema.org/) is a shared vocabulary of types and properties for describing things in structured data. Types name kinds of things, such as `Person`, `Product` or `Article`. Properties describe them, such as `name`, `url` or `author`.

## Why it matters

Schema.org gives search engines and AI systems a common language for the entities on your pages. Markup that uses it helps AI agents and retrieval systems identify entities, relationships and facts more reliably than plain text does.

The effect is not the same for every AI system. Schema.org markup matters most when the system relies on Google, Bing, enterprise search or knowledge graph pipelines. Markup on its own does not guarantee rich results, rankings or citations.

## How it works: types, properties and the hierarchy

Schema.org types form a hierarchy. The broadest type is `Thing`, which has four basic properties: `name`, `description`, `url` and `image`. Every other type is a more specific kind of `Thing` and inherits those properties, then adds its own:

- `Article` is a kind of `CreativeWork`, which is a kind of `Thing`, and adds properties such as `headline`.
- `Product` adds properties such as `offers`.
- `Person` adds properties such as `jobTitle`.

A property can point to another entity instead of a plain value. An `Article` has an `author` that is a `Person`, and a `WebPage` can be `about` a `Thing`. These links turn individual descriptions into a [knowledge graph](/concepts/knowledge-graph/).

## How WordLift uses schema.org

- **Entity types.** WordLift describes the type of each [entity](/concepts/entities/) with schema.org. [Sitemap Import](/platform/data-sources/sitemap/) and [Web Page Import](/platform/data-sources/web-page-import/) default to `WebPage`. [GraphSync](/platform/knowledge-graph/graph-sync/) can apply a different type or mapping to each page template. In the WordPress plugin, you [select entity types for a web page](/integrations/wordpress-plugin/entity-types/) in the editor.
- **JSON-LD.** The JSON-LD that the [Data API](/apis-and-sdks/data-api/) returns sets `@context` to `https://schema.org` and describes the page with schema.org entities. Read [JSON-LD](/concepts/json-ld/).
- **GraphQL.** The [GraphQL API](/apis-and-sdks/graphql-api/) selects properties by prefixed name, such as `schema:name`, `schema:url` or `schema:offers`.
- **Other vocabularies alongside.** A graph can also use properties from other vocabularies next to schema.org, such as `seovoc:` properties for search data or a namespace of your own. Read [Vocabulary](/concepts/vocabulary/).

:::warning[Review needed]
TODO [SME]: list which schema.org types each surface supports today (WordPress plugin, GraphSync, Product Knowledge Graph Builder).
:::

## Validation {#validation}

Schema.org defines types and properties, but search engines set their own requirements for the markup they use. Those requirements split properties into two groups:

- **Required properties.** A missing required property is an error.
- **Recommended properties.** A missing recommended property is a warning.

WordLift checks markup against these requirements in two places:

- **The [Python SDK](/apis-and-sdks/python-sdk/)** validates with SHACL shapes generated from Google Search Gallery requirements. Its schema.org grammar checks also warn when a property is used on a type it does not belong to.
- **The structured data monitor** reports errors for missing required properties and warnings for missing recommended ones. Read [Monitoring](/apis-and-sdks/monitoring/#structured-data-metadata) and [Monitor](/platform/monitor/).

## Related

- [Entities](/concepts/entities/)
- [JSON-LD](/concepts/json-ld/)
- [Vocabulary](/concepts/vocabulary/)
- [Select entity types for a web page](/integrations/wordpress-plugin/entity-types/)
- [GraphSync](/platform/knowledge-graph/graph-sync/)
