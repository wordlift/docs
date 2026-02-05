"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/analysis/analysis",
        },
        {
            type: "category",
            label: "Entity Gaps",
            link: {
                type: "doc",
                id: "api/analysis/entity-gaps",
            },
            items: [
                {
                    type: "doc",
                    id: "api/analysis/create-entity-gap",
                    label: "Create",
                    className: "api-method post",
                },
            ],
        },
        {
            type: "category",
            label: "Analyses",
            link: {
                type: "doc",
                id: "api/analysis/analyses",
            },
            items: [
                {
                    type: "doc",
                    id: "api/analysis/v-2-analysis",
                    label: "Analyse Web Page",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/analysis/analyse",
                    label: "Analyse content",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/analysis/merge",
                    label: "Analyse and Merge",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/analysis/create",
                    label: "Create",
                    className: "api-method post",
                },
            ],
        },
        {
            type: "category",
            label: "Content Expansions",
            link: {
                type: "doc",
                id: "api/analysis/content-expansions",
            },
            items: [
                {
                    type: "doc",
                    id: "api/analysis/create-content-expansion",
                    label: "Create",
                    className: "api-method post",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
