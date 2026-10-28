// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require("prism-react-renderer");
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const nodeCoreModuleFallbacks = {
    path: require.resolve("path-browserify"),
};

// Docs v3 IA moves (old URL -> new URL). Single source for the server-side
// 301s (scripts/generate-staticwebapp-config.js) and these client fallbacks.
// /problems/* is never in this map: those URLs are Resolve API contract IDs.
const movedPageRedirects = require("./redirects/redirect-map.json")
    .filter(({from}) => from !== "/")
    .map(({from, to}) => ({from: from.replace(/\/$/, ""), to}));

// Legacy Read the Docs URLs, retargeted to the v3 paths.
const legacyRedirects = [
    {from: "/en/latest/wordlift-cloud.html", to: "/welcome/install-wordlift-cloud/"},
    {from: "/pages/wordlift-cloud", to: "/welcome/install-wordlift-cloud/"},
    {from: "/en/latest/troubleshooting.html", to: "/integrations/wordpress-plugin/troubleshooting/"},
    {from: "/en/latest/key-concepts.html", to: "/concepts/"},
    {from: "/en/latest/edit-entity.html", to: "/integrations/wordpress-plugin/edit-entity/"},
    {from: "/en/latest/import-export-vocabulary.html", to: "/integrations/wordpress-plugin/import-export-vocabulary/"},
    {from: "/en/latest/data-studio-connector.html", to: "/integrations/looker-studio/"},
    {from: "/en/latest/customization-and-development.html", to: "/integrations/wordpress-plugin/customization/"},
    {from: "/en/latest/publishing.html", to: "/integrations/wordpress-plugin/publishing/"},
    {from: "/en/latest/editors.html", to: "/integrations/wordpress-plugin/editors/"},
    {from: "/en/latest/publish.html", to: "/integrations/wordpress-plugin/publishing/"},
    {from: "/en/latest/analysis.html", to: "/integrations/wordpress-plugin/analysis/"},
    {from: "/en/latest/discover.html", to: "/welcome/"},
    {from: "/en/latest/mappings.html", to: "/integrations/wordpress-plugin/mappings/"},
    {from: "/en/latest/support.html", to: "/integrations/wordpress-plugin/support/"},
    {from: "/en/latest/advanced-topics.html", to: "/integrations/wordpress-plugin/advanced-topics/"},
    {from: "/en/latest/about.html", to: "/welcome/"},
    {from: "/en/latest/wordlift-theme-development.html", to: "/welcome/"},
    {from: "/en/latest/", to: "/welcome/"},
    {from: "/zapier/introduction/", to: "/integrations/zapier/"},
    {from: "/zapier/", to: "/integrations/zapier/"},
];

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "WordLift Developer Documentation",
    tagline:
        "Take advantage of the API powering the WordLift platform, build new workflow and win the SEO battle.",
    url: "https://docs.wordlift.io",
    baseUrl: "/",
    onBrokenLinks: "warn",
    favicon: "img/logo-tile.svg",
    trailingSlash: true,

    // Markdown configuration
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },

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
    ],
    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "/",
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/wordlift/docs/tree/main",
                    docItemComponent: "@theme/ApiItem"
                },
                blog: false,
                theme: {
                    customCss: [
                        // Brand fonts, self-hosted (all open source). Denim INK is
                        // licensed and loaded by src/plugins/denim-ink.
                        require.resolve("@fontsource/open-sauce-sans/500.css"),
                        require.resolve("@fontsource/open-sauce-sans/600.css"),
                        require.resolve("@fontsource/bricolage-grotesque/400.css"),
                        require.resolve("@fontsource/dm-mono/400.css"),
                        require.resolve("@fontsource/dm-mono/500.css"),
                        require.resolve("./src/css/custom.css"),
                        require.resolve("./src/css/brand.css"),
                    ],
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: "WordLift",
                logo: {
                    alt: "WordLift Docs",
                    src: "img/logo-icon.svg",
                },
                // Sections live in the sidebar; the top bar is brand, search and GitHub.
                items: [
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
                                to: "/welcome/",
                            },
                            {
                                label: "Plans and pricing",
                                to: "/plans-and-pricing/",
                            },
                            {
                                label: "API reference",
                                to: "/apis-and-sdks/api-reference/",
                            },
                            {
                                label: "Support",
                                to: "/support/",
                            },
                        ],
                    },
                    {
                        title: "AI Resources",
                        items: [
                            {
                                html: '<a href="/llms.txt" target="_blank" rel="noopener noreferrer" class="footer__link-item">llms.txt</a>',
                            },
                            {
                                html: '<a href="/llms-full.txt" target="_blank" rel="noopener noreferrer" class="footer__link-item">llms-full.txt</a>',
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
              appId: "KT7EPQGS5A",
              apiKey: "4443307bcba39f1d7cc5c4d492411b6e",
              indexName: "docs_wordlift_io",
              contextualSearch: false,
            },
        }),

    // Motion and micro-interactions (GSAP), run on every route change.
    clientModules: [require.resolve("./src/client/motion.js")],

    plugins: [
        require.resolve("./src/plugins/denim-ink"),
        require.resolve("./src/plugins/page-markdown"),
        function nodeCoreModuleFallbackPlugin() {
            return {
                name: "node-core-module-fallback-plugin",
                configureWebpack() {
                    return {
                        resolve: {
                            fallback: nodeCoreModuleFallbacks,
                        },
                    };
                },
            };
        },
        [
            "@docusaurus/plugin-client-redirects",
            {
                // Client-side fallback. The primary 301s are server-side in
                // static/staticwebapp.config.json, generated from the same map.
                redirects: [...movedPageRedirects, ...legacyRedirects],
                createRedirects(existingPath) {
                    // Generated API reference moved from /api/* page by page.
                    const prefix = "/apis-and-sdks/api-reference/";
                    if (existingPath.startsWith(prefix) && existingPath !== prefix) {
                        return [`/api/${existingPath.slice(prefix.length)}`];
                    }
                    return undefined;
                },
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
                        outputDir: "docs/apis-and-sdks/api-reference/analysis", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    classification: {
                        specPath: "api/classification.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/classification", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    "content-generation": {
                        specPath: "api/content-generation.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/content-generation", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    // This API is deprecated.
                    // embeddings: {
                    //   specPath: "api/embeddings.yaml", // path or URL to the OpenAPI spec
                    //   outputDir: "docs/apis-and-sdks/api-reference/embeddings", // output directory for generated *.mdx and sidebar.js files
                    //   sidebarOptions: {
                    //     groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                    //     categoryLinkSource: "tag",
                    //   },
                    // },
                    "content-evaluations": {
                        specPath: "api/content-evaluations.yaml",
                        outputDir: "docs/apis-and-sdks/api-reference/content-evaluations",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag",
                        },
                    },
                    events: {
                        specPath: "api/events.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/events", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    "fact-check": {
                        specPath: "api/fact-check.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/fact-check", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    graphql: {
                        specPath: "api/graphql.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/graphql", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    inspector: {
                        specPath: "api/inspector.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/inspector", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    "long-tail": {
                        specPath: "api/long-tail.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/long-tail", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    manager: {
                        specPath: "api/manager.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/manager", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    middleware: {
                        specPath: "api/middleware.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/middleware", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    summarizer: {
                        specPath: "api/summarizer.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/summarizer", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    "sitemap-generator": {
                        specPath: "api/sitemap-generator.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/sitemap-generator", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    agent: {
                        specPath: "api/agent.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/agent", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    audit: {
                        specPath: "api/audit.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/audit", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    "query-fan-out": {
                        specPath: "api/ai_visibility_audits.yaml", // path or URL to the OpenAPI spec
                        outputDir: "docs/apis-and-sdks/api-reference/query-fan-out", // output directory for generated *.mdx and sidebar.js files
                        sidebarOptions: {
                            groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
                            categoryLinkSource: "tag",
                        },
                    },
                    "graph-kpi": {
                        specPath: "api/graph-kpi.yaml",
                        outputDir: "docs/apis-and-sdks/api-reference/graph-kpi",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag",
                        },
                    },
                    resolve: {
                        specPath: "api/resolve.yaml",
                        outputDir: "docs/apis-and-sdks/api-reference/resolve",
                        sidebarOptions: {
                            groupPathsBy: "tag",
                            categoryLinkSource: "tag",
                        },
                    },
                },
            },
        ],
        [
            "docusaurus-plugin-llms-builder",
            {
                version: "2.0.0",
                llmConfigs: [
                    {
                        title: "WordLift Documentation",
                        sessions: [
                            {
                                type: "docs",
                                docsDir: "docs",
                                sessionName: "Documentation",
                                sitemap: "sitemap.xml",
                            },
                        ],
                        generateLLMsTxt: true,
                        generateLLMsFullTxt: true,
                    },
                ],
            },
        ],
        // function chatWidgetPlugin() {
        //     return {
        //         name: "chat-widget-plugin",
        //         injectHtmlTags() {
        //             return {
        //                 preBodyTags: [
        //                     `
        //       <div id="chat-widget-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
        //         <button
        //           id="chat-widget-button"
        //           style="background: transparent; border: none; cursor: pointer; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; padding:0; margin:0;"
        //         >
        //           <img src="https://bot-framework-westeurope.azureedge.net/bot-icons-v1/bdb5390f-2312-420b-89b3-6d753841cdb1_DjAC7MB61QR80uauCeo1sPEve8jqABuAkHEcY8I28t0Dno.png" alt="Chat Bot Icon" style="width: 60px; height: 60px; border-radius: 50%;" />
        //         </button>
        //         <div
        //           id="chat-widget-iframe-container"
        //           style="display: none; width: 400px; height: 600px; border: none; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: relative;"
        //         >
        //           <iframe
        //             id="chat-widget-iframe"
        //             src="https://copilotstudio.microsoft.com/environments/Default-efbef5c4-77ac-41d8-800a-2dec22f28e82/bots/Default_agentWordLift/webchat?__version__=2"
        //             frameborder="0"
        //             style="width: 100%; height: 100%; border-radius: 10px;"
        //             title="WordLift Chat"
        //           ></iframe>
        //         </div>
        //       </div>
        //       <style>
        //         /* Mobile responsiveness */
        //         @media (max-width: 768px) {
        //           #chat-widget-iframe-container {
        //             width: 100%;
        //             max-width: 350px;
        //             right: 10px;
        //           }
        //         }
        //       </style>
        //     `,
        //                 ],
        //                 postBodyTags: [
        //                     `
        //       <script>
        //         (function() {
        //           const chatButton = document.getElementById('chat-widget-button');
        //           const chatIframeContainer = document.getElementById('chat-widget-iframe-container');
        //
        //           chatButton.addEventListener('click', function() {
        //             if (chatIframeContainer.style.display === 'none') {
        //               chatIframeContainer.style.display = 'block';
        //             } else {
        //               chatIframeContainer.style.display = 'none';
        //             }
        //           });
        //         })();
        //       </script>
        //     `,
        //                 ],
        //             };
        //         },
        //     };
        // },
    ],
    themes: [
        "docusaurus-theme-openapi-docs"
    ],
};

module.exports = config;
