const del = require('del')
const gulp = require('gulp')
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const nunjucks = require('nunjucks')
const markdownIt = require('markdown-it')
const replaceExt = require('replace-ext')
const through = require('through2')
const yamlFront = require('yaml-front-matter')

function markdown2nunjucks () {
  const mdIt = markdownIt()
  return through.obj(function(file, encoding, callback) {
    console.log('markdown2nunjucks:', file.path)
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
    file.data = front
    file.contents = Buffer.from(html)
    file.path = replaceExt(file.path, '.html');
    this.push(file)
    callback()
  })
}

function nunjucks2html () {
  return through.obj(function(file, encoding, callback) {
    console.log('nunjucks2html:', file.path)
    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('html')
    )
    const content =file.contents.toString()
    const context = file.data || {}
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
  gulp.src(['./css/*', './img/*', './js/*'], {base: '.'})
    .pipe(plumber())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('nunjucks', function () {
  gulp.src(['./site/**/*.html'])
    .pipe(plumber())
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('markdown', function () {
  gulp.src(['./site/**/*.md'])
    .pipe(plumber())
    .pipe(markdown2nunjucks())
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('build', ['clean'], function () {
  gulp.start(['copy', 'nunjucks', 'markdown'])
})

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true
  })
})

gulp.task('watch', function () {
  gulp.watch(['./css/*', './img/*', './js/*'], ['copy'])
  gulp.watch(['./site/**/*.html', './html/*.html'], ['nunjucks'])
  gulp.watch(['./site/*.md', './html/*.html'], ['markdown'])
})
 
gulp.task('default', ['build', 'connect', 'watch'])
