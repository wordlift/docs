---
title: Custom Domain Configuration
description: Configure a customer-owned domain for WordLift Enterprise Knowledge Graph dataset URIs using a CNAME record or a reverse proxy.
sidebar_position: 1
keywords:
  - WordLift custom domain
  - Enterprise custom domain
  - Knowledge Graph custom domain
  - dataset URI
  - CNAME custom.wordlift.io
  - custom.wordlift.io
---

# Custom Domain Configuration

Enterprise customers can publish WordLift Knowledge Graph data under a customer-owned domain, such as `https://data.example.org`.

This page explains the two supported configuration patterns:

- **CNAME setup:** point the custom domain to `custom.wordlift.io`. WordLift handles SSL certificate configuration.
- **Reverse proxy setup:** proxy requests to `custom.wordlift.io`. Your organization handles SSL/TLS certificate configuration and renewal.

Custom domain activation is coordinated with WordLift after DNS or proxy configuration is ready.

## Before you start

Confirm these details before changing DNS or proxy configuration:

| Item | What to confirm | Example |
| --- | --- | --- |
| Dataset domain | The host name that will publish the Knowledge Graph. | `data.example.org` |
| Dataset name | The dataset path or name agreed with WordLift. | `dataset` |
| Setup mode | Whether you will use CNAME setup or reverse proxy setup. | CNAME |
| DNS owner | The person or team that can update DNS records. | Platform team |
| Activation contact | The person who will coordinate activation with WordLift. | Project technical owner |
| Environment | Whether the domain is for production, staging, or another environment. | Production |

Use a final domain name before production activation. Knowledge Graph entity identifiers may use the dataset URI, so changing the domain later can require additional migration work.

## Configuration options

| Option | Best for | SSL/TLS responsibility |
| --- | --- | --- |
| CNAME to `custom.wordlift.io` | Most Enterprise custom domain setups. | WordLift handles SSL certificate configuration. |
| Reverse proxy to `custom.wordlift.io` | Organizations that need traffic to pass through their own edge, proxy, or network controls. | Your organization handles SSL/TLS certificate configuration and renewal. |

## Recommended setup: CNAME

In the recommended setup, create a CNAME record that points the custom domain to `custom.wordlift.io`.

Example:

```dns
data.example.org. CNAME custom.wordlift.io.
```

Most DNS providers ask for the record as separate fields:

| DNS field | Value |
| --- | --- |
| Type | `CNAME` |
| Name or host | `data.example.org` |
| Target or value | `custom.wordlift.io` |

Some DNS providers display or require trailing dots for fully qualified domain names, such as `data.example.org.` and `custom.wordlift.io.`. Others add them automatically.

Do not include `https://` or a path in the DNS value. Use only the host name.

Before activation, check that:

- the CNAME record exists for the custom domain;
- there are no conflicting records for the same host name;
- the target is `custom.wordlift.io`;
- DNS propagation has had enough time based on the record TTL and your DNS provider.

With this setup, WordLift handles SSL certificate configuration for the custom domain.

## Alternative setup: reverse proxy

In the reverse proxy setup, your organization configures a proxy from the custom domain to `custom.wordlift.io`.

Use this option when your platform team needs requests to pass through your own edge, proxy, or network controls.

Your organization is responsible for:

- the HTTPS listener for the custom domain;
- SSL/TLS certificate configuration and renewal;
- proxy routing behavior;
- monitoring certificate validity and proxy availability.

Configure the proxy so that it preserves the request method, path, and query string when forwarding requests to `custom.wordlift.io`.

Avoid changing the request path or query string unless your WordLift activation contact confirms the expected behavior.

## WordLift activation

After DNS or proxy configuration is ready, coordinate activation with WordLift.

Share these details with your WordLift account team or support contact:

- dataset domain, such as `data.example.org`;
- dataset name agreed for the Knowledge Graph;
- setup mode: CNAME or reverse proxy;
- confirmation that DNS or proxy routing is ready;
- environment: production, staging, or another environment;
- technical contact for validation.

Activation is separate from DNS or proxy configuration. DNS can point to `custom.wordlift.io` before the custom domain is active in WordLift.

## Validation checks

Use these checks before and after activation.

| Check | What to verify |
| --- | --- |
| DNS resolution | The custom domain resolves to the expected CNAME target or proxy endpoint. |
| DNS conflicts | The same host does not have conflicting DNS records. |
| SSL/TLS | HTTPS works for the custom domain after activation. |
| Dataset URI | The agreed dataset URI is reachable after activation. |
| Environment | The domain is connected to the intended production or staging graph. |

WordLift also provides a custom domain validation endpoint in the [Manager API reference](/api/manager/validate/). Use the API reference for the current request format and authentication requirements. The endpoint validates whether the domain setup is acceptable for the account context; it does not replace the WordLift activation step.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| DNS still points somewhere else | Confirm the CNAME record, DNS provider, and propagation time. |
| CNAME cannot be created | Check whether another record already exists for the same host. |
| HTTPS is not ready in CNAME mode | Confirm that WordLift activation has been completed and DNS points to `custom.wordlift.io`. |
| HTTPS is not ready in reverse proxy mode | Check your certificate chain, HTTPS listener, and renewal configuration. |
| The custom domain serves proxy or edge content instead of graph data | Check reverse proxy routing to `custom.wordlift.io` and make sure the path and query string are preserved. |
| The validation endpoint returns an error | Confirm the dataset domain, dataset name, and API authentication requirements in the API reference. |

## Related docs

- [Enterprise Onboarding Guide](/enterprise/onboarding/)
- [Knowledge Graph](/knowledge-graph/)
- [Custom domain validation API](/api/manager/validate/)
