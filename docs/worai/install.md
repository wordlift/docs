---
sidebar_position: 1
title: Install and Quickstart
redirect_from:
  - /worai
  - /worai/
---

## Install

- `pipx install worai`
- `pip install worai`

If you plan to run `seocheck`, install Playwright browsers:
- `playwright install chromium`

## Quick Start

- `worai --help`
- `worai seocheck https://example.com/sitemap.xml`
- `worai google-search-console --site sc-domain:example.com --client-secrets ./client_secrets.json`
- `worai <command> --help`

## Autocompletion

- `worai --install-completion`
- `worai --show-completion`
