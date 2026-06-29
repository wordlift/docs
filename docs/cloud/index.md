---
sidebar_position: 0
---

# WordLift Cloud

Bring WordLift’s semantic markup to any site by loading a single launcher script.

:::note WordPress
If you are using WordPress, you can use the [WordPress Plugin](./wordpress-plugin.md) to inject `bootstrap.js` instead of adding the script manually.
:::

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

## Content Security Policy

If your website uses a Content Security Policy (CSP), allow both the WordLift Cloud script and the WordLift API endpoint.

The launcher is loaded from:

```text
https://cloud.wordlift.io
```

The launcher fetches structured data from:

```text
https://api.wordlift.io
```

Add these domains to the existing CSP directives without removing the domains your site already uses:

```http
Content-Security-Policy:
  script-src 'self' https://cloud.wordlift.io ...existing domains...;
  connect-src 'self' https://api.wordlift.io ...existing domains...;
```

If the CSP is configured with an HTML `<meta>` tag, the configuration should look similar to:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self'
      https://cloud.wordlift.io
      ...existing domains...;
    connect-src 'self'
      https://api.wordlift.io
      ...existing domains...;
  "
>
```

If `https://api.wordlift.io` is missing from `connect-src`, browsers block the API request and log an error similar to `Refused to connect because it violates the document's Content Security Policy`.

## bootstrap.js FAQ

### 1. What does it do?

The WordLift Cloud launcher (`bootstrap.js`) is a JavaScript script that you add to your website. Its main function is to load WordLift Cloud features on the page.

When installed, the script:

- Connects the page to WordLift Cloud services.
- Retrieves structured data (JSON-LD) generated through WordLift annotations.
- Injects that structured data into the page markup.
- Enables the WordLift Sidebar widget for annotating entities and managing semantic metadata.

These annotations are stored in WordLift Cloud and automatically published as `schema.org` JSON-LD markup on the page.

### 2. How do you use it?

To use WordLift Cloud, add the launcher script to the `<head>` section of every page you want to annotate.

```html
<!-- WL Cloud -->
<script async type="text/javascript" src="https://cloud.wordlift.io/app/bootstrap.js"></script>
<!-- End WL Cloud -->
```

Recommended implementation details:

- Place the script near the top of `<head>` so it loads early.
- Use the `async` attribute so it does not block page rendering.
- Alternatively, deploy the same script through Google Tag Manager using a Custom HTML tag triggered on all page views.

### 3. How are cookies involved?

The `bootstrap.js` script does not use cookies or similar client-side tracking technologies and does not store any information in the user's browser.

### 4. Should bootstrap.js be placed behind cookie consent?

No. The WordLift Cloud script must load on page view so WordLift can inject `schema.org` JSON-LD and Google can parse the structured data.

It is also not necessary to gate it behind cookie consent because `bootstrap.js` does not use cookies or similar client-side tracking technologies and does not store information in the visitor's browser.

For sites that prefer not to rely on client-side injection, WordLift also supports [server-side JSON-LD injection through the Data API](../knowledge-graph/data-api.md#server-side-rendering).

### 5. Do we share personal data with WordLift?

No personally identifiable information is collected through the script. The system records only an anonymized IP address for operational logging purposes. This IP address cannot be linked to an individual and is automatically removed when the log retention period ends.

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
| `data-sidebar` | `"false"` disables sidebar listeners (enabled by default) |
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

## Server-side rendering

If you control the server-side rendering pipeline, you can fetch structured data directly from the [Data API](../knowledge-graph/data-api.md) and inject it into the initial HTML response instead of loading it client-side with `bootstrap.js`.

Use server-side rendering when JSON-LD must be available in the raw HTML response, including for crawlers or AI retrieval systems that do not execute JavaScript. See [Choosing client-side or server-side injection](../knowledge-graph/data-api.md#choosing-client-side-or-server-side-injection) for the full guidance.

If you are moving an existing client-side implementation to server-side rendering, follow [Migrate from Client-Side API to Server-Side API](../knowledge-graph/migrate-client-side-to-server-side-data-api.md).

## Validate the markup

- Use Google’s [Rich Results Test](https://search.google.com/test/rich-results) or your preferred structured data validator.
- Check your network panel for requests to `cloud.wordlift.io/app/bootstrap.js` to confirm the launcher loads.
- Inspect the rendered DOM to verify JSON-LD is injected after annotating. Client-side JSON-LD added by `bootstrap.js` will not appear in the raw page source.

## Troubleshooting

- Widget not opening: ensure you are logged in and the launcher is present in `<head>`.
- Language mismatch: set the correct `lang` on `<html>`; the launcher derives `__wl_lang` from it.
- Script or API request blocked: check the [Content Security Policy](#content-security-policy) configuration and ad blockers that might block WordLift Cloud.
- `bootstrap.js` must be in `<head>` directly; other loaders can delay markup so Google misses it.
- Google Tag Manager is the only supported alternative loader (see [GTM setup](./google-tag-manager.md)).

## Need help?

[Contact us](https://wordlift.io/contact-us/) and our concierge team will help you get the best out of WordLift Cloud.
