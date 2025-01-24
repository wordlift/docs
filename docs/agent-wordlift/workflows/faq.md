---
title: Generate FAQs
sidebar_position: 14
---

# Creating frequently asked questions (FAQs)

This workflow is designed to help us with the process of creating **frequently asked questions (FAQs)** based on content from our website and insights from WordLift's AI SEO Agent.

# Understanding the Entity Gap

The first step involves analyzing the "*entity gap*" between a specific webpage and a user query. Entities are essentially keywords or concepts that define a topic.

:::info

WordLift's AI SEO Agent helps us understand the entity gap by:

* **Identifying key entities on a webpage:** This helps us understand what information the page covers.
* **Analyzing top search results:** The Agent looks at the entities mentioned in top-ranking pages for the same query.
* **Highligting missing entities:** By comparing these, the Agent identifies concepts relevant to the topic but missing from our webpage.

This analysis helps us create FAQs that address potential user questions based on what our content might be missing.

:::

## Generate Questions Based on the Entity Gap Analysis

For example, imagine this workflow is analyzing the entity gap between the blog post "Neuro-symbolic AI: Where Knowledge Graphs Meet LLMs" on the WordLift blog and the search query "*neuro-symbolic AI*".

**Entity Gap Analysis**: The AI SEO Agent would analyze the blog post and identify key entities related to "neuro-symbolic AI" that are not explicitly mentioned.

**Top Missing Entities**: Based on this analysis, the Agent would determine the top three missing entities most relevant to understanding "neuro-symbolic AI" in the context of the blog post.

**Question Generation**: Finally, the workflow would use these missing entities to automatically generate three relevant questions users might have about "neuro-symbolic AI."

```md className=wlx-send-to-agent
Analyze the entity gap between https://wordlift.io/blog/en/neuro-symbolic-ai/ and the query "neuro-symbolic AI", look at the top missing entities and, if they are relevant, generate three questions accordingly.
```

![image](../images/agent-wordlift-top-missing-entities.png)

## Answer the Questions

Once the questions are generated, we can provide the agent with a new prompt that will automatically search the website and relevant sources to find answers. It will also consider the writing style of the target webpage to ensure the answers are consistent and informative.

```md className=wlx-send-to-agent
Now, search on the website, read the writing style and prepare the answer for the first question "How does Artificial General Intelligence (AGI) relate to the development of neuro-symbolic AI systems, and what are the potential implications of integrating AGI capabilities into neuro-symbolic models?". Remember to add links back to the sources.
```

This approach allows for efficient generation of FAQs that address potential user queries based on the content of a webpage.

![image](../images/agent-wordlift-answers-faq.png)
