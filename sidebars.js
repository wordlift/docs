// @ts-check

const { loadSidebar } = require("./scripts/sidebars-utils");

/**
 * Docs v3 information architecture: nine sections in three clusters
 * (Product, Reference, Account and support). The generated API reference
 * lives in its own sidebar so it never crowds the hand-written guides.
 */

/** @param {string} label */
const clusterHeading = (label) => ({
  type: "html",
  value: `<p class="sidebar-cluster-heading">${label}</p>`,
  defaultStyle: true,
});

/**
 * @param {string} label
 * @param {string} id
 * @param {any[]} items
 */
const section = (label, id, items, className) => ({
  type: "category",
  label,
  link: { type: "doc", id },
  items,
  ...(className ? { className } : {}),
});

/** Top-level sections carry a sidebar icon (see "Sidebar section icons" in src/css/brand.css). */
/** @param {string} key */
const icon = (key) => `wl-ico wl-ico-${key}`;

const agentWordLiftWorkflows = [
  "platform/agent-wordlift/workflows/ai-visibility-analysis",
  "platform/agent-wordlift/workflows/keyword-discovery",
  "platform/agent-wordlift/workflows/keyword-cannibalization",
  "platform/agent-wordlift/workflows/google-search-console",
  "platform/agent-wordlift/workflows/rankings-drop-audit",
  "platform/agent-wordlift/workflows/research-content-ideas",
  "platform/agent-wordlift/workflows/enhanced-entity-research",
  "platform/agent-wordlift/workflows/create-social-media-posts",
  "platform/agent-wordlift/workflows/create-social-media-content-buckets",
  "platform/agent-wordlift/workflows/ideas-for-newsletters",
  "platform/agent-wordlift/workflows/generate-faqs",
  "platform/agent-wordlift/workflows/create-product-description",
  "platform/agent-wordlift/workflows/content-evaluation",
  "platform/agent-wordlift/workflows/analyzing-query-match",
  "platform/agent-wordlift/workflows/adding-authorship-markup",
  "platform/agent-wordlift/workflows/local-seo-analysis",
  "platform/agent-wordlift/workflows/local-seo-tools-guide",
  "platform/agent-wordlift/workflows/create-internal-links",
  "platform/agent-wordlift/workflows/instagram-indexing-analysis",
  "platform/agent-wordlift/workflows/instagram-indexing-report",
];

const woraiCommands = [
  "seocheck",
  "entity-matrix",
  "seoreport",
  "google-search-console",
  "canonicals",
  "dedupe",
  "canonicalize-duplicate-pages",
  "delete-entities-from-csv",
  "find-faq-page-wrong-type",
  "find-missing-names",
  "find-url-by-type",
  "graph",
  "graph-kpis",
  "link-groups",
  "patch",
  "self",
  "structured-data",
  "agent",
  "web-pages",
  "list-entities-outside-dataset",
  "validate",
  "upload-entities-from-turtle",
].map((name) => `tools/worai-cli/commands/${name}`);

const wordpressPluginPages = [
  "getting-started",
  "user-manual",
  "editors",
  "edit-entity",
  "sidebar",
  "analysis",
  "publishing",
  "widgets",
  "mappings",
  "jsonld",
  "entity-types",
  "import-export-vocabulary",
  "semantic-analytics",
  "theme-development",
  "customization",
  "advanced-topics",
  "troubleshooting",
  "support",
].map((name) => `integrations/wordpress-plugin/${name}`);

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    clusterHeading("Product"),
    section("Welcome", "welcome/index", [
      section("Install WordLift Cloud", "welcome/install-wordlift-cloud/index", [
        "welcome/install-wordlift-cloud/google-tag-manager",
      ]),
      {
        type: "category",
        label: "Choose your path",
        items: [
          "welcome/paths/business-plus",
          "welcome/paths/enterprise",
          "welcome/paths/developer",
          "welcome/paths/content-team",
          "welcome/paths/marketing-team",
          "welcome/paths/e-commerce",
        ],
      },
    ], icon("welcome")),
    section("Platform", "platform/index", [
      "platform/dashboard",
      section("Data sources", "platform/data-sources/index", [
        "platform/data-sources/sitemap",
        "platform/data-sources/web-page-import",
        "platform/data-sources/botify",
        "platform/data-sources/oauth2",
      ]),
      section("Knowledge Graph", "platform/knowledge-graph/index", [
        "platform/knowledge-graph/create",
        section("GraphSync", "platform/knowledge-graph/graph-sync/index", [
          "platform/knowledge-graph/graph-sync/find-what-changed",
        ]),
        "platform/knowledge-graph/entity-management",
        "platform/knowledge-graph/schema-publishing",
        section(
          "Product Knowledge Graph",
          "platform/knowledge-graph/product-knowledge-graph/index",
          [
            "platform/knowledge-graph/product-knowledge-graph/feed-specifications",
            "platform/knowledge-graph/product-knowledge-graph/webhooks",
          ]
        ),
        "platform/knowledge-graph/multilingual",
      ]),
      section("Agent WordLift", "platform/agent-wordlift/index", [
        "platform/agent-wordlift/getting-started",
        "platform/agent-wordlift/tool-families",
        section(
          "Workflows",
          "platform/agent-wordlift/workflows/index",
          agentWordLiftWorkflows
        ),
        "platform/agent-wordlift/prompt-library",
        section(
          "Content Generation",
          "platform/agent-wordlift/content-generation/index",
          ["platform/agent-wordlift/content-generation/api-guide"]
        ),
        "platform/agent-wordlift/integrations",
        "platform/agent-wordlift/data-privacy",
        "platform/agent-wordlift/faq",
      ]),
      section("Monitor", "platform/monitor/index", [
        "platform/monitor/define-segments-and-expectations",
        "platform/monitor/read-monitor-status",
        "platform/monitor/inspect-url-results",
        "platform/monitor/ask-your-ai-assistant",
        "platform/monitor/reference",
      ]),
    ], icon("platform")),
    section("Interfaces and tools", "tools/index", [
      section("MCP Server", "tools/mcp-server/index", [
        "tools/mcp-server/microsoft-365-copilot",
      ]),
      "tools/agent-wordlift-skill",
      {
        type: "category",
        label: "worai CLI",
        link: { type: "doc", id: "tools/worai-cli/install" },
        items: [
          "tools/worai-cli/install",
          "tools/worai-cli/configuration",
          { type: "category", label: "Commands", items: woraiCommands },
        ],
      },
      "tools/wordlift-cli",
      "tools/google-sheets-addon",
      "tools/chrome-extension",
    ], icon("tools")),
    section("Integrations", "integrations/index", [
      section(
        "WordPress plugin",
        "integrations/wordpress-plugin/index",
        wordpressPluginPages
      ),
      "integrations/woocommerce",
      "integrations/zapier",
      "integrations/power-automate",
      "integrations/looker-studio",
      "integrations/brightedge",
    ], icon("integrations")),
    clusterHeading("Reference"),
    section("APIs and SDKs", "apis-and-sdks/index", [
      section("Data API", "apis-and-sdks/data-api/index", [
        "apis-and-sdks/data-api/migrate",
        "apis-and-sdks/data-api/out-of-band-cache-prefill",
        "apis-and-sdks/data-api/cloudflare-integration",
      ]),
      "apis-and-sdks/graphql-api",
      "apis-and-sdks/kg-rest",
      section("Resolve API", "apis-and-sdks/resolve/index", [
        "apis-and-sdks/resolve/errors",
        "apis-and-sdks/resolve/migrate-from-azure-entity-linking",
      ]),
      "apis-and-sdks/analytics-api",
      "apis-and-sdks/monitoring",
      "apis-and-sdks/python-sdk",
      {
        type: "category",
        label: "LLM connectors",
        items: [
          "apis-and-sdks/llm-connectors/wordlift-reader",
          "apis-and-sdks/llm-connectors/wordlift-vector-store",
        ],
      },
      "apis-and-sdks/ip-user-agent-whitelist",
      {
        type: "link",
        href: "/apis-and-sdks/api-reference/",
        label: "API reference",
      },
    ], icon("apis")),
    section("Concepts", "concepts/index", [
      "concepts/knowledge-graph",
      "concepts/entities",
      "concepts/schema-org",
      "concepts/json-ld",
      "concepts/linked-data",
      "concepts/vocabulary",
      "concepts/ai-visibility",
      "concepts/rag-and-llms",
      "concepts/glossary",
    ], icon("concepts")),
    clusterHeading("Account and support"),
    section("Plans and pricing", "plans-and-pricing/index", [
      "plans-and-pricing/feature-matrix",
      "plans-and-pricing/business-plus",
      "plans-and-pricing/enterprise",
      "plans-and-pricing/sso-saml",
      "plans-and-pricing/custom-domain",
      "plans-and-pricing/billing",
    ], icon("plans")),
    { type: "doc", id: "whats-new/index", className: icon("whats-new") },
    section("Support", "support/index", [
      "support/faq",
      "support/troubleshooting",
      "support/status",
      "support/contact",
    ], icon("support")),
  ],

  // Generated from the OpenAPI specs (docusaurus-plugin-openapi-docs).
  apiReference: [
    {
      type: "link",
      href: "/apis-and-sdks/",
      label: "Back to APIs and SDKs",
    },
    {
      type: "category",
      label: "API reference",
      collapsible: false,
      link: {
        type: "generated-index",
        slug: "/apis-and-sdks/api-reference",
        title: "API reference",
        description:
          "Endpoint reference generated from the WordLift OpenAPI specifications.",
      },
      items: [
        ["Agent WordLift", "agent"],
        ["Audit", "audit"],
        ["Analysis", "analysis"],
        ["Classification", "classification"],
        ["Content Generation", "content-generation"],
        ["Content Evaluations", "content-evaluations"],
        ["Fact Check", "fact-check"],
        ["GraphQL", "graphql"],
        ["Inspector", "inspector"],
        ["KPI Events", "events"],
        ["Long Tail", "long-tail"],
        ["Manager", "manager"],
        ["Google Search Console", "gsc-url-inspections"],
        ["Middleware", "middleware"],
        ["Summarization", "summarizer"],
        ["Sitemap Generator", "sitemap-generator"],
        ["Query Fan-Out", "query-fan-out"],
        ["Graph KPI", "graph-kpi"],
        ["Resolve", "resolve"],
      ].map(([label, dir]) => ({
        type: "category",
        label,
        items: loadSidebar(`./docs/apis-and-sdks/api-reference/${dir}/sidebar`),
      })),
    },
  ],
};

module.exports = sidebars;
