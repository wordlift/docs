import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/events/events",
    },
    {
      type: "category",
      label: "Plugin Events",
      link: {
        type: "doc",
        id: "api/events/plugin-events",
      },
      items: [
        {
          type: "doc",
          id: "api/events/list-events",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/events/create-event",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
