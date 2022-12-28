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
  favicon: "img/favicon.ico",
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
          src: "https://wordlift.io/wp-content/uploads/2022/12/logo.svg",
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
                //   label: 'SEO Automation',
                //   to: '/en/latest/getting-started'
                // }, {
                label: "WordPress Plugin",
                to: "/en/latest",
              },
              {
                label: "WooCommerce Plugin",
                to: "woocommerce/introduction",
              },
              {
                label: "Google Sheets Add-on",
                to: "seo-add-on-google-sheets/introduction",
              },
              {
                label: "Looker Studio Connector",
                to: "looker-studio-connector/introduction",
              },
            ],
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
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus',
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus',
      //         },
      //       ],
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog',
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus',
      //         },
      //       ],
      //     },
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} WordLift srl`,
      // },
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
    }),

  plugins: [
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
        },
      },
    ],
    [
      "./src/plugins/qa-bot",
      {
        token:
          "mVhWS6wV8SwiO98vtnc_Jd98_T05PtgkqXUhJN5x9TEwP4Fx9jslZch6-isnKoJ_8DY3Zc18tg==",
        title: "WordLift",
        avatar:
          "https://wordlift.io/wp-content/uploads/2022/07/chatbot-round.png",
        description:
          "Organize your Content, Publish Linked Data, Boost your Traffic",
        site: "https://docs.wordlift.io",
        template: `
                  <dl>
                    <dt>You can ask questions about WordLift. Try</dt>
                    <dd>Why shall I use WordLift?</dd>
                    <dd>What are the languages supported by WordLift?</dd>
                    <dd>Is WordLift Secure?</dd>
                  </dl>
                  `,
      },
    ],
  ],

  themes: ["docusaurus-theme-openapi-docs"],
};

module.exports = config;
