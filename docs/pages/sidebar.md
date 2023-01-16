---
displayed_sidebar: wordpress-plugin
---

# Sidebar

## Content Analysis and Disambiguation

![image](./images/wordlift-content-analysis-disambiguation-start.png)

Let's choose as relevant entity in this example *\[Web\]*, as the post is referring to the World Wide Web. As the entity type for *\[Web\]* is a `Thing` the entity appears under the *what* category.

:::info Note
[Reconciling](/pages/key-concepts#reconciliation) entities means **linking** the entity appearing in this text with its own equivalent on other sources (i.e. DBpedia or Freebase).
:::

![image](./images/wordlift-edit-post-widget-05.png)

Using the [WordLift Edit Post Widget](/pages/analysis#wordLift-edit-post-widget) you can now read the following parameters:

- **Entity Title** the name of the entity
- **Entity Category** the type of entity according to the `schema.org` vocabulary
- **Entity Description** the description of the entity

All parameters but the Title can be edited directly from the [WordLift Edit Post Widget]

:::info Note
Data being used for the enrichments comes from openely avaialble sources
like DBpedia that might contain misleading information that the editor can alwasy edit.

Entity properties can also be edited clicking on the "open in vocabulary" link (see [Edit Entity](/pages/edit-entity) page.)
:::

Once you hit **Save** you are annotating this post which means adding a [semantic fingerprint](/pages/key-concepts#semantic-fingerprint) to this piece of content.

In this post another important entity worth mentioning is the creator of the World Wide Web Sir Tim Berners-Lee.
The entity is properly identified as `Person` and all `Person` and `Organization` types are available under the *who* category.

![image](./images/wordlift-content-analysis-disambiguation-berners-lee.png)

:::info Note
Annotations are saved when a blog post or a page is published. Annotations and data related to each entity being annotated remain in *draft* untill the post is published.
:::

:::caution Warning
When the text from the Visual Editor is edited or removed all annotations being saved are lost. WordLift stores the editor's selection of entities in the content of the Visual Editor.
:::

## Manual Entity Selection

If you are looking to annotate an entity that hasn’t been suggested by the semantic analysis you still can do it manually.

Here is how it works:

First select the entity that you want to annotate

- Go to WordLift Edit Post Widget.
- Click on Add.
- Choose the entities that you want to annotate form the suggested list.

![image](./images/manual-entity-selection.gif)

## Adding Entities

The purpose of using WordLift is to (1) categorize your content, (2) help people find content of interest to them, and (3) help WordLift describe your contents in *machine-readable* format so that other computers can re-use it.

In some cases key concepts that are important for (1), (2) and (3) are not automatically detected by WordLift and need to be taught by creating new entities.

:::info Note
A basic guideline for adding entity is: people should apply entities the same way a librarian would plausibly use tags to classify the content you're writing if it was a book. For some basic guidelines on when creating new entities [read here](/pages/faq#what-are-the-guidelines-for-creating-new-entities-to-annotate-a-blog-post-or-a-page).
:::

New entities being added will become part of the [WordLift vocabulary](/pages/key-concepts#vocabulary).

Once an entity as been added to the vocabulary it will be automatically detected every-time you mention it again in your contents.

In our example one significant entity has not been detected and it is worth *teaching* it to WordLift.

![image](./images/wordlift-content-analysis-new-entity-highlight.gif)

The entity is *\[WordLift\]* itself. To create a new entity simply highlight the text `WordLift`, then click the button **Create New Entity** at the top of the [WordLift Edit Post Widget] and by clicking it you will be then able to edit the properties of the new entity.

![image](./images/wordlift-content-analysis-new-entity-creation.png)

Choose the category *Creative Work* (it also applies to *Software*), add a description and hit the "Save" button. Now the new entity will appear as [related entities](/pages/key-concepts#related-entities)  of the blog post along with *\[Web\]* and *\[Tim Berners-Lee\]*.

![image](./images/wordlift-content-analysis-new-entity-creation2.png)

:::caution Warning
When creating a new entity over **an existing annotation**: a) remove the annotated entity, b) re-write the entity and c) create a new one (as described above). See animation below.
:::

![image](./images/wl-new-entity-specific-case.gif)

## Updating and Linking Entities

### Updating the description

When we have something meaningful to say on a specific concept **we shall curate the information and edit the data that has been fetched automatically by WordLift** (*this will create our own version of Wikipedia*).

### Linking other entities

Entity pages can be annotated just like you would do with a blog posts.

After saving the new description you wrote, WordLift will analyze the text and suggest related entities. You can now *link* an entity with other entities. WordLift will store these relationships between one entity and other entities in the [graph](/pages/key-concepts#knowledge-graph) using the Dublin Core property `dct:related`. This information will be used to infer new connections between the contents of the site. For more information on *entity linking* [read the faq](/pages/faq#when-should-i-link-one-entity-to-another).

% Entities being *linked* are listed as **Releated Entities** in the editing screen of the entity.
%
% .. image:: /images/wordlift-content-analysis-new-entity-related-entity.png

## Synonyms

You can add synonyms in WordLift for any entity. Synonyms are marked up in the structured data using the schema property [alternateName](https://schema.org/alternateName)
. WordLift will automatically add the synonyms it knows for a given entity. WordLift also uses synonyms for its content analysis: if you want an entity to be detected in the future you shall add all the available synonyms (ie. “WWW” is a synonym for “World Wide Web” - capitalization will be ignored so “WWW” is the same as “www).

## Entity Types

Here follows the list of properties that can be edited with WordLift for each entity type.

| Type           | Description                                            | Properties                                                                                                                                                                            | Schema.org      |
| -------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Thing          | The most generic type of entity.                       | name,description,image, type,URL,sameAs, additionalType.                                                                                                                              | [Thing]         |
| Person         | A person.                                              | name,description,image, type,URL,sameAs, additionalType.                                                                                                                              | [Person]        |
| Place          | Entities with a physical extension.                    | name,description,image, type,URL,sameAs, additionalType,geo.                                                                                                                          | [Place]         |
| Event          | An event happening in a specific time and location.    | name,description,image, type,URL,sameAs, additionalType,location, startDate,endDate,performer, offers.                                                                                | [Event]         |
| Offer          | An offer.                                              | name,description,image, availability,price,URL, priceCurrency, availabilityStarts, availabilityEnds, inventoryLevel,validFrom, priceValidUntil,itemOffered.                           | [Offer]         |
| Organization   | An organization.                                       | name,description,image, type,URL,sameAs, additionalType,founder.                                                                                                                      | [Organization]  |
| Local business | A physical business or branch of an organization.      | name,description,image, type,URL,sameAs,address founder,geo.                                                                                                                          | [LocalBusiness] |
| Creative Work  | The most generic kind of Creative Work(i.e. Software). | name,description,image, type,URL,sameAs, additionalType.                                                                                                                              | [CreativeWork]  |
| Recipe         | A food recipe.                                         | name,description,image, type,URL,sameAs, additionalType, cookTime, prepTime, totalTime, recipeCuisine, recipeIngredient, recipeInstructions, recipeYield, author, nutrition.calories. | [Recipe]        |


[creativework]: http://schema.org/CreativeWork
[event]: http://schema.org/Event
[localbusiness]: http://schema.org/LocalBusiness
[offer]: http://schema.org/Offer
[organization]: http://schema.org/Organization
[person]: http://schema.org/Person
[place]: http://schema.org/Place
[recipe]: http://schema.org/Recipe
[thing]: http://schema.org/Thing