A tiny docusaurus v2 plugin to add Jina qa-bot
----------------------------------------------

Just copy the index.js file into `plugins/qa-bot` and add the following configuration to your docusaurus.config.js / plugins section:

```
    [
      "./src/plugins/qa-bot",
      {
        token:
          "your token",
        title: "Title",
        avatar:
          "https://example/org/avatar.png",
        description:
          "Your slogan",
        site: "https://example/org/docs",
        template: `
                  <dl>
                    <dt>You can ask questions about .... Try</dt>
                    <dd>Why shall I use ...?</dd>
                    <dd>Is ... Secure?</dd>
                  </dl>
                  `,
      },
    ],
```