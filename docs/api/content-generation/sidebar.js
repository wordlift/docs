"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sidebar = {
    apisidebar: [
        {
            type: "doc",
            id: "api/content-generation/content-generation",
        },
        {
            type: "category",
            label: "Content Generation Fields",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-fields",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-fields",
                    label: "List",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/list-fields-for-graph-ql-query",
                    label: "List for GraphQl Query",
                    className: "api-method post",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Renders",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-renders",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/render-template",
                    label: "Render",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/render-template-collection",
                    label: "Render",
                    className: "api-method post",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Syncs",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-syncs",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/create-sync",
                    label: "Create",
                    className: "api-method post",
                },
            ],
        },
        {
            type: "category",
            label: "QuestionsAndAnswers",
            link: {
                type: "doc",
                id: "api/content-generation/questions-and-answers",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/get-questions-and-answers",
                    label: "Get",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-question-and-answer",
                    label: "Create",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/delete-questions-and-answers-collection",
                    label: "Delete",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-questions-and-answers-collection",
                    label: "Create",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-questions-and-answers-collection",
                    label: "Update",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "api/content-generation/delete-question-and-answer",
                    label: "Delete",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-question-and-answer",
                    label: "Update",
                    className: "api-method put",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Records",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-records",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-records",
                    label: "List",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-records",
                    label: "Update",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-records-collection",
                    label: "Update",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "api/content-generation/list-records-as-events",
                    label: "List as Events",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/get-record",
                    label: "Get",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-record",
                    label: "Update",
                    className: "api-method put",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Word biases",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-word-biases",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-words",
                    label: "List",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-word",
                    label: "Create",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-words",
                    label: "Update for prompt",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-words-from-csv",
                    label: "Update from CSV",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "api/content-generation/delete-word",
                    label: "Delete",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-word",
                    label: "Update",
                    className: "api-method put",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generations",
            link: {
                type: "doc",
                id: "api/content-generation/content-generations",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-content-generations",
                    label: "List",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-content-generation",
                    label: "Create",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/duplicate-content-generation",
                    label: "Duplicate",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/delete-content-generation",
                    label: "Delete",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "api/content-generation/get-content-generation",
                    label: "Get",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-content-generation",
                    label: "Update",
                    className: "api-method put",
                },
            ],
        },
        {
            type: "category",
            label: "Rules",
            link: {
                type: "doc",
                id: "api/content-generation/rules",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-rules",
                    label: "List",
                    className: "api-method get",
                },
                {
                    type: "doc",
                    id: "api/content-generation/create-rule",
                    label: "Create",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-rule-collection",
                    label: "Update",
                    className: "api-method put",
                },
                {
                    type: "doc",
                    id: "api/content-generation/copy-rules",
                    label: "Copy",
                    className: "api-method post",
                },
                {
                    type: "doc",
                    id: "api/content-generation/delete-rule",
                    label: "Delete",
                    className: "api-method delete",
                },
                {
                    type: "doc",
                    id: "api/content-generation/update-rule",
                    label: "Update",
                    className: "api-method put",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Completion",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-completion",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/create-completion",
                    label: "Create a completion",
                    className: "api-method post",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Models",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-models",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-models",
                    label: "List",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Records Export",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-records-export",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/export",
                    label: "export",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Presets",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-presets",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/list-presets",
                    label: "List",
                    className: "api-method get",
                },
            ],
        },
        {
            type: "category",
            label: "Content Generation Stats",
            link: {
                type: "doc",
                id: "api/content-generation/content-generation-stats",
            },
            items: [
                {
                    type: "doc",
                    id: "api/content-generation/get",
                    label: "Get",
                    className: "api-method get",
                },
            ],
        },
    ],
};
exports.default = sidebar.apisidebar;
