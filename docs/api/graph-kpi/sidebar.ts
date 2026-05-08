import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/graph-kpi/wordlift-graph-kpi-api",
    },
    {
      type: "category",
      label: "snapshots",
      link: {
        type: "doc",
        id: "api/graph-kpi/snapshots",
      },
      items: [
        {
          type: "doc",
          id: "api/graph-kpi/list-snapshots-kpi-graphs-graph-id-snapshots-get",
          label: "List daily KPI snapshots",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/graph-kpi/get-snapshot-kpi-graphs-graph-id-snapshots-date-get",
          label: "Get one daily KPI snapshot",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "jobs",
      link: {
        type: "doc",
        id: "api/graph-kpi/jobs",
      },
      items: [
        {
          type: "doc",
          id: "api/graph-kpi/create-job-kpi-graphs-graph-id-jobs-post",
          label: "Submit a KPI job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/graph-kpi/list-jobs-for-graph-kpi-graphs-graph-id-jobs-get",
          label: "List jobs for a graph",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/graph-kpi/get-job-kpi-graphs-graph-id-jobs-job-id-get",
          label: "Get job status",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
