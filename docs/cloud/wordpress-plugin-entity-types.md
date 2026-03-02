---
sidebar_position: 30
---

# Select Entity Types for a Web Page

Use this workflow to set one or more `wl_entity_type` values on a post or page.

## Block Editor (Gutenberg)

1. Open a post or page in the block editor.
2. In the right sidebar, open **Entity Types**.
3. Use the **Selected**, **All**, **Most Used**, and **A-Z** tabs to find types.
4. Check one or more entity types.
5. Click **Update** (or **Publish**) to save.

![Entity Types panel in block editor](/img/cloud-plugin/step-3-block-editor-entity-types.png)

## Classic Editor

1. Open a post or page in the classic editor.
2. In the **Entity Types** metabox, select one or more checkboxes.
3. Use the tabs:
   - **Selected** to keep current choices visible.
   - **All** for the hierarchical view.
   - **Most Used** for common types.
   - **A-Z** for a flat alphabetical list.
4. Click **Update**.

![Entity Types metabox in classic editor](/img/cloud-plugin/step-4-classic-editor-entity-types.png)

After saving, WordPress confirms the update:

![Post updated notice in classic editor](/img/cloud-plugin/step-5-classic-editor-post-updated.png)

## Verify on the front end

On the public page HTML, the plugin outputs one meta entry per selected entity type. Inspect the page source and look for:

```html
<meta name="wl:entity_type" content="about-page" />
```

If multiple types are selected, multiple `wl:entity_type` meta tags are rendered.
