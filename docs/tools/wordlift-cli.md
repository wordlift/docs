---
title: "wordlift-cli"
description: "Install wordlift-cli to chat with Agent WordLift in your terminal, run one-shot prompts, and save or pipe the results into files and your own scripts."
last_updated: 2026-10-27
---

# wordlift-cli

wordlift-cli is a terminal client for Agent WordLift. Run an interactive session or a one-shot prompt, then save the output to a file or pipe it into the next prompt. It is built on Gemini CLI and connects to Agent WordLift through the [WordLift MCP Server](/tools/mcp-server/), the same Model Context Protocol (MCP) connection the other assistants use.

Use wordlift-cli when you want Agent WordLift's research and analysis in a terminal. To build, sync or audit your Knowledge Graph from the command line, use the [worai CLI](/tools/worai-cli/install/) instead. See [wordlift-cli or worai CLI](#wordlift-cli-or-worai-cli) for the differences.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/sXzRclE-6ik" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>

## Before you begin

- **Node.js 20 or later:** The npm package requires Node.js 20.0.0 or later, plus npm to install it.
- **A WordLift API key:** Find it on your user dashboard at [my.wordlift.io](https://my.wordlift.io).

:::warning[Review needed]
TODO [SME]: describe what wordlift-cli asks for on first run (WordLift sign-in through the MCP Server, a Google sign-in or key for Gemini CLI, or both).
:::

## Install

Install wordlift-cli globally for system-wide access:

```bash
npm install -g wordlift-cli
```

Or run it without installing:

```bash
npx wordlift-cli
```

## Start a session

Start an interactive Agent WordLift session:

```bash
wordlift-cli
```

To send a single prompt and get the answer back in your terminal, use prompt mode with `-p`:

```bash
wordlift-cli -p "Analyze the semantic SEO potential of my latest blog post"
```

## Examples

### Keyword research saved as HTML

```bash
wordlift-cli -p "run a comprehensive keyword research for 'sustainable fashion' and store the findings in HTML format with competitor analysis"
```

### Entity analysis piped into internal linking suggestions

```bash
wordlift-cli -p "analyze the entities on https://example.com/blog-post" | wordlift-cli -p "generate internal linking suggestions based on this analysis"
```

### Entity gap analysis saved to a file

```bash
wordlift-cli -p "perform an entity gap analysis for 'https://example.com/product-page' against the query 'eco-friendly clothing'" > seo-audit-report.html
```

### Schema generation, then validation

```bash
wordlift-cli -p "generate JSON-LD schema markup for a local business: organic restaurant in Portland" | wordlift-cli -p "validate this schema and suggest improvements"
```

### Search Console query review

```bash
wordlift-cli -p "show me the top 10 queries with high impressions but low CTR from my GSC data, then suggest content optimization strategies"
```

## Use it in scripts

Prompt mode writes the answer to standard output, so you can combine wordlift-cli with shell tools:

- **Redirect to a file:** Add `> filename` to save the answer, as in the entity gap analysis example.
- **Pipe into another prompt:** Add `| wordlift-cli -p "..."` to pass the answer to a second prompt, as in the internal linking and schema examples.
- **Wrap in shell scripts:** Call `wordlift-cli -p` from your own scripts to repeat the same analysis across pages or clients.

:::warning[Review needed]
TODO [SME]: confirm whether prompt mode runs without interaction (for example in CI pipelines or Git hooks) and give the syntax for processing several files or URLs in one command, if supported.
:::

## Configure authorization (advanced) {#advanced-cli-configuration}

For programmatic setups, you can edit the wordlift-cli settings by hand and pass your API key in a header.

:::warning
Editing the configuration directly is intended for advanced users. You must type the API key into the configuration file, because wordlift-cli does not currently read environment variables in it.
:::

1. Open `settings.json` for your installation:

   ```bash
   # If installed locally (git clone)
   vim .gemini/settings.json

   # If installed globally via npm
   vim $(dirname $(which wordlift-cli))/../lib/node_modules/wordlift-cli/.gemini/settings.json
   ```

2. Add a header-based authorization entry like this one, and replace `YOUR_WORDLIFT_API_KEY_HERE` with your WordLift API key:

   ```json
   {
     "Wordlift - via header auth": {
       "command": "npx",
       "args": [
         "mcp-remote",
         "https://mcp.wordlift.io/streamable-http",
         "--header",
         "Authorization: Key YOUR_WORDLIFT_API_KEY_HERE"
       ]
     }
   }
   ```

## wordlift-cli or worai CLI

WordLift has two command-line tools with different jobs.

| | wordlift-cli | worai CLI |
|---|---|---|
| What it does | Chat with Agent WordLift: research, analysis and content prompts | Operate your Knowledge Graph: graph sync, structured data, SEO checks and reports, Search Console, canonicals |
| How it works | Sends your prompts to Agent WordLift through the WordLift MCP Server | Runs commands on your machine; `worai agent` starts other agent CLIs with a local worai MCP server |
| Runtime | Node.js 20 or later | Python |
| Install | `npm install -g wordlift-cli` or `npx wordlift-cli` | worai installer scripts or `pipx install worai` |
| Use it when | You want answers you can save to a file or chain into the next prompt | You want repeatable Knowledge Graph and site operations from scripts |

## Related

- [Connect AI assistants with the MCP Server](/tools/mcp-server/)
- [Agent WordLift Skill](/tools/agent-wordlift-skill/)
- [Install the worai CLI](/tools/worai-cli/install/)
- [wordlift-cli on npm](https://www.npmjs.com/package/wordlift-cli)
