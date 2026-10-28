---
title: "Install WordLift Cloud"
description: "Add the WordLift Cloud launcher to your site with a script tag, Google Tag Manager or the WordPress plugin, then allow it in your CSP and check the JSON-LD."
sidebar_position: 0
last_updated: 2026-10-27
---

# Install WordLift Cloud

WordLift Cloud publishes your Knowledge Graph's structured data on any website through one launcher script, `bootstrap.js`. Installing it is step 6 of the [onboarding sequence](/welcome/#onboarding-overview).

<iframe title="Install WordLift Cloud (video)" src="https://www.youtube.com/embed/DF4HQENosfo?rel=0&amp;showinfo=0" width="100%" height="540" frameborder="0" scrolling="auto" referrerpolicy="strict-origin-when-cross-origin"></iframe>

:::warning[Review needed]
TODO [SME]: confirm the embedded install video (DF4HQENosfo) is still current, or remove it.
:::

## Before you start {#before-you-start}

- **A WordLift Cloud account and access key.** The key comes with your WordLift subscription. If you do not have one, contact your WordLift account team.
- **Access to your site's code or tools.** You need to edit the `<head>` of your pages, a Google Tag Manager container or the WordPress admin.
- **The page language, on multilingual sites.** Set `<html lang="...">` on every page so the correct graph is selected. This is optional, but recommended for multilingual sites.
- **Enterprise only: your dataset URI and custom domain decided.** Choose the dataset URI strategy before production, because changing it later can require an identifier migration. See [Custom domain](/plans-and-pricing/custom-domain/).

:::warning[Review needed]
TODO [SME]: confirm whether the WordLift Cloud access key is the WordLift Key shown at my.wordlift.io.
:::

## Add the WordLift Cloud script {#add-the-wordlift-cloud-script}

Place the launcher in the `<head>` of every page you want to annotate:

```html
<!-- WL Cloud -->
<script async type="text/javascript" src="https://cloud.wordlift.io/app/bootstrap.js"></script>
<!-- End WL Cloud -->
```

Keep it near the top of `<head>` so it loads early. The `async` attribute keeps it from blocking page rendering.

Once installed, the script:

- Connects the page to WordLift Cloud services.
- Retrieves the structured data (JSON-LD) generated through WordLift annotations.
- Injects that structured data into the page markup.
- Enables the WordLift Sidebar widget, where you annotate entities and manage semantic metadata.

WordLift stores your annotations in WordLift Cloud and publishes them on the page as `schema.org` JSON-LD.

Load `bootstrap.js` in `<head>` directly. Other loaders can delay the markup so Google misses it. Google Tag Manager is the only supported alternative loader: see [Load WordLift Cloud with Google Tag Manager](/platform/knowledge-graph/schema-publishing/wordlift-cloud/google-tag-manager/). On WordPress, use the [WordLift Cloud plugin](#wordpress-plugin) instead.

### Multilingual sites {#multilingual-behavior}

The launcher reads the `lang` attribute on the `<html>` element and appends `__wl_lang` to its requests (for example, `lang="en"` sets `__wl_lang=en`). See [Multilingual](/platform/knowledge-graph/multilingual/).

### Server-side delivery {#server-side-rendering}

If you control the server-side rendering pipeline, fetch the structured data from the [Data API](/apis-and-sdks/data-api/#server-side-rendering) and inject it into the initial HTML instead of using `bootstrap.js`. Choose this when JSON-LD must be in the raw HTML response, including for crawlers or AI retrieval systems that do not run JavaScript. See [Choosing client-side or server-side injection](/apis-and-sdks/data-api/#choosing-client-side-or-server-side-injection), and [Migrate from the client-side API to the server-side API](/apis-and-sdks/data-api/migrate/) if you already use `bootstrap.js`.

## Install with the WordPress plugin {#wordpress-plugin}

On WordPress, the WordLift Cloud plugin loads `bootstrap.js` on your front-end pages, so you do not add the script by hand. The WordLift Cloud plugin is not the classic WordLift plugin. The classic plugin is documented for existing customers under [WordPress plugin](/integrations/wordpress-plugin/), and new customers start with WordLift Cloud.

:::warning[Review needed]
TODO [SME]: state where customers get the WordLift Cloud WordPress plugin, and what the plugin's consent gate or filter on `bootstrap.js` loading does.
:::

The plugin adds:

- **Script loading.** The plugin injects `https://cloud.wordlift.io/app/bootstrap.js` on front-end pages, subject to its consent gate or filter.
- **FAQ rendering defaults.** You set the global FAQ rendering behavior for WordLift Cloud output, and override it per post.
- **An Entity Types panel.** The post and page editors get an **Entity Types** panel, backed by a managed `wl_entity_type` taxonomy built from a distilled Schema.org dataset. To assign types, see [Select Entity Types for a web page](/integrations/wordpress-plugin/entity-types/).
- **Entity type metadata.** The plugin outputs the selected entity types in the page metadata on the front end.
- **Optional telemetry.** You can turn on admin-only usage telemetry.

### Open the plugin settings {#open-plugin-settings}

1. Go to **Plugins > Installed Plugins**.
2. Find **WordLift Cloud** and select **Settings**.

   ![WordPress Installed Plugins list with the Settings link on the WordLift Cloud plugin row](/img/cloud-plugin/step-1-plugins-page.png)

3. Review the settings in **Settings > WordLift Cloud**.

   ![WordLift Cloud settings page in the WordPress admin](/img/cloud-plugin/step-2-settings-page.png)

### Plugin settings {#settings-behavior}

| Setting | What it does |
| --- | --- |
| **Enable FAQ rendering** | Sets the global FAQ rendering default. Off by default. When on, the plugin adds the FAQ `data-*` attributes to the bootstrap script and outputs the in-page template markup (`wl-faq-template`). |
| **FAQ target element ID** | Identifies the element where FAQ HTML is rendered. The plugin does not create this container: add it to your theme or templates. If FAQ rendering is on and the container is missing, logged-in admins see a notice on the front end. |
| **FAQ HTML template** | Holds the editable HTML or Mustache template used for FAQ rendering. |
| **Enable telemetry** | Optional and admin-only. Tracks authenticated back-end feature usage. The plugin injects no public front-end telemetry snippet. |

### Turn FAQ rendering on or off for one post {#enable-or-disable-faq-per-post}

Every public post type has a **FAQ** metabox on the edit screen. Its setting overrides the global FAQ setting for that post:

- **Inherit (default)**: use the global plugin setting.
- **Enable**: turn FAQ rendering on for this post.
- **Disable**: turn FAQ rendering off for this post.

![FAQ metabox with Inherit, Enable and Disable options in the WordPress Block Editor](/img/cloud-plugin/step-7-block-editor-faq-metabox.png)

The Classic Editor shows the same metabox:

![FAQ metabox with Inherit, Enable and Disable options in the WordPress Classic Editor](/img/cloud-plugin/step-6-classic-editor-faq-metabox.png)

## Content Security Policy, cookies and privacy {#csp-cookies-and-privacy}

### Content Security Policy {#content-security-policy}

If your website uses a Content Security Policy (CSP), allow both the WordLift Cloud script and the WordLift API endpoint.

The launcher loads from:

```text
https://cloud.wordlift.io
```

The launcher fetches structured data from:

```text
https://api.wordlift.io
```

Add these domains to your existing CSP directives, and keep the domains your site already uses:

```http
Content-Security-Policy:
  script-src 'self' https://cloud.wordlift.io ...existing domains...;
  connect-src 'self' https://api.wordlift.io ...existing domains...;
```

If you set the CSP with an HTML `<meta>` tag, the configuration looks similar to this:

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

### Cookies and privacy {#bootstrapjs-faq}

- **Cookies.** `bootstrap.js` uses no cookies or similar client-side tracking technologies, and stores no information in the visitor's browser.
- **Cookie consent.** Do not place `bootstrap.js` behind cookie consent. It must load on page view so WordLift can inject the `schema.org` JSON-LD and Google can parse it. Because it uses no cookies, no consent gate is needed. If you prefer not to rely on client-side injection, use [server-side delivery](#server-side-rendering).
- **Personal data.** The script collects no personally identifiable information. WordLift records only an anonymized IP address for operational logging. This address cannot be linked to an individual, and WordLift removes it automatically when the log retention period ends.

## Check the installation {#validate-the-markup}

1. Open your browser's network panel and confirm a request to `cloud.wordlift.io/app/bootstrap.js`.
2. After you annotate a page, inspect the rendered DOM and confirm the JSON-LD is there. Client-side JSON-LD added by `bootstrap.js` does not appear in the raw page source.
3. Test the page with Google's [Rich Results Test](https://search.google.com/test/rich-results) or your preferred structured data validator.

### Troubleshooting {#troubleshooting}

| Symptom | Fix |
| --- | --- |
| The Sidebar widget does not open. | Log in with your WordLift Cloud credentials, and check that the launcher is in `<head>`. |
| The wrong language graph loads. | Set the correct `lang` on `<html>`. The launcher derives `__wl_lang` from it. |
| The script or API request is blocked. | Check your [Content Security Policy](#content-security-policy), and any ad blocker that might block WordLift Cloud. |
| Google misses the structured data. | Load `bootstrap.js` in `<head>` directly, or through Google Tag Manager. Other loaders can delay the markup. |

## Annotate a page {#annotate-a-page}

1. Open a page where the script is installed.
2. Log in with your WordLift Cloud credentials.
3. Press `Ctrl + Alt + W` to open the WordLift Sidebar widget.
4. Point and click the area you want to annotate.
5. Pick the relevant entities.

WordLift saves your annotations and publishes the JSON-LD automatically.

## FAQ rendering and configuration options {#configuration-options}

`bootstrap.js` can render the questions and answers in your JSON-LD as visible FAQ markup on the page. It reads its configuration from `<script data-*>` attributes, and you can override them with `window._wlCloudSettings`.

### When FAQ rendering runs {#faq-rendering-overview}

FAQ rendering runs only when all of these are true:

1. The bootstrap detects a `FAQPage` object in the loaded JSON-LD.
2. FAQ rendering is enabled with the `data-faq` attribute or the global configuration.
3. A DOM element matching `data-faq-target-id` exists.
4. The page provides a template:

   ```html
   <script type="text/template" id="wl-faq-template" hidden>
     <!-- Mustache template here -->
   </script>
   ```

When these conditions are met, the bootstrap lazy-loads Mustache and DOMPurify. It sanitizes the answer HTML with a strict allow-list of the tags Google Search permits for FAQ rich results:

```text
h1 to h6, br, ol, ul, li, a, p, div, b, strong, i, em
```

It removes all other tags and attributes. The JSON-LD itself stays untouched and contains no custom configuration fields.

### Enable FAQ rendering in HTML {#usage-in-html-faq}

1. Enable FAQ rendering when you load the bootstrap:

   ```html
   <script
     async
     src="https://cloud.wordlift.io/app/bootstrap.js"
     data-faq="true"
     data-faq-target-id="faq-container"
     data-faq-template-id="wl-faq-template"
   ></script>
   ```

2. Add the FAQ template:

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

3. Add the target container:

   ```html
   <div id="faq-container"></div>
   ```

When the loaded JSON-LD includes a `FAQPage`, the bootstrap inserts the sanitized FAQ markup into the container.

### Configuration attributes {#configuration-attributes}

| Attribute | Description |
| --- | --- |
| `data-faq` | `"true"` enables FAQ rendering. |
| `data-faq-target-id` | DOM element ID to inject the FAQ markup into. |
| `data-faq-template-id` | Script or template element ID used for rendering. Defaults to `wl-faq-template`. |
| `data-sidebar` | `"false"` disables the sidebar listeners, which are enabled by default. |
| `data-sidebar-url` | URL for the sidebar feature. |
| `data-disable-jsonld` | `"true"` disables JSON-LD loading. |
| `data-web-page-url` | Overrides the detected page URL. |
| `data-target-origin` | Target origin for `postMessage`. |
| `data-api-url` | URL template for fetching JSON-LD. |
| `data-data-formatter` | Optional formatter hint passed to the API. |

## Next steps

- **Run a multilingual site.** Learn how the language of each page selects its graph in [Multilingual](/platform/knowledge-graph/multilingual/).
- **Move JSON-LD into the initial HTML.** Use [server-side rendering with the Data API](/apis-and-sdks/data-api/#server-side-rendering).
- **Learn how structured data is published.** Read [Schema publishing](/platform/knowledge-graph/schema-publishing/).
- **Find your way around the Dashboard.** See [Dashboard](/platform/dashboard/).
- **Get help.** Email support@wordlift.io or use the [contact page](/support/contact/).
