// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "WordLift Developer Documentation",
  tagline:
    "Take advantage of the API powering the WordLift platform, build new workflow and win the SEO battle.",
  url: "https://docs.wordlift.io",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo-tile.svg",
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "wordlift", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  scripts: [
    {
      src: "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js",
      type: "module",
    },
  ],
  stylesheets: [
    {
      href: "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap",
      type: "text/css",
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        googleAnalytics: {
          trackingID: "UA-28168921-4",
          anonymizeIP: true,
        },
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/wordlift/docs/tree/main",
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem", // add @theme/ApiItem here
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Guide",
        logo: {
          alt: "WordLift",
          src: "img/logo.svg",
          srcDark: "img/logo-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Start Here",
          },
          {
            type: "dropdown",
            label: "Products",
            position: "left",
            items: [
              {
                label: "Search Demand / Google Sheets Add-on",
                to: "seo-add-on-google-sheets/introduction",
              },
              {
                label: "Knowledge Graph / Botify Connector",
                to: "knowledge-graph/botify/",
              },
              {
                label: "Knowledge Graph / Sitemap Import",
                to: "knowledge-graph/sitemap-import/",
              },
              {
                label: "Knowledge Graph / Analytics Import",
                to: "knowledge-graph/analytics-api/",
              },
              {
                label: "Knowledge Graph / Product Knowledge Graph Builder",
                to: "product-knowledge-graph-builder/introduction",
              },
              {
                label: "Knowledge Graph / WordPress Plugin",
                to: "wordpress-plugin",
              },
              {
                label: "Knowledge Graph / WooCommerce Plugin",
                to: "woocommerce/introduction",
              },
              { label: "Knowledge Graph / Cloud", to: "cloud" },
              {
                label: "Knowledge Graph / KG-REST",
                to: "knowledge-graph/kg-rest",
              },
              {
                label: "Knowledge Graph / Multilingual Graphs",
                to: "knowledge-graph/multilingual",
              },
              { label: "Smart Content / AI SEO Agent", to: "agent-wordlift" },
              {
                label: "Smart Content / Content Generation",
                to: "content-generation",
              },
              {
                label: "Smart Content / AI & LLM Integrations",
                to: "llm-connectors/wordlift-reader",
              },
              {
                label: "Marketing Automation / Zapier",
                to: "marketing-automation/zapier/introduction",
              },
              {
                label: "Marketing Automation / Power Automate",
                to: "marketing-automation/power-automate/introduction",
              },
              {
                label: "Semantic Reporting / Looker Studio Connector ",
                to: "looker-studio-connector/introduction",
              },
            ],
          },
          {
            label: "AI SEO Agent",
            position: "left",
            to: "/agent-wordlift",
          },
          {
            label: "API",
            position: "left",
            to: "/category/api",
          },
          {
            href: "https://github.com/wordlift",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Social",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/wordlift",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/wordlift/",
              },
              {
                label: "X (Twitter)",
                href: "https://twitter.com/wordliftit",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/wordlift/",
              },
            ],
          },
          {
            title: "Solutions",
            items: [
              {
                label: "Visibility Solution",
                href: "https://wordlift.io/visibility-solution/",
              },
              {
                label: "Product Performance",
                href: "https://wordlift.io/product-performance-solution/",
              },
              {
                label: "Agent WordLift",
                href: "https://wordlift.io/agent/",
              },
              {
                label: "Intelligence Service",
                href: "https://wordlift.io/intelligence-service/",
              },
            ],
          },
          {
            title: "Get Started",
            items: [
              {
                label: "Pricing",
                href: "https://wordlift.io/pricing/",
              },
              {
                label: "Documentation",
                to: "/",
              },
              {
                label: "API Reference",
                to: "/category/api",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} WordLift srl`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["ruby", "python", "php"],
      },
      languageTabs: [
        {
          highlight: "bash",
          language: "curl",
          logoClass: "bash",
        },
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "php",
          language: "php",
          logoClass: "php",
        },
      ],

      algolia: {
        // The application ID provided by Algolia
        appId: "KT7EPQGS5A",

        // Public API key: it is safe to commit it
        apiKey: "4443307bcba39f1d7cc5c4d492411b6e",

        indexName: "docs_wordlift_io",

        contextualSearch: false,
      },
    }),

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/cloud",
            from: "/en/latest/wordlift-cloud.html",
          },
          {
            to: "/wordpress-plugin/troubleshooting/",
            from: "/en/latest/troubleshooting.html",
          },
          {
            to: "/pages/key-concepts/",
            from: "/en/latest/key-concepts.html",
          },
          {
            to: "/pages/edit-entity/",
            from: "/en/latest/edit-entity.html",
          },
          {
            to: "/pages/import-export-vocabulary/",
            from: "/en/latest/import-export-vocabulary.html",
          },
          {
            to: "/looker-studio-connector/introduction/",
            from: "/en/latest/data-studio-connector.html",
          },
          {
            to: "/wordpress-plugin/customization-and-development/",
            from: "/en/latest/customization-and-development.html",
          },
          {
            to: "/pages/publishing/",
            from: "/en/latest/publishing.html",
          },
          {
            to: "/pages/editors/",
            from: "/en/latest/editors.html",
          },
          {
            to: "/pages/publish/",
            from: "/en/latest/publish.html",
          },
          {
            to: "/pages/analysis/",
            from: "/en/latest/analysis.html",
          },
          {
            to: "/pages/discover/",
            from: "/en/latest/discover.html",
          },
          {
            to: "/pages/mappings/",
            from: "/en/latest/mappings.html",
          },
          {
            to: "/wordpress-plugin/support/",
            from: "/en/latest/support.html",
          },
          {
            to: "/wordpress-plugin/advanced-topics/",
            from: "/en/latest/advanced-topics.html",
          },
          {
            to: "/",
            from: [
              "/en/latest/about.html",
              "/en/latest/wordlift-theme-development.html",
              "/en/latest/",
            ],
          },
          {
            to: "/marketing-automation/zapier/introduction/",
            from: "/zapier/introduction/",
          },
          {
            to: "/marketing-automation/zapier/introduction/",
            from: "/zapier/",
          },
          {
            to: "/",
            from: "/:any*", // this will match any path
          },
        ],
      },
    ],
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic", // e.g. "classic" or the plugin-content-docs id
        config: {
          analysis: {
            specPath: "api/analysis.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/analysis", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          classification: {
            specPath: "api/classification.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/classification", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          "content-generation": {
            specPath: "api/content-generation.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/content-generation", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          // This API is deprecated.
          // embeddings: {
          //   specPath: "api/embeddings.yaml", // path or URL to the OpenAPI spec
          //   outputDir: "docs/api/embeddings", // output directory for generated *.mdx and sidebar.js files
          //   sidebarOptions: {
          //     groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
          //     categoryLinkSource: "tag",
          //   },
          // },
          events: {
            specPath: "api/events.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/events", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          "fact-check": {
            specPath: "api/fact-check.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/fact-check", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          graphql: {
            specPath: "api/graphql.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/graphql", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          inspector: {
            specPath: "api/inspector.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/inspector", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          "long-tail": {
            specPath: "api/long-tail.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/long-tail", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          manager: {
            specPath: "api/manager.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/manager", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          middleware: {
            specPath: "api/middleware.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/middleware", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          summarizer: {
            specPath: "api/summarizer.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/summarizer", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          "sitemap-generator": {
            specPath: "api/sitemap-generator.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/sitemap-generator", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          "seo-score": {
            specPath: "api/seo-score.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/seo-score", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
          agent: {
            specPath: "api/agent.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/agent", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag",
            },
          },
        },
      },
    ],
    function chatWidgetPlugin() {
      return {
        name: "chat-widget-plugin",
        injectHtmlTags() {
          return {
            preBodyTags: [
              `
              <div id="chat-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
                <button
                  id="chat-widget-button"
                  style="background: transparent; border: none; cursor: pointer; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; padding:0; margin:0;"
                >
                  <img src="https://bot-framework-westeurope.azureedge.net/bot-icons-v1/bdb5390f-2312-420b-89b3-6d753841cdb1_DjAC7MB61QR80uauCeo1sPEve8jqABuAkHEcY8I28t0Dno.png" alt="Chat Bot Icon" style="width: 60px; height: 60px; border-radius: 50%;" />
                </button>
                <div
                  id="chat-widget-iframe-container"
                  style="display: none; width: 400px; height: 600px; border: none; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: relative;"
                >
                  <iframe
                    id="chat-widget-iframe"
                    src="https://copilotstudio.microsoft.com/environments/Default-efbef5c4-77ac-41d8-800a-2dec22f28e82/bots/Default_agentWordLift/webchat?__version__=2"
                    frameborder="0"
                    style="width: 100%; height: 100%; border-radius: 10px;"
                    title="WordLift Chat"
                  ></iframe>
                </div>
              </div>
              <style>
                /* Mobile responsiveness */
                @media (max-width: 768px) {
                  #chat-widget-iframe-container {
                    width: 100%;
                    max-width: 350px;
                    right: 10px;
                  }
                }
              </style>
            `,
            ],
            postBodyTags: [
              `
              <script>
                (function() {
                  const chatButton = document.getElementById('chat-widget-button');
                  const chatIframeContainer = document.getElementById('chat-widget-iframe-container');

                  chatButton.addEventListener('click', function() {
                    if (chatIframeContainer.style.display === 'none') {
                      chatIframeContainer.style.display = 'block';
                    } else {
                      chatIframeContainer.style.display = 'none';
                    }
                  });
                })();
              </script>
            `,
            ],
          };
        },
      };
    },
  ],
  themes: [
    "docusaurus-theme-openapi-docs",
    // Remove this entire block:
    // [
    //   "@docusaurus/theme-classic",
    //   {
    //     customCss: [
    //       require.resolve("./src/css/custom.css"),
    //     ],
    //   },
    // ],
  ],
};

module.exports = config;
