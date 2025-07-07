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

### Content Evaluation

```md className=wlx-send-to-agent
evaluate the content quality for the keyword '[keyword]' in relation to the content on '[URL]'
```

### Google Search Console Analysis

```md className=wlx-send-to-agent
show me the top 10 queries that have high impressions but low CTR over the last 30 days
```

### Performance Comparison

```md className=wlx-send-to-agent
analyze my Google Search Console data and compare desktop vs. mobile performance for my top 20 landing pages in the last 14 days
```

### Opportunity Discovery

```md className=wlx-send-to-agent
identify new keyword opportunities from my Google Search Console data where I'm ranking on page 2 (positions 11-20)
```

### Google Discover Analysis

```md className=wlx-send-to-agent
analyze my Google Search Console data for the search type "discover". Show me the top 20 pages with the highest clicks over the last 30 days. Include clicks, impressions, and CTR for each page.
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

## � AI Sub-Agent Workflows

### Instagram Indexing Analysis

```md className=wlx-send-to-agent
Generate a comprehensive Instagram indexing report for @[instagram_handle]. Please analyze my website's entity structure, audit Instagram content indexing using search operators, and provide content alignment recommendations.
```

### Instagram Content Audit

```md className=wlx-send-to-agent
Using search operators, audit my Instagram presence:
1. site:instagram.com/[handle] - total indexed posts
2. site:instagram.com/[handle] "[keyword]" - topic-specific visibility
3. Compare findings with my website's content coverage
```

### Cross-Platform Content Strategy

```md className=wlx-send-to-agent
Analyze content alignment between my website and Instagram account @[handle]. Identify entities that are well-covered on Instagram but missing from my website, and suggest content opportunities for both platforms.
```

### Instagram SERP Monitoring

```md className=wlx-send-to-agent
Set up monitoring for key search queries where my Instagram content @[handle] could rank. Compare current visibility against main website pages and identify optimization opportunities.
```

## �🔗 Internal Linking

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

### Comprehensive SEO and CRO Analysis

```md className=wlx-send-to-agent
**Task: Comprehensive HTML Extraction, SEO, and Conversion Optimization Analysis**

1. **HTML & Metadata Extraction**
   - **Retrieve Full HTML**:
     - Extract the complete HTML content from the following URL, ensuring that all dynamic and lazy-loaded content is captured:
       [URL]
   - **Metadata Extraction**:
     - Extract meta tags (e.g., title, meta description, keywords) to assess SEO alignment.
     - Identify canonical tags, viewport settings, and robots meta tags to ensure proper indexing and mobile responsiveness.
   - **Structural Elements & Schema Markup**:
     - Extract header tags (H1, H2, etc.) to evaluate content hierarchy.
     - Identify any structured data (schema markup) for potential rich snippet opportunities.
   - **Resource & Performance Analysis**:
     - Evaluate external versus inline assets (scripts, CSS, images) to understand their impact on page load speed and overall performance.
     - Identify any resources that might block rendering or affect mobile responsiveness.

2. **On-Page SEO & Content Analysis**
   - **Content Quality & Keyword Usage**:
     - Assess keyword placement and relevancy throughout the content.
     - Evaluate readability factors such as sentence structure, paragraph length, and overall copy quality.
   - **Link & Anchor Analysis**:
     - Extract and analyze all internal and external links, including their anchor texts.
     - Identify any broken or redundant links that could negatively impact SEO.
   - **Technical SEO Checks**:
     - Check for duplicate content and missing or broken elements (images, scripts, etc.).
     - Review embedded scripts and comments for outdated code or potential performance issues.
   - **Accessibility & Usability**:
     - Verify the presence and quality of alt text for images and ARIA labels for improved accessibility.

3. **Design, UX, & Conversion Analysis**
   - **Visual Hierarchy & Layout**:
     - Examine whether the page design highlights key elements (e.g., product details, benefits) in a way that naturally guides user attention.
   - **Call-to-Action (CTA) Evaluation**:
     - Assess the placement, visibility, and effectiveness of CTAs to ensure they are compelling and well-positioned.
   - **User Experience (UX)**:
     - Analyze the navigational structure and overall user journey to determine if the page logically guides visitors toward conversion actions.
   - **Trust Signals & Credibility**:
     - Identify trust-building elements such as testimonials, certifications, reviews, or security badges that enhance user credibility.

4. **Conversion Optimization Recommendations**
   - **Actionable Recommendations**:
     - Provide a prioritized, step-by-step list of improvements addressing technical SEO, design, and UX enhancements.
     - Suggest optimizations for meta elements, header structures, link strategies, and resource loading.
   - **Testing & Measurement**:
     - Recommend A/B testing scenarios and tracking metrics to validate the impact of the proposed changes on user engagement and conversion rates.

5. **Summary of Suggested Changes**
   - **Prioritization Table**:
     - Summarize all recommended changes in a table format, ranked from most to least important in terms of their potential impact on conversion rates.
   - **Table Structure**:

     | Recommendation/Change               | Priority Level (High/Med/Low) | Expected Impact on Conversions         | Notes                                  |
     |-------------------------------------|-------------------------------|----------------------------------------|----------------------------------------|
     | Improve CTA placement and design    | High                          | Significant increase in click-throughs | Test with A/B variations               |
     | Optimize meta tags and header structure | High                          | Better organic ranking, more traffic   | Ensure keyword alignment               |
     | Enhance page load speed             | High                          | Reduced bounce rate, higher engagement | Optimize external resources            |
     | Add or improve trust signals (testimonials, certifications) | Medium                        | Increased user confidence, improved conversions | Include visual and textual elements  |
     | Streamline content for clarity      | Medium                        | Better user understanding, improved conversion funnel | Revise copy for readability          |
     | Fix broken links and improve internal linking | Low                           | Incremental SEO benefits                | Regular maintenance required           |

**Deliverables**
- A detailed critical review summarizing the page’s strengths and weaknesses across SEO, technical performance, content quality, design, UX, and conversion optimization.
- A prioritized, step-by-step roadmap of actionable recommendations, supported by specific examples or benchmarks, based on current best practices.

**Additional Considerations**
- Ensure insights align with the latest SEO trends and guidelines.
- Highlight any technical or design issues that could significantly impact user engagement, page speed, and organic search performance.
- Use both qualitative and quantitative data to support recommendations.
```

Here's a section to add to your prompt-reference.md file. This should be placed alongside your other specialized prompt categories:

## 🏪 Local SEO

### Analyze Business Profile

```md className=wlx-send-to-agent
Analyze the Google Business Profile for "[business name]" in "[City,State,Country]". Identify strengths, weaknesses, and opportunities for optimization.
```

### Research Local Pack Results

```md className=wlx-send-to-agent
Show me the Local Pack results for "[keyword]" in "[City,State,Country]". Analyze what factors might be helping these businesses rank in the Local Pack.
```

### Track Business Rankings

```md className=wlx-send-to-agent
Track the rankings of "[business name]" for "[keyword]" in "[City,State,Country]".
```

### Analyze Customer Q&A

```md className=wlx-send-to-agent
Analyze questions and answers for "[business name]" in "[City,State,Country]". Identify common themes, response patterns, and opportunities for better engagement.
```

### Comprehensive Local SEO Audit

```md className=wlx-send-to-agent
Conduct a complete local SEO audit for "[business name]" in "[City,State,Country]":
1. Analyze their Google Business Profile
2. Track their rankings for "[primary keyword]" and "[secondary keyword]"
3. Examine the Local Pack for their main category
4. Review their customer Q&A
5. Provide actionable recommendations for improvement
```

### Compare with Competitors

```md className=wlx-send-to-agent
Compare the Google Business Profile for "[my business]" with competitors "[competitor 1]" and "[competitor 2]" in "[City,State,Country]". Highlight key differences and competitive advantages.
```

### Local Business Visibility Strategy

```md className=wlx-send-to-agent
Create a comprehensive strategy to help "[business name]" in "[City,State,Country]" improve local search visibility for "[target keyword]". Include profile optimization, review management, and Q&A engagement tactics.
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
