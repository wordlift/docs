import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/sitemap-generator/wordlift-sitemap-generator-api",
    },
    {
      type: "category",
      label: "Sitemap Generator",
      link: {
        type: "doc",
        id: "api/sitemap-generator/sitemap-generator",
      },
      items: [
        {
          type: "doc",
          id: "api/sitemap-generator/generate-sitemap",
          label: "Generate Sitemap",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
