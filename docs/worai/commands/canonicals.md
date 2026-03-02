---
title: canonicals
---

Canonical URL workflows backed by SDK Search Console impressions.

## Usage
- `worai canonicals dedupe --input <csv_with_url_title> --site <property> [options]`

## Dedupe Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--input` | string | required | Input CSV with required columns `url,title`. |
| `--output` | string | `canonical_dedupe.csv` | Output CSV path (`url,title,canonical`). |
| `--site` | string | required | GSC property URL (for example `sc-domain:example.com`). |
| `--interval` | string | `28d` | Time window (`28d`, `4w`, `1m`, etc.). |
| `--url-regex` | string | none | Optional regex filter applied to input URLs. |
| `--concurrency` | string | `auto` | Max concurrent requests or `auto`. |
| `--request-timeout-sec` | float | `30.0` | Per-request timeout in seconds. |
| `--service-account` | string | none | Service account as file path or inline JSON body. |
| `--client-secrets` | string | none | OAuth client secrets path (used to create/repair token). |
| `--token` | string | `oauth_token.json` | OAuth user token path. |
| `--port` | int | `8080` | OAuth local redirect port. |

## Auth Modes
- Service account mode:
  - Use `--service-account`; no client secrets needed.
- OAuth mode:
  - If `--token` exists and is valid, `--client-secrets` is not required.
  - If token is missing/invalid, provide `--client-secrets` once to bootstrap OAuth.

## Profile Defaults
- `profiles.<name>.gsc_site_id`
- `profiles.<name>.oauth.service_account`
- `profiles.<name>.oauth.client_secrets`
- `profiles.<name>.oauth.token`
- `profiles.<name>.canonicals.output`
- `profiles.<name>.canonicals.interval`
- `profiles.<name>.canonicals.concurrency`
- `profiles.<name>.canonicals.request_timeout_sec`

`canonicals.output` supports interpolation:
- `{profile}`, `{yyyy}`, `{MM}`, `{dd}`, `{HH}`, `{mm}`, `{ss}`, `{date}`, `{time}`, `{seq}` or `{seq:3}`

## Examples
- `worai canonicals dedupe --input pages_with_titles.csv --site sc-domain:example.com --service-account ./service-account.json`
- `worai canonicals dedupe --input pages_with_titles.csv --site sc-domain:example.com --token oauth_token.json`
