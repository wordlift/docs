---
title: "WordLift theme development"
description: "Extend a WordPress theme to support the classic WordLift plugin: the data model, content APIs, entity templates, Navigator and context card styling."
sidebar_label: "Theme development"
last_updated: 2026-10-27
---

# WordLift theme development

## Who should read this

This page is for web developers who want to extend their themes to support WordLift's data model and features.

The first section describes the WordLift data model, that is, *how WordPress stores additional properties for entities*.

## WordLift data model

1. WordLift Entities are **custom posts**;
2. Entity properties are managed as standard posts' metadata;
3. Entity types are managed through a [custom taxonomy](https://codex.wordpress.org/Taxonomies#Custom_Taxonomies);
4. **When a property references another entity:**
     - Its value is the entity ID (if the entity is inside the same WordPress site),
     - Its value is the entity URI (if the entity is outside the WordPress site).
5. The 4Ws classification, that is, the relationships among posts and entities, are stored in a custom table called *wl_relation_instances*.
6. WordLift's Topics are a [custom taxonomy](https://codex.wordpress.org/Taxonomies#Custom_Taxonomies)

## Content filtering: available APIs {#content-filtering---available-apis}

1. Standard WordPress methods (such as [get_posts](https://codex.wordpress.org/Template_Tags/get_posts) and [get_post_meta](https://developer.wordpress.org/reference/functions/get_post_meta/)) can be used on entities;
2. [get_post_terms](https://codex.wordpress.org/Function_Reference/wp_get_post_terms) can be used to extract topics from posts see the example below;

```php
wp_get_post_terms( <post_id>, Wordlift_Topic_Taxonomy_Service::TAXONOMY_NAME, <args> )
```

3. WordLift's *Properties API* can be used to read/write entity properties using schema.org property names. See the [Properties API source](https://github.com/insideout10/wordlift-plugin/blob/master/src/modules/core/wordlift_core_schema_api.php);
4. WordLift's *Relations API* can be used to access 4W relationships. See the [Relations API source](https://github.com/insideout10/wordlift-plugin/blob/master/src/modules/core/wordlift_core_post_entity_relations.php).

## Personalization of entity pages: single post {#personalization-of-entity-pages---single-post}

Entities are configured in WordPress as [Custom Post Types](https://codex.wordpress.org/Post_Types#Custom_Post_Types) and the post type is called **entity**.

To personalize the design of entity pages, use the template file called [Single Post](https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post).

Template files in WordPress are modular, reusable files that create the web pages on your website. To learn how to customize an existing WordPress theme or create a new one, read the [template hierarchy page](https://developer.wordpress.org/themes/basics/template-hierarchy/) on the WordPress website or visualize the [WordPress template hierarchy](https://wphierarchy.com/).

:::info Note
When [articles or pages are turned into entities](https://wordlift.io/blog/en/wordlift-3-15/) they maintain their existing post type.
:::

To personalize the template based on the entity type, use the following:

```php
Wordlift_Entity_Type_Service::get_instance()->get( $post_id )
```

This will return:

```php
    * @return array|null {
* An array of type properties or null if no term is associated
*
* @type string css_class     The css class, e.g. `wl-thing`.
* @type string uri           The schema.org class URI, e.g. `http://schema.org/Thing`.
* @type array  same_as       An array of same as attributes.
* @type array  custom_fields An array of custom fields.
* @type array  linked_data   An array of {@link Wordlift_Sparql_Tuple_Rendition}.
* }
```

## Personalization of the Navigator widget

The [Navigator widget](/integrations/wordpress-plugin/widgets/#navigator) by default is wrapped in a `wl-navigator` class. You can style this class and the child element classes using CSS.

Optionally, while using the navigator, you can also specify a `template_id` to style a specific instance with its own template.
The template can be written using [Mustache](https://github.com/Mustache/Mustache): a framework-agnostic way to style web components.

Here's a sample code that you can use as reference:

```html
<script id="wordlift_navigator_sidebar_template" type="text/mustache">
{{#items}}
<div class="related-articles__item">
<a class="related-articles__img" href="{{post.permalink}}"><img src="{{{post.thumbnail}}}" alt="{{{post.title}}}" title="{{{post.title}}}"></a>
<div class="related-articles__content">
    <h4 class="related-articles__title"><a href="{{post.permalink}}">{{{post.title}}}</a></h4>
</div>
</div>
{{/items}}
</script>
```

As a theme developer, you have complete flexibility over both the contents of these templates and the CSS styling.
See the [parameters supported](/integrations/wordpress-plugin/widgets/#navigator-widget) by the Navigator widget.

## Personalization of the context cards

[Context Cards](/integrations/wordpress-plugin/widgets/#context-cards) provide an immediate preview of an entity. If the entity is annotated and links are active, WordLift shows a preview of the annotated entity.

By default, context cards appear on hover if Links to Entity Pages are enabled. To disable context cards, add the following code to your theme:

The context card itself is wrapped in a `wl-context-card` class. You can style this class and the child element classes using CSS. Other classes that you can use to style the context cards:

- `wl-context-card__image`: image element
- `wl-context-card__description`: wrapper element around the complete description
- `wl-context-card__description__logo`: publisher logo image element
- `wl-context-card__description__text`: wrapper element around the description text

### Advanced filters to override default behavior {#advanced-filters-to-override-default-behaviour}

#### JavaScript filter `wl_context_cards_load_fn_supplier`

This is a function supplier filter that the context card applies if provided. Use it to supply a function that overrides the default function that returns a fetch (or any other request library) promise.

This filter receives two arguments:

1. Endpoint of the context cards (`url`)
2. DOM element that triggered the context card (`el`)

The filter is expected to return a fetch (or any other request library) promise with the desired request.

Here's a sample implementation of this filter:

```Javascript
const settings = global["_wlEntityRedirectSettings"];

addFilter("wl_context_cards_load_fn_supplier", "wordlift", (defaultFn) => {
    return (url, el) => {
        const enabled = el.getAttribute("data-entity-redirect-enabled");

        // If entity redirect isn't enabled for this target, then return the defaultFn.
        if ("true" !== enabled) return defaultFn(url, el);

        const join = -1 === url.indexOf("?") ? "?" : "&";
        // should load things
        const ids = el
            .getAttribute("data-id")
            .split(";")
            .map((s) => encodeURIComponent(s));

        const params =
            `${join}website=1&entity-redirect=true&id[]=` + ids.join("&id[]=");

        return fetch(`${settings.url}${params}`)
            .then((response) => response.json())
            .then((json) => {
                // Return the JSON if it contains at least 2 elements (i.e. an entity and the web site).
                if (1 < json.length) return json;

                // Otherwise return the default function.
                return defaultFn(url, el);
            });
    };
});
```

#### PHP filter `wl_anchor_data_attributes`

This filter lets you add custom data attributes to `<a class="wl-anchor" />` links in the post. It receives the existing `attributes` and the `post_id`. Here's a sample implementation of this filter:

```PHP
add_filter( 'wl_anchor_data_attributes', function ( $attributes, $post_id ) {

    return $attributes + array(
            'entity-redirect-enabled' =>
                ( Wordlift_Entity_Redirect_Status::is_enabled( $post_id ) ? 'true' : 'false' )
        );
}, 10, 2 );
```
