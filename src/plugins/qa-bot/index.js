module.exports = function (context, options) {
    return {
        name: "docusaurus-plugin-copilot",
        injectHtmlTags() {
            return {
                postBodyTags: [
                    `<iframe src="https://copilotstudio.microsoft.com/environments/Default-efbef5c4-77ac-41d8-800a-2dec22f28e82/bots/Default_agentWordLift/webchat?__version__=2" frameborder="0" style="width: 100%; height: 100%;"></iframe>`
                ],
            };
        },
    };
};