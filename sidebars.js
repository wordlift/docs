// @ts-check

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
              id: "cloud/index",
              label: "WordLift Cloud"
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
          ],
        },
      ],
    },
    {
      type: "category",
      label: "📚 Developer Resources",
      items: [
        {
          type: "link",
          id: "category/api",
          label: "API Documentation"
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
  "knowledge-graph": [
    {
      type: "autogenerated",
      dirName: "knowledge-graph",
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
          items: require("./docs/api/agent/sidebar.js"),
        },
        {
          type: "category",
          label: "Analysis",
          items: require("./docs/api/analysis/sidebar.js"),
        },
        {
          type: "category",
          label: "Classification",
          items: require("./docs/api/classification/sidebar.js"),
        },
        {
          type: "category",
          label: "Content Generation",
          items: require("./docs/api/content-generation/sidebar.js"),
        },
        {
          type: "category",
          label: "Fact Check",
          items: require("./docs/api/fact-check/sidebar.js"),
        },
        {
          type: "category",
          label: "GraphQL",
          items: require("./docs/api/graphql/sidebar.js"),
        },
        {
          type: "category",
          label: "Inspector",
          items: require("./docs/api/inspector/sidebar.js"),
        },
        {
          type: "category",
          label: "KPI Events",
          items: require("./docs/api/events/sidebar.js"),
        },
        {
          type: "category",
          label: "Long Tail",
          items: require("./docs/api/long-tail/sidebar.js"),
        },
        {
          type: "category",
          label: "Manager",
          items: require("./docs/api/manager/sidebar.js"),
        },
        {
          type: "category",
          label: "Middleware",
          items: require("./docs/api/middleware/sidebar.js"),
        },
        {
          type: "category",
          label: "Summarization",
          items: require("./docs/api/summarizer/sidebar.js"),
        },
        {
          type: "category",
          label: "Sitemap Generator",
          items: require("./docs/api/sitemap-generator/sidebar.js"),
        },
        {
          type: "category",
          label: "SEO Score",
          items: require("./docs/api/seo-score/sidebar.js"),
        },
      ],
    },
  ],
};

module.exports = sidebars;