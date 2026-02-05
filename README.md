# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Type Checking

```
$ npm run typecheck
```

This runs TypeScript checks using the project `tsconfig.json` (which extends the Docusaurus base config).

### Sidebar Checks

```
$ npm run test:sidebars
```

This verifies that API sidebar modules can be loaded from either `.js` or `.ts` files.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# API documentation

## Adding a new endpoint

1. Add the openapi.yaml to `/api`

2. Update the `docusaurus.config.js` to add the required configuration for the new endpoint.

```
...
"agent": {
    specPath: "api/agent.yaml", // path or URL to the OpenAPI spec
    outputDir: "docs/api/agent", // output directory for generated *.mdx and sidebar.js files
    sidebarOptions: {
        groupPathsBy: "tag", // generate a sidebar.js slice that groups operations by tag
        categoryLinkSource: "tag",
    },
},
...
```

3. Generate the API documentation
`npm run docusaurus gen-api-docs <OpenAPI file name>`

4. Add the generated `sidebars.js` to the main `sidebars.js`. 

```
...
{
    type: "category",
    label: "Agent WordLift",
    items: require("./docs/api/agent/sidebar.js"),
},
...
```

# Regenerating an existing endpoint

1. Add the docusaurus-plugin-openapi-docs

`npm run docusaurus clean-api-docs <OpenAPI file name> && npm run docusaurus gen-api-docs <OpenAPI file name>`

**Examples:**

```
npm run docusaurus clean-api-docs analysis && npm run docusaurus gen-api-docs analysis
npm run docusaurus clean-api-docs events && npm run docusaurus gen-api-docs events
npm run docusaurus clean-api-docs manager && npm run docusaurus gen-api-docs manager
```
