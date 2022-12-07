// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WordLift Developer Documentation',
  tagline: 'Take advantage of the API powering the WordLift platform, build new workflow and win the SEO battle.',
  url: 'https://docs.wordlift.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wordlift', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/wordlift/docs/tree/main',
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/ApiItem" // add @theme/ApiItem here
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Developer',
        logo: {
          alt: 'WordLift',
          src: 'https://wordlift.io/wp-content/uploads/2022/12/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: 'Start Here',
          },
          {
            label: "API",
            position: "left",
            to: "/category/api"
          },
          {
            type: 'dropdown',
            label: 'Products',
            position: 'left',
            items: [ {
              label: 'SEO Automation',
              to: '/wordpress-plugin/getting-started'
            }, {
              label: 'WordPress Plugin',
              to: '/wordpress-plugin/getting-started'
            }, {
              label: 'WooCommerce Plugin',
              to: '/wordpress-plugin/getting-started'
            }, {
              label: 'Google Sheets Add-on',
              to: '/wordpress-plugin/getting-started'
            }, {
              label: 'Looker Studio Connector',
              to: '/wordpress-plugin/getting-started'
            } ]
          },
          {
            href: 'https://github.com/wordlift',
            label: 'GitHub',
            position: 'right',
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
        additionalLanguages: ["ruby", "python", "php"]
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
          "analysis": {
            specPath: "api/analysis.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/analysis", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag"
            },
          },
          "content-generation": {
            specPath: "api/content-generation.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/content-generation", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag"
            },
          },
          "inspector": {
            specPath: "api/inspector.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/inspector", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag"
            },
          },
          "long-tail": {
            specPath: "api/long-tail.yaml", // path or URL to the OpenAPI spec
            outputDir: "docs/api/long-tail", // output directory for generated *.mdx and sidebar.js files
            sidebarOptions: {
              groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
              categoryLinkSource: "tag"
            },
          }
        }
      },
    ]
  ],

  themes: ["docusaurus-theme-openapi-docs"]
};

module.exports = config;
