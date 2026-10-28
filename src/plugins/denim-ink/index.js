// Loads the Denim INK webfont when the licensed file is present at build time.
//
// The font is licensed from Displaay for the wordlift.io domain and its
// subdomains only, and the licence forbids sharing the files, so they are
// never committed to this public repository. Production builds copy them into
// static/fonts/ from repository secrets (see the Azure workflow and
// scripts/set-denim-ink-secrets.sh). Without the file, headings fall back to a
// locally installed Denim INK (desktop licence) and then to Bricolage Grotesque.
//
// Only the Regular style is licensed: never set Denim INK in another weight or
// style, and keep font-synthesis off so browsers do not fake bold or italic.

const fs = require("fs");
const path = require("path");

const FILE = "DenimINK-Regular.woff2";

module.exports = function denimInkPlugin(context) {
    const present = fs.existsSync(path.join(context.siteDir, "static", "fonts", FILE));
    return {
        name: "denim-ink-font",
        injectHtmlTags() {
            if (!present) {
                return {};
            }
            const href = `${context.baseUrl}fonts/${FILE}`;
            return {
                headTags: [
                    {
                        tagName: "link",
                        attributes: {
                            rel: "preload",
                            href,
                            as: "font",
                            type: "font/woff2",
                            crossorigin: "anonymous",
                        },
                    },
                    {
                        tagName: "style",
                        innerHTML: `@font-face{font-family:"Denim INK";src:local("Denim INK"),local("DenimINK-Regular"),url("${href}") format("woff2");font-weight:400;font-style:normal;font-display:swap}`,
                    },
                ],
            };
        },
    };
};
