import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/events/events",
    },
    {
      type: "category",
      label: "Plugin Events",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/events/plugin-events",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/events/list-events",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/events/create-event",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
