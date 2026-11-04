import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/audit/wordlift-audit-api",
    },
    {
      type: "category",
      label: "Audit",
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/audit/audit-website",
          label: "Website Audit",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
