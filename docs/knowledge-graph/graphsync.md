---
title: GraphSync
description: Learn how WordLift GraphSync creates and maintains scalable content Knowledge Graphs for Business+ and Enterprise customers.
keywords:
  - GraphSync
  - Knowledge Graph synchronization
  - Business+ Knowledge Graph
  - Enterprise Knowledge Graph
---

# GraphSync

GraphSync is the recommended way for Business+ and Enterprise customers to create and maintain a content Knowledge Graph.

It turns website pages or other approved sources into a repeatable graph-building workflow. Unlike simple page import APIs, GraphSync can apply source-specific mappings, create multiple connected entities from a page, preserve stable entity identities, and keep the graph synchronized as the source changes.

If you are still comparing population methods, review [Create a Knowledge Graph](./create-a-knowledge-graph.md) first.

:::tip Start a GraphSync project

[Contact WordLift](https://wordlift.io/contact-us/) to plan your GraphSync onboarding. WordLift will help your team select the source content, define the graph model, validate a pilot, and prepare the recurring synchronization workflow.

:::

## When to use GraphSync

Use GraphSync when:

- the graph must represent more than a flat collection of web pages;
- different page templates require different Schema.org types or mappings;
- each page needs multiple connected entities and relationships;
- entity identifiers must remain stable across synchronization runs;
- the source content will change and the graph must be updated repeatedly;
- the workflow needs a controlled validation and governance process.

GraphSync projects can use explicit URL lists, sitemaps, or approved Google Sheets sources. The source and retrieval method are selected during onboarding according to the website and use case.

## How GraphSync onboarding works

GraphSync onboarding is an assisted process focused on producing a useful, maintainable graph rather than importing every available URL immediately.

1. **Define the outcome and sources.** Agree on the business use case, source systems, content sections, and initial success criteria.
2. **Design the graph model.** Identify the page types, entities, properties, relationships, and stable identifiers the graph needs.
3. **Map a controlled pilot.** Create source-specific mappings and run them against a representative subset of content.
4. **Validate the result.** Review entity identity, relationships, source coverage, and graph quality before expanding the scope.
5. **Establish recurring synchronization.** Run the approved workflow as the source content changes and evolve mappings through a controlled process.

## How does GraphSync reuse mappings across pages that share a template?

GraphSync defines a source-specific mapping for a representative page or source type and reuses that mapping across matching URLs. A blog mapping, for example, can be validated on a controlled set of posts and then applied to the other posts that share the same content structure.

The mapping is reusable, but the graph output remains page-specific: each URL contributes its own entities, properties, and relationships. After a recurring synchronization run processes a source change, the [Data API](./data-api.md) returns the updated JSON-LD for the affected URL.

Materially different templates or source structures can require separate mappings. Validate each distinct page type in the pilot instead of assuming that one mapping fits the entire website.

## Prepare for onboarding

Before contacting WordLift, identify:

- the first business outcome the graph should support;
- the website sections, feeds, or systems that contain the source data;
- a small but representative pilot set;
- the customer owners for content, data quality, and technical access;
- whether production and staging require separate graphs or credentials.

Enterprise teams can use the [Enterprise Onboarding Guide](/enterprise/onboarding/) to coordinate access, graph topology, security, governance, and production-readiness decisions.

Technical operators can consult the [worai graph command reference](/worai/commands/graph/) after the GraphSync project and operating model have been agreed.
