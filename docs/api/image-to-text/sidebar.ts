import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/image-to-text/wordlift-image-to-text-api",
    },
    {
      type: "category",
      label: "Image-to-Text",
      items: [
        {
          type: "doc",
          id: "api/image-to-text/image-to-text-api-image-2-text-v-1-post",
          label: "Convert Image to Text",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
