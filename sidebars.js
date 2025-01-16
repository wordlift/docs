/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    {
      type: "html",
      value: `<p style="color: var(--ifm-color-secondary-darkest)">DOCUMENTATION</p>`, // The HTML to be rendered
      defaultStyle: true, // Use the default menu item styling
    },
    {
      type: "doc",
      id: "introduction",
    },
    // {
    //   type: "doc",
    //   id: "getting-started",
    // },
    // {
    //   type: "doc",
    //   id: "authentication-and-security",
    // },
    // {
    //   type: "doc",
    //   id: "endpoints-and-methods",
    // },
    // {
    //   type: "doc",
    //   id: "request-and-response-formats",
    // },
    // {
    //   type: "doc",
    //   id: "error-handling",
    // },
    // {
    //   type: "doc",
    //   id: "examples",
    // },
    // {
    //   type: "doc",
    //   id: "frequently-asked-questions",
    // },
    // {
    //   type: "doc",
    //   id: "additional-resources",
    // },
  ],
  "agent-wordlift": [
    {
      type: "autogenerated",
      dirName: "agent-wordlift", // '.' means the current docs folder
    },
  ],
  "knowledge-graph": [
    {
      type: "autogenerated",
      dirName: "knowledge-graph", // '.' means the current docs folder
    },
  ],
  "wordpress-plugin": [
    {
      type: "autogenerated",
      dirName: "wordpress-plugin", // '.' means the current docs folder
    },
  ],
  "product-knowledge-graph-builder": [
    {
      type: "autogenerated",
      dirName: "product-knowledge-graph-builder", // '.' means the current docs folder
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
