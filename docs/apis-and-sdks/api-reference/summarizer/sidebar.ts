import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/summarizer/summarizer",
    },
    {
      type: "category",
      label: "Summarizations",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/summarizer/summarizations",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/summarizer/microdata-to-json-ld-using-post",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
