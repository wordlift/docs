"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/gsc-url-inspections/google-search-console-url-inspections",
        },
        {
            type: "category",
            label: "Google Search Console",
            link: {
                type: "doc",
                id: "api/gsc-url-inspections/google-search-console",
            },
            items: [
                {
                    type: "doc",
                    id: "api/gsc-url-inspections/post-gsc-url-inspections",
                    label: "Inspect a URL using Google Search Console",
                    className: "api-method post",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
