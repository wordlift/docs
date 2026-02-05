"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocBreadcrumbsStructuredData;
var react_1 = require("react");
var Head_1 = require("@docusaurus/Head");
var client_1 = require("@docusaurus/plugin-content-docs/client");
function DocBreadcrumbsStructuredData(props) {
    var structuredData = (0, client_1.useBreadcrumbsStructuredData)({
        breadcrumbs: props.breadcrumbs,
    });
    return (<Head_1.default>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Head_1.default>);
}
