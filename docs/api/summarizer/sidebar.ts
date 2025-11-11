import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/summarizer/summarizer",
    },
    {
      type: "category",
      label: "Summarizations",
      link: {
        type: "doc",
        id: "api/summarizer/summarizations",
      },
      items: [
        {
          type: "doc",
          id: "api/summarizer/microdata-to-json-ld-using-post",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
