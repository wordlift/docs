import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/query-fan-out/query-fan-out-api",
    },
    {
      type: "category",
      label: "Query Fan-Out",
      items: [
        {
          type: "doc",
          id: "api/query-fan-out/create-ai-visibility-audit",
          label: "Create AI visibility audits for Query Fan-Out",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
