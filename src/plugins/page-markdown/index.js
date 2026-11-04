// Publishes a Markdown copy of every docs page next to it, at the page URL
// plus ".md" (for example /platform/knowledge-graph.md). The page actions menu
// uses it for "Copy page" and "View as Markdown", and AI assistants can read
// it directly.
//
// The copy is the page source with its frontmatter and MDX imports removed and
// a source line added. The generated API reference is skipped: its MDX is
// machine output, and the OpenAPI specs are the better source for agents.

const fs = require("fs");
const path = require("path");

const SKIP = ["/apis-and-sdks/api-reference/"];

function toMarkdown(raw, { title, url }) {
    let body = raw.replace(/^---\n[\s\S]*?\n---\n/, "");
    body = body.replace(/^import\s.+?;?\s*$/gm, "");
    body = body.replace(/^\n+/, "");
    const header = /^#\s/.test(body) ? "" : `# ${title}\n\n`;
    return `${header}${body.trimEnd()}\n\nSource: ${url}\n`;
}

module.exports = function pageMarkdownPlugin(context) {
    let docs = [];
    return {
        name: "page-markdown",
        async allContentLoaded({ allContent }) {
            const docsContent = allContent["docusaurus-plugin-content-docs"] || {};
            docs = Object.values(docsContent).flatMap((instance) =>
                (instance.loadedVersions || []).flatMap((version) => version.docs),
            );
        },
        async postBuild({ outDir }) {
            let written = 0;
            for (const doc of docs) {
                const permalink = doc.permalink;
                if (permalink === "/" || SKIP.some((prefix) => permalink.startsWith(prefix))) {
                    continue;
                }
                const sourcePath = path.join(context.siteDir, doc.source.replace(/^@site\//, ""));
                if (!fs.existsSync(sourcePath)) {
                    continue;
                }
                const url = `${context.siteConfig.url}${permalink}`;
                const markdown = toMarkdown(fs.readFileSync(sourcePath, "utf8"), { title: doc.title, url });
                const target = path.join(outDir, `${permalink.replace(/\/$/, "")}.md`);
                fs.mkdirSync(path.dirname(target), { recursive: true });
                fs.writeFileSync(target, markdown);
                written += 1;
            }
            console.log(`[page-markdown] wrote ${written} Markdown copies`);
        },
    };
};
