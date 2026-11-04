---
title: "WordLift Zapier integration"
description: "Connect Agent WordLift and your Knowledge Graph to thousands of apps with Zapier, using the Ask Agent WordLift and Query Knowledge Graph actions."
sidebar_label: "Zapier"
sidebar_position: 1
last_updated: 2026-10-27
---

import AuthImage from './images/step-1-authentication.png';
import AgentImage from './images/agent-wordlift.png';
import GraphQLImage from './images/graphql.png';

# WordLift Zapier integration

The [WordLift Zapier Integration](https://zapier.com/apps/wordlift/integrations) lets you **automate your semantic SEO workflows** by connecting WordLift with thousands of other apps. Use Agent WordLift and your Knowledge Graph data across your marketing stack.

## Get started

### 1. Authentication

To get started with the WordLift Zapier integration, you need your WordLift API key. This is the same key you use to access your Knowledge Graph.

1. Search for "WordLift" in the Zapier integrations directory.
2. Select **Add Connection**.
3. Enter your WordLift API key.
4. Select **Continue** to validate your credentials.

<img src={AuthImage} style={{width: 600}} alt="Authentication Step" />

### 2. Available actions

The WordLift Zapier integration provides two actions:

#### Ask Agent WordLift

Send commands or questions to Agent WordLift and receive responses. Use this to:

- Extract entities from text
- Analyze content for SEO optimization
- Generate content recommendations
- Reuse content from your website
- Analyze Schema.org markup on a webpage

<img src={AgentImage} style={{width: 600}} alt="Agent WordLift" />

#### Query Knowledge Graph

Run GraphQL queries to retrieve specific data from your WordLift Knowledge Graph. Use this to:

- Extract structured data
- Monitor entity relationships
- Track content performance
- Generate custom reports

<img src={GraphQLImage} style={{width: 600}} alt="GraphQL Query" />

### 3. Popular use cases

With the WordLift Zapier integration, you can:

- Automatically analyze new blog posts when published
- Send content data to reporting tools
- Trigger content optimization workflows
- Sync entity data with CRM systems
- Create automated content briefs
- Monitor SEO performance metrics

## Create your first Zap

Start from a prebuilt workflow or create your own automation:

<div
  dangerouslySetInnerHTML={{
    __html: `
      <zapier-workflow
        sign-up-email="email_of_your_user@example.com"
        sign-up-first-name="first_name_of_your_user"
        sign-up-last-name="last_name_of_your_user"
        client-id="wb9T2yfrV66iC6KFbGRUYcYYGLE06d2NLOQirBPj"
        theme="auto"
        template-ids="275244290, 274370870"
        template-cta-display="hide"
        zap-create-from-scratch-display="hide"
        intro-copy-display="hide"
        manage-zaps-display="hide"
        guess-zap-display="hide"
      ></zapier-workflow>
    `
  }}
/>

## Examples

These workflow templates are a good starting point:

1. **Content optimization pipeline**
   - Trigger: New WordPress post
   - Action: Ask Agent WordLift to analyze content
   - Action: Send optimization recommendations to Slack

2. **Automated SEO reporting**
   - Trigger: Daily schedule
   - Action: Query Knowledge Graph for performance metrics
   - Action: Update Google Sheets dashboard

3. **Content distribution workflow**
   - Trigger: Daily schedule
   - Action: Query Knowledge Graph for entity data
   - Action: Create social media posts via Buffer

## Get help {#need-help}

For help setting up the WordLift Zapier integration, or for questions about specific workflows, contact [support@wordlift.io](mailto:support@wordlift.io).
