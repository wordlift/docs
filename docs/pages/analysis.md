# Analysis

**WordLift** suggests to the content editor relevant fact-based information, images and links to organize and enrich contents.

**WordLift** analyses articles using *Named Entity Recognition* (NER) and *Named Entity Disambiguation* (NED) to extract [Named Entities](key-concepts#entity) from posts and pages.

Entities, used for annotating contents, belong to different [knowledge graphs](key-concepts#knowledge-graph) or [custom vocabularies](key-concepts#vocabulary) including but not limited to DBpedia, GeoNames and Freebase.

WordLift creates and publishes annotations as [linked open data](key-concepts#linked-open-data).

## Content Writing

To start working with WordLift (once the plugin has been properly [installed](../wordpress-plugin/getting-started#installation) and [configured](../wordpress-plugin/getting-started#configuration)) you can simply start writing a blog post using the [standard visual editor of WordPress](https://en.support.wordpress.com/visual-editor).

WordLift adds to the visual editor the Widgets Menu to embed [widgets](key-concepts#widget) in page.

![image](./images/wordlift-menu.png)

:::caution Warning
WordLift is designed for the standard **WordPress visual editor**.
**WordLift also offers experimental support for Visual Builders. Contact us to test your specific install**.
:::

:::info Note
You can decide to switch WordLift's analysis ON and OFF by clicking on the *open|close* arrow on the top right corner of the WordLift's Edit widget.
:::

![image](./images/wl_toggle_3-13-3.gif)

## WordLift Widgets Menu

The menu lets you add five different [widgets](key-concepts#widget) to your blog post.\` Widgets \<key-concepts#widget>\`\_ provide a rich visual presentation of the entities populating the post and help readers find more relevant contents.

:::info Note
As the site grows with new articles, new entities are created and contents are annotated, the graphical widgets automatically reflect the changes **without requiring any intervention from the editor**. This brings fresh new updates on your contents.
:::

The five [widgets](key-concepts#widget) are:

- **Chord**
  : Visualizes the relationships between all entities starting from entities mentioned in the post.
- **Timeline**
  : Displays a chronological and navigable list of entities marked as *Event* mentioned in the post.
- **GeoMap**
  : Displays  on a map all entities of type *Place*  mentioned in the post.
- **Navigator**
  : Provides content recommendations by presenting relevant **internal** links to other blog posts on the same website.
- **Faceted Search Widget**
  : Provides a faceted search user interface to help readers find relevant articles using the network of entities.

Each widget has a corresponding shortcode; review the [widget shortcodes page](shortcodes#widget-shortcodes) for more information on how this works.

## Analysing the text

As you begin to write the content on the post, WordLift automatically starts analysing it.

Once you hit the **Save Draft** button *for the first time*, [entities](key-concepts#entity) are extracted and underlined.

![image](./images/wordlift-content-analysis-results.png)

By clicking on each entity you can [reconcile](key-concepts#reconciliation) it with the same entity in DBpedia or Freebase using the [WordLift Edit Post widget](#wordlift-edit-post-widget). The entities that you choose will annotate this blog post.

:::info Note
Text annotation in WordLift is *semi-automatic*. [Entities](key-concepts#entity) being extracted automatically must be validated by the editor before being recorded.
:::

With WordLift you can identify the basic '*who*, *what*, *when* and *where*' of an
article. You can also further structure the contextual information by creating new entities in the [custom vocabulary](key-concepts#vocabulary). Annotations are added to posts and pages using the **WordLift Edit Post Widget**.

### WordLift Edit Post Widget

Articles can be annotated in two ways:

- **Top down**: entities are organized using the '*who*, *what*, *when* and *where*' categories **regardless of where each entity appears in the text**. When you choose an entity using the **top down** approach **all occurrences of that entity are annotated**.
- **Bottom up**: entities are annotated and organized using the '*who*, *what*, *when* and *where*' categories **starting from each specific occurence of the entity in the text**. When you choose an entity using the **bottom up** approach **only the choosen occurrence of that entity is annotated**.

#### Top down annotation

The content editor, from the list of entities being detected in the text, uses these entities to describe his/her post without selecting any specific occurrence in the text.
Entities being selected, in this case, describe the entire post (and not the single occurrence of the entity in the text).

![image](./images/wordlift-edit-post-widget-01.png)

#### Bottom up annotation

The content editor has choosen the “Expo 2015” occurence in the text. In this case, this specific occurrence, is annotated with the entity "Expo 2015".

![image](./images/wordlift-edit-post-widget-02.png)

#### Edit Entity Properties

The content editor is editing the main properties for the entity "Expo 2015" while writing the post.
The complete list of properties can be edited clicking on the "open in vocabulary" link (see [Edit Entity](edit-entity) page.)

![image](./images/wordlift-edit-post-widget-03.png)

#### Image Suggestor

![image](./images/wordlift-edit-post-widget-04.png)

Images for each entity appear in the WordLift Edit Post Widget and can be embedded in the visual editor.

## Reconciling entities

![image](./images/wordlift-content-analysis-disambiguation-start.png)

Let's choose as relevant entity in this example *\[Web\]*, as the post is referring to the World Wide Web. As the entity type for *\[Web\]* is a `Thing` the entity appears under the *what* category.

:::info Note
[Reconciling](key-concepts#reconciliation) entities means **linking** the entity appearing in this text with its own equivalent on other sources (i.e. DBpedia or Freebase).
:::

![image](./images/wordlift-edit-post-widget-05.png)

Using the [WordLift Edit Post Widget] you can now read the following parameters:

- **Entity Title** the name of the entity
- **Entity Category** the type of entity according to the `schema.org` vocabulary
- **Entity Description** the description of the entity

All parameters but the Title can be edited directly from the [WordLift Edit Post Widget]

:::info Note
Data being used for the enrichments comes from openely avaialble sources
like DBpedia that might contain misleading information that the editor can alwasy edit.

Entity properties can also be edited clicking on the "open in vocabulary" link (see [Edit Entity](edit-entity) page.)
:::

Once you hit **Save** you are annotating this post which means adding a [semantic fingerprint](key-concepts#semantic-fingerprint) to this piece of content.

In this post another important entity worth mentioning is the creator of the World Wide Web Sir Tim Berners-Lee.
The entity is properly identified as `Person` and all `Person` and `Organization` types are available under the *who* category.

![image](./images/wordlift-content-analysis-disambiguation-berners-lee.png)

:::info Note
Annotations are saved when a blog post or a page is published. Annotations and data related to each entity being annotated remain in *draft* untill the post is published.
:::

:::caution Warning
When the text from the Visual Editor is edited or removed all annotations being saved are lost. WordLift stores the editor's selection of entities in the content of the Visual Editor.
:::

## Creating a new entity

The purpose of using WordLift is to (1) categorize your content, (2) help people find content of interest to them, and (3) help WordLift describe your contents in *machine-readable* format so that other computers can re-use it.

In some cases key concepts that are important for (1), (2) and (3) are not automatically detected by WordLift and need to be taught by creating new entities.

:::info Note
A basic guideline for adding entity is: people should apply entities the same way a librarian would plausibly use tags to classify the content you're writing if it was a book. For some basic guidelines on when creating new entities [read here](faq#what-are-the-guidelines-for-creating-new-entities-to-annotate-a-blog-post-or-a-page).
:::

New entities being added will become part of the [WordLift vocabulary](key-concepts#vocabulary).

Once an entity as been added to the vocabulary it will be automatically detected every-time you mention it again in your contents.

In our example one significant entity has not been detected and it is worth *teaching* it to WordLift.

![image](./images/wordlift-content-analysis-new-entity-highlight.gif)

The entity is *\[WordLift\]* itself. To create a new entity simply highlight the text `WordLift`, then click the button **Create New Entity** at the top of the [WordLift Edit Post Widget] and by clicking it you will be then able to edit the properties of the new entity.

![image](./images/wordlift-content-analysis-new-entity-creation.png)

Choose the category *Creative Work* (it also applies to *Software*), add a description and hit the "Save" button. Now the new entity will appear as [related entities](key-concepts#related-entities)  of the blog post along with *\[Web\]* and *\[Tim Berners-Lee\]*.

![image](./images/wordlift-content-analysis-new-entity-creation2.png)

:::caution Warning
When creating a new entity over **an existing annotation**: a) remove the annotated entity, b) re-write the entity and c) create a new one (as described above). See animation below.
:::

![image](./images/wl-new-entity-specific-case.gif)

You can now continue to the [Edit Entity](edit-entity) page.
