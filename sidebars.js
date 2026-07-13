// @ts-check

const { loadSidebar } = require("./scripts/sidebars-utils");

/** @type {any[]} */
const agentWordLiftWorkflowItems = [
  "agent-wordlift/workflows/keyword-discovery",
  "agent-wordlift/workflows/keyword-cannibalization",
  "agent-wordlift/workflows/google-search-console",
  "agent-wordlift/workflows/rankings-drop-audit",
  "agent-wordlift/workflows/research-content-ideas",
  "agent-wordlift/workflows/enhanced-entity-research",
  "agent-wordlift/workflows/create-social-media-posts",
  "agent-wordlift/workflows/create-social-media-content-buckets",
  "agent-wordlift/workflows/ideas-for-newsletters",
  "agent-wordlift/workflows/faq",
  "agent-wordlift/workflows/create-product-description",
  "agent-wordlift/workflows/content-evaluation",
  "agent-wordlift/workflows/analyzing-query-match",
  "agent-wordlift/workflows/adding-authorship-markup",
  "agent-wordlift/workflows/local-seo-analysis",
  "agent-wordlift/workflows/local-seo-tools-guide",
  "agent-wordlift/workflows/create-internal-links",
  "agent-wordlift/workflows/instagram-indexing-analysis",
  "agent-wordlift/workflows/instagram-indexing-report",
];

/** @type {any[]} */
const agentWordLiftSidebarItems = [
  {
    type: "doc",
    id: "agent-wordlift/index",
    label: "Overview"
  },
  "agent-wordlift/getting-started",
  "agent-wordlift/tips",
  "agent-wordlift/highlights",
  "agent-wordlift/data-privacy-and-security",
  "agent-wordlift/prompt-reference",
  "agent-wordlift/faq",
  "agent-wordlift/integrations",
  {
    type: "doc",
    id: "agent-wordlift/tools",
    label: "🧰 Tools",
  },
  {
    type: "category",
    label: "🛠️ Workflows",
    link: {
      type: "doc",
      id: "agent-wordlift/workflows",
    },
    items: agentWordLiftWorkflowItems,
  },
];

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
              label: "Product Knowledge Graph",
              link: {
                type: "doc",
                id: "product-knowledge-graph-builder/introduction",
              },
              items: [
                {
                  type: "doc",
                  id: "product-knowledge-graph-builder/webhooks",
                  label: "Webhooks",
                },
                {
                  type: "doc",
                  id: "product-knowledge-graph-builder/feed-specifications",
                  label: "Feed Specifications",
                },
              ],
            },
            {
              type: "doc",
              id: "knowledge-graph/data-api",
              label: "Data API"
            },
            {
              type: "doc",
              id: "knowledge-graph/migrate-client-side-to-server-side-data-api",
              label: "Migrate to Server-Side Data API"
            },
            {
              type: "doc",
              id: "knowledge-graph/data-sources-oauth2",
              label: "Data Sources"
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
          ],
        },
        {
          type: "doc",
          id: "business-plus/index",
          label: "📈 Business+",
        },
        {
          type: "category",
          label: "🏢 Enterprise",
          items: [
            {
              type: "doc",
              id: "enterprise/onboarding",
              label: "Enterprise Onboarding"
            },
            {
              type: "doc",
              id: "enterprise/custom-domain-configuration",
              label: "Custom Domain Configuration"
            },
            {
              type: "doc",
              id: "enterprise/saml-sso",
              label: "SAML Single Sign-On"
            },
            {
              type: "category",
              label: "Integrations",
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
          ],
        },
        {
          type: "category",
          label: "🤖 Smart Content",
          items: [
            ...agentWordLiftSidebarItems,
            {
              type: "doc",
              id: "content-generation/content-generation",
              label: "Content Generation"
            },
            {
              type: "category",
              label: "AI & LLM Integrations",
              link: {
                type: "doc",
                id: "llm-connectors/index",
              },
              items: [
                {
                  type: "doc",
                  id: "llm-connectors/wordlift-vector-store",
                  label: "WordLift Vector Store",
                },
                {
                  type: "doc",
                  id: "llm-connectors/wordlift-reader",
                  label: "WordLift Reader",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "🧩 Apps, Tools & Plugins",
      items: [
        {
          type: "doc",
          id: "apps-tools-plugins/agent-wordlift-extension",
          label: "🤖 Agent WordLift Extension",
        },
        {
          type: "category",
          label: "☁️ WordLift Cloud",
          items: [
            {
              type: "category",
              label: "WordPress Plugin",
              link: {
                type: "doc",
                id: "cloud/wordpress-plugin",
              },
              items: [
                {
                  type: "doc",
                  id: "cloud/wordpress-plugin-entity-types",
                  label: "Select Entity Types for Web Pages"
                },
              ],
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
          label: "🧰 worai CLI",
          items: [
            "worai/install",
            "worai/configuration",
            {
              type: "category",
              label: "Commands",
              items: [
                "worai/commands/seocheck",
                "worai/commands/entity-matrix",
                "worai/commands/seoreport",
                "worai/commands/google-search-console",
                "worai/commands/canonicals",
                "worai/commands/dedupe",
                "worai/commands/canonicalize-duplicate-pages",
                "worai/commands/delete-entities-from-csv",
                "worai/commands/find-faq-page-wrong-type",
                "worai/commands/find-missing-names",
                "worai/commands/find-url-by-type",
                "worai/commands/graph",
                "worai/commands/graph-kpis",
                "worai/commands/link-groups",
                "worai/commands/patch",
                "worai/commands/self",
                "worai/commands/structured-data",
                "worai/commands/agent",
                "worai/commands/web-pages",
                "worai/commands/list-entities-outside-dataset",
                "worai/commands/validate",
                "worai/commands/upload-entities-from-turtle",
              ],
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
      ],
    },
  ],
  // Section-specific sidebars
  "agent-wordlift": agentWordLiftSidebarItems,

  "wordpress-plugin": [
    {
      type: "autogenerated",
      dirName: "wordpress-plugin",
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
        {
          type: "category",
          label: "Graph KPI",
          items: loadSidebar("./docs/api/graph-kpi/sidebar"),
        },
      ],
    },
  ],
};

module.exports = sidebars;
