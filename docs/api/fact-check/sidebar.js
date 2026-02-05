"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/fact-check/wordlift-fact-checking-api",
        },
        {
            type: "category",
            label: "Fact Check",
            items: [
                {
                    type: "doc",
                    id: "api/fact-check/submit-fact-check",
                    label: "Submit a fact-checking request",
                    className: "api-method post",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
