const cheerio = require('cheerio')
const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const nunjucks = require('nunjucks')
const nunjucksDateFilter = require('nunjucks-date-filter')
const markdownIt = require('markdown-it')
const markdownItEmoji = require('markdown-it-emoji')
const markdownItNamedHeadings = require('markdown-it-named-headings')
const path = require('path')
const replaceExt = require('replace-ext')
const through = require('through2')
const yamlFront = require('yaml-front-matter')
const accumulate = require('vinyl-accumulate')

function markdown2nunjucks () {
  const mdIt = markdownIt()
  mdIt.use(markdownItEmoji)
  mdIt.use(markdownItNamedHeadings)
  return through.obj(function(file, encoding, callback) {
    const md = file.contents.toString()
    const front = yamlFront.loadFront(md)
    const content = mdIt.render(front.__content)
    const source = path.relative(__dirname, file.path)
    file.context = {front, content, source}
    const extend = front.extends || '_base.html'
    file.contents = Buffer.from(`{% extends "${extend}" %}`)
    file.path = replaceExt(file.path, '.html')
    this.push(file)
    callback()
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
    './node_modules/docsearch.js/dist/cdn/docsearch.min.css',
    './node_modules/prismjs/themes/prism.css'
  ])
    .pipe(gulp.dest('./build/css'))
})

gulp.task('js', function () {
  gulp.src([
    './src/js/**',
    './node_modules/docsearch.js/dist/cdn/docsearch.min.js',
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/components/prism-{bash,r,python,sql}.min.js'
  ])
    .pipe(gulp.dest('./build/js'))
})

gulp.task('img', function () {
  gulp.src([
    './src/**/*.{jpg,png}'
  ], {base: './src'})
    .pipe(gulp.dest('./build'))
})

gulp.task('nunjucks', function () {
  gulp.src(['./src/**/*.html', '!./src/**/_*.html', '!./src/blog/index.html'])
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
        const md = file.contents.toString()
        const front = yamlFront.loadFront(md)
        front.date = front.date ? new Date(front.date) : Date.now()
        front.href = path.relative(file.base, path.dirname(file.path))
        posts.push(front)
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

gulp.task('build', ['clean'], function () {
  gulp.start(['css', 'js', 'img', 'nunjucks', 'markdown', 'blog/index'])
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
  gulp.watch(['./src/img/*'], ['img'])
  gulp.watch(['./src/**/*.html', './src/**/_*.html'], ['nunjucks'])
  gulp.watch(['./src/**/*.md', './src/**/_*.html'], ['markdown'])
  gulp.watch(['./src/blog/index.html', './src/blog/**/index.md'], ['blog/index'])
})
 
gulp.task('default', ['build', 'connect', 'watch'])
