`stencila/blog` : Stencila in the blogosphere

This is the code for Stencila's blog. It uses the [Stencila Node.js package](https://github.com/stencila/node) to generate HTML pages.

To create a new post, write a `post.md` Markdown file in a subdirectory and then add the name of the directory to the list of posts in `build.js`.

Then build the blog,

```sh
node build.js
```

commit changes, and push to the repo. The blog is served by Github Pages. 
