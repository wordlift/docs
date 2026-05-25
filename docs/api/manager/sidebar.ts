import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/manager/manager",
    },
    {
      type: "category",
      label: "Account",
      link: {
        type: "doc",
        id: "api/manager/account",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-me",
          label: "Get",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/clear-cache",
          label: "Clear Cache",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/reset-me",
          label: "Reset",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Botify Crawl Imports",
      link: {
        type: "doc",
        id: "api/manager/botify-crawl-imports",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-botify-crawl-import",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "AddOns",
      link: {
        type: "doc",
        id: "api/manager/add-ons",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-configurations",
          label: "List",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Data URI",
      link: {
        type: "doc",
        id: "api/manager/data-uri",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get",
          label: "Get the Web Data URI for a Web Page URL.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Sitemap Imports",
      link: {
        type: "doc",
        id: "api/manager/sitemap-imports",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-sitemap-import",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Google Merchants",
      link: {
        type: "doc",
        id: "api/manager/google-merchants",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-google-merchants",
          label: "List",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Analytics syncs",
      link: {
        type: "doc",
        id: "api/manager/analytics-syncs",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-analytics-syncs",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-analytics-sync",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Web pages",
      link: {
        type: "doc",
        id: "api/manager/web-pages",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-web-page",
          label: "Get",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Platform Consumptions",
      link: {
        type: "doc",
        id: "api/manager/platform-consumptions",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-my-platform-consumption",
          label: "Get the Platform Consumption",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-or-update-my-platform-consumption",
          label: "Create or update the Platform Consumption",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/manager/delete-platform-consumption-by-id",
          label: "Delete Platform Consumption by ID",
          className: "menu__list-item--deprecated api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/delete-platform-consumption",
          label: "Delete Platform Consumption",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "OAuth2 Authorized Clients",
      link: {
        type: "doc",
        id: "api/manager/o-auth-2-authorized-clients",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-o-auth-2-authorized-clients",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-o-auth-2-authorized-client",
          label: "Create",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manager/delete-o-auth-2-authorized-client",
          label: "Delete",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/get-o-auth-2-authorized-client",
          label: "Get",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/update-o-auth-2-authorized-client",
          label: "Update",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Account OAuth2 Connectors",
      link: {
        type: "doc",
        id: "api/manager/account-o-auth-2-connectors",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/delete-authorization",
          label: "Disconnect account connector authorization",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/authorization",
          label: "Get account connector authorization",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-authorization-request",
          label: "Create account connector authorization request",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Account Connector Fields",
      link: {
        type: "doc",
        id: "api/manager/account-connector-fields",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/fields",
          label: "List account connector fields",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/delete-field",
          label: "Delete account connector field",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/put-field",
          label: "Save account connector field",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "OAuth2 Connectors",
      link: {
        type: "doc",
        id: "api/manager/o-auth-2-connectors",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/connectors",
          label: "List OAuth2 connectors",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/authorize-error",
          label: "Complete OAuth2 connector authorization",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Web Pages Imports",
      link: {
        type: "doc",
        id: "api/manager/web-pages-imports",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-web-page-imports",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Accounts",
      link: {
        type: "doc",
        id: "api/manager/accounts",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-accounts",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/get-account",
          label: "Get an account.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/patch-account",
          label: "Patch an account.",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/manager/update-account",
          label: "Update an account.",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Plugin Diagnostics",
      link: {
        type: "doc",
        id: "api/manager/plugin-diagnostics",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/update-diagnostic-plugin-collection",
          label: "Update",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Google Search Console",
      link: {
        type: "doc",
        id: "api/manager/google-search-console",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-website-search",
          label: "List Website Search data",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/list-websites",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-url-inspection",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Custom Domains",
      link: {
        type: "doc",
        id: "api/manager/custom-domains",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/validate",
          label: "Validate",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Include Excludes",
      link: {
        type: "doc",
        id: "api/manager/include-excludes",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-include-excludes",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/update-include-excludes",
          label: "Update",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Authors",
      link: {
        type: "doc",
        id: "api/manager/authors",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-author",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Embedding",
      link: {
        type: "doc",
        id: "api/manager/embedding",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-embedding",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Google Search Console Searches",
      link: {
        type: "doc",
        id: "api/manager/google-search-console-searches",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-website-search-1",
          label: "List Website Search data",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Link Groups",
      link: {
        type: "doc",
        id: "api/manager/link-groups",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-link-groups",
          label: "Get",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Web Page Scrape",
      link: {
        type: "doc",
        id: "api/manager/web-page-scrape",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-web-page-scrape",
          label: "Web Page Scrape",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Account Stats",
      link: {
        type: "doc",
        id: "api/manager/account-stats",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-my-stats",
          label: "Get my Account statistics",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Analytics Imports",
      link: {
        type: "doc",
        id: "api/manager/analytics-imports",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-analytics-import",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Vector Search Nodes",
      link: {
        type: "doc",
        id: "api/manager/vector-search-nodes",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/update-nodes-collection",
          label: "Update",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Account Chunksets",
      link: {
        type: "doc",
        id: "api/manager/account-chunksets",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-account-chunksets",
          label: "List account chunksets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/delete-account-chunkset",
          label: "Delete account chunkset",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/get-account-chunkset",
          label: "Get account chunkset",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/put-account-chunkset",
          label: "Create or replace account chunkset",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Internal Links",
      link: {
        type: "doc",
        id: "api/manager/internal-links",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-internal-link",
          label: "Create",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manager/create-internal-link-suggestion",
          label: "Suggest",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Redeem Codes",
      link: {
        type: "doc",
        id: "api/manager/redeem-codes",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/redeem-code",
          label: "Redeem the provided code and get a key",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Vector Search Queries",
      link: {
        type: "doc",
        id: "api/manager/vector-search-queries",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-query",
          label: "Create",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Platform Limits",
      link: {
        type: "doc",
        id: "api/manager/platform-limits",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-platform-limits",
          label: "List Platform Limits",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-platform-limit",
          label: "Create Platform Limit",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manager/delete-platform-limit",
          label: "Delete Platform Limit",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/get-platform-limit",
          label: "Get Platform Limit",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/update-platform-limit",
          label: "Update Platform Limit",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Tokens",
      link: {
        type: "doc",
        id: "api/manager/tokens",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-token",
          label: "Get",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Merchants",
      link: {
        type: "doc",
        id: "api/manager/merchants",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-merchants",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-merchant",
          label: "Create",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manager/delete-merchant",
          label: "Delete by id",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/get-merchant",
          label: "Get by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/update-merchant",
          label: "Update",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Merchant Syncs",
      link: {
        type: "doc",
        id: "api/manager/merchant-syncs",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/list-merchant-syncs",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-sync",
          label: "Start",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manager/get-merchant-sync",
          label: "Get by id",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
