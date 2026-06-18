---
sidebar_position: 1
title: Install and Quickstart
---

## Install

Use the public `worai` installer scripts. They install or upgrade `worai` through `pipx` and persist the `pipx`/`worai` PATH entries in your shell profile when needed.

### macOS and Linux

```bash
curl -fsSL https://raw.githubusercontent.com/wordlift/worai-install/main/install-worai.sh | bash
```

For immediate use in the current shell, reload your shell profile:

```bash
source ~/.zshrc
```

or:

```bash
source ~/.bashrc
```

Then run:

```bash
worai --help
```

### Windows PowerShell

```powershell
irm https://raw.githubusercontent.com/wordlift/worai-install/main/install-worai.ps1 | iex
```

Open a new PowerShell session if this is your first `pipx` install, then run:

```powershell
worai --help
```

### Verify before running

If you want to inspect the installer before executing it:

```bash
curl -fsSL -o /tmp/install-worai.sh https://raw.githubusercontent.com/wordlift/worai-install/main/install-worai.sh && less /tmp/install-worai.sh && bash /tmp/install-worai.sh
```

```powershell
irm https://raw.githubusercontent.com/wordlift/worai-install/main/install-worai.ps1 -OutFile $env:TEMP\install-worai.ps1; notepad $env:TEMP\install-worai.ps1; & $env:TEMP\install-worai.ps1
```

### Manual fallback

If you prefer to manage Python tooling yourself, install `worai` with `pipx`:

```bash
pipx install worai
```

If you plan to run `seocheck`, install Playwright browsers:

```bash
playwright install chromium
```

## Quick Start

```bash
worai --help
worai seocheck https://example.com/sitemap.xml
worai google-search-console --site sc-domain:example.com --client-secrets ./client_secrets.json
worai self update --check-only
worai <command> --help
```

## Autocompletion

```bash
worai --install-completion
worai --show-completion
```
