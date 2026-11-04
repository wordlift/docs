---
title: "Linked data"
description: "Linked data names things with URIs and links them across datasets. Learn how WordLift applies it with dataset URIs, sameAs links and standard RDF exports."
last_updated: 2026-10-27
---

# Linked data

Linked data is a way of publishing structured data so that every thing is named with a URI, looking up that URI returns useful information, and the data links to other things by their URIs. The underlying data model is RDF.

## Why it matters

- **Portability.** Linked data uses open standards, so you can move it between systems that support them instead of being tied to one tool.
- **Reuse.** Other applications can combine your data with other datasets by following links. An events application, for example, can use `sameAs` links between an English site and a German site to show each event in the visitor's language.
- **Unambiguous identity.** A URI names one thing. Search engines and AI systems can tell your entity apart from others with the same name and connect it to what they already know.

## How it works: RDF, triples and serializations

RDF (Resource Description Framework) is a W3C standard for representing information. RDF stores every fact as a triple: a subject, a predicate and an object. Triples that share subjects and objects link into a graph.

The same RDF data can be written in several formats, called serializations. A WordLift Knowledge Graph can be [exported through KG-REST](/apis-and-sdks/kg-rest/#export) in four of them:

| Format | Media type |
| --- | --- |
| RDF/XML | `application/rdf+xml` |
| JSON-LD | `application/ld+json` |
| Turtle | `text/turtle` |
| N3 | `text/n3` |

Here is one entity in Turtle, the same data that appears as JSON-LD on the [JSON-LD](/concepts/json-ld/) page:

```turtle
@prefix schema: <http://schema.org/> .

<https://data.example.org/entity/example-topic>
    a schema:Thing ;
    schema:name "Example topic" ;
    schema:sameAs <https://www.wikidata.org/wiki/Q1492> .
```

Because the export uses open RDF serializations and schema.org, you can load your data into other RDF-compatible systems.

## URIs, dereferencing and your dataset URI {#uris-dereferencing-and-your-dataset-uri}

WordLift Knowledge Graphs follow linked data principles: each entity gets a permanent URI. Every entity URI sits under the graph's dataset URI, the namespace for its identifiers, for example `https://data.wordlift.io/wl0000000/`.

The dataset URI can be hosted by WordLift or, for Enterprise customers, by a [customer-controlled domain](/plans-and-pricing/custom-domain/) such as `https://data.example.org`. The choice affects linked data, integrations, structured data and long-term ownership of the namespace. Choose it before production, because changing it later can require an identifier migration.

Dereferencing is looking up a URI on the web to get information about the resource it identifies. WordLift uses dereferencing to get a snapshot of the properties that describe an entity.

:::warning[Review needed]
TODO [SME]: confirm whether WordLift entity URIs dereference today, and which formats they return (RDF or JSON-LD, with content negotiation).
:::

## Linking to Linked Open Data {#linking-to-linked-open-data}

Linked Open Data is linked data published as open content that anyone can reuse. DBpedia and Wikidata are large Linked Open Data datasets.

A `sameAs` link states that two URIs refer to the same thing. WordLift uses it to connect your entities to public datasets and to each other:

- **Public datasets.** A Data API response can link an entity to its Wikidata item. The [Resolve API](/apis-and-sdks/resolve/) returns `same_as` links to Wikidata and DBpedia, also for entities in your own graph.
- **Your own sites.** When you import a WordPress plugin vocabulary into a site with a different URL, WordLift adds `sameAs` links from each imported entity back to the original. Read [Import and export the vocabulary](/integrations/wordpress-plugin/import-export-vocabulary/).

This linking is also called entity interlinking or [reconciliation](/concepts/entities/#reconciliation-and-sameas).

## Query and export interfaces {#query-and-export-interfaces}

- **[GraphQL API](/apis-and-sdks/graphql-api/)** for live queries against the Knowledge Graph.
- **[KG-REST](/apis-and-sdks/kg-rest/)** for creating, reading, updating and deleting entities, batch operations and complete exports.
- **[Data API](/apis-and-sdks/data-api/)** for the JSON-LD of a single web page.

For live queries, Business+ provides access to the GraphQL endpoint; these docs do not describe a hosted SPARQL endpoint. WordLift documents no direct integration with graph databases such as Neo4j; to use your data in another system, export it in an RDF format that system can import.

:::warning[Review needed]
TODO [SME]: confirm whether any SPARQL access is available to customers on either plan.
:::

## Related

- [Knowledge graph](/concepts/knowledge-graph/)
- [Entities](/concepts/entities/)
- [JSON-LD](/concepts/json-ld/)
- [KG-REST export](/apis-and-sdks/kg-rest/#export)
- [Custom domain](/plans-and-pricing/custom-domain/)
- [Data ownership and portability](/platform/knowledge-graph/#data-ownership-and-portability)
- [W3C Linked Data design note](https://www.w3.org/DesignIssues/LinkedData.html)
