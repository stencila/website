# Contribute to Stencila website

*The contribution guidelines are based on the guidelines provided by [Software and Data Carpentry](http://carpentries.org).*

[Stencila][stencila-site] is an open-source community-driven project. We encourage
and welcome contributions from all community members. You are welcome:
* add new contents to the website or correct the existing pages,
* develop source code for Stencila,
* fix the existing bugs.

## Licensing and contributor agreement

By contributing,
you agree that we may redistribute your work under [our license](LICENSE).
Everyone involved with Stencila
agrees to abide by our [code of conduct][conduct].


## General contribution guidelines

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

## How to contribute to:

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

If you are frustrated reading Stencila documentation, please help us fix it!
Documentation files are written in [Markdown][markdown]. The documentation source
files are contained in the main [Stencila repository][stencila-repo]. As per the instructions
above, we welcome all contributions submitted by [opening an issue](https://github.com/stencila/stencila/issues),
sending us a Pull Request or simply an [email][contact].


## Get in touch!

You can chat with the team at our [community forum][community-forum],
on Twitter [@Stencila][stencila-twitter],
[Gitter][stencila-gitter], or email to [hello@stenci.la][contact]



## Blog posts

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


[contact]: mailto:hello@stenci.la
[conduct]: https://github.com/stencila/policies/blob/master/CONDUCT.md
[community-forum]: https://github.com/stencila/libcore/blob/master/docs/community.stenci.la
[github]: http://github.com
[github-flow]: https://guides.github.com/introduction/flow/
[github-join]: https://github.com/join
[issues]: https://help.github.com/articles/creating-an-issue/
[how-contribute]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[stencila-site]: http://stenci.la/
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
