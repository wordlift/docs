import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-and-sdks/api-reference/manager/manager",
    },
    {
      type: "category",
      label: "Account",
      link: {
        type: "doc",
        id: "apis-and-sdks/api-reference/manager/account",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-me",
          label: "Get",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/clear-cache",
          label: "Clear Cache",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/reset-me",
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
        id: "apis-and-sdks/api-reference/manager/botify-crawl-imports",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-botify-crawl-import",
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
        id: "apis-and-sdks/api-reference/manager/add-ons",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-configurations",
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
        id: "apis-and-sdks/api-reference/manager/data-uri",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get",
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
        id: "apis-and-sdks/api-reference/manager/sitemap-imports",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-sitemap-import",
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
        id: "apis-and-sdks/api-reference/manager/google-merchants",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-google-merchants",
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
        id: "apis-and-sdks/api-reference/manager/analytics-syncs",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-analytics-syncs",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-analytics-sync",
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
        id: "apis-and-sdks/api-reference/manager/web-pages",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-web-page",
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
        id: "apis-and-sdks/api-reference/manager/platform-consumptions",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-my-platform-consumption",
          label: "Get the Platform Consumption",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-or-update-my-platform-consumption",
          label: "Create or update the Platform Consumption",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-platform-consumption-by-id",
          label: "Delete Platform Consumption by ID",
          className: "menu__list-item--deprecated api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-platform-consumption",
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
        id: "apis-and-sdks/api-reference/manager/o-auth-2-authorized-clients",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-o-auth-2-authorized-clients",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-o-auth-2-authorized-client",
          label: "Create",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-o-auth-2-authorized-client",
          label: "Delete",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-o-auth-2-authorized-client",
          label: "Get",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-o-auth-2-authorized-client",
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
        id: "apis-and-sdks/api-reference/manager/account-o-auth-2-connectors",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-authorization",
          label: "Disconnect account connector authorization",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/authorization",
          label: "Get account connector authorization",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-authorization-request",
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
        id: "apis-and-sdks/api-reference/manager/account-connector-fields",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/fields",
          label: "List account connector fields",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-field",
          label: "Delete account connector field",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/put-field",
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
        id: "apis-and-sdks/api-reference/manager/o-auth-2-connectors",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/connectors",
          label: "List OAuth2 connectors",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/authorize-error",
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
        id: "apis-and-sdks/api-reference/manager/web-pages-imports",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-web-page-imports",
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
        id: "apis-and-sdks/api-reference/manager/accounts",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-accounts",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-account",
          label: "Get an account.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/patch-account",
          label: "Patch an account.",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-account",
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
        id: "apis-and-sdks/api-reference/manager/plugin-diagnostics",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-diagnostic-plugin-collection",
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
        id: "apis-and-sdks/api-reference/manager/google-search-console",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-website-search",
          label: "List Website Search data",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-websites",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-url-inspection",
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
        id: "apis-and-sdks/api-reference/manager/custom-domains",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/validate",
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
        id: "apis-and-sdks/api-reference/manager/include-excludes",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-include-excludes",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-include-excludes",
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
        id: "apis-and-sdks/api-reference/manager/authors",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-author",
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
        id: "apis-and-sdks/api-reference/manager/embedding",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-embedding",
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
        id: "apis-and-sdks/api-reference/manager/google-search-console-searches",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-website-search-1",
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
        id: "apis-and-sdks/api-reference/manager/link-groups",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-link-groups",
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
        id: "apis-and-sdks/api-reference/manager/web-page-scrape",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-web-page-scrape",
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
        id: "apis-and-sdks/api-reference/manager/account-stats",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-my-stats",
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
        id: "apis-and-sdks/api-reference/manager/analytics-imports",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-analytics-import",
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
        id: "apis-and-sdks/api-reference/manager/vector-search-nodes",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-nodes-collection",
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
        id: "apis-and-sdks/api-reference/manager/account-chunksets",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-account-chunksets",
          label: "List account chunksets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-account-chunkset",
          label: "Delete account chunkset",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-account-chunkset",
          label: "Get account chunkset",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/put-account-chunkset",
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
        id: "apis-and-sdks/api-reference/manager/internal-links",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-internal-link",
          label: "Create",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-internal-link-suggestion",
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
        id: "apis-and-sdks/api-reference/manager/redeem-codes",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/redeem-code",
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
        id: "apis-and-sdks/api-reference/manager/vector-search-queries",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-query",
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
        id: "apis-and-sdks/api-reference/manager/platform-limits",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-platform-limits",
          label: "List Platform Limits",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-platform-limit",
          label: "Create Platform Limit",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-platform-limit",
          label: "Delete Platform Limit",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-platform-limit",
          label: "Get Platform Limit",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-platform-limit",
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
        id: "apis-and-sdks/api-reference/manager/tokens",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-token",
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
        id: "apis-and-sdks/api-reference/manager/merchants",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-merchants",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-merchant",
          label: "Create",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/delete-merchant",
          label: "Delete by id",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-merchant",
          label: "Get by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/update-merchant",
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
        id: "apis-and-sdks/api-reference/manager/merchant-syncs",
      },
      items: [
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/list-merchant-syncs",
          label: "List",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/create-sync",
          label: "Start",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-and-sdks/api-reference/manager/get-merchant-sync",
          label: "Get by id",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
