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
    edit: '0',
    naked: '1',
    headExtra: 
      `<link rel="canonical" href="http://blog.stencila/${post}" />`,
    header: 
      `<style>
        body {
          margin: 0;
        }
        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100000;
          padding: 0.5em 0 0 0.3em;
          border-bottom: 1px solid #EEE;
          margin-bottom: 1em;
          background: white;
          opacity: 0.97;
        }
        header > div {
          max-width: 41.5em;
          margin-left: auto;
          margin-right: auto;
        }
        header img {
          width: 9em;
        }
        #data .content,
        .sc-visual-editor .se-scrollable .se-content {
          margin-top: 3em;
          max-width: 40em;
        }
      </style>
      <div>
        <a href="http://blog.stenci.la"><img src="../logo-name.svg"></a>
      </div>
      `,
    footer:
      '<script src="https://hypothes.is/embed.js" async></script>'
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
