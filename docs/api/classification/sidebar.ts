import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/classification/classification",
    },
    {
      type: "category",
      label: "Classifications",
      link: {
        type: "doc",
        id: "api/classification/classifications",
      },
      items: [
        {
          type: "doc",
          id: "api/classification/classify-using-post",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
