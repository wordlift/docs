---
title: BrightEdge
displayed_sidebar: docs
---

# BrightEdge

BrightEdge focuses on automating structured data markup at the page level. WordLift, instead, is designed to build and maintain a [Knowledge Graph](/knowledge-graph/multilingual) that acts as a centralized semantic layer for the organization. Schema markup is one of the outputs of that graph, but not the objective itself. The primary goal is to create stable entities, identities, and relationships that persist across pages, channels, and use cases.

:::note
WordLift Knowledge Graphs are multilingual by design, so entities and relationships can be managed consistently across languages and locales.
:::

WordLift models relationships that exist beyond individual pages. For example, a car manufacturer can be a shared entity referenced by multiple rental products, or a location can connect several agencies. These relationships are defined once and reused consistently across the ecosystem.

WordLift can also enrich entities with data that is not necessarily present on a single page. Locations, for instance, may include geo coordinates and explicit hierarchical relationships such as Agency, Town, City, Province, Region, State, and Country. This information lives in the graph and is reused wherever relevant.

By combining Linked Data, entity relationships, facets, and semantic search into a single graph, WordLift provides a structured foundation that supports advanced discovery and AI-driven experiences, including generative use cases, without being limited to page-level markup. This graph-first approach powers structured data outputs like [JSON-LD](/pages/jsonld) and configurable [schema mappings](/pages/mappings).

WordLift integrates with BrightEdge AutoPilot. Consumers such as Google can process structured data coming from multiple sources, as long as the statements are consistent and do not contradict each other, for example on pricing or availability. In this setup, schema output can be selectively enabled, disabled, or integrated while iterating on and strengthening the Knowledge Graph, including advanced workflows like the [Product Knowledge Graph Builder](/product-knowledge-graph-builder/introduction) and its [webhooks integration](/product-knowledge-graph-builder/webhooks).

## Autopilot for Schema

Autopilot for Schema can coexist with WordLift’s Knowledge Graph approach. When both systems are used, keep structured data consistent across sources and avoid conflicting statements. WordLift can remain the source of truth for entities and relationships, while BrightEdge focuses on page-level schema output where required.

## FAQ

**Can WordLift and BrightEdge run together?**  
Yes. They can coexist as long as structured data from both systems stays consistent and non-contradictory.

**Which system should be the source of truth?**  
Use WordLift for entities, identities, and relationships. BrightEdge can handle page-level schema output when needed.

**Do we need to disable schema in one tool?**  
Not necessarily. You can selectively enable, disable, or integrate schema output while the Knowledge Graph evolves.

## AI Audit

Ready to see your data quality opportunities? Run an AI Audit here: https://wordlift.io/ai-audit/

## Related documentation

- [Multilingual Knowledge Graphs](/knowledge-graph/multilingual)
- [Product Knowledge Graph Builder](/product-knowledge-graph-builder/introduction)
- [Webhooks integration](/product-knowledge-graph-builder/webhooks)
- [JSON-LD output](/pages/jsonld)
- [Schema mappings](/pages/mappings)
