const assert = require("assert");
const { loadSidebar } = require("./sidebars-utils");

const sidebarPaths = [
  "./docs/api/agent/sidebar",
  "./docs/api/analysis/sidebar",
  "./docs/api/audit/sidebar",
  "./docs/api/classification/sidebar",
  "./docs/api/content-evaluations/sidebar",
  "./docs/api/content-generation/sidebar",
  "./docs/api/events/sidebar",
  "./docs/api/fact-check/sidebar",
  "./docs/api/graphql/sidebar",
  "./docs/api/gsc-url-inspections/sidebar",
  "./docs/api/inspector/sidebar",
  "./docs/api/long-tail/sidebar",
  "./docs/api/manager/sidebar",
  "./docs/api/middleware/sidebar",
  "./docs/api/query-fan-out/sidebar",
  "./docs/api/sitemap-generator/sidebar",
  "./docs/api/summarizer/sidebar",
];

for (const sidebarPath of sidebarPaths) {
  const loaded = loadSidebar(sidebarPath);
  assert.ok(
    Array.isArray(loaded),
    `Expected ${sidebarPath} to resolve to an array.`
  );
}

console.log("sidebars-utils.test.js: all sidebar modules resolved.");
