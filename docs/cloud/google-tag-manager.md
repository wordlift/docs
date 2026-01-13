---
sidebar_position: 10
---

# Load WordLift Cloud with Google Tag Manager

Set up a Custom HTML tag in Google Tag Manager to load `bootstrap.js` on every page view.

## Prerequisites

- You have a Google Tag Manager account.
- A container is created for the website where you will load WordLift Cloud.
- You can log in to tagmanager.google.com with permission to edit tags.

## 1) Open the correct container

1. Go to https://tagmanager.google.com/.
2. If you have more than one account, choose the correct **Account**.
3. Select the **Container** for the target website.

You should now be on the **Workspace** for that container.

## 2) Create a new tag

1. In the left sidebar, click **Tags**.
2. In the upper right, click **New**.
3. In the tag card, click **Tag Configuration**.

## 3) Choose the tag type (Custom HTML)

1. In the **Choose tag type** panel, scroll to **Custom**.
2. Click **Custom HTML**.

You should see **Tag Type: Custom HTML** with an **HTML** code box.

## 4) Add the HTML code

1. In the **HTML** field, paste:

   ```html
   <!-- WL Cloud -->
   <script type="text/javascript" src="https://cloud.wordlift.io/app/bootstrap.js"></script>
   <!-- End WL Cloud -->
   ```

2. Leave other settings at their defaults unless instructed otherwise.

## 5) Add a Page View trigger for all pages

1. Under **Triggering**, click **Add Trigger**.
2. Select **Page View** (or **All Pages** if you already have one).
3. If you need a new trigger:
   - Click the plus icon.
   - Click **Trigger Configuration**.
   - Select **Page View**.
   - Under **This trigger fires on**, choose **All Page Views**.
   - Name it (for example `Page View - All Pages`) and save.
4. Confirm the Page View trigger is listed under **Triggering** for the Custom HTML tag.

## 6) Name and save the tag

1. Replace **Untitled Tag** with a clear name (for example `WL Cloud bootstrap`).
2. Click **Save**.

## 7) Preview and publish

1. In the top right of the workspace, click **Preview**.
2. Enter your site URL and start the preview session.
3. In Tag Assistant, navigate a few pages and confirm the Custom HTML tag fires on **Page View** events.
4. If everything looks correct, return to Google Tag Manager and click **Submit**.
5. Add a version name/description if desired, then click **Publish**.

The `bootstrap.js` script now loads on all page views for this container.
