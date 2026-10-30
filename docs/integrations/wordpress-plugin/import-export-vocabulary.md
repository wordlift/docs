---
title: "Export and import the vocabulary"
description: "Move your WordLift vocabulary between WordPress sites with the WordPress export and import tools, and keep entities linked with sameAs."
sidebar_label: "Import and export vocabulary"
last_updated: 2026-10-27
---

# Export and import the vocabulary

You might want to export or import the vocabulary of terms created with **WordLift** in several cases:

1. The site needs to move from one server to another.
2. You want to replicate the content structure of a website created for one language in another language, and the website doesn't use a multilingual plugin such as [WPML](https://wpml.org/).
3. You want to reuse the [vocabulary](/concepts/#vocabulary) of one site to tag another website that runs a separate **WordLift** key.

WordPress provides both [Export](https://codex.wordpress.org/Tools_Export_Screen) and [Import](https://codex.wordpress.org/Tools_Import_Screen) features. WordLift extends these features so that you can also move entities back and forth across multiple websites.

## How to export the **WordLift** vocabulary

To export the vocabulary from the *origin website*, go to **Tools** in the WordPress menu and select **Export**. Choose to export the vocabulary only, unless you need to export the entire website.

## How to import the **WordLift** vocabulary

To import the vocabulary into the *destination website*, go to **Tools** in the WordPress menu and select **Import**. Choose the XML file that the Export function produced. Choose *Import WordPress* and check the option *Download and import file attachments* to import all entities.

:::info Note
When you import data from a website in one language (for example, English), WordLift saves the data in the language set in the **WordLift** configuration tab of the destination website.
:::

:::caution Warning
A current limitation in WordPress might prevent the right images from being imported. More information is available on the [wptips website](http://wptips.me/how-to-import-images-when-importing-posts-from-a-wordpress-export-file/).
:::

## Connecting source and destination websites with *sameAs* links

When you import the vocabulary on a website with a different URL (case 2 or 3 above), **WordLift** automatically populates all *sameAs* links with the equivalent entity on the *origin website*.

### Entity interlinking and why it matters {#entity-interlinking-and-why-is-so-important}

This process is called *entity interlinking* (or [entity reconciliation](/concepts/#reconciliation)) and it is beneficial for the metadata being published as it provides further means of data reuse.

Say a developer is writing an application to display events, and the events are created with **WordLift** on two websites, one in English and one in German. The application can use the *sameAs* links to retrieve the content in the required language: English for readers in the UK and German for readers in Germany. The otherwise separate datasets are effectively combined.

:::info Note
When you import the vocabulary on a website with the same URL (case 1), the importer doesn't add *sameAs* links.
:::

## Vocabulary sharing and how to keep it in sync

:::caution Warning
When you share the same vocabulary on multiple websites, the risk of duplicate content is high. As a general rule, avoid it.
:::

When the vocabulary grows on one site and you need to reuse it on another site, the export and import functions might not be the best approach. You can use a different solution (see below).

### Sharing terms among different websites

**WordLift** lets you configure the NLP to use multiple datasets for *content analysis* and [entity reconciliation](/concepts/#reconciliation). An enterprise, for instance, could choose to have a product website that uses, besides the terms created within its internal vocabulary, all the terms created in the vocabulary of the corporate website. This way when an entity is created on the corporate website for describing a new team member, this entity is immediately made available on the product website.

**WordLift** also performs the [entity reconciliation](/concepts/#reconciliation) automatically, without any further action from the editor: the entity on the product website has *sameAs* links that point to the entity's URL on the corporate website. This way, you can use all the terms created on one site to annotate content on another website. When building the product website, the developer might also choose to redirect the traffic to the entity pages on the source site by using the *sameAs* links (this avoids content duplication and increases the interlinking between the websites).
