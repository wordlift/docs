import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/sitemap-generator/wordlift-sitemap-generator-api",
    },
    {
      type: "category",
      label: "Sitemap Generator",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/sitemap-generator/sitemap-generator",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/sitemap-generator/generate-sitemap",
          label: "Generate Sitemap",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
