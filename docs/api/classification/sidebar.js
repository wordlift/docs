"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/classification/classification",
        },
        {
            type: "category",
            label: "Classifications",
            link: {
                type: "doc",
                id: "api/classification/classifications",
            },
            items: [
                {
                    type: "doc",
                    id: "api/classification/classify-using-post",
                    label: "Create",
                    className: "api-method post",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
