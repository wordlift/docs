---
title: ⚙️ Integrations
sidebar_position: 7
---

# Integrations

## Agent WordLift Chrome Extension

Supercharge your SEO workflow directly in your browser with the **Agent WordLift Chrome Extension!** This powerful, AI-driven tool helps content creators, SEO professionals, and marketers like you achieve better search rankings and more organic traffic by:

- **Optimizing content in real-time:** Receive instant feedback on keywords, readability, and semantic relevance as you write, ensuring your content is perfectly aligned with search engine best practices.
- **Automating key SEO tasks:** Effortlessly perform entity analysis, schema markup generation, and other time-consuming SEO tasks, freeing up your time to focus on what matters most: creating great content.
- **Uncovering hidden content opportunities:** Identify gaps in your existing content and receive actionable insights to create high-value content that resonates with your target audience.

Powered by cutting-edge AI and knowledge graph technology, the Agent WordLift Chrome Extension transforms how you create and optimize content, making it easier than ever to achieve your SEO goals.

Ready to see it in action? Watch this video tutorial.
<iframe width="100%" height="500" src="https://www.youtube.com/embed/Lmz6Kgi6HB0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[Install the Agent WordLift Chrome Extension here](https://chromewebstore.google.com/detail/agent-wordlift/jegfjceighmfpbklniiakflbhceejddb) and start boosting your SEO today!

## Agent WordLift Zapier Integration

Connect Agent WordLift to your favorite apps with our [Zapier integration](/marketing-automation/zapier/introduction/). This powerful integration allows you to:

- **Automate content analysis:** Automatically analyze new content as it's published
- **Extract entities and insights:** Process content through Agent WordLift and use the results in your workflows
- **Streamline SEO tasks:** Connect Agent WordLift's capabilities with over 6,000+ apps
- **Create custom workflows:** Build automated pipelines that leverage Agent WordLift's AI capabilities

Whether you're managing a content team, running an e-commerce site, or optimizing your SEO strategy, the Zapier integration helps you automate and scale your workflows. [Learn more about the Zapier integration](/marketing-automation/zapier/introduction/).

## Agent WordLift API Integration

The **WordLift Agent API** empowers developers and SEO professionals to programmatically interact with the Agent WordLift’s advanced AI capabilities. The newly introduced `/ask` endpoint allows users to send specific queries to the WordLift Agent and receive tailored responses that enhance their SEO workflows.

Key Features of the `/ask` Endpoint:

- **Customizable Interactions:** Send a message and specify a model (default: gpt-4o) to receive AI-powered insights tailored to your SEO needs.
- **Secure Queries:** Enable an optional security parameter to ensure sensitive requests are handled appropriately.
- **Seamless Integration:** Easily incorporate the endpoint into your existing tools or workflows to automate tasks such as content optimization, keyword research, and entity analysis.

### Example Use Case

With the `/ask` endpoint, you can create a chatbot-like feature within your application that provides instant SEO advice, content suggestions, or answers to technical queries based on the WordLift Agent’s expertise.

To get started, check out the [WordLift Agent API documentation](https://docs.wordlift.io/api/agent/wordlift-agent-api/) and explore how the `/ask` endpoint can revolutionize your SEO strategy!

## Agent WordLift CLI Integration

Transform your command-line workflow with Agent WordLift CLI! This powerful terminal-based tool brings the full capabilities of Agent WordLift directly to your development environment, making it perfect for developers, content creators, and SEO professionals who prefer working in the command line.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/sXzRclE-6ik" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

**Why CLI Over Web UI for AI Workflows?**

When working with AI-powered SEO tools, the command line offers distinct advantages over web interfaces. CLI provides superior speed with instant input/output, complete system prompt control for precise agent behavior, seamless file I/O for loading instructions and automating pipelines, and the ability to chain commands and build scalable workflows. For professional SEO workflows that demand efficiency, automation, and control, the CLI is where serious work gets done.

**Key Features:**

• **Seamless Development Integration**: Work with Agent WordLift directly from your terminal without switching contexts
• **Advanced Content Creation**: Generate SEO-optimized content with access to 20+ specialized SEO tools via MCP integration
• **Gemini Pro 2.5 Powered**: Leverage Google's most advanced language model for superior content analysis and generation
• **Knowledge Graph Access**: Query and interact with your WordLift knowledge graph directly from the command line
• **Batch Processing**: Automate content optimization tasks and run bulk SEO analyses
• **Team Collaboration**: Integrate Agent WordLift capabilities into CI/CD pipelines and development workflows

**Perfect for:**
- Content teams building automated SEO workflows
- Developers integrating SEO analysis into applications
- Technical SEO professionals requiring programmatic access
- Agencies managing multiple client projects from the command line

### Installation

Install globally for system-wide access:

```bash
npm install -g wordlift-cli
```

Or run directly without installation:

```bash
npx wordlift-cli
```

### Quick Start

Launch the interactive Agent WordLift session:

```bash
wordlift-cli
```

For direct queries, use the prompt mode:

```bash
wordlift-cli -p "Analyze the semantic SEO potential of my latest blog post"
```

### Example Use Cases

**Keyword Research with HTML Output:**
```bash
wordlift-cli -p "run a comprehensive keyword research for 'sustainable fashion' and store the findings in HTML format with competitor analysis"
```

**Content Analysis Pipeline:**
```bash
wordlift-cli -p "analyze the entities on https://example.com/blog-post" | wordlift-cli -p "generate internal linking suggestions based on this analysis"
```

**Batch SEO Audit:**
```bash
wordlift-cli -p "perform an entity gap analysis for 'https://example.com/product-page' against the query 'eco-friendly clothing'" > seo-audit-report.html
```

**Schema Generation with Validation:**
```bash
wordlift-cli -p "generate JSON-LD schema markup for a local business: organic restaurant in Portland" | wordlift-cli -p "validate this schema and suggest improvements"
```

**Google Search Console Integration:**
```bash
wordlift-cli -p "show me the top 10 queries with high impressions but low CTR from my GSC data, then suggest content optimization strategies"
```

### Integration with Development Workflows

The WordLift CLI seamlessly integrates with modern development practices:

- **CI/CD Pipelines**: Automate content analysis and SEO scoring in your deployment workflows
- **Git Hooks**: Run SEO checks on content changes before commits
- **Build Scripts**: Generate schema markup and optimize content during build processes
- **Testing Suites**: Include SEO validation as part of your automated testing

### Advanced Features

**Batch Processing:** Process multiple files or URLs in a single command for efficient workflow automation.

**Custom Workflows:** Combine with shell scripts and automation tools to create sophisticated SEO processing pipelines.

**Team Integration:** Share configurations and workflows across development teams for consistent SEO implementation.

**API Integration:** Access the full WordLift Agent API capabilities through command-line interfaces.

Ready to supercharge your command-line SEO workflow? [Install WordLift CLI](https://www.npmjs.com/package/wordlift-cli) and bring Agent WordLift's power directly to your terminal!

---

*The WordLift CLI is powered by the same MCP integration that enables Agent WordLift to work across multiple platforms, ensuring consistent access to your knowledge graph and SEO tools regardless of your preferred development environment.*

## Agent WordLift Model Context Protocol (MCP) Integration

Your preferred AI models and agents can use our official MCP server to access your Knowledge Graph and leverage Agent WordLift in a simple and secure way.

Connect WordLift to various AI assistants through our **experimental Model Context Protocol (MCP) integration**. This integration enables AI models like Claude to directly interact with your content and knowledge graph, unlocking powerful new workflows.

Our MCP server is reachable at `https://mcp.wordlift.io/sse` and currently supports:
- Direct calls to Agent WordLift's capabilities
- Execution of GraphQL queries on your knowledge graph
- Seamless integration with supported AI assistants

Watch how Claude, integrated with WordLift via Model Context Protocol, analyzes the WordLift Blog to uncover actionable insights around the "Agentic SEO" content cluster:

<iframe width="100%" height="500" src="https://www.youtube.com/embed/6dz_-LbP3eQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Setup Instructions

**For Claude:**
1. Navigate to Settings in Claude
2. Scroll to Integrations at the bottom and click Add more
3. In the prompt, enter:
   - Integration name: WordLift
   - Integration URL: https://mcp.wordlift.io/sse
4. Make sure to enable the tools in any new chats

**For Cursor:**
1. Press CTRL/CMD+Shift+J to open Cursor Settings
2. Select MCP
3. Select Add new global MCP server
4. Add the following configuration:
```json
{
  "mcpServers": {
    "wordlift": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.wordlift.io/sse"]
    }
  }
}
```

**For Visual Studio:**
1. Press CTRL/CMD+P and search for "MCP: Add Server"
2. Select "Command (stdio)"
3. Enter the following configuration and hit enter:
   ```
   npx mcp-remote https://mcp.wordlift.io/sse
   ```
4. Enter the name "WordLift" and hit enter
5. Activate the server using "MCP: List Servers", selecting "WordLift", and selecting "Start Server"

**For Windsurf:**
1. Press CTRL/CMD+, to open Windsurf settings
2. Under Cascade -> MCP servers
3. Select Add Server -> Add custom server
4. Add the same JSON configuration as shown above for Cursor

This experimental integration opens up new possibilities by combining the reasoning capabilities of large language models with WordLift's structured knowledge and SEO expertise. From identifying content gaps to suggesting improvements, this integration showcases how symbolic AI and LLMs can work together to power the next generation of marketing strategies.

**🚀 New: AI Sub-Agent Workflows**
The MCP integration enables a new category of workflows where Agent WordLift operates as a specialized SEO sub-agent within other AI platforms. These workflows leverage the conversational capabilities of Claude, ChatGPT, Copilot, or Gemini while providing deep SEO expertise through WordLift. Explore our [Instagram Indexing Analysis workflow](./workflows/instagram-indexing-analysis.md) to see this in action.

:::note
The MCP integration is **currently experimental** and we're actively expanding its capabilities. If you have questions or feedback, please reach out to our support team.
:::

## Agent WordLift Claude Skill

Take your SEO audits to the next level with the official **WordLift SEO Audit Skill** for Claude! This pre-built Agent Skill delivers comprehensive SEO analysis and competitive intelligence directly within your Claude conversations.

<iframe width="100%" height="500" src="https://www.youtube.com/embed/DRIVYxFB60I?si=LgmmSzs8S9Td8q-1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### What is a Claude Skill?

Claude Skills are specialized packages that extend Claude's capabilities with domain-specific expertise. The WordLift SEO Audit Skill combines Claude's reasoning with WordLift's powerful SEO intelligence, creating an AI-powered SEO analyst that can audit any URL, analyze competitors, and provide actionable recommendations—all through natural conversation.

### Key Features:

- **Comprehensive SEO Audits**: Analyze any URL for schema markup, meta tags, content quality, technical SEO, mobile readiness, and performance
- **Competitive Intelligence**: Automatically identify and analyze your top SERP competitors to uncover schema gaps and opportunities
- **Structured Data Analysis**: Complete inventory of schema types with coverage comparison against competitors
- **Actionable Recommendations**: Prioritized issues with specific implementation steps and ROI estimates
- **WordLift Branded Reports**: Professional, color-coded reports with visual progress indicators and severity badges
- **Progressive Disclosure**: Efficient token usage through smart resource loading

### Perfect For:

- **SEO Professionals** conducting client audits and competitive analysis
- **Content Teams** optimizing pages for search visibility
- **Agencies** delivering comprehensive SEO reports at scale
- **Developers** integrating SEO insights into workflows
- **E-commerce Teams** improving product page performance

### How It Works

The WordLift SEO Audit Skill leverages the **WordLift MCP Server** (described above) to access Agent WordLift's capabilities. This architecture ensures:

1. **Claude (with Skill)** → Provides methodology and formatting instructions
2. **WordLift MCP Server** → Makes API calls and processes data
3. **Agent WordLift** → Delivers SEO intelligence and competitive analysis

```
┌─────────────────────────────────────┐
│   Claude with WordLift Skill        │
│   ├── Audit methodology             │
│   ├── Report formatting             │
│   └── WordLift branding             │
└─────────────────┬───────────────────┘
                  │
                  │ Uses MCP Tools
                  │
┌─────────────────▼───────────────────┐
│   WordLift MCP Server               │
│   https://mcp.wordlift.io/sse       │
│   ├── Agent WordLift API            │
│   └── Knowledge Graph Access        │
└─────────────────────────────────────┘
```

### Installation & Setup

**Step 1: Configure WordLift MCP Server** (if not already done)

Follow the MCP integration setup instructions above to connect WordLift to Claude.

**Step 2: Download the WordLift SEO Audit Skill**

[Download WordLift SEO Audit Skill v1.0.0](https://github.com/wordlift/claude-skills/releases) (Coming Soon)

Or clone from GitHub:
```bash
git clone https://github.com/wordlift/claude-skills.git
cd claude-skills/wordlift-seo-audit
```

**Step 3: Upload to Claude**

1. In Claude, navigate to **Settings** → **Capabilities**
2. Click **Upload Skill**
3. Select the `wl-seo-audit-competitors.zip` file (or the skill folder)
4. Enable the skill for your conversations

**Step 4: Start Using**

Simply ask Claude to audit any URL:
```
"Audit https://example.com/products/backpack and compare with top 5 competitors"
```

### Example Commands

**Basic SEO Audit**:
```
"Run an SEO audit on https://mysite.com"
```

**Competitive Analysis**:
```
"Compare the schema markup on https://mysite.com/products/shoes with top 3 competitors in the US market"
```

**SERP Gap Analysis**:
```
"Analyze https://mystore.com/category/electronics for the query 'best wireless headphones' and show me what schema types competitors are using"
```

**Market-Specific Audit**:
```
"Audit https://mysite.fr for the French market (fr-FR) and compare with top 10 competitors"
```

### What You Get

Every audit delivers a comprehensive report including:

1. **Executive Summary** with overall SEO health score (0-100)
2. **Quick Stats Dashboard** showing key metrics at a glance
3. **Six-Dimensional Score Breakdown**:
   - 🏷️ Schema Markup
   - 📝 Meta Tags
   - ✍️ Content Quality
   - ⚙️ Technical SEO
   - 📱 Mobile Readiness
   - ⚡ Performance
4. **Prioritized Issues** with severity indicators and action steps
5. **Structured Data Inventory** showing all schema types (found/missing)
6. **Competitive Analysis** comparing your coverage with SERP leaders
7. **Growth Opportunities** ranked by impact vs. effort with ROI estimates

### Report Features

- **Color-Coded Scores**: Visual progress bars (green/yellow/red based on performance)
- **Severity Indicators**: 🔴 Critical, ⚠️ Warning, ℹ️ Info, ✅ Success
- **Impact Badges**: HIGH/MEDIUM/LOW impact and effort ratings
- **Professional Branding**: Official WordLift design system with brand colors
- **Actionable Steps**: Specific implementation instructions for each recommendation
- **Business Context**: CTR improvements, ranking potential, and competitive advantages

### Technical Details

**Skill Version**: 1.0.0

**Dependencies**:
- WordLift MCP Server (`https://mcp.wordlift.io/sse`)
- MCP Tools: `WordLift:agent`, `WordLift:graphql`

**Architecture**: 
- Built using Anthropic's Agent Skills best practices
- Progressive disclosure pattern for efficient token usage
- Versioned and maintainable codebase
- Complete brand guidelines and documentation

**Supported Markets**:
- Any locale (default: `en-US`)
- Examples: `en-GB`, `fr-FR`, `de-DE`, `it-IT`, `es-ES`, `pt-BR`, etc.

**Competitor Analysis**:
- Top 1-20 SERP competitors (configurable)
- Automatic query inference from target URL
- Schema coverage comparison matrices
- Gap analysis and opportunity identification

### Example Output

```markdown
# 🎯 SEO Audit Report: example.com

*Powered by WordLift Enterprise SEO Platform*

## Overall SEO Score: 78/100
### 👍 Good Progress - Room for Improvement

---

### 📊 Quick Stats Dashboard

| 📦 Schema Types | 🔴 Critical Issues | 💡 Opportunities | ✅ Passing |
|----------------|-------------------|------------------|-----------|
| 4 types        | 2 found           | 5 identified     | 8 tests   |

**Assessment**: Your site has solid technical SEO fundamentals with 85/100 
technical score. However, missing Review and Rating schema is a critical 
gap - competitors have 30% higher click-through rates with this markup.

---

## 📈 Score Breakdown

- 🏷️ **Schema Markup**: 65/100 `[██████░░░░] 65%`
- 📝 **Meta Tags**: 80/100 `[████████░░] 80%`
- ✍️ **Content Quality**: 82/100 `[████████░░] 82%`
- ⚙️ **Technical SEO**: 85/100 `[████████░░] 85%`
- 📱 **Mobile Ready**: 90/100 `[█████████░] 90%`
- ⚡ **Performance**: 72/100 `[███████░░░] 72%`

---

## 🎯 Critical Issues & Recommendations

### 🔴 [PRIORITY 1] Missing Review & Rating Schema
**Impact**: HIGH | **Category**: Schema

Your product page lacks Review and AggregateRating structured data. 
Products with review markup can achieve 15-35% higher click-through rates.

💡 **Action Required**:
- Implement schema.org/Review with properties: reviewRating, author, reviewBody
- Add schema.org/AggregateRating with ratingValue, reviewCount
- Test implementation using Google Rich Results Test
...
```

### Advanced Usage

**Custom Query Hints**:
```
"Audit https://mysite.com with query hints: 'sustainable fashion', 
'eco-friendly clothing', 'organic textiles'"
```

**Mobile vs Desktop Analysis**:
```
"Compare mobile and desktop SEO for https://mysite.com"
```

**Batch Audits** (with API integration):
```
For multiple URLs, use the WordLift CLI in combination with Claude:
1. Export URLs from your sitemap
2. Use CLI to batch process through Agent WordLift
3. Load results into Claude for summary analysis
```

### Why Use the Claude Skill vs. Direct MCP?

| Feature | Claude Skill | Direct MCP Integration |
|---------|-------------|----------------------|
| **Pre-built Workflow** | ✅ Complete methodology | ❌ You build from scratch |
| **Report Formatting** | ✅ Professional branded reports | ❌ Manual formatting needed |
| **Best Practices** | ✅ Built-in SEO expertise | ⚠️ Requires your knowledge |
| **Progressive Disclosure** | ✅ Optimized token usage | ⚠️ Manual management |
| **Updates** | ✅ Version-tracked improvements | ❌ Manual updates |
| **Branding** | ✅ WordLift design system | ❌ Custom styling needed |

**Use the Skill when**: You want turnkey SEO audits with professional reports

**Use Direct MCP when**: You're building custom workflows or integrating into your own tools

### Open Source & Customization

The WordLift SEO Audit Skill is open source! You can:

- **Fork and Customize**: Adapt the skill to your specific needs
- **White Label**: Modify branding for agency use (with proper licensing)
- **Extend Functionality**: Add custom analysis modules
- **Contribute**: Submit improvements back to the community

**GitHub Repository**: https://github.com/wordlift/claude-skills (Coming Soon)

### Support & Resources

- **Documentation**: Complete skill documentation included in download
- **Setup Guide**: Step-by-step installation and configuration
- **Brand Guidelines**: WordLift design system and color palette
- **Changelog**: Version history and release notes
- **Community**: Join discussions in WordLift Community

### Troubleshooting

**Issue**: "Tool WordLift:agent not found"
- **Solution**: Ensure WordLift MCP server is configured (see MCP integration section above)

**Issue**: Skill doesn't trigger automatically
- **Solution**: Check skill description matches your query intent. Try explicit phrases like "audit this URL"

**Issue**: Reports missing branding
- **Solution**: Ensure you're using skill version 1.0.0 or later with resources/BRANDING.md included

**Need Help?** Contact WordLift support at support@wordlift.io

---

🚀 **Ready to transform your SEO workflow?** 

[Download WordLift SEO Audit Skill](https://github.com/wordlift/claude-skills) and start delivering professional SEO audits in minutes!

:::tip
The Claude Skill integrates seamlessly with all other WordLift integrations (Chrome Extension, CLI, API, Zapier) for a complete SEO automation ecosystem. For custom workflows, explore the [MCP Integration](#agent-wordlift-model-context-protocol-mcp-integration) section above.
:::
