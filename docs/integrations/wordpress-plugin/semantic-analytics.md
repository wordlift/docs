---
title: "Semantic analytics"
description: "Build an entity-based web analytics dashboard in Looker Studio from Google Analytics traffic and the entities the classic WordPress plugin sends."
last_updated: 2026-10-27
---

# Semantic analytics

:::note
This page supports existing installs of the classic WordPress plugin; new customers start with [WordLift Cloud](/platform/knowledge-graph/schema-publishing/wordlift-cloud/).
:::

Use WordLift to create an entity-based [web analytics dashboard](https://wordlift.io/blog/en/semantic-web-analytics/) in Looker Studio (formerly Google Data Studio), with traffic data from Google Analytics.

:::warning[Review needed]
TODO [SME]: confirm the dashboard template and these steps still work with current Google Analytics properties and the current Looker Studio interface.
:::

## Configure semantic analytics {#how-to-configure-semantics-analytics}

1. Copy the [Web Analytics Dashboard template](https://datastudio.google.com/u/0/reporting/1_Hu7hcfMhzE5EXDrZi3RTInZQcUjkiWt?s=l_0Vbo5t_bs).

   ![image](./images/semantics-analytics-step-1.png)

2. In the pop-up window, select **create new data source**.

   ![image](./images/semantics-analytics-step-2.png)

3. Under Google Analytics, select **select**.

   ![image](./images/semantics-analytics-step-3.png)

4. From the list of sites associated with your Google Analytics account, select the one you want to connect.

   ![image](./images/semantics-analytics-step-4.png)

5. In the top right, select **connect**.

   ![image](./images/semantics-analytics-step-5.png)

6. In the top right, select **add to report**.

   ![image](./images/semantics-analytics-step-6.png)

7. In the pop-up window, select **copy report**.

   ![image](./images/semantics-analytics-step-7.png)

## Result

Your semantic analytics visualization opens, showing the semantic data that WordLift sends to it. To learn more, read [Web Analytics Dashboard](https://wordlift.io/blog/en/semantic-web-analytics/) on the WordLift blog.
