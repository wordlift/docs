---
sidebar_position: 100
---

# Troubleshooting

## Author's @id is null

![image](images/troubleshooting/authors_id_is_null.png)

This is due to WordPress not updating the post's author property when an author is removed.

To fix follow this steps:

1. Open the Edit Post screen and look for the `author` property in the sidebar

![image](images/troubleshooting/authors_id_is_null_step_1.png)

2. Select a valid author and update

![image](images/troubleshooting/authors_id_is_null_step_2.png)

Now check the structured data again, the problem should be solved.