#!/bin/sh

npm run docusaurus clean-api-docs analysis && npm run docusaurus gen-api-docs analysis
npm run docusaurus clean-api-docs classification && npm run docusaurus gen-api-docs classification
npm run docusaurus clean-api-docs content-generation && npm run docusaurus gen-api-docs content-generation
# npm run docusaurus clean-api-docs embeddings && npm run docusaurus gen-api-docs embeddings
npm run docusaurus clean-api-docs events && npm run docusaurus gen-api-docs events
npm run docusaurus clean-api-docs fact-check && npm run docusaurus gen-api-docs fact-check
npm run docusaurus clean-api-docs graphql && npm run docusaurus gen-api-docs graphql
npm run docusaurus clean-api-docs inspector && npm run docusaurus gen-api-docs inspector
npm run docusaurus clean-api-docs long-tail && npm run docusaurus gen-api-docs long-tail
npm run docusaurus clean-api-docs manager && npm run docusaurus gen-api-docs manager
npm run docusaurus clean-api-docs middleware && npm run docusaurus gen-api-docs middleware
npm run docusaurus clean-api-docs sitemap-generator && npm run docusaurus gen-api-docs sitemap-generator
npm run docusaurus clean-api-docs summarizer && npm run docusaurus gen-api-docs summarizer
npm run docusaurus clean-api-docs seo-score && npm run docusaurus gen-api-docs seo-score