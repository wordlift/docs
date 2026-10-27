import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/graphql/graphql-support",
    },
    {
      type: "category",
      label: "GraphQL",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/graphql/graph-ql",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/graphql/graphql-using-post",
          label: "Query",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
