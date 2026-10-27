// Generates static/staticwebapp.config.json (Azure Static Web Apps server-side
// 301s) from redirects/redirect-map.json. Runs before every build (prebuild).
//
// Azure caps the file at 20 KB and cannot substitute a wildcard into the
// redirect target, so:
// - each old page gets one wildcard route ("/old/path*"), which matches the
//   path with and without the trailing slash; longer routes come first so a
//   child page never falls through to its parent's rule;
// - the root "/" is matched exactly, never by wildcard;
// - /problems/* is never redirected (Resolve API contract URLs);
// - the generated API reference (/api/*) is redirected page by page on the
//   client (see createRedirects in docusaurus.config.js).

const fs = require("fs");
const path = require("path");

const MAX_BYTES = 20 * 1024;

// Preview build for the docs v3 migration: keep every page out of search
// indexes with a response header. (A noindex meta tag would also empty
// sitemap.xml, which the llms.txt builder needs.)
// TODO: set to false before merging into main.
const PREVIEW_NOINDEX = true;
const root = path.resolve(__dirname, "..");
const map = require(path.join(root, "redirects", "redirect-map.json"));

const routes = [];
for (const { from, to } of map) {
  if (from.startsWith("/problems/") || from.startsWith("/api/")) {
    throw new Error(`Refusing to redirect a protected path: ${from}`);
  }
  if (from === "/") {
    routes.push({ route: "/", redirect: to, statusCode: 301 });
    routes.push({ route: "/index.html", redirect: to, statusCode: 301 });
    continue;
  }
  routes.push({
    route: `${from.replace(/\/$/, "")}*`,
    redirect: to,
    statusCode: 301,
  });
}
routes.sort((a, b) => b.route.length - a.route.length);

const config = { routes };
if (PREVIEW_NOINDEX) {
  config.globalHeaders = { "X-Robots-Tag": "noindex, nofollow" };
}
let json = JSON.stringify(config, null, 1) + "\n";
if (Buffer.byteLength(json) > MAX_BYTES) {
  json = JSON.stringify(config) + "\n";
}
if (Buffer.byteLength(json) > MAX_BYTES) {
  throw new Error(
    `staticwebapp.config.json is ${Buffer.byteLength(json)} bytes; Azure allows ${MAX_BYTES}.`
  );
}
fs.writeFileSync(path.join(root, "static", "staticwebapp.config.json"), json);
console.log(
  `staticwebapp.config.json: ${routes.length} routes, ${Buffer.byteLength(json)} bytes`
);
