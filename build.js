const fs = require('fs')
const spawn = require('child_process').spawnSync

const stencila = require('stencila')

// List of posts, most recent first
let posts = [
  'diverse-peers',
  'geheimhaven',
  'easy-aint-easy',
  'blog-reincarnate',
  'humane-sheets',
  'underneath-sheets',
  'introducing-sheets'
]

// Iterate over posts...
let postsDiv = ''
for (let post of posts) {

  // Create a `Document` for the post
  let doc = new stencila.Document()
  doc.read(post + '/post.md')

  // As a temporary kludge extract the documnet's meta-data as JSON using a special
  // Pandoc template. Ultimately this will be incorporated directly into Stencila.
  // See http://pandoc.org/MANUAL.html#templates
  let json = spawn('pandoc', ['--template', 'meta.txt', post + '/post.md'], {
    encoding: 'utf8'
  }).stdout
  let meta = JSON.parse(json)
  
  // Convert post to HTML
  let content = doc.html;
  // Set url and id for Disqus comments
  let url = 'http://blog.stenci.la/${post}'
  let identifier = 'blog-post-%{post}'

  // Write post HTML  file
  fs.writeFile(post + '/index.html',
    `<!DOCTYPE html>
    <html>
      <head>
        <title>${meta.title}</title>
        <meta charset="utf-8">
        <meta name="generator" content="stencila-node-0.1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="../theme.css">
      </head>
      <body>
        <div id="header">
          <div><a href="http://blog.stenci.la"><img src="../logo-name.svg"></a></div>
        </div>
        <div class="post">
          <div id="meta">
            <div id="title">${meta.title}</div>
            <div class="author">${meta.author}</div>
            <div id="date">${meta.date || ''}</div>
          </div>
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
        </div>
      </body>
    </html>`
  )

  // Generate summary for main page
  postsDiv += `<div class="post">
  <div class="title"><a href="${post}">${meta.title}</a></div>
  <div class="abstract">${meta.abstract || ''}</div>
  <div class="author">${meta.author}</div>
</div>\n`

  
}

// Main index page
fs.writeFile('index.html',
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="generator" content="stencila-node-0.1.0">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="theme.css">
    </head>
    <body class="index">
      <div class="header">
        <img src="logo-name.svg">
      </div>
      <div class="posts">${postsDiv}</div>
      <div class="footer"></div>
    </body>
  </html>`
)
