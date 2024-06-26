module.exports = function (context, options) {
    return {
        name: "docusaurus-plugin",
        loadContent: async () => {
            return {
                html: `
          <script src="https://cdn.jsdelivr.net/npm/qabot@0.4"></script>
          <script>
            document.addEventListener('DOMContentLoaded', () => {
              document.querySelectorAll('qa-bot').forEach((x) => {
                x.addEventListener('keydown', (event) => {
                  event.stopPropagation();
                });
              });
            });
          </script>
          <qa-bot
              server="${options.server}"
              token="${options.token}"
              title="${options.title}"
              avatar-src="${options.avatar}"
              description="${options.description}"
              site="${options.site}">
              <template>
                ${options.template}
              </template>
          </qa-bot>
        `,
            };
        },
        injectHtmlTags({ content }) {
            return {
                postBodyTags: [content.html],
            };
        },
    };
};
