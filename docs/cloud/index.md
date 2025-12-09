---
sidebar_position: 0
---

# WordLift Cloud

Bring WordLift’s semantic markup to any site by loading a single launcher script.

<iframe src="https://www.youtube.com/embed/DF4HQENosfo?rel=0&amp;showinfo=0" width="100%" height="540" frameborder="0" scrolling="auto" referrerpolicy="strict-origin-when-cross-origin"></iframe>

## Before you start

- A WordLift Cloud account and access key (contact us if you need one).
- Access to add scripts in the `<head>` of your pages.
- (Optional, but recommended for multilingual sites) Set the page language with `<html lang="...">` so the correct graph is selected.

## Add the WordLift Cloud script

Place the launcher in the `<head>` of every page you want to annotate:

```html
<!-- WL Cloud -->
<script async type="text/javascript" src="https://cloud.wordlift.io/app/bootstrap.js"></script>
<!-- End WL Cloud -->
```

Keep it near the top of `<head>` so it loads early; `async` ensures it does not block rendering.

## FAQ rendering (overview)

FAQ rendering activates only if **all** of the following are true:

1. The bootstrap detects a `FAQPage` object in the loaded JSON-LD.
2. FAQ rendering is enabled via the `data-faq` attribute or global config.
3. A DOM element matching `data-faq-target-id` exists.
4. A template is provided in the page via:

   ```html
   <script type="text/template" id="wl-faq-template" hidden>
     <!-- Mustache template here -->
   </script>
   ```

5. Mustache and DOMPurify are lazy-loaded only at this stage.
6. Answer HTML is sanitized using a strict allow-list of tags permitted by Google Search for FAQ rich results:

   ```
   h1–h6, br, ol, ul, li, a, p, div, b, strong, i, em
   ```

All other tags and attributes are removed. JSON-LD itself remains untouched and contains no custom configuration fields.

## Usage in HTML (FAQ)

Enable FAQ rendering when loading the bootstrap:

```html
<script
  async
  src="https://cloud.wordlift.io/app/bootstrap.js"
  data-faq="true"
  data-faq-target-id="faq-container"
  data-faq-template-id="wl-faq-template"
></script>
```

Insert the FAQ template:

```html
<script type="text/template" id="wl-faq-template" hidden>
<ul class="faq-list">
  {{#faqs}}
    <li class="faq-item">
      <strong class="faq-question">{{question}}</strong>
      <div class="faq-answer">{{{answer}}}</div>
    </li>
  {{/faqs}}
</ul>
</script>
```

Provide the target container:

```html
<div id="faq-container"></div>
```

When the loaded JSON-LD includes a `FAQPage` and FAQ rendering is enabled, sanitized FAQ markup is inserted automatically.

## Configuration options

Configuration is read from `<script data-*>` attributes and can be overridden with `window._wlCloudSettings`.

| Attribute | Description |
|----------|-------------|
| `data-faq` | `"true"` to enable FAQ rendering |
| `data-faq-target-id` | DOM element ID to inject FAQ markup into |
| `data-faq-template-id` | Script/template element ID for rendering (defaults to `wl-faq-template`) |
| `data-sidebar-url` | URL for the sidebar feature |
| `data-disable-jsonld` | `"true"` disables JSON-LD loading |
| `data-web-page-url` | Overrides detected page URL |
| `data-target-origin` | Target origin for `postMessage` |
| `data-api-url` | URL template for fetching JSON-LD |
| `data-data-formatter` | Optional formatter hint passed to the API |

## Annotate a page

1. Open a page where the script is installed.
2. Log in with your WordLift Cloud credentials.
3. Launch the WordLift Sidebar widget with `Ctrl + Alt + W`.
4. Point and click the area you want to annotate.
5. Pick the relevant entities; WordLift saves and publishes the JSON-LD automatically.

## Multilingual behavior

The launcher reads the `lang` attribute on the `<html>` element and appends `__wl_lang` to requests automatically (for example `lang="en"` sets `__wl_lang=en`). See [Multilingual Graphs](../knowledge-graph/multilingual.md) for details.

## Validate the markup

- Use Google’s [Rich Results Test](https://search.google.com/test/rich-results) or your preferred structured data validator.
- Check your network panel for requests to `cloud.wordlift.io/app/bootstrap.js` to confirm the launcher loads.
- View page source to verify JSON-LD is injected after annotating.

## Troubleshooting

- Widget not opening: ensure you are logged in and the launcher is present in `<head>`.
- Language mismatch: set the correct `lang` on `<html>`; the launcher derives `__wl_lang` from it.
- Script blocked: check Content Security Policy and ad blockers that might block `cloud.wordlift.io`.
- `bootstrap.js` must be in `<head>` directly; other loaders can delay markup so Google misses it.
- Google Tag Manager is the only supported alternative loader (see [GTM setup](./google-tag-manager.md)).

## Need help?

[Contact us](https://wordlift.io/contact-us/) and our concierge team will help you get the best out of WordLift Cloud.
