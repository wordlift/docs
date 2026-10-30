---
title: "JSON-LD output"
description: "Reference for the JSON-LD the classic WordLift plugin adds to posts: the rules for about, mentions and nested entities, with examples and ways to customize it."
last_updated: 2026-10-27
---

# JSON-LD output

The classic WordLift plugin adds JSON-LD to each post. The JSON-LD describes the post with schema.org types and properties, and links it to the entities and terms connected to it. This page lists the rules that decide what goes into the `about` and `mentions` properties and which entities are expanded, so you can predict the output, fix annotations and customize the result. It is for existing installs of the classic plugin. New customers start with [Install WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/). For a definition of JSON-LD, see [Concepts](/concepts/).

## How WordLift builds a post's JSON-LD

| Condition | Result in the post's JSON-LD | Example |
| --- | --- | --- |
| A term is assigned to the post, and the post's schema.org type is `CreativeWork` or a subtype. | The term is added to `mentions`. | [Terms linked to a post](#post-linked-with-term) |
| An entity is linked to the post by annotation or by a term, and its title matches all or part of the post title. | The entity is added to `about`. | [Entities that match the post title](#post-linked-with-entity-which-matches-the-complete-or-a-part-of-title) |
| An entity is linked to the post by annotation, and its title does not match the post title. | The entity is added to `mentions`. | [Entities linked by annotation](#post-linked-with-entity-via-annotation) |
| A linked entity has a type that supports the `location` property, and its `location` points to a Place entity. | The entity and the Place are both expanded in the JSON-LD. | [Entities with a location](#post-linked-with-entity-which-has-place-entity-on-location-property) |

The examples on this page come from a test site (`wordlift.localhost`) with dataset URIs under `http://data.wordlift.io/be5/`. Your site and dataset URIs differ.

:::warning[Review needed]
TODO [SME]: Confirm the publisher type in the samples. The original samples typed the publisher Acme as `Event`; this page shows `Organization`.
:::

## Terms linked to a post {#post-linked-with-term}

When a term, such as a tag, is assigned to a post whose schema.org type is `CreativeWork` or one of its [subtypes](https://schema.org/CreativeWork#subtypes), WordLift adds the term to the post's `mentions`. In this example, the tag `tag` appears in `mentions` and is described as a `Thing`.

:::warning[Review needed]
TODO [SME]: Confirm whether WordLift adds every term assigned to the post, or only a single term (the original page said "a single term").
:::

```json
[
  {
    "@context": "http://schema.org",
    "@id": "http://data.wordlift.io/be5/post/hello-world-24542",
    "@type": "Article",
    "description": "",
    "headline": "hello world",
    "url": "https://wordlift.localhost/hello-world/",
    "datePublished": "2023-05-01T09:46",
    "dateModified": "2023-05-01T09:46",
    "wordCount": 1,
    "keywords": "tag",
    "articleSection": [
      "Uncategorized"
    ],
    "commentCount": "0",
    "inLanguage": "en-US",
    "publisher": {
      "@type": "Organization",
      "@id": "http://data.wordlift.io/be5/entity/acme",
      "name": "Acme"
    },
    "author": {
      "@type": "Person",
      "@id": "http://data.wordlift.io/be5/author/david",
      "name": "David",
      "givenName": "",
      "familyName": "",
      "url": "https://wordlift.localhost/author/david/"
    },
    "mentions": [
      {
        "@id": "http://data.wordlift.io/be5/post_tag/tag"
      }
    ]
  },
  {
    "@context": "http://schema.org",
    "name": "tag",
    "@type": [
      "Thing"
    ],
    "@id": "http://data.wordlift.io/be5/post_tag/tag",
    "description": "",
    "url": [
      "https://wordlift.localhost/topic/tag/"
    ],
    "mainEntityOfPage": "https://wordlift.localhost/topic/tag/"
  }
]
```

## Entities that match the post title {#post-linked-with-entity-which-matches-the-complete-or-a-part-of-title}

When an entity is linked to the post by annotation or by a term, and the entity's title matches all or part of the post title, WordLift adds the entity to the post's [`about`](https://schema.org/about) property.

For example, a post titled `Apples: Benefits, nutrition, and tips` is linked to an entity named `Apples`. Because the entity name matches part of the title, the entity appears in `about`.

```json
[
  {
    "@context": "http://schema.org",
    "@id": "http://data.wordlift.io/be5/post/hello-world-2",
    "@type": "Article",
    "description": "Apple Tree",
    "mainEntityOfPage": "https://wordlift.localhost/hello-world-2/",
    "headline": "Apples  : Benefits, nutrition, and tips",
    "url": "https://wordlift.localhost/hello-world-2/",
    "datePublished": "2023-05-01T10:11",
    "dateModified": "2023-05-01T14:26",
    "wordCount": 2,
    "articleSection": [
      "Uncategorized"
    ],
    "commentCount": "0",
    "inLanguage": "en-US",
    "publisher": {
      "@type": "Organization",
      "@id": "http://data.wordlift.io/be5/entity/acme",
      "name": "Acme"
    },
    "author": {
      "@type": "Person",
      "@id": "http://data.wordlift.io/be5/author/david",
      "name": "David",
      "givenName": "",
      "familyName": "",
      "url": "https://wordlift.localhost/author/david/"
    },
    "about": [
      {
        "@id": "http://data.wordlift.io/be5/entity/apple-tree"
      }
    ]
  },
  {
    "@context": "http://schema.org",
    "@id": "http://data.wordlift.io/be5/entity/apple-tree",
    "@type": "Thing",
    "description": "",
    "name": "Apples",
    "url": "https://wordlift.localhost/vocabulary/apple-tree/"
  }
]
```

## Entities linked by annotation {#post-linked-with-entity-via-annotation}

When you annotate the content of a post with an entity, WordLift adds the entity to the post's `mentions` or `about` property:

- **The entity's title matches all or part of the post title:** the entity goes into `about`, as in the [title example](#post-linked-with-entity-which-matches-the-complete-or-a-part-of-title).
- **The entity's title does not match the post title:** the entity goes into `mentions`.

:::warning[Review needed]
TODO [SME]: Supply a real JSON-LD example of an entity linked by annotation that lands in `mentions`. The original example was a copy of the term example and showed no annotated entity.
:::

## Entities with a location {#post-linked-with-entity-which-has-place-entity-on-location-property}

When an entity linked to the post has a type that supports the [`location`](https://schema.org/location) property, and its `location` points to a Place entity, WordLift expands both the entity and the Place in the JSON-LD.

In this example, the post mentions the Event entity `some event`. Its `location` points to the Place entity `example-place`, so the JSON-LD includes the full Event and the full Place, with its geo coordinates and address.

```json
[
  {
    "@context": "http://schema.org",
    "@id": "http://data.wordlift.io/be5/post/hello-world-24542",
    "@type": "Article",
    "description": "Some Event",
    "mainEntityOfPage": "https://wordlift.localhost/hello-world/",
    "headline": "A post about event",
    "url": "https://wordlift.localhost/hello-world/",
    "datePublished": "2023-05-01T09:46",
    "dateModified": "2023-05-01T14:33",
    "wordCount": 2,
    "keywords": "tag",
    "articleSection": [
      "Uncategorized"
    ],
    "commentCount": "0",
    "inLanguage": "en-US",
    "publisher": {
      "@type": "Organization",
      "@id": "http://data.wordlift.io/be5/entity/acme",
      "name": "Acme"
    },
    "author": {
      "@type": "Person",
      "@id": "http://data.wordlift.io/be5/author/david",
      "name": "David",
      "givenName": "",
      "familyName": "",
      "url": "https://wordlift.localhost/author/david/"
    },
    "mentions": [
      {
        "@id": "http://data.wordlift.io/be5/post_tag/tag"
      },
      {
        "@id": "http://data.wordlift.io/be5/entity/some-event"
      }
    ]
  },
  {
    "@context": "http://schema.org",
    "@id": "http://data.wordlift.io/be5/entity/example-place",
    "@type": "Place",
    "description": "",
    "name": "example-place",
    "url": "https://wordlift.localhost/vocabulary/example-place/",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.4061088354351594,
      "longitude": 18.281250000000004
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1",
      "postOfficeBoxNumber": "2",
      "postalCode": "321",
      "addressLocality": "321",
      "addressRegion": "sa",
      "addressCountry": "asd"
    }
  },
  {
    "@context": "http://schema.org",
    "@id": "http://data.wordlift.io/be5/entity/some-event",
    "@type": "Event",
    "description": "",
    "name": "some event",
    "location": {
      "@id": "http://data.wordlift.io/be5/entity/example-place"
    },
    "url": "https://wordlift.localhost/vocabulary/some-event/"
  },
  {
    "@context": "http://schema.org",
    "name": "tag",
    "@type": [
      "Thing"
    ],
    "@id": "http://data.wordlift.io/be5/post_tag/tag",
    "description": "",
    "url": [
      "https://wordlift.localhost/topic/tag/"
    ],
    "mainEntityOfPage": "https://wordlift.localhost/topic/tag/"
  }
]
```

## Customize or disable the output

You have four ways to change the JSON-LD WordLift adds to a page:

1. **Turn it off.** Add this filter to your theme:

   ```php
   add_filter( 'wl_jsonld_enabled', '__return_false' );
   ```

2. **Edit it in code.** Use the `wl_post_jsonld` filter to change any part of the JSON-LD before WordLift sends it to the browser. This requires PHP development skills. The example below changes `@type` from `Article` to `NewsArticle`.
3. **Edit it without code.** Use [Mappings](/integrations/wordpress-plugin/mappings/) in **Dashboard > WordLift > Mappings**.
4. **Add to it.** Publish your own JSON-LD with the same `@id` as the WordLift JSON-LD. Google merges the data from both.

```php
add_filter( 'wl_post_jsonld',  function( $jsonld ) {

// Bail out if `@type` isn't set or isn't `Article`.
if ( ! isset( $jsonld['@type'] ) || 'Article' !== $jsonld['@type'] ) {
        return $jsonld;
}

$jsonld['@type'] = 'NewsArticle';

return $jsonld;
} );
```

For other ways to extend the plugin, see [Customize the WordPress plugin](/integrations/wordpress-plugin/customization/).

## Check the output

To check the structured data for a post from the editor, see [Publish and check structured data](/integrations/wordpress-plugin/publishing/).

:::warning[Review needed]
TODO [SME]: Name the validator readers should use to check a post's JSON-LD now that Google's Structured Data Testing Tool is retired.
:::
