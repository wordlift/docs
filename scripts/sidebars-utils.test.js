const assert = require("assert");
const { loadSidebar } = require("./sidebars-utils");

const sidebarPaths = [
  "./docs/apis-and-sdks/api-reference/agent/sidebar",
  "./docs/apis-and-sdks/api-reference/analysis/sidebar",
  "./docs/apis-and-sdks/api-reference/audit/sidebar",
  "./docs/apis-and-sdks/api-reference/classification/sidebar",
  "./docs/apis-and-sdks/api-reference/content-evaluations/sidebar",
  "./docs/apis-and-sdks/api-reference/content-generation/sidebar",
  "./docs/apis-and-sdks/api-reference/events/sidebar",
  "./docs/apis-and-sdks/api-reference/fact-check/sidebar",
  "./docs/apis-and-sdks/api-reference/graphql/sidebar",
  "./docs/apis-and-sdks/api-reference/gsc-url-inspections/sidebar",
  "./docs/apis-and-sdks/api-reference/inspector/sidebar",
  "./docs/apis-and-sdks/api-reference/long-tail/sidebar",
  "./docs/apis-and-sdks/api-reference/manager/sidebar",
  "./docs/apis-and-sdks/api-reference/middleware/sidebar",
  "./docs/apis-and-sdks/api-reference/query-fan-out/sidebar",
  "./docs/apis-and-sdks/api-reference/sitemap-generator/sidebar",
  "./docs/apis-and-sdks/api-reference/summarizer/sidebar",
];

for (const sidebarPath of sidebarPaths) {
  const loaded = loadSidebar(sidebarPath);
  assert.ok(
    Array.isArray(loaded),
    `Expected ${sidebarPath} to resolve to an array.`
  );
}

console.log("sidebars-utils.test.js: all sidebar modules resolved.");
