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
            "knowledge-graph/botify",
            "knowledge-graph/sitemap-import",
            "knowledge-graph/analytics-api",
            "product-knowledge-graph-builder/introduction",
            "cloud/index",
          ],
        },
        {
          type: "category",
          label: "🤖 Smart Content",
          items: [
            "agent-wordlift/index",
            "content-generation/content-generation",
            "llm-connectors/index",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "🔌 Integrations",
      items: [
        {
          type: "category",
          label: "CMS",
          items: [
            "wordpress-plugin/index",
            "woocommerce/introduction",
          ],
        },
        {
          type: "category",
          label: "Marketing Tools",
          items: [
            {
              type: "category",
              label: "Search & Analysis",
              items: [
                "seo-add-on-google-sheets/introduction",
                "looker-studio-connector/introduction",
              ],
            },
            {
              type: "category",
              label: "Automation",
              items: [
                "marketing-automation/zapier/introduction",
                "marketing-automation/power-automate/introduction",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "📚 Developer Resources",
      items: [
        "category/api/",
      ],
    },
  ],
  // Keep all these existing sidebar configurations
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