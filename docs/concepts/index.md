---
title: "Concepts"
description: "Plain definitions of the ideas behind WordLift, from entities and knowledge graphs to linked data and AI visibility, with links to each full explanation."
last_updated: 2026-10-27
---

# Concepts

Concepts explain the ideas behind WordLift in plain language. WordLift is a knowledge graph platform, and AI visibility is one application built on it. Use this page to look up a term, then follow the link to its full explanation. The step-by-step guides live in the [Platform](/platform/) section.

## Key concepts

Each definition below is short on purpose. The linked page covers the concept in depth.

### Entity {#entity}

An entity is a thing that exists in the real world, such as a person, organization, place, product, event or work of art. In a knowledge graph, each entity is a node with a stable identifier, a type and properties, so machines can tell it apart from other things with the same name. Read [Entities](/concepts/entities/).

### Entity types {#entity-types}

An entity type says what kind of thing an entity is. WordLift describes types with the schema.org vocabulary, where the broadest type is `Thing`, with the properties `name`, `description`, `url` and `image`. Read [Schema.org](/concepts/schema-org/).

### Related entities {#related-entities}

Related entities are the entities used to annotate a post or page: the things the content is about or mentions. Read [Entities on a page](/concepts/entities/#entities-on-a-page).

### Vocabulary {#vocabulary}

In WordLift, your vocabulary is the collection of entities you create and describe so you can reuse them across your content. The same word also names schema vocabularies, such as schema.org, which define types and properties instead of things. Read [Vocabulary](/concepts/vocabulary/).

### Knowledge graph {#knowledge-graph}

A knowledge graph is a network of the entities that matter to a domain or organization, together with the relationships between them. Unlike a vocabulary, it also holds the instances it describes and the facts about them. Capitalized, Knowledge Graph is the WordLift product. Read [Knowledge graph](/concepts/knowledge-graph/) for the concept and the [Knowledge Graph overview](/platform/knowledge-graph/) for the product.

### RDF {#rdf}

RDF (Resource Description Framework) is a W3C standard for representing information as triples of subject, predicate and object. A WordLift Knowledge Graph can be exported in RDF formats such as RDF/XML, JSON-LD, Turtle and N3. Read [Linked data](/concepts/linked-data/).

### Linked Open Data {#linked-open-data}

Linked Open Data is linked data published as open content that anyone can reuse. DBpedia and Wikidata are large examples, and WordLift entities can point to them with `sameAs` links. Read [Linking to Linked Open Data](/concepts/linked-data/#linking-to-linked-open-data).

### Reconciliation {#reconciliation}

Reconciliation links an entity in your data to the same entity in another dataset, so machines can identify without ambiguity what you mean. "Apple" in an article can mean a band, a company or a fruit, and reconciliation records which one. Read [Reconciliation and sameAs](/concepts/entities/#reconciliation-and-sameas).

### Dereferencing HTTP URIs {#dereferencing-http-uris}

Dereferencing is looking up a URI on the web to get information about the resource it identifies. WordLift uses dereferencing to get a snapshot of the properties that describe an entity. Read [URIs, dereferencing and your dataset URI](/concepts/linked-data/#uris-dereferencing-and-your-dataset-uri).

### WordLift key {#wordlift-key}

The WordLift key is the credential that authenticates your requests to WordLift APIs and connectors, such as GraphQL, KG-REST, the Resolve API and the LlamaIndex connectors. Each Knowledge Graph has its own key, so an account with several graphs has several keys. Read [Authentication](/apis-and-sdks/#authentication).

## WordPress plugin terms

These terms belong to the classic WordPress plugin, which WordLift supports for existing installs. New customers start with [WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/).

### Semantic fingerprint {#semantic-fingerprint}

A semantic fingerprint is the unique linked identifier that semantic annotation adds to the HTML of a post to mark which entity a passage refers to. The WordPress plugin reuses these identifiers to add schema.org markup and to feed its widgets. Read [Analysis](/integrations/wordpress-plugin/analysis/).

### Widget {#widget}

A widget is a dynamic visualization that editors add to a page with a shortcode or from the WordLift menu. It runs in the visitor's browser and shows information from the knowledge graph, such as connections between posts or details about the entities in a post. Read [Widgets](/integrations/wordpress-plugin/widgets/).

### WordLift Edit Post Widget {#wordlift-edit-post-widget}

The WordLift Edit Post Widget is the panel in the WordPress editor where you annotate a post with entities and create new entities in your vocabulary. The full walkthrough, with screenshots, is in [WordLift Edit Post Widget](/integrations/wordpress-plugin/analysis/#wordlift-edit-post-widget).

#### Top-down post annotation {#top-down-post-annotation}

You choose entities from the list the analysis detects to describe the whole post, without selecting a passage. The chosen entities describe the entire post, not a single occurrence in the text.

#### Bottom-up entity annotation {#bottom-up-entity-annotation}

You select one occurrence in the text, such as "Expo 2015", and annotate that occurrence with an entity.

#### Edit entity properties {#edit-entity-properties}

You edit the main properties of an entity from the widget while you write. The complete list of properties is on the [Edit entity](/integrations/wordpress-plugin/edit-entity/) page.

#### Image suggestor {#image-suggestor}

The widget shows images for each entity, and you can drag them into the visual editor.

## Go deeper

Each concept page gives the definition, why it matters and how it works, with links to the guides that apply it.

- **[Knowledge graph](/concepts/knowledge-graph/).** What a knowledge graph is, how entities, properties and triples fit together, and how data goes in and out of a WordLift Knowledge Graph.
- **[Entities](/concepts/entities/).** How an entity is identified with a stable `@id`, a schema.org type and `sameAs` links, and what reconciliation does.
- **[Schema.org](/concepts/schema-org/).** The shared vocabulary of types and properties, how WordLift uses it and how markup is validated.
- **[JSON-LD](/concepts/json-ld/).** The anatomy of WordLift JSON-LD and the difference between client-side and server-side delivery.
- **[Linked data](/concepts/linked-data/).** RDF, URIs, dataset URIs, `sameAs` links to public datasets and standard export formats.
- **[Vocabulary](/concepts/vocabulary/).** Your collection of entities compared with schema vocabularies, and how vocabulary entities link to each other.
- **[AI visibility](/concepts/ai-visibility/).** What it means to be found, cited and recommended in AI-generated answers, and how WordLift measures it.
- **[RAG and LLMs](/concepts/rag-and-llms/).** How retrieval-augmented generation grounds a large language model in your Knowledge Graph, and which connectors support it.
- **[Glossary](/concepts/glossary/).** One-line definitions of WordLift product names and semantic web terms.

## Next steps

- **See the product.** The [Knowledge Graph overview](/platform/knowledge-graph/) explains what the WordLift Knowledge Graph does for your organization.
- **Build a graph.** [Create a Knowledge Graph](/platform/knowledge-graph/create/) compares the ways to populate one, with GraphSync as the recommended path.
- **Work with the data.** [APIs and SDKs](/apis-and-sdks/) covers authentication and the interfaces for querying and publishing your graph.
