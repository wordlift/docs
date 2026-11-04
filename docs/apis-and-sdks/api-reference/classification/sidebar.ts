import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/classification/classification",
    },
    {
      type: "category",
      label: "Classifications",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/classification/classifications",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/classification/classify-using-post",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
