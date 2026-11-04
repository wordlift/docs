---
title: "Use the WordLift Python SDK"
description: "Install the WordLift Python SDK with the extras you need, configure your key once, and script imports, JSON-LD validation and API calls against your Knowledge Graph."
sidebar_label: "Python SDK"
last_updated: 2026-10-27
---

# Use the WordLift Python SDK

The WordLift Python SDK (`wordlift-sdk` on PyPI) is a toolkit for scripting work against your Knowledge Graph. It fetches URLs from sitemaps, Google Sheets or explicit lists, skips pages already imported, pushes RDF graphs, validates JSON-LD and calls the WordLift APIs. Use it when you want to run an import or a validation from your own code or CI. The [worai CLI](/tools/worai-cli/install/) is built on it.

## Prerequisites {#prerequisites}

- **Python 3.10 to 3.14.** The package requires Python `>=3.10,<3.15`.
- **A WordLift key.** Each key belongs to one Knowledge Graph. See [Authentication and API keys](/apis-and-sdks/#authentication).
- **Playwright browsers, for rendering features.** URL rendering and URL validation use Playwright. Install the browser binaries after installing the SDK (see [Validate JSON-LD](#validate-json-ld)).

## Install the SDK {#install-the-sdk}

The base package is lean. Add an extra for each feature set you need.

```bash
pip install wordlift-sdk
pip install "wordlift-sdk[validation]"
```

| Extra | Adds | Pick it when you need to |
| --- | --- | --- |
| `core` | Lightweight client and configuration primitives | Call the APIs with minimal dependencies |
| `render` | Playwright page rendering and XHTML cleanup | Render pages before processing them |
| `validation` | SHACL validation, bundled shapes and helpers | Validate JSON-LD |
| `google-sheets` | Google Sheets lookup and dataframe helpers | Read URLs from a Google Sheet |
| `google-search-console` | Search Console data import and canonical clustering | Work with Search Console data |
| `ingestion` | Source resolution, loaders, inventory and type classification | Build URL inventories from sources |
| `structured-data` | Structured data generation and batch workflows | Generate structured data in batches |
| `workflow` | Legacy import workflow entry points | Keep older import scripts running |
| `graph` | Graph audit and Liquid-template graph helpers | Audit graphs or render RDF from templates |
| `kg-build` | Profile-driven cloud workflow, postprocessors and graph sync | Run profile-driven graph builds |
| `legacy` | Compatibility umbrella for older utilities | Run older utilities |
| `all` | Every optional dependency above | Install everything |

Import the SDK in your code as `wordlift_sdk`.

:::warning[Review needed]
TODO [SME]: confirm which modules are public and supported for customers (for example ingestion, structured-data, validation and `wordlift_client`) and which are internal tooling for GraphSync onboarding (for example `kg-build` profiles and postprocessors).
:::

## Configure your key and settings {#configure-your-key-and-settings}

The SDK reads settings from three places, in this order:

1. `config/default.py`, or a path you pass to `ConfigurationProvider.create`.
2. Environment variables.
3. Google Colab `userdata`, when available.

A minimal `config/default.py`:

```python
WORDLIFT_KEY = "your-api-key"
SITEMAP_URL = "https://example.com/sitemap.xml"
URL_REGEX = r"^https://example.com/article/.*$"
GOOGLE_SEARCH_CONSOLE = True
WEB_PAGE_TYPES = ["http://schema.org/Article"]
EMBEDDING_PROPERTIES = [
    "http://schema.org/headline",
    "http://schema.org/abstract",
    "http://schema.org/text",
]
```

Keep the key out of files you commit. Set `WORDLIFT_KEY` as an environment variable or load it from your secret manager instead. See [Handle keys as secrets](/apis-and-sdks/#handle-keys-as-secrets).

| Option | Default | What it sets |
| --- | --- | --- |
| `WORDLIFT_KEY` | Required | Your WordLift key. |
| `API_URL` | `https://api.wordlift.io` | The WordLift API base URL. |
| `SITEMAP_URL` | Not set | An XML sitemap to read URLs from. |
| `URL_REGEX` | Not set | A regular expression applied to URLs from every source. |
| `SHEETS_URL`, `SHEETS_NAME`, `SHEETS_SERVICE_ACCOUNT` | Not set | A Google Sheets source and its credentials file. |
| `URLS` | Not set | An explicit list of URLs. |
| `OVERWRITE` | `False` | Re-import URLs that are already imported. |
| `WEB_PAGE_IMPORT_WRITE_STRATEGY` | `createOrUpdateModel` | How imported web pages are written. |
| `EMBEDDING_PROPERTIES` | Not set | The schema.org properties to embed, as full property URIs. |
| `WEB_PAGE_TYPES` | `["http://schema.org/Article"]` | The types assigned to imported web pages. |
| `GOOGLE_SEARCH_CONSOLE` | `True` | Refresh Search Console data during imports. |
| `CONCURRENCY` | `min(cpu_count(), 4)` | How many URLs are processed at once. |
| `WORDLIFT_OVERRIDE_DIR` | `app/overrides` | The folder for override files. |

## Import pages into your Knowledge Graph {#import-pages-into-your-knowledge-graph}

Run the import workflow with `run_kg_import_workflow`:

```python
import asyncio
from wordlift_sdk import run_kg_import_workflow

if __name__ == "__main__":
    asyncio.run(run_kg_import_workflow())
```

The workflow runs three steps:

1. It renders and uploads the RDF graphs from `data/templates/*.ttl.liquid`.
2. It builds the URL source, applies `URL_REGEX` and skips URLs that are already imported. A URL is imported again when `OVERWRITE` is set or when its `lastmod` is newer.
3. It sends each URL to WordLift for import, with retries and an optional Search Console refresh.

For a scalable content graph with custom mappings and recurring synchronization, see [GraphSync](/platform/knowledge-graph/graph-sync/).

## Validate JSON-LD {#validate-json-ld}

The `validation` extra validates JSON-LD against SHACL shapes, including shapes generated from the Google Search Gallery.

1. Install the extra:

   ```bash
   pip install "wordlift-sdk[validation]"
   ```

2. To validate a live URL, install the Playwright browser binaries. In a Poetry project, run:

   ```bash
   poetry run playwright install
   ```

3. Validate a JSON-LD file against bundled and custom shapes. `resolve_shape_specs` combines bundled include and exclude sets with extra local or remote SHACL shapes:

   ```python
   from wordlift_sdk.validation import resolve_shape_specs, validate_file

   shape_specs = resolve_shape_specs(
       builtin_shapes=["google-article"],
       exclude_builtin_shapes=["schemaorg-grammar"],
       extra_shapes=["./custom-shape.ttl"],
   )
   result = validate_file("out/page.jsonld", shape_specs=shape_specs)
   ```

To validate a page instead of a file, use `wordlift_sdk.validation.validate_jsonld_from_url`. It renders the URL with Playwright, extracts the JSON-LD and validates it against the shapes. See the [SDK documentation index](https://github.com/wordlift/python-sdk/blob/main/docs/INDEX.md) for its arguments.

## Call an API directly with wordlift_client {#call-an-api-directly-with-wordlift-client}

`wordlift-sdk` depends on `wordlift-client`, a client generated from the WordLift OpenAPI specifications and imported as `wordlift_client`. Use it to call an endpoint the SDK workflows do not cover.

Set the key prefix to `Key`, as the API expects `Authorization: Key <your-wordlift-key>`. This example creates or updates an entity with [KG-REST](/apis-and-sdks/kg-rest/):

```python
import wordlift_client
from wordlift_client.rest import ApiException
from pprint import pprint

configuration = wordlift_client.Configuration(host="https://api.wordlift.io")
configuration.api_key["ApiKey"] = "YOUR_API_KEY"
configuration.api_key_prefix["ApiKey"] = "Key"

async with wordlift_client.ApiClient(configuration) as api_client:
    api_instance = wordlift_client.EntitiesApi(api_client)

    try:
        api_response = await api_instance.create_or_update_entities(
            body="""
            <https://data.example.org/dataset/product-1> a <http://schema.org/Product>;
                <http://schema.org/name> "Example product" .
            """,
            _content_type="text/turtle",
        )
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling create_or_update_entities: %s\n" % e)
```

Run this code inside an async function or an environment that supports top-level `await`, such as a notebook.

:::warning[Review needed]
TODO [SME]: confirm whether the docs present `wordlift_client` (PyPI `wordlift-client`) as a supported client or as an SDK implementation detail.
:::

## Versions and changelog {#versions-and-changelog}

- **Release history.** Check the current version and past releases on [PyPI](https://pypi.org/project/wordlift-sdk/#history).
- **Changelog and migrations.** Read [CHANGELOG.md](https://github.com/wordlift/python-sdk/blob/main/CHANGELOG.md) for release notes and [MIGRATION.md](https://github.com/wordlift/python-sdk/blob/main/MIGRATION.md) for breaking changes.
- **Module documentation.** Start from [docs/INDEX.md](https://github.com/wordlift/python-sdk/blob/main/docs/INDEX.md) in the [python-sdk repository](https://github.com/wordlift/python-sdk).
- **worai CLI requirements.** Some worai commands need a minimum SDK version, stated on each command page. For example, [`worai graph audit`](/tools/worai-cli/commands/graph/) needs `wordlift-sdk>=6.11.0`.

## Related {#related}

- [KG-REST](/apis-and-sdks/kg-rest/)
- [Query your Knowledge Graph with GraphQL](/apis-and-sdks/graphql-api/)
- [worai CLI](/tools/worai-cli/install/)
- [Create a Knowledge Graph](/platform/knowledge-graph/create/)
- [GraphSync](/platform/knowledge-graph/graph-sync/)
