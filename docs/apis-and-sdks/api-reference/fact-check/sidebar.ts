import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/fact-check/wordlift-fact-checking-api",
    },
    {
      type: "category",
      label: "Fact Check",
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/fact-check/submit-fact-check",
          label: "Submit a fact-checking request",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
