---
title: Local SEO Tools Reference
sidebar_position: 21
---

# Local SEO Tools Reference

This guide provides detailed information about Agent WordLift's Local SEO tools, their capabilities, and technical specifications. For a strategic overview of local SEO best practices, see our article on [Optimizing Local SEO - How to Create Winning Strategies](https://wordlift.io/blog/en/optimizing-local-seo/).

## Available Tools

### Google Business Profile Analyzer

Provides comprehensive information about any business's Google Business Profile.

**Key capabilities:**

- Retrieve complete business information (name, address, phone, website)
- Access ratings, review counts, and business attributes
- View business hours, popular topics, and categories
- Analyze images and additional features

**Usage syntax:**

```md
Analyze the Google Business Profile for "[business name]" in "[City,State,Country]"
```

**Advanced options:**

- Use CID, place_id, or spp identifiers for precise targeting:

```md
Analyze the Google Business Profile using cid:[number]
```

or

```md
Analyze the Google Business Profile using place_id:[value]
```

### Local Pack Analyzer

Examines Google's Local Pack results for specific search queries and locations.

**Key capabilities:**

- Identify businesses appearing in the Local Pack
- Retrieve ratings and review information
- Analyze business attributes and characteristics
- Understand ranking factors for Local Pack inclusion

**Usage syntax:**

```md
Show me the Local Pack results for "[keyword]" in "[City,State,Country]"
```

**Example keywords:**

- Service-based: "plumbers", "electricians", "lawyers"
- Product-based: "coffee shops", "bookstores", "pharmacies"
- Specific queries: "best pizza delivery", "emergency dentist"

### Business Ranking Tracker

Monitors a business's position in both Local Pack and organic search results.

**Key capabilities:**

- Check if a business appears in the Local Pack
- Identify position in organic search results
- View snippets and featured content
- Compare visibility across multiple keywords

**Usage syntax:**

```md
Track the rankings of "[business name]" for "[keyword]" in "[City,State,Country]"
```

**Advanced use:**

- Track multiple keywords in one request:

```md
Track the rankings of "[business name]" for these keywords: "[keyword1]", "[keyword2]", "[keyword3]" in "[City,State,Country]"
```

### Q&A Analysis Tool

Examines customer questions and business responses on Google Business Profiles.

**Key capabilities:**

- Review all customer questions (answered and unanswered)
- Analyze business response patterns and response rate
- Identify common question topics and trends
- Evaluate engagement metrics over time

**Usage syntax:**

```md
Analyze questions and answers for "[business name]" in "[City,State,Country]"
```

**Analysis depth:**

- Standard depth (default): Retrieves approximately 20 questions
- Deep analysis: Add depth parameter for more questions:

```md
Analyze questions and answers for "[business name]" in "[City,State,Country]" with depth:50
```

## Technical Notes

### Location Format

For optimal results, use the following format for locations:

- `City,State,Country` without spaces after commas
- Examples: `Manhattan,New York,United States` or `Rome,Lazio,Italy`
- For general searches, you can use just the country: `United States`

### Language Support

These tools support multiple languages. Specify the language code for non-English searches:

```md
Analyze the Google Business Profile for "[business name]" in "[City,State,Country]" in language:fr
```

Supported language codes include:

- `en` - English (default)
- `fr` - French
- `es` - Spanish
- `de` - German
- `it` - Italian
- And many more

### Data Freshness

The data returned by these tools is typically current within 24-48 hours of changes to Google's search results or business listings.

### Data Limitations

While these tools provide comprehensive information, some limitations apply:

- Image content analysis is not available
- Detailed review content may be limited
- Internal business metrics are not accessible
- Some data may be unavailable for businesses with minimal online presence

## Integration Examples

### Combining Multiple Tools

For comprehensive analysis, combine multiple tools in a single request:

```md
For "Mountain View Cafe" in "Denver,Colorado,United States":
1. Analyze their Google Business Profile
2. Check their rankings for "best coffee shop"
3. Examine their customer Q&A
4. Provide an overall assessment and recommendations
```

### Cross-Location Analysis

Compare the same business across different locations:

```md
Compare the Google Business Profiles and local rankings for:

1. Holland & Barrett in "London, England, United Kingdom "
2. Holland & Barrett in "Manchester, England, United Kingdom "

Highlight key differences and location-specific factors.
```

### Competitive Analysis

Compare multiple businesses in the same location:

```md
Analyze and compare these three restaurants in "Boston,Massachusetts,United States":
1. "Legal Sea Foods"
2. "Union Oyster House"
3. "Neptune Oyster"
Compare their profiles, rankings, and customer engagement.
```

## Common Error Troubleshooting

If you encounter errors, try these solutions:

| Error Message | Likely Cause | Solution |
|---------------|--------------|----------|
| "Invalid location format" | Incorrect location formatting | Use format "City,State,Country" without spaces after commas |
| "No Google Business Profile found" | Business name not recognized | Try adding location to name, use more popular name variation, or use identifier if available |
| "No search results found" | Low search volume or niche keyword | Try more popular or broader keywords |
| "Request failed" | Temporary API issue | Wait a few moments and try again |

By using these tools effectively, you can gain valuable insights into your local search presence and make data-driven optimization decisions.
