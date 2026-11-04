import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/agent/wordlift-agent-api",
    },
    {
      type: "category",
      label: "Agent",
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/agent/ask-request-api-ask-post",
          label: "Ask Request",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
