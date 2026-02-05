"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/inspector/inspection",
        },
        {
            type: "category",
            label: "Microdata",
            link: {
                type: "doc",
                id: "api/inspector/microdata",
            },
            items: [
                {
                    type: "doc",
                    id: "api/inspector/microdata-to-json-ld",
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
                id: "api/inspector/inspector",
            },
            items: [
                {
                    type: "doc",
                    id: "api/inspector/get",
                    label: "Inspect",
                    className: "api-method get",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
