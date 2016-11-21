# `stencila/blog` : Stencila in the blogosphere

This is the source repository for Stencila's blog at http://blog.senci.la. We're eating our own dog food by using the [Stencila Node.js package](https://github.com/stencila/node) to generate HTML from Markdown (like [Jekyll](http://jekyllrb.com/), [Pelican](http://blog.getpelican.com/) and other [static site generators](https://www.staticgen.com/)).

To publish a new post, create a subdirectory with a `post.md` Markdown file and then add the name of the directory to the list of posts in `build.js`. Then rebuild the blog, commit changes, and push to the repo.

```sh
node build.js
git commit -a -m "New post"
git push
```
