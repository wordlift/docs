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
  tutorialSidebar: [
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
  wordlift: [
    {
      type: "category",
      label: "WordLift",
      link: {
        type: "generated-index",
        title: "API",
        description:
          "API Reference",
        slug: "/category/wordlift-api",
      },
      items: require("./docs/wordlift/sidebar.js"),
    },
  ],
};

module.exports = sidebars;
