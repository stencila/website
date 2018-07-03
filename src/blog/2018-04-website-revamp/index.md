---
extends: blog/_post.html
title: Stencila website revamp
author: Aleksandra Pawlik
date: 20 April 2018
abstract: |
    We are happy to present you completely revamped Stencila website.
    As we are getting close to the first release, we wanted to make
    the website more user friendly and comprehensive. In the true
    spirit of the open source community project, we want you to contribute
    to the website contents. Here is how to do that.
---

We are happy to present you completely revamped Stencila website.
As we are getting close to the first release, we wanted to make
the website more user friendly and comprehensive.

![Old Stencila website](.jpg) ![New Stencila website](.jpg)

The website now includes Stencila documentation covering different elements
of the suite. We are working on adding more tutorials and examples to make Stencila
easy to try out.  The new website features the community section, including our
[Community Forum](https://community.stenci.la/), [blog](https://community.stenci.la/)
and pointers to all our communication channels.

In the true spirit of the open source community project, we want you to contribute
to the website contents. Here is how to do that:

### Edit pages

1. At the bottom of the page you want to improve click on the *Edit* link.
2. You will be taken to [the GitHub repository for this website](stencila-website-repo) with the page's contents open in an editor.
3. Go ahead and edit. Most pages are written using [Markdown](markdown).
4. Once you are done, scroll down to the bottom. Put in some information why you made under
*Propose file change*.
5. Click the green button `Propose file change`
6. One of the website maintainers will review your suggestion and, if everything is OK,
will publish it on the website.

### Add blog posts

We invite guest blog posts from all community members. You can add a blog post
either via [emailing us](mailto:hello@stenci.la) the text of your blog or
by sending us a pull request. Here is how to do the latter:

1. Fork the [Stencila website repository](stencila-website-repo).
2. Create a new branch where you will write your blog post.
3. In the [`blog`](blog) create a new **folder** for your post with a meaningful name e.g. `stencila-for-economics` or `stencila-for-phd` (it will be easier to find your blog post through search engines).
4. In the folder, create a new Markdown file called `index.md`.
5. Start editing the `index.md` file by adding the [YAML front matter](http://assemble.io/docs/YAML-front-matter.html) at the very top,
like in the example below:

```
---
extends: blog/_post.html
title: Using Stencila for research in economics
author: Jane Doe and Joe Bloggs
date: 6 April 2018
abstract: A summary of my post
---

The start of my post on a very interesting subject...
```

**Note** Please use a YAML front matter as shown below, providing
some meta data about your blog post. This allows for correct rendering and
publishing of your post, attributing the authorship and makes the post
easy to search within the search engines.


6. Write your blog post!
7. Commit, push the branch to your fork and submit your pull request.

### Build website locally

Stencila website is build using Markdown and [Nunjucks][nunjucks]. If you want to preview locally the changes you want to suggest to Stencila website, here's what you need to do.

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
