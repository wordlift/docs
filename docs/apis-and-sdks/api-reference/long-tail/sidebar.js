"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "apis-and-sdks/api-reference/long-tail/long-tail",
        },
        {
            type: "category",
            label: "Web Asyncs responses",
            link: {
                type: "doc",
                id: "apis-and-sdks/api-reference/long-tail/web-asyncs-responses",
            },
            items: [
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/long-tail/get-1",
                    label: "Get by id",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Long Tails",
            link: {
                type: "doc",
                id: "apis-and-sdks/api-reference/long-tail/long-tails",
            },
            items: [
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/long-tail/get-2",
                    label: "Get entities",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/long-tail/get-v-2",
                    label: "Get entities by rank",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/long-tail/get-3",
                    label: "Get entities by rank (async)",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Web Asyncs metadata",
            link: {
                type: "doc",
                id: "apis-and-sdks/api-reference/long-tail/web-asyncs-metadata",
            },
            items: [
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/long-tail/list",
                    label: "List",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/long-tail/get",
                    label: "Get by id",
                    className: "api-method get",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
