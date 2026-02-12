// @ts-check

const { loadSidebar } = require("./scripts/sidebars-utils");

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "html",
      value: `<p style="color: var(--ifm-color-secondary-darkest)">DOCUMENTATION</p>`,
      defaultStyle: true,
    },
    {
      type: "doc",
      id: "introduction",
      label: "👋 Welcome to WordLift",
    },
    {
      type: "category",
      label: "🛠️ Core Features",
      items: [
        {
          type: "category",
          label: "🏗️ Knowledge Graph",
          link: {
            type: "doc",
            id: "knowledge-graph/index",
          },
          items: [
            {
              type: "category",
              label: "Enterprise Solutions",
              items: [
                {
                  type: "doc",
                  id: "knowledge-graph/botify",
                  label: "Botify Integration"
                },
                {
                  type: "doc",
                  id: "knowledge-graph/sitemap-import",
                  label: "Sitemap Import"
                },
                {
                  type: "doc",
                  id: "knowledge-graph/web-page-import",
                  label: "Web Page Import"
                },
                {
                  type: "doc",
                  id: "knowledge-graph/analytics-api",
                  label: "Analytics Import"
                },
              ]
            },
            {
              type: "doc",
              id: "product-knowledge-graph-builder/introduction",
              label: "Product Knowledge Graph"
            },
            {
              type: "doc",
              id: "knowledge-graph/kg-rest",
              label: "KG-REST"
            },
            {
              type: "doc",
              id: "knowledge-graph/multilingual",
              label: "Multilingual"
            },
            {
              type: "doc",
              id: "cloud/index",
              label: "Install the WordLift Cloud script"
            },
            {
              type: "doc",
              id: "cloud/google-tag-manager",
              label: "WordLift Cloud via GTM"
            },
          ],
        },
        {
          type: "category",
          label: "🤖 Smart Content",
          items: [
            {
              type: "doc",
              id: "agent-wordlift/index",
              label: "Agent WordLift"
            },
            {
              type: "doc",
              id: "content-generation/content-generation",
              label: "Content Generation"
            },
            {
              type: "doc",
              id: "llm-connectors/index",
              label: "AI & LLM Integrations"
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "🔌 Platform Integrations",
      items: [
        {
          type: "category",
          label: "CMS & E-commerce",
          items: [
            {
              type: "doc",
              id: "wordpress-plugin/index",
              label: "WordPress Plugin"
            },
            {
              type: "doc",
              id: "woocommerce/introduction",
              label: "WooCommerce SEO"
            },
          ],
        },
        {
          type: "category",
          label: "Marketing Tools",
          items: [
            {
              type: "doc",
              id: "seo-add-on-google-sheets/introduction",
              label: "Google Sheets Add-on"
            },
            {
              type: "doc",
              id: "looker-studio-connector/introduction",
              label: "Google Looker Studio"
            },
            {
              type: "doc",
              id: "marketing-automation/zapier/introduction",
              label: "Zapier Integration"
            },
            {
              type: "doc",
              id: "marketing-automation/power-automate/introduction",
              label: "Microsoft Power Automate"
            },
            {
              type: "doc",
              id: "marketing-automation/brightedge/introduction",
              label: "BrightEdge"
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "📚 Developer Resources",
      items: [
        {
          type: "doc",
          id: "developer-resources/ip-user-agent-whitelist",
          label: "IP & UA Whitelist"
        },
        {
          type: "doc",
          id: "developer-resources/monitoring",
          label: "Monitoring API Guide"
        },
        {
          type: "link",
          href: "/category/api",
          label: "API Documentation"
        },
        {
          type: "category",
          label: "🧰 worai CLI",
          items: [
            "worai/install",
            "worai/configuration",
            {
              type: "category",
              label: "Commands",
              items: [
                "worai/commands/seocheck",
                "worai/commands/seoreport",
                "worai/commands/google-search-console",
                "worai/commands/dedupe",
                "worai/commands/canonicalize-duplicate-pages",
                "worai/commands/delete-entities-from-csv",
                "worai/commands/find-faq-page-wrong-type",
                "worai/commands/find-missing-names",
                "worai/commands/find-url-by-type",
                "worai/commands/graph",
                "worai/commands/link-groups",
                "worai/commands/patch",
                "worai/commands/structured-data",
                "worai/commands/list-entities-outside-dataset",
                "worai/commands/validate",
                "worai/commands/upload-entities-from-turtle",
              ],
            },
          ],
        },
      ],
    },
  ],
  // Keep all existing sidebar configurations unchanged
  "agent-wordlift": [
    {
      type: "autogenerated",
      dirName: "agent-wordlift",
    },
  ],

  "wordpress-plugin": [
    {
      type: "autogenerated",
      dirName: "wordpress-plugin",
    },
  ],
  "product-knowledge-graph-builder": [
    {
      type: "autogenerated",
      dirName: "product-knowledge-graph-builder",
    },
  ],
  "llm-connectors": [
    {
      type: "autogenerated",
      dirName: "llm-connectors",
    },
  ],
  "content-generation": [
    {
      type: "autogenerated",
      dirName: "content-generation",
    },
  ],
  "marketing-automation": [
    {
      type: "autogenerated",
      dirName: "marketing-automation",
    },
  ],
  wordlift: [
    {
      type: "category",
      label: "API",
      link: {
        type: "generated-index",
        slug: "/category/api",
      },
      items: [
        {
          type: "category",
          label: "Agent WordLift",
          items: loadSidebar("./docs/api/agent/sidebar"),
        },
        {
          type: "category",
          label: "Audit",
          items: loadSidebar("./docs/api/audit/sidebar"),
        },
        {
          type: "category",
          label: "Analysis",
          items: loadSidebar("./docs/api/analysis/sidebar"),
        },
        {
          type: "category",
          label: "Classification",
          items: loadSidebar("./docs/api/classification/sidebar"),
        },
        {
          type: "category",
          label: "Content Generation",
          items: loadSidebar("./docs/api/content-generation/sidebar"),
        },
        {
          type: "category",
          label: "Content Evaluations",
          items: loadSidebar("./docs/api/content-evaluations/sidebar"),
        },
        {
          type: "category",
          label: "Fact Check",
          items: loadSidebar("./docs/api/fact-check/sidebar"),
        },
        {
          type: "category",
          label: "GraphQL",
          items: loadSidebar("./docs/api/graphql/sidebar"),
        },
        {
          type: "category",
          label: "Inspector",
          items: loadSidebar("./docs/api/inspector/sidebar"),
        },
        {
          type: "category",
          label: "KPI Events",
          items: loadSidebar("./docs/api/events/sidebar"),
        },
        {
          type: "category",
          label: "Long Tail",
          items: loadSidebar("./docs/api/long-tail/sidebar"),
        },
        {
          type: "category",
          label: "Manager",
          items: loadSidebar("./docs/api/manager/sidebar"),
        },
        {
          type: "category",
          label: "Google Search Console",
          items: loadSidebar("./docs/api/gsc-url-inspections/sidebar"),
        },
        {
          type: "category",
          label: "Middleware",
          items: loadSidebar("./docs/api/middleware/sidebar"),
        },
        {
          type: "category",
          label: "Summarization",
          items: loadSidebar("./docs/api/summarizer/sidebar"),
        },
        {
          type: "category",
          label: "Sitemap Generator",
          items: loadSidebar("./docs/api/sitemap-generator/sidebar"),
        },
        {
          type: "category",
          label: "Query Fan-Out",
          items: loadSidebar("./docs/api/query-fan-out/sidebar"),
        },
      ],
    },
  ],
};

module.exports = sidebars;
