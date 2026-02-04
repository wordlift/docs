---
title: seoreport
---

Generate an SEO performance report from Google Search Console, optionally enriched with GA4 Analytics (Web vs AI).

## Usage

- `worai seoreport --site <property> [options]`

## Key options

- `--site` (required): GSC property URL (e.g. `sc-domain:example.com`).
- `--format`: `markdown` or `html` (default `markdown`).
- `--output`: output path (default `seo_report_<timestamp>.md/html`).
- `--url-regex`: filter pages by regex.
- `--client-secrets`: OAuth client secrets JSON for GSC (also used for GA4 if `--ga-client-secrets` is not set).
- `--token`: path for the shared OAuth token (GSC + GA4). Defaults to `./oauth_token.json` if not set anywhere.
- `--port`: local redirect port for the OAuth flow (default `8080`).
- `--inspect-limit`: number of top pages to inspect (default `10`, GSC quota).

### Analytics (GA4)

- `--ga-id`: GA4 property ID to enable the Analytics section.
- `--ga-client-secrets`: OAuth client secrets for GA4 (defaults to GSC secrets).
- `--ga-token`: Deprecated. Use `--token` for shared OAuth token. If provided, it must match `--token`.
- `--ga-direct-share`: share of Direct traffic reallocated to AI (0-1, default `0.3`).
- `--ga-source-regex`: source regex for AI detection (default `(chatgpt|openai|gemini|copilot|perplexity)`).
- `--ga-channel-group-name`: custom GA4 channel group name (default `AI Channel Group`).
- `--ga-channel-group-id`: custom GA4 channel group ID.

### Concurrency

- `--gsc-max-workers`: max parallel workers for GSC requests (default `3`).
- `--ga-max-workers`: max parallel workers for GA4 requests (default `3`).

## Examples

- `worai seoreport --site sc-domain:example.com --format html`
  - Uses OAuth redirect port 8080 by default.
- `worai seoreport --site sc-domain:example.com --ga-id 123456789 --format html`
- `worai seoreport --site sc-domain:example.com --ga-id 123456789 --ga-direct-share 0.2`
