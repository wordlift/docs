import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/resolve/resolve-api",
    },
    {
      type: "category",
      label: "Resolve",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/resolve/resolve",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/resolve/resolve-mentions",
          label: "Resolve mentions",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
