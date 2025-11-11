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
      label: "Vector Search Questions",
      link: {
        type: "doc",
        id: "api/manager/vector-search-questions",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/create-vector-search-question",
          label: "Create",
          className: "api-method post",
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
      label: "Google Search Console Websites",
      link: {
        type: "doc",
        id: "api/manager/google-search-console-websites",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/get-gsc-sites",
          label: "Get Google Search Console sites",
          className: "api-method get",
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
      label: "Google Search Console OAuth2",
      link: {
        type: "doc",
        id: "api/manager/google-search-console-o-auth-2",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/delete-authorization",
          label: "Delete an authorization",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manager/get-authorizations",
          label: "Get the authorizations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/duplicate",
          label: "Duplicate the Google Search Console connection through accounts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manager/login",
          label: "Login to the Google Search Console API client",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manager/create-auth-code-exchange",
          label: "Get an Access Code",
          className: "menu__list-item--deprecated api-method post",
        },
        {
          type: "doc",
          id: "api/manager/create-authorize-uri",
          label: "Create an Authorization URI",
          className: "menu__list-item--deprecated api-method post",
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
      label: "Account - Google Search Console",
      link: {
        type: "doc",
        id: "api/manager/account-google-search-console",
      },
      items: [
        {
          type: "doc",
          id: "api/manager/update-account-config",
          label: "Account configuration update",
          className: "api-method patch",
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
