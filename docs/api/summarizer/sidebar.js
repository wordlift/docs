"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/summarizer/summarizer",
        },
        {
            type: "category",
            label: "Summarizations",
            link: {
                type: "doc",
                id: "api/summarizer/summarizations",
            },
            items: [
                {
                    type: "doc",
                    id: "api/summarizer/microdata-to-json-ld-using-post",
                    label: "Create",
                    className: "api-method post",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
