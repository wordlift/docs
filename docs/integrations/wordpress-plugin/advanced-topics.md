---
title: "Advanced topics"
description: "Background on knowledge graphs, reconciliation, RDF and semantic fingerprints, plus semantic analytics, pagination and image SEO for the WordPress plugin."
sidebar_position: 30
last_updated: 2026-10-27
---

# Advanced topics

## Knowledge Graph

A **knowledge graph** is a network of all kinds of entities that are relevant to a specific domain or to an organization.
They are not limited to abstract concepts and relations (as with a vocabulary) but also contain the instances of the things they describe.

Using WordLift as new entities are added in the vocabulary, properties for these entities are populated using the
*easy-to-use* WordPress editing interfaces and new posts are enriched with these entities a knowledge graph is
created and published as [RDF](#rdf) graph in the cloud.

### Linked Data

**Linked Open Data** is [Linked Data](http://en.wikipedia.org/wiki/Linked_data) that is made available as **open content**.
Large linked open datasets (or [Knowledge Graph](#knowledge-graph)) include DBpedia and Freebase.

### Reconciliation

**Reconciling** entities we store in our own [vocabulary](/concepts/#vocabulary) with entities available elsewhere provides computers with an unambiguous way to identify the things we're talking about.

*\[Apple\]* in a specific article might refer to a rather typical British psychedelic-pop band rather than to a World famous computer company or the forbidden fruit. This becomes important when third party applications like search engines need to provide valuable content for users searching for articles on *\[Apple\]* the psychedelic-pop band and not the other two *Apples*.

[Reconciling](/concepts/#reconciliation) entities means providing computers with unambiguous identifications of the *entities* we talk about.

## RDF

**RDF** stands for Resource Description Framework.

RDF is a W3C standard language for representing information.

## Semantic fingerprint

The result of semantic annotation of a text is a *unique linked identifier* added to the HTML code. This identifier is known as **semantic fingerprint**.

Annotating contents, also known as *semantic enrichment* or *lifting*, creates metadata that computers can understand.
Just like in forensic science human fingerprints are used to identify humans appearing on a crime scene, in computer science we use semantic fingerprints to tell computers what [entities](/concepts/#entity) we're referring to.

WordLift re-uses these semantic fingerprints for adding Schema.org markup and for re-purposing contents using [Widgets](/concepts/#widget).

## Dereferencing HTTP URIs

**URI Dereferencing** is the process of looking up a URI on the Web to get information about the referenced resource. WordLift uses dereferencing to obtain a snapshot of the properties describing a [named entity](/concepts/#entity).

## Semantic analytics with WordLift Looker Studio connector

![Semantic Analytics Connector 1](./images/semantics-analytics-connector-1.png)

Use the WordLift Looker Studio connector to create semantic SEO reports. It lets you blend data from sources like Google Analytics, Google Search Console, and your own databases into dashboards and reports. Here is how to use it for semantic analytics:

### About Google Looker Studio {#what-is-google-looker-studio}

[Google Looker Studio](https://support.google.com/datastudio/answer/6283323?hl=en) is a free data visualization tool that lets you collect data in easy-to-read, shareable, and fully customizable dashboards and reports.

### How to create semantic SEO reports

1. **Structured data**: Adding structured data to your website enriches your content, allowing search engines to better understand it. This can lead to better rankings and more organic traffic.

2. **Entities and concepts**: Google is shifting its focus from just keywords to concepts and entities. With WordLift, you can work with entities on your website to improve your semantic SEO strategy.

![Semantic Analytics Connector 2](./images/semantics-analytics-connector-2.png)

3. **WordLift Looker Studio connector**: Use the [Looker Studio connector](/integrations/looker-studio/) to blend data from your Knowledge Graph with other analytics platforms like Google Search Console.
    - **Getting started**: Search for WordLift on the [Google Looker Studio connectors page](https://datastudio.google.com/datasources/create?connectorId=AKfycbwxx5Jf1KKHeKItCkwzJsrW2iOhodliNcud1vk5HKimj1lUQLuVfcAD4K9oSFmqW8v-). Follow the instructions to connect.
    - **Data blending**: Blend data from the Knowledge Graph and Google Search Console to create comprehensive reports.

### Benefits

- **Single source of truth**: Create a unified dashboard for all your SEO and business performance metrics.
- **Audience insights**: Gain meaningful data about your content and audience.
- **SEO reporting**: Add insights into keyword rankings, traffic, and more to your SEO reporting.

For more details, read the [WordLift Looker Studio connector blog post](https://wordlift.io/blog/en/wordlift-looker-studio-connector/).

## Automatic pagination and table of contents

**Pagination** allows website editors to split long content into different pages. This technique belongs to the basics of web design and information architecture, but **pagination SEO best practices are still debated**, so dealing with it is not as easy as it seems.

To learn more, read the blog post on [SEO friendly pagination](https://wordlift.io/blog/en/pagination-seo-wordpress-plugin/).

## Image SEO

Images greatly contribute to a website's SEO and improve the overall user experience. Fully optimizing images is about helping users, and search engines, better understand the content of an article.

Read the blog post on [the optimization of images using machine learning](https://wordlift.io/blog/en/image-seo-using-ai/).
