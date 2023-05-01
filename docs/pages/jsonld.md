---
displayed_sidebar: wordpress-plugin
---

# JSON-LD

The plugin generates JSON-LD markup to improve the visibility of web pages in search engine results pages (SERPs). It uses natural language processing and machine learning algorithms to identify important concepts within the content and map them to relevant schema.org entities, creating a semantically rich representation of the page. This structured data provides search engines with more information about the content of the page, leading to better rankings and a richer search experience for users.

## Post linked with term
If the post has a single term assigned to it, it will be added to mentions if your post has schema.org type
set to CreativeWork or a subtype of CreativeWork, you can find the full list [here](https://schema.org/CreativeWork#subtypes).

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
      "@type": "Event",
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

## Post linked with entity which matches the complete or a part of title
If you have a post about apple titled `Apples: Benefits, nutrition, and tips` and have entity linked
via annotation or term it will be added to [about](https://schema.org/about) when the title of entity matches the part (or) complete  post title.

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
      "@type": "Event",
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

## Post linked with Entity via annotation
If you have an entity linked by annotating the content, it will be added to `mentions` or `about` property
depending on if the title of the entity matches the part of (or) the complete post title.

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
      "@type": "Event",
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

## Post linked with Entity which has Place entity on [location](https://schema.org/about) property
If you have an entity linked to post which has a type that supports [location](https://schema.org/about) property
then the entity and place referenced by the entity will be expanded on the jsonld.

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
      "@type": "Event",
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