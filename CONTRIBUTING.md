## Blog posts

The [`blog`](blog) folder contains blog posts. To create a new blog post:

1. Create a new folder for your post with a useful, SEO friendly name e.g. `blog/very-interesting-subject`

2. In the folder, create a new Markdown file called `index.md`.

3. Add YAML front matter with `extends: blog-post` and `title`, `author`, `date` and `abstract` sections e.g.

```
---
extends: blog-post
title: A very interesting subject
author: Jane Doe and Joe Bloggs
date: 6 April 2018
abstract: A summary of my post
---

The start of my post on a very interesting subject...
```

4. Write your blog post!

5. Commit and submit your pull request.
