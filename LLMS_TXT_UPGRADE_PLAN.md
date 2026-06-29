# llms.txt Maintenance Notes

## Current Status

The WordLift documentation site uses `docusaurus-plugin-llms-builder` to generate AI-consumable documentation artifacts:

- `llms.txt`
- `llms-full.txt`

The plugin is configured in `docusaurus.config.js` and is included in `package.json`.

## When To Update

Regenerate or rebuild the artifacts after changes that should be visible to AI tools, especially:

- new canonical documentation pages;
- release or version notice updates;
- navigation or sidebar changes;
- API guide changes;
- major product documentation updates.

## Recommended Workflow

1. Update the source docs.
2. Run the standard validation checks:

   ```bash
   npm run test:sidebars
   npm run typecheck
   npm run build
   ```

3. Verify that `llms.txt` and `llms-full.txt` reflect the updated source content.
4. Do not manually duplicate long-form page content in separate meta files.

## Current Release Context

Latest docs release: `3.20.16` (June 2026).

Release note: The WordLift Cloud `bootstrap.js` FAQ clarifies that the script must not be placed behind cookie consent because it publishes `schema.org` JSON-LD and does not use cookies or similar client-side tracking technologies.

## Notes

- `llms.txt` should remain a concise index for AI tools.
- `llms-full.txt` may contain full documentation content and can be large.
- The canonical source for documentation remains the files under `docs/`.
- If generated artifacts drift from source docs, regenerate them rather than editing the generated content by hand.
