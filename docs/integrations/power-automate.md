---
title: "WordLift Power Automate connector"
description: "Query your Knowledge Graph with GraphQL from Power Automate, Logic Apps and Power Apps using the WordLift connector and your Knowledge Graph key."
sidebar_label: "Power Automate"
sidebar_position: 1
last_updated: 2026-10-27
---

# WordLift Power Automate connector

The [WordLift Power Automate Connector](https://learn.microsoft.com/en-us/connectors/wordliftgraphql/) lets you **integrate your Knowledge Graph data with the Microsoft Power Platform**. The connector gives you access to the WordLift GraphQL API, so you can extract and use entity data across Power Automate, Logic Apps, and Power Apps.

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

Before you start, you need:

- A WordLift subscription
- A Knowledge Graph and its related access key
- Basic GraphQL knowledge

## Authentication

The connector uses API key authentication. Provide your WordLift Knowledge Graph key in this format:

```text
Key YOUR_KEY_HERE
```

For example, if your key is `123`, enter `Key 123`.

To obtain your key:

1. Go to [my.wordlift.io](https://my.wordlift.io).
2. Find your available keys on the home page.

## Using the connector

### Getting started

1. Add the WordLift connector to your automation.
2. Provide your authentication key (prefixed with `Key`).
3. Create your GraphQL query.
4. Use the returned data in your automation scenario.

### Example query

Use this sample query to start:

```graphql
query {
    entities(rows: 100, page: 0) {
        headline: string(name:"schema:headline")
        description: string(name:"schema:description")
        url: string(name:"schema:url")
    }
}
```

### Known limitations

When querying a Knowledge Graph with large amounts of data, use the `rows` and `page` parameters to limit the results to a specific subset:

```graphql
query {
  entities(page: 0, rows: 100) {
    // your fields here
  }
}
```

### Common issues and solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthenticated | Check that you provided the authentication key |
| 403 Access Denied | Verify your key is valid and includes the `Key` prefix |
| Timeouts | Add `rows` and `page` parameters to limit result size |

## Throttling limits

| Limit type | Calls | Renewal period |
|------------|-------|----------------|
| API calls per connection | 100 | 60 seconds |

## Get help {#need-help}

For help setting up the WordLift Power Automate connector, or for questions about specific workflows, contact [support@wordlift.io](mailto:support@wordlift.io).
