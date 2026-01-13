---
title: google-search-console
---

Export Google Search Console page metrics to CSV for 7d, 28d, and 3m windows.

## Usage
- `worai google-search-console --site <property> --client-secrets <path> [options]`

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--site` | string | required | GSC property to query (e.g., `sc-domain:example.com` or `https://example.com/`). |
| `--client-secrets` | string | required | Path to OAuth client secrets JSON file. |
| `--token` | string | `gsc_token.json` | Path to store OAuth token. |
| `--port` | int | `0` | Local redirect port for OAuth flow (0 = random). |
| `--output` | string | `gsc_pages.csv` | Output CSV path. |
| `--row-limit` | int | `25000` | Row limit for GSC API pagination. |
| `--type` | choice | `web` | Search type: `web`, `image`, `video`, `news`, `discover`. |
| `--data-state` | choice | `all` | Data state: `all` or `final`. |

## Examples
- `worai google-search-console --site sc-domain:example.com --client-secrets ./client_secrets.json`
- `worai google-search-console --site https://example.com/ --client-secrets ./client_secrets.json --output gsc.csv`
