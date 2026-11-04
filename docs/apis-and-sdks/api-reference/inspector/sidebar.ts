import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/inspector/inspection",
    },
    {
      type: "category",
      label: "Microdata",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/inspector/microdata",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/inspector/microdata-to-json-ld",
          label: "Microdata to JSON-LD",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Inspector",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/inspector/inspector",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/inspector/get",
          label: "Inspect",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
