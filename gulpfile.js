const del = require('del')
const gulp = require('gulp')
const connect = require('gulp-connect')
const plumber = require('gulp-plumber')
const nunjucks = require('gulp-nunjucks')
const markdownIt = require('markdown-it')
const replaceExt = require('replace-ext')
const through = require('through2')
const yamlFront = require('yaml-front-matter')

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
  gulp.src(['./html/*.html', '!./html/_*.html'])
    .pipe(plumber())
    .pipe(nunjucks.compile())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
})

gulp.task('markdown', function () {
  const mdIt = markdownIt()
  gulp.src(['./html/*.md'])
    .pipe(plumber())
    .pipe(through.obj(function(file) {
      const md = file.contents.toString()
      const front = yamlFront.loadFront(md)
      let html = ''
      for (let [name, value] of Object.entries(front)) {
        switch (name) {
          case 'extends':
            html += `{% extends "${value}" %}`
            break

          case '__content':
            html += `{% block content %}${mdIt.render(value)}{% endblock %}`
            break

          default:
            throw new Error(`Unknown option: ${name}`)
        }
      }
      file.contents = new Buffer(html)
      file.path = replaceExt(file.path, '.html');
      this.push(file)
    }))
    .pipe(nunjucks.compile())
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
  gulp.watch(['./html/*.html'], ['nunjucks'])
  gulp.watch(['./html/*.md'], ['markdown'])
})
 
gulp.task('default', ['build', 'connect', 'watch'])
