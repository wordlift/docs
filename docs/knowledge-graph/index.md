---
sidebar_position: 0
---

# Knowledge Graph

The Knowledge Graph represents the people, places, products, content, and other entities that matter to a website or organization, together with the relationships between them.

For Business+ and Enterprise customers, start with [Create a Knowledge Graph](./create-a-knowledge-graph.md) to compare population methods. [GraphSync](./graphsync.md) is the recommended way to create and maintain a content Knowledge Graph, while specialized alternatives fit narrower sources and use cases.

Once the graph has been populated, use the [Analytics API](./analytics-api.md) to add search performance data when the use case requires it.

Use [Data Sources](./data-sources-oauth2.md) to connect OAuth2-based search and analytics providers from the WordLift Dashboard or through the Manager API.

## Data ownership and portability

WordLift hosts and operates the managed Knowledge Graph while the service is active. Customers own the structured metadata they create with WordLift. [GraphQL](/api/graphql/graphql-support/) provides query access to data in the Knowledge Graph, while KG-REST provides graph operations and a [complete dataset export](./kg-rest.md#export).

The export includes the entities, properties, and relationships in the graph and is available as RDF/XML, JSON-LD, Turtle, or N3. These open RDF serializations and the use of Schema.org make the data portable to other RDF-compatible systems. WordLift hosting, publishing, synchronization, monitoring, and other managed capabilities depend on an active service; this documentation does not define a post-service retention period.

For long-term control of entity identifiers, Enterprise customers can publish the graph under a [customer-controlled domain](/enterprise/custom-domain-configuration/). Choose the dataset URI strategy before production because changing it later can require an identifier migration.

## Frequently asked questions

### How can WordLift JSON-LD be delivered to a page?

WordLift supports client-side delivery with `bootstrap.js` and server-side, build-time, or edge delivery through the Data API. See [Ways to inject structured data](./data-api.md#ways-to-inject-structured-data) for the supported patterns and their tradeoffs.

### Which delivery method should I use for crawlers that do not execute JavaScript?

Use server-side, build-time, or edge delivery so the JSON-LD is present in the initial HTML response. See [Choosing client-side or server-side injection](./data-api.md#choosing-client-side-or-server-side-injection).

### How can I inject WordLift JSON-LD at the Cloudflare edge?

Use a Cloudflare Worker to retrieve page-specific JSON-LD and insert it into the origin HTML with `HTMLRewriter`. Follow [Cloudflare Integration](./cloudflare-integration.md) for the request boundaries, caching pattern, reference implementation, and validation checklist.

### Who owns Knowledge Graph data, and how can it be exported or migrated?

Customers own the structured metadata they create with WordLift and can export the complete graph in standard RDF formats. Review [Data ownership and portability](#data-ownership-and-portability), the [dataset export endpoint](./kg-rest.md#export), and [customer-controlled domains](/enterprise/custom-domain-configuration/) for identifier continuity.

### How does GraphSync reuse mappings across pages that share a template?

GraphSync reuses a validated source-specific mapping across pages with the same structure while producing page-specific entities and relationships for every URL. See [How GraphSync reuses mappings](./graphsync.md#how-does-graphsync-reuse-mappings-across-pages-that-share-a-template).
