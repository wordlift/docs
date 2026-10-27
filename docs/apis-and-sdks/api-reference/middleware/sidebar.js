"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "apis-and-sdks/api-reference/middleware/middleware",
        },
        {
            type: "category",
            label: "Autocomplete",
            link: {
                type: "doc",
                id: "apis-and-sdks/api-reference/middleware/autocomplete",
            },
            items: [
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/get",
                    label: "Get",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Entities",
            link: {
                type: "doc",
                id: "apis-and-sdks/api-reference/middleware/entities",
            },
            items: [
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/get-entities",
                    label: "Get",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/create-or-update-entities",
                    label: "Update (or create)",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/create-entities",
                    label: "Create",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/delete-entities",
                    label: "Delete",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/patch-entities",
                    label: "Patch Entity",
                    className: "api-method patch",
                },
            ],
        },
        {
            type: "category",
            label: "Dataset",
            link: {
                type: "doc",
                id: "apis-and-sdks/api-reference/middleware/dataset",
            },
            items: [
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/create-or-update-entities-1",
                    label: "Create or update many",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/create-or-update-entity",
                    label: "Create or update one",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/delete-entity",
                    label: "Delete one",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "apis-and-sdks/api-reference/middleware/delete-all-entities",
                    label: "Delete all",
                    className: "api-method delete",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
