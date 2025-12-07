#!/bin/sh

pnpm run docusaurus clean-api-docs agent && pnpm run docusaurus gen-api-docs agent
pnpm run docusaurus clean-api-docs analysis && pnpm run docusaurus gen-api-docs analysis
pnpm run docusaurus clean-api-docs audit && pnpm run docusaurus gen-api-docs audit
pnpm run docusaurus clean-api-docs classification && pnpm run docusaurus gen-api-docs classification
pnpm run docusaurus clean-api-docs content-evaluations && pnpm run docusaurus gen-api-docs content-evaluations
pnpm run docusaurus clean-api-docs content-generation && pnpm run docusaurus gen-api-docs content-generation
# pnpm run docusaurus clean-api-docs embeddings && pnpm run docusaurus gen-api-docs embeddings
pnpm run docusaurus clean-api-docs events && pnpm run docusaurus gen-api-docs events
pnpm run docusaurus clean-api-docs fact-check && pnpm run docusaurus gen-api-docs fact-check
pnpm run docusaurus clean-api-docs graphql && pnpm run docusaurus gen-api-docs graphql
pnpm run docusaurus clean-api-docs image-to-text && pnpm run docusaurus gen-api-docs image-to-text
pnpm run docusaurus clean-api-docs inspector && pnpm run docusaurus gen-api-docs inspector
pnpm run docusaurus clean-api-docs long-tail && pnpm run docusaurus gen-api-docs long-tail
pnpm run docusaurus clean-api-docs manager && pnpm run docusaurus gen-api-docs manager
pnpm run docusaurus clean-api-docs middleware && pnpm run docusaurus gen-api-docs middleware
pnpm run docusaurus clean-api-docs sitemap-generator && pnpm run docusaurus gen-api-docs sitemap-generator
pnpm run docusaurus clean-api-docs summarizer && pnpm run docusaurus gen-api-docs summarizer