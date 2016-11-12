const fs = require('fs')
const stencila = require('stencila')

// List of posts, most recent first
let posts = [
  {
    name: 'blog-redux',
  }
]

// Iterate over posts...
let postsDiv = ''
for (let post of posts) {
  let dir = post.name

  // Create a `Document` for the post
  let doc = new stencila.Document()
  doc.read(dir + '/post.md')

  // Convert post to HTML
  let content = doc.html;
  // Set url and id for Disqus comments
  let url = 'http://blog.stenci.la/${post.name}'
  let identifier = 'blog-post-%{post.name}'

  // Write post HTML  file
  fs.writeFile(
    dir + '/index.html',
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="generator" content="stencila-node-0.1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="../theme.css">
      </head>
      <body>
        <div id="content">${content}</div>
        <div id="disqus_thread"></div>
        <script>
          var disqus_config = function () {
            this.page.url = '${url}';
            this.page.identifier = '${identifier}';
          };
          (function() {
          var d = document, s = d.createElement('script');
          s.src = '//stencila.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
          })();
        </script>
      </body>
    </html>`
  )

  // Generate summary for main page
  postsDiv += `<div class="post">
  <a href="${post.name}">${doc.title || post.name}</a>
</div>`
}

// Main index page
fs.writeFile(
  'index.html',
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="generator" content="stencila-node-0.1.0">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="theme.css">
    </head>
    <body>
      <div class="header"></div>
      <div class="posts">${postsDiv}</div>
      <div class="footer"></div>
    </body>
  </html>`
)
