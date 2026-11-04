---
title: "Troubleshooting"
description: "Fix common problems with the classic WordPress plugin, such as an author @id that shows as null in the structured data."
sidebar_position: 100
last_updated: 2026-10-27
---

# Troubleshooting

## Author's @id is null

![image](./images/troubleshooting/authors_id_is_null.png)

This is due to WordPress not updating the post's author property when an author is removed.

To fix it, follow these steps:

1. Open the Edit Post screen and look for the `author` property in the sidebar.

![image](./images/troubleshooting/authors_id_is_null_step_1.png)

2. Select a valid author and update the post.

![image](./images/troubleshooting/authors_id_is_null_step_2.png)

Check the structured data again to confirm the problem is solved.
