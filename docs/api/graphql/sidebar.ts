import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/graphql/graphql-support",
    },
    {
      type: "category",
      label: "GraphQL",
      link: {
        type: "doc",
        id: "api/graphql/graph-ql",
      },
      items: [
        {
          type: "doc",
          id: "api/graphql/graphql-using-post",
          label: "Query",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
