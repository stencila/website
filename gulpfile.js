const cheerio = require('cheerio')
const del = require('del')
const fs = require('fs')
const glob = require('glob')
const gulp = require('gulp')
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const nunjucks = require('nunjucks')
const nunjucksDateFilter = require('nunjucks-date-filter')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItTOC = require("markdown-it-table-of-contents")
const path = require('path')
const replaceExt = require('replace-ext')
const through = require('through2')
const yamlFront = require('yaml-front-matter')
const accumulate = require('vinyl-accumulate')

const root = path.join(__dirname, 'src')

function markdown2object (file, includeContent = true) {
  const md = file.contents.toString()

  const front = yamlFront.loadFront(md)
  front.date = front.date ? new Date(front.date) : Date.now()
  front.folder = path.join('/', path.relative(root, path.dirname(file.path)))
  front.href = front.folder
  front.html_url = path.join('/', path.relative(root, replaceExt(file.path, '.html')))
  if (front.image) {
    front.image = path.join(front.folder, front.image)
  } else {
    const images = glob.sync(path.join(path.dirname(file.path),'*.{gif,jpg,png,svg}'))
    if (images.length) {
      front.image = path.join('/', path.relative(root, images[0]) )
    }
  }
  if (front.suggested) {
    let suggesteds = []
    for (let suggested of front.suggested) {
      const otherPath = path.join(path.dirname(file.path), suggested, 'index.md')
      const otherFile = {
        base: '',
        path: otherPath,
        contents: fs.readFileSync(otherPath, 'utf8')
      }
      const otherFront = markdown2object(otherFile, false).front
      suggesteds.push(otherFront)
    }
    front.suggested = suggesteds
  }

  let content = front.__content
  delete front.__content

  if (includeContent) return { front, content}
  else return { front }
}

function markdown2nunjucks () {
  const mdIt = markdownIt({ html: true })
  mdIt.use(markdownItAnchor)
  mdIt.use(markdownItAttrs)
  mdIt.use(markdownItEmoji)
  mdIt.use(markdownItTOC)
  return through.obj(function(file, encoding, callback) {
    let {front, content} = markdown2object(file)
    content =  mdIt.render(content)
    const source = path.relative(__dirname, file.path)
    file.context = {front, content, source}
    const extend = front.extends || '_base.html'
    file.contents = Buffer.from(`{% extends "${extend}" %}`)
    file.path = replaceExt(file.path, '.html')
    callback(null, file)
  })
}

function nunjucks2html () {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('src')
  )
  env.addFilter('date', nunjucksDateFilter)
  return through.obj(function(file, encoding, callback) {
    const content = file.contents.toString()
    const context = file.context || {}
    if (!context.source) context.source = path.relative(__dirname, file.path)
    const html = env.renderString(content, context) || ''

    const dom = cheerio.load(html)
    dom('blockquote').each((index, elem) => {
      elem = cheerio(elem)
      let child = elem.children()[0]
      if (child) {
        child = cheerio(child)
        let text = child.html()
        if (text[0] === '!') {
          child.html(text.substring(1))
          elem.addClass('warning')
        } else if (text[0] === 'i') {
          child.html(text.substring(1))
          elem.addClass('tip')
        }
      }
    })
    file.contents = Buffer.from(dom.html())

    this.push(file)
    callback()
  })
}

gulp.task('clean', function () {
  return del('./build')
})

gulp.task('css', function () {
  gulp.src([
    './src/css/**',
    './node_modules/bulma-timeline/dist/css/bulma-timeline.min.css',
    './node_modules/docsearch.js/dist/cdn/docsearch.min.css',
    './node_modules/prismjs/themes/prism.css'
  ])
    .pipe(gulp.dest('./build/css'))
})

gulp.task('webfonts', function () {
  gulp.src([
    './src/webfonts/*.*'
  ])
    .pipe(gulp.dest('./build/webfonts'))
})

gulp.task('js', function () {
  gulp.src([
    './src/js/**',
    './node_modules/docsearch.js/dist/cdn/docsearch.min.js',
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/components/prism-{bash,json,r,python,sql}.min.js'
  ])
    .pipe(gulp.dest('./build/js'))
})

gulp.task('img', function () {
  gulp.src([
    './src/**/*.{gif,jpg,png,svg}'
  ], {base: './src'})
    .pipe(gulp.dest('./build'))
})

gulp.task('nunjucks', function () {
  gulp.src(['./src/**/*.html', '!./src/**/_*.html', '!./src/blog/index.html', '!./src/community/events.html'])
    .pipe(plumber())
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('markdown', function () {
  gulp.src(['./src/**/*.md'])
    .pipe(plumber())
    .pipe(markdown2nunjucks())
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('blog/index', function () {
  gulp.src(['./src/blog/**/index.md'])
    .pipe(plumber())
    .pipe(accumulate('./blog/index.html'))
    .pipe(through.obj(function(all, encoding, callback) {
      let posts = []
      for (let file of all.files) {
        let post = markdown2object(file).front
        posts.push(post)
      }
      posts.sort((a, b) => (a.date > b.date) ? -1 : 1)
      all.context = {posts}
      all.contents = fs.readFileSync('./src/blog/index.html')
      all.source = 'src/blog/index.html'
      callback(null, all)
    }))
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})


gulp.task('community/events', function () {
  gulp.src(['./src/community/events/**.md'])
    .pipe(plumber())
    .pipe(accumulate('./community/events.html'))
    .pipe(through.obj(function(all, encoding, callback) {
      let events = []
      for (let file of all.files) {
        let eve = markdown2object(file).front
        events.push(eve)
      }
      events.sort((a, b) => (a.date < b.date) ? -1 : 1)
      all.context = {events}
      all.contents = fs.readFileSync('./src/community/events.html')
      all.source = 'src/community/events.html'
      callback(null, all)
    }))
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})





gulp.task('build', ['clean'], function () {
  gulp.start(['css', 'js', 'webfonts', 'img', 'nunjucks', 'markdown', 'blog/index', 'community/events'])
})

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch(['./src/css/*'], ['css'])
  gulp.watch(['./src/js/*'], ['js'])
  gulp.watch(['./src/webfonts/*'], ['webfonts'])
  gulp.watch(['./src/**/*.{gif,jpg,png,svg}'], ['img'])
  gulp.watch(['./src/**/*.html', './src/**/_*.html'], ['nunjucks'])
  gulp.watch(['./src/**/*.md', './src/**/_*.html'], ['markdown'])
  gulp.watch(['./src/blog/index.html', './src/blog/**/index.md'], ['blog/index'])
  gulp.watch(['./src/community/events.html', './src/community/events/**.md'], ['community/events'])
})

gulp.task('default', ['build', 'connect', 'watch'])
