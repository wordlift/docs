import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/content-evaluations/wordlift-content-evaluations-api",
    },
    {
      type: "category",
      label: "Content Evaluations",
      items: [
        {
          type: "doc",
          id: "api/content-evaluations/evaluate-content-api-content-evaluations-post",
          label: "Evaluate Content",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
