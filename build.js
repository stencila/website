const fs = require('fs')
const spawn = require('child_process').spawnSync

const stencila = require('stencila')

// List of posts, most recent first
let posts = [
  'chunks-n-funcs',
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

  // Write post HTML page
  fs.writeFile(post + '/index.html', doc.page({
    header: 
      `<style>
        body {
          margin: 0;
          padding: 0.5em;
        }
        #header {
          position: relative;
          z-index: 100000;
          padding: 0.5em 0 0 0.3em;
          border-bottom: 1px solid #EEE;
          margin-bottom: 1em;
          background: white;
          opacity: 0.97;
        }
        #header > div {
          max-width: 41.5em;
          margin-left: auto;
          margin-right: auto;
        }
        #header img {
          width: 9em;
        }
        #data .content {
          margin-top: 3em;
          max-width: 40em;
        }
        #disqus_thread {
          max-width: 40em;
          margin-top: 6em;
          margin-left: auto;
          margin-right: auto;
        }
      </style>
      <div id="header">
        <div>
          <a href="http://blog.stenci.la"><img src="../logo-name.svg"></a>
        </div>
      </div>
      `,
    footer: 
        `<div id="disqus_thread"></div>
        <script>
          var disqus_config = function () {
            this.page.url = 'http://blog.stenci.la/${post}';
            this.page.identifier = 'blog-post-%{post}';
          };
          (function() {
          var d = document, s = d.createElement('script');
          s.src = '//stencila.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
          })();
        </script>`,
    static: '1'
  }))

  // Generate summary for main page
  postsDiv += `<div class="post">
  <div class="title"><a href="${post}">${doc.title}</a></div>
  <div>
    <div class="author">${doc.authors.join(', ')}</div>
    <div class="date">${doc.date}</div>
  </div>
  <div class="summary">${doc.summary || ''}</div>
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
