---
title: 📚 Prompt Library
sidebar_position: 5
---

# Unleash the Power of Agent WordLift: Explore a Range of Capabilities

This comprehensive library contains ready-to-use prompts for Agent WordLift, optimized for both the web interface and Chrome extension. Each prompt is formatted for easy copying and immediate use.

## 🔍 Analysis & Research

### Analyze Text

```md className=wlx-send-to-agent
analyze this text to identify the main entities and keywords: [your text here]
```

### Analyze URL

```md className=wlx-send-to-agent
analyze the entities on this webpage: [URL]
```

### Analyze Query

```md className=wlx-send-to-agent
analyze the query '[query]' on [google.co.uk]
```

### Domain-Specific Search

```md className=wlx-send-to-agent
perform a domain-specific search for articles related to '[topic]' on my website
```

### Analyze Google Trends

```md className=wlx-send-to-agent
analyze the trends for '[keyword1]' and '[keyword2]'
```

### Search Reddit mentions

```md className=wlx-send-to-agent
Provide me with insights on the Reddit exposure of the following domains: [URL]
```

## 📝 Content Creation & Enhancement

### Content Expansion

```md className=wlx-send-to-agent
expand the content of this URL '[URL]' by focusing on the entities '[entity1]' and '[entity2]'
```

### Content Creation

```md className=wlx-send-to-agent
create a new article about '[topic]' using insights from our website's existing content
```

### Generate AI Overview

```md className=wlx-send-to-agent
run a search on '[topic]' using only the content on this website. Develop an AI-powered snapshot that provides a quick overview, offering links with text anchors to supporting articles. Be extremely concise, using only three sentences. Embed links directly in the key text of each statement.
```

### Generate Meta Titles and Descriptions

```md className=wlx-send-to-agent
search the site and generate an SEO-optimized meta title and meta description for this webpage: [URL]. Use the Keyword Suggestion tool to incorporate high-impact keywords relevant to the content, and maintain a clear, concise tone. For the meta description, aim for an informative and engaging tone that aligns with user search intent and encourages clicks. Ensure the meta title is under 60 characters and the description under 160 characters for optimal discoverability.
```

## 🎯 SEO & Technical Analysis

### Entity Gap Analysis

```md className=wlx-send-to-agent
perform an entity gap analysis for '[URL]' against the query '[query]'
```

### SEO Score Analysis

```md className=wlx-send-to-agent
analyze the SEO score for the keyword '[keyword]' in relation to the content on '[URL]'
```

### Generate Diagram

```md className=wlx-send-to-agent
generate a mind map to visualize the topic clusters for '[topic]'
```

### Fact-Checking

```md className=wlx-send-to-agent
fact-check this statement: '[statement]'
```

### Keyword Suggestions

```md className=wlx-send-to-agent
generate keyword suggestions based on '[keyword]' to refine content focus and enhance discoverability online
```

### Analyze and Differentiate Webpages

```md className=wlx-send-to-agent
analyze the following pages from the website:
URL1: [URL1], Title1: [Title1]
URL2: [URL2], Title2: [Title2]

For each page:
1. Extract Entities
2. Identify Keywords
3. Determine Detailed Search Intent
4. Propose differentiation strategies
5. Recommend optimizations
```

### Audit the Markup

```md className=wlx-send-to-agent
analyze the markup of the page at [URL], focusing on the JSON-LD. Provide a brief review and include your recommendations for improvement. Keep the analysis concise.
```

### Analyze Schema Types

```md className=wlx-send-to-agent
1. Analyze the schema types and properties used in the JSON-LD of this article: [URL]
2. Perform a SERP analysis for the query "[query]"
3. Extract the URLs of the top 3 results and note their schema types
4. Analyze differences in markup implementation
5. Create a comparison table
6. Write recommendations for improvement
```

## 🔗 Internal Linking

### Create Internal Links

```md className=wlx-send-to-agent
find content on my website from the '[title]' page ([URL]). Analyze the text to identify up to 5 related articles. For each article, determine a relevant keyword, generate keyword suggestions, and create an anchor text of no more than 30 characters. Compile the HTML for all 5 links with their respective anchor texts.
```

### Create Internal Links In Batch

```md className=wlx-send-to-agent
do the same internal linking work for the following pages:
- '[Title1]' ([URL1])
- '[Title2]' ([URL2])
- '[Title3]' ([URL3])
Remember: never link to the homepage; choose anchors based on content relevance and keyword opportunity.
```

## 🛍️ Product Content

### Generate Product Highlights

```md className=wlx-send-to-agent
find everything on the website about [product]. Based on this information, write short bullet points of the most relevant product highlights. The highlights should help shoppers with easily consumable, quick-to-scan sentence fragments that answer common consumer questions or focus on the most important attributes of the product. Instructions: Limit 1-150 characters per highlight; recommend 4-6 highlights; minimum 2 highlights; do not mention discounts; ensure content complies with data privacy regulations.
```

## 📱 Social Media

### Content Buckets

```md className=wlx-send-to-agent
search for content related to '[topic1]', '[topic2]' and create content buckets for social media.
```

### Create a Thread on X

```md className=wlx-send-to-agent
search for '[topic]' and analyze the writing style on my website. Create a Twitter thread to promote the topic to [target audience], adding links back to the website to help users discover additional information.
```

## 🔧 HTML & Technical Analysis

### HTML Analysis

```md className=wlx-send-to-agent
extract html from '[URL]' and analyze the page focusing on:
1. visual hierarchy
2. CTA placement and effectiveness
3. messaging clarity
4. user experience
5. trust signals
Provide specific recommendations for improving conversion rates.
```

## 📈 Conversion Rate Optimization

### Comprehensive CRO Analysis

```md className=wlx-send-to-agent
Please analyze the following URL: [URL]

Tasks:
1. Extract and examine the full HTML content
2. Analyze the page design, layout, and structure
3. Provide conversion optimization recommendations

Key Analysis Points:
- Visual Hierarchy: Evaluate prominence of important elements
- CTA Placement: Assess visibility, appeal, and positioning of calls-to-action
- Copywriting: Evaluate clarity and effectiveness of messaging
- User Experience: Analyze navigation flow and user guidance
- Trust Signals: Review presence of testimonials, certifications, and trust elements

Required Deliverables:
1. Critical review of strengths and weaknesses
2. Step-by-step improvement recommendations focusing on:
   - Lead generation optimization
   - User engagement enhancement
   - Conversion rate improvement
   - Implementation of best practices
```

## Tips for Using Prompts

1. **Be Specific**: Include exact URLs, keywords, or text you want to analyze
2. **Customize**: Modify prompts to match your specific needs
3. **Combine**: Use multiple prompts together for comprehensive analysis
4. **Verify**: Always review and verify the generated content
5. **Iterate**: Refine prompts based on results

Need help? Contact our support team at [support@wordlift.io](mailto:support@wordlift.io)

:::tip

For tasks involving multiple entities, such as products, it is advisable to utilize the [Content Generation Tool](/content-generation/).

:::
