---
title: "Agent WordLift Skill"
description: "Install the Agent WordLift Skill so your MCP-connected assistant picks the right WordLift tools and returns structured SEO audits without you writing the method."
last_updated: 2026-10-27
---

# Agent WordLift Skill

The Agent WordLift Skill is the official Agent Skill for operating WordLift from any MCP-capable AI assistant, such as Claude, ChatGPT, Copilot or Gemini. The [MCP Server](/tools/mcp-server/) gives your assistant access to WordLift's tools. The Skill teaches it how to use them: which tool to call for each job, and how to structure the results.

An Agent Skill (called a "Skill" in Claude) is a package of instructions and reference files that adds domain expertise to an AI assistant. With the Agent WordLift Skill installed, your assistant can route work to the right WordLift tools, audit a URL, query your Knowledge Graph with GraphQL and run multi-tool workflows from a normal conversation.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/DRIVYxFB60I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## What's inside

- **Tool routing:** The Skill tells the assistant when to delegate to Agent WordLift (SERP, AI Overview and AI Mode, Google Search Console, GA4, Trends, entity gap and local SEO), when to query the Knowledge Graph directly with GraphQL (inventories, audits, counts and exports), and when to use neural search for semantic retrieval.
- **SEO audits:** The Skill includes the full audit workflow that used to ship as the standalone WordLift SEO Audit Skill. Audit a URL and get a WordLift-branded report with prioritized issues. See [SEO audit reports](#seo-audit-reports).
- **GraphQL reference:** The Skill documents an introspection-first workflow, constraints, vector search, aggregations, nested traversal and URL to entity lookup, plus a section on gotchas that cause silent failures.
- **Prompt Library and workflow recipes:** The Skill carries the [Prompt Library](/platform/agent-wordlift/prompt-library/) and 11 workflow recipes for tasks such as keyword research, cannibalization, rankings drop audits, AI visibility analysis, internal linking, FAQ generation, authorship markup and local SEO. Each recipe is a tool chain with four stages: locate, extract, enrich and synthesize.

:::warning[Review needed]
TODO [SME]: confirm that audits compare schema coverage with SERP competitors. The v1.1.0 bundle routes audits to the `seo_audit_competitors` task, but the Audit API has no competitor input. If confirmed, mention it under SEO audits and restore "and compare with top 5 competitors" to the first example prompt.
:::

## How the Skill, MCP Server and Agent WordLift fit together

The Skill works on top of the WordLift MCP Server. Three layers each do one job:

1. **Your assistant, with the Skill:** Provides the method (audit steps, tool routing) and the report formatting.
2. **The WordLift MCP Server:** Reachable at `https://mcp.wordlift.io/streamable-http`, it makes the API calls to Agent WordLift and gives access to your Knowledge Graph.
3. **Agent WordLift:** Returns the SEO analysis the assistant needs.

## Install the Skill

1. Connect your assistant to the WordLift MCP Server. Follow [Connect AI assistants with the MCP Server](/tools/mcp-server/).
2. Download the Skill: [Agent WordLift Skill v1.1.0 (zip)](/downloads/claude-skills/agent-wordlift-skill-v1.1.0.zip).
3. Add the Skill to your assistant:
   - **Claude:** Upload the zip file in Claude's settings and enable the Skill.
   - **Other assistants:** Unzip the file. Add `SKILL.md`, plus the reference file you need, to the assistant's instructions or project context. The content does not depend on a specific assistant.

:::warning[Review needed]
TODO [SME]: confirm the current Claude menu path for uploading a skill. The source reads Settings, then Capabilities, then Upload Skill.
:::

## Upgrade from the WordLift SEO Audit Skill

The standalone WordLift SEO Audit Skill (v1.0.0) is merged into the Agent WordLift Skill as of v1.1.0. All its audit capabilities, report formats and branding are included. After you install the Agent WordLift Skill, uninstall the old SEO Audit Skill so the two do not both trigger on the same request.

## Example prompts

Try these prompts once the Skill is installed:

```text
"Audit https://example.com/products/backpack"
"What's in my knowledge graph? Give me an inventory by type."
"List all FAQ pages with their questions and answers."
"Run an AI visibility check for 'best CRM software' and map the gaps to my KG content."
"Which of my articles are missing an author? Suggest authorship markup using existing Person entities."
```

## SEO audit reports {#seo-audit-reports}

Every audit returns a report with these sections:

1. **Executive summary:** An overall SEO and AI-readiness score from 0 to 100.
2. **Quick stats:** Schema types, critical issues, quick wins and allowed AI bots.
3. **Score breakdown:** Results for the seven audited criteria:
   - Site files (`robots.txt`, `llms.txt`, `SKILL.md`, `.well-known/`)
   - SEO fundamentals (title, description, H1)
   - Structured data (Schema.org, JSON-LD, Microdata)
   - Content structure and token budget
   - Image accessibility
   - Automation readiness (WCAG and agent compatibility)
   - JavaScript rendering
4. **Quick wins:** Fixes ranked by impact, from the Audit API `quickWins.wins[]` field.
5. **Site files and discovery surfaces:** Includes the AI bot allow and block matrix, and detection of MCP, WebMCP and Agent Skills.
6. **Structured data inventory:** The schemas found on the page and the ones recommended but missing.
7. **Automation readiness issues:** Prioritized WCAG and agent compatibility findings.

For the underlying endpoint and fields, see the [Audit API reference](/apis-and-sdks/api-reference/audit/wordlift-audit-api/).

## Skill or direct MCP connection

You can use the MCP Server without the Skill. The Skill adds a ready-made method on top of the same tools.

| What you get | With the Agent WordLift Skill | Direct MCP connection only |
|---|---|---|
| Workflow | Yes, a complete audit and workflow method | No, you write the method in your prompts |
| Report formatting | Yes, a WordLift-branded report structure | No, you format the results yourself |
| SEO best practices | Yes, built into the Skill | Partial, depends on the instructions you give |
| Updates | Yes, versioned releases of the Skill | No, you maintain your own prompts |
| Branding | Yes, the WordLift design system | No, you style the output yourself |

## Related

- [Connect AI assistants with the MCP Server](/tools/mcp-server/)
- [Prompt Library](/platform/agent-wordlift/prompt-library/)
- [Agent WordLift workflows](/platform/agent-wordlift/workflows/)
- [Audit API reference](/apis-and-sdks/api-reference/audit/wordlift-audit-api/)
