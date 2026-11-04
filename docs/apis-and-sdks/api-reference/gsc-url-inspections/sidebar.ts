import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/gsc-url-inspections/google-search-console-url-inspections",
    },
    {
      type: "category",
      label: "Google Search Console",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/gsc-url-inspections/google-search-console",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/gsc-url-inspections/post-gsc-url-inspections",
          label: "Inspect a URL using Google Search Console",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
