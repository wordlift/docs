---
title: Introduction
id: introduction
sidebar_position: 1
---

# WordLift Power Automate Connector

The [WordLift Power Automate Connector](https://learn.microsoft.com/en-us/connectors/wordliftgraphql/) allows you to **integrate your Knowledge Graph data with the Microsoft Power Platform**. This connector provides access to the WordLift GraphQL API, enabling you to extract and utilize entity data across Power Automate, Logic Apps, and Power Apps.

## Availability

The connector is available in the following products and regions:

### Logic Apps

- **Class:** Standard
- **Regions:** All Logic Apps regions except:
  - Azure Government regions
  - Azure China regions
  - US Department of Defense (DoD)

### Power Automate

- **Class:** Premium
- **Regions:** All Power Automate regions except:
  - US Government (GCC)
  - US Government (GCC High)
  - China Cloud operated by 21Vianet
  - US Department of Defense (DoD)

### Power Apps

- **Class:** Premium
- **Regions:** All Power Apps regions except:
  - US Government (GCC)
  - US Government (GCC High)
  - China Cloud operated by 21Vianet
  - US Department of Defense (DoD)

## Prerequisites

Before getting started, you'll need:

- A WordLift subscription
- A Knowledge Graph and its related access key
- Basic GraphQL knowledge

## Authentication

The connector uses API Key authentication. You'll need to provide your WordLift Knowledge Graph key in the format:

```
Key YOUR_KEY_HERE
```

For example, if your key is `123`, you would enter: `Key 123`

To obtain your key:

1. Go to [my.wordlift.io](https://my.wordlift.io)
2. Your available keys will be displayed on the home page

## Using the Connector

### Getting Started

1. Add the WordLift connector to your automation
2. Provide your authentication key (prefixed with `Key`)
3. Create your GraphQL query
4. Use the returned data in your automation scenario

### Example Query

Here's a sample query to get you started:

```graphql
query {
    entities(rows: 100, page: 0) {
        headline: string(name:"schema:headline")
        description: string(name:"schema:description")
        url: string(name:"schema:url")
    }
}
```

### Known Limitations

When querying a Knowledge Graph with large amounts of data, use the `rows` and `page` parameters to limit the results to a specific subset:

```graphql
query {
  entities(page: 0, rows: 100) {
    // your fields here
  }
}
```

### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthenticated | Check that you've provided the authentication key |
| 403 Access Denied | Verify your key is valid and includes the `Key` prefix |
| Timeouts | Add `rows` and `page` parameters to limit result size |

## Throttling Limits

| Limit Type | Calls | Renewal Period |
|------------|-------|----------------|
| API calls per connection | 100 | 60 seconds |

## Need Help?

If you need assistance setting up your WordLift Power Automate connector or have questions about specific workflows, please contact our support team at [support@wordlift.io](mailto:support@wordlift.io).
