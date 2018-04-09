## Contribute to Stencila website

Did you spot a typo or another mistake? Do you have a suggestion for a better wording?
Would you like to write a blog post for Stencila? Here's how to do it.

### Improve existing contents

Improving the existing contents is very easy!

1. At the bottom of the page you want to imporve click on the *Edit* link.
2. You will be taken to [the GitHub repository for this website][stencila-website-repo] with the page's contents open in an editor.
3. Go ahead and edit. Most pages are written using [Markdown][markdown].
4. Once you are done, scroll down to the bottom. Put in some information why you made under
*Propose file change*.
5. Click the green button `Propose file change`
6. One of the website maintainers will review your suggestion and, if everything is OK,
will publish it on the website.

### Blog posts

The [`blog`](blog) folder contains blog posts. To create a new blog post:

1. Create a new folder for your post with a useful, SEO friendly name e.g. `blog/very-interesting-subject`
2. In the folder, create a new Markdown file called `index.md`.
3. Add YAML front matter with `extends: blog/_post.html` and `title`, `author`, `date` and `abstract` sections e.g.

```
---
extends: blog/_post.html
title: A very interesting subject
author: Jane Doe and Joe Bloggs
date: 6 April 2018
abstract: A summary of my post
---

The start of my post on a very interesting subject...
```

4. Write your blog post!
5. Commit and submit your pull request.

### Build website locally

Stencila website is build using Markdown and [Nunucks][nunjucks]. If you want to preview locally the changes you want to suggest to Stencila website, here's what you need to do.

1. Fork the [Stencila website repository][stencila-website-repo].
2. Clone your work to your machine.
3. Open the terminal and navigate to the repository you just cloned.
4. Type `npm install` (Note: You need to have [npm installed](https://www.npmjs.com/get-npm) on your machine.)
5. Once *npm* has finished installing all required packages, type `npm run`
6. Open your browser and go to `http://127.0.0.1:8080`


[stencila-site]: http://stenci.la/
[nunjucks]: https://mozilla.github.io/nunjucks/
[stencila-website-repo]: https://github.com/stencila/website
[markdown]: https://daringfireball.net/projects/markdown
