import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/resolve/resolve-api",
    },
    {
      type: "category",
      label: "Resolve",
      link: {
        type: "doc",
        id: "api/resolve/resolve",
      },
      items: [
        {
          type: "doc",
          id: "api/resolve/resolve-mentions",
          label: "Resolve mentions",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
