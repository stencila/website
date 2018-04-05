const del = require('del')
const fs = require('fs')
const gulp = require('gulp')
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const nunjucks = require('nunjucks')
const nunjucksDateFilter = require('nunjucks-date-filter')
const markdownIt = require('markdown-it')
const path = require('path')
const replaceExt = require('replace-ext')
const through = require('through2')
const yamlFront = require('yaml-front-matter')
const accumulate = require('vinyl-accumulate')

function markdown2nunjucks () {
  const mdIt = markdownIt()
  return through.obj(function(file, encoding, callback) {
    //console.log('markdown2nunjucks:', file.path)
    const md = file.contents.toString()
    const front = yamlFront.loadFront(md)
    let html = ''
    for (let [name, value] of Object.entries(front)) {
      switch (name) {
        case 'extends':
          html += `{% extends "${value}.html" %}`
          break
        case '__content':
          html += `{% block content %}{{ super() }}${mdIt.render(value)}{% endblock %}`
          break
      }
    }
    file.context = front
    file.contents = Buffer.from(html)
    file.path = replaceExt(file.path, '.html');
    this.push(file)
    callback()
  })
}

function nunjucks2html () {
  return through.obj(function(file, encoding, callback) {
    //console.log('nunjucks2html:', file.path)
    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('src/html')
    )
    env.addFilter('date', nunjucksDateFilter)
    const content = file.contents.toString()
    const context = Object.assign(file.context || {}, {
      source: path.relative(__dirname, file.path)
    })
    const html = env.renderString(content, context)
    file.contents = Buffer.from(html)
    this.push(file)
    callback()
  })
}

gulp.task('clean', function () {
  return del('./build')
})

gulp.task('copy', function () {
  gulp.src(['./src/**/*.{css,js,png,svg}'], {base: './src'})
    .pipe(plumber())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('nunjucks', function () {
  gulp.src(['./src/**/*.html', '!./src/html/*.html', '!./src/blog/index.html'])
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

gulp.task('blog-index', function () {
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
      callback(null, all)
    }))
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('build', ['clean'], function () {
  gulp.start(['copy', 'nunjucks', 'markdown', 'blog-index'])
})

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.{css,js,png,svg}'], ['copy'])
  gulp.watch(['./src/**/*.html', './src/html/*.html'], ['nunjucks'])
  gulp.watch(['./src/*.md', './src/html/*.html'], ['markdown'])
  gulp.watch(['./src/blog/index.html', './src/blog/**/index.md'], ['blog-index'])
})
 
gulp.task('default', ['build', 'connect', 'watch'])
