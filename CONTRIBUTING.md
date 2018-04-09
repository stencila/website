# Contribute to Stencila

[Stencila][stencila-site] is an open-source community-driven project. We encourage
and welcome contributions from all community members. There is a number of ways you
can contribute to Stencila. For example, you can:
* add [new and improve the existing website contents](#contribute-to-Stencila-website),
* develop [Stencila software suite](#contribute-to-stencila-software-suite),
* join discussion on our [Community Forum]() and [Gitter channel](stencila-gitter)

## Licensing and contributor agreement

By contributing,
you agree that we may redistribute your work under [our license](LICENSE).
Everyone involved with Stencila
agrees to abide by our [code of conduct][conduct].

## Contribute to Stencila website
Did you spot a typo or another mistake? Do you have a suggestion for a better wording?
Would you like to write a blog post for Stencila? Here's how to do it.

### Improve existing contents

Improving the existing contents is very easy!

1. At the bottom of the page you want to change, you will see a link *Improve this website*. Click on it.
2. You will be taken to [GitHub with the website](stencila-website-repo) contents open in an editor for you.
3. Go ahead and edit. We use [Markdown][markdown] for writing the contents so please, try
to use it as well.
4. Once you are done, scroll down to the bottom. Put in some information why you made under
*Propose file change*.
5. Click the green button `Propose file change`
6. One of the website maintainers will review your suggestion and, if everything is OK,
will publish it on the website.


### Blog posts

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


### Build website locally

 Stencila website is build using Markdown and [Nunucks](nunjucks). If you want to preview locally the changes you want to suggest to Stencila website,
here's what you need to do.

1. Fork the [Stencila website repository](stencila-website-repo).
2. Clone your work to your machine.
3. Open the terminal and navigate to the repository you just cloned.
4. Type `npm install` (Note: You need to have [npm installed](https://www.npmjs.com/get-npm) on your machine.)
5. Once *npm* has finished installing all required packages, type `npm run`
6. Open your browser and go to `http://127.0.0.1:8080`




## General contribution guidelines
*The contribution guidelines are based on the guidelines provided by [Software and Data Carpentry](http://carpentries.org).*

We prefer the contributions to be made via [GitHub][github].

1.  If you do not have a [GitHub][github] account,
    you can [send us comments by email][contact].
    However,
    we will be able to respond more quickly if you use one of the other methods described below.

2.  If you have a [GitHub][github] account,
    or are willing to [create one][github-join],
    but do not know how to use Git,
    you can report problems or suggest improvements by [creating an issue][issues].
    This allows us to assign the item to someone
    and to respond to it in a threaded discussion.

3.  If you are comfortable with Git,
    you can submit a pull request (PR).
    In Stencila we follow a commonly used workflow
    for [contributing to open source projects][how-contribute]
    (see also [GitHub instructions][github-flow]).

## Contribute to Stencila software suite:

If you develop code for data manipulation (in Python, R and other languages), you may be interested in:
* [Core Library (LibCore)][libcore-contribute]
* [Domain-specific libraries][libraries-contribute]

If you use Javascript, you may be interested in:
* [Node][node-contribute]
* [Stencila Desktop][desktop-contribute]
* [Stencila CLI (Command Line Interface)][cli-contribute]

If you are a Python developer, you may be interested in:
* [Stencila Hub][hub-contribute]

If you are into cloud computing, Docker and Kubernetes, you may be interested in:
* [Stencila Cloud][cloud-contribute]

If you build Docker containers, contribute to:
* [Stencila Images][images-contribute]



## Get in touch!

You can chat with the team at our [community forum][community-forum],
on Twitter [@Stencila][stencila-twitter],
[Gitter][stencila-gitter], or email to [hello@stenci.la][contact]






[contact]: mailto:hello@stenci.la
[conduct]: https://github.com/stencila/policies/blob/master/CONDUCT.md
[community-forum]: https://github.com/stencila/libcore/blob/master/docs/community.stenci.la
[github]: http://github.com
[github-flow]: https://guides.github.com/introduction/flow/
[github-join]: https://github.com/join
[issues]: https://help.github.com/articles/creating-an-issue/
[how-contribute]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[stencila-site]: http://stenci.la/
[nunjucks]: https://mozilla.github.io/nunjucks/
[stencila-website-repo]: https://github.com/stencila/website
[stencila-repo]: https://github.com/stencila/stencila
[stencila-twitter]: https://twitter.com/stencila
[stencila-gitter]: https://gitter.im/stencila/stencila/
[markdown]: https://daringfireball.net/projects/markdown
[libcore-contribute]: https://github.com/stencila/libcore/blob/master/CONTRIBUTING.md
[libraries-contribute]: computation/functions.md#domain-specific-libraries
[new-functions]: computation/functions.md#adding-new-functions
[node-contribute]: https://github.com/stencila/node/CONTRIBUTING.md
[desktop-contribute]: https://github.com/stencila/desktop/blob/master/CONTRIBUTING.md
[cli-contribute]: https://github.com/stencila/cli/CONTRIBUTING.md
[hub-contribute]: https://github.com/stencila/hub/CONTRIBUTING.md
[cloud-contribute]: https://github.com/stencila/cloud/CONTRIBUTING.md
[images-contribute]: https://github.com/stencila/images/CONTRIBUTING.md
