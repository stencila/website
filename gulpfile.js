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
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const moduleImporter = require('sass-module-importer')

const root = path.join(__dirname, 'src')

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    sourceMap: true,
    importer: moduleImporter()
}

sass.compiler = require('node-sass')

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

const clean = function (done) {
  return del([ './build' ]);
}

const sassF = function() {
  return gulp.src([
    './node_modules/@stencila/style/sass/**/*.sass',
    './src/sass/**/*.sass'
  ])
  .pipe(sass(sassOptions).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest('./build/css'))
}

// gulp.task('sass', function(done) {
//   gulp.src([
//     './node_modules/@stencila/style/sass/**/*.sass',
//     './src/sass/**/*.sass'
//   ])
//   .pipe(sass(sassOptions).on('error', sass.logError))
//   .pipe(autoprefixer())
//   .pipe(gulp.dest('./build/css'))
//
//   done()
// })

// gulp.task('css', function (done) {
//   gulp.src([
//     './node_modules/prismjs/themes/prism.css',
//     './src/css/**'
//   ]).pipe(gulp.dest('./build/css'))
//   done()
// })

const css = function() {
  return gulp.src([
    './node_modules/prismjs/themes/prism.css',
    './src/css/**'
  ]).pipe(gulp.dest('./build/css'))
}

const webfonts = function (done) {
  return gulp.src([
    './src/webfonts/*.*'
  ]).pipe(gulp.dest('./build/webfonts'))
  done()
}

// gulp.task('webfonts', function (done) {
//   gulp.src([
//     './src/webfonts/*.*'
//   ]).pipe(gulp.dest('./build/webfonts'))
//   done()
// })

const js = function() {
  return gulp.src([
    './node_modules/prismjs/prism.js',
    './node_modules/prismjs/components/prism-{bash,json,r,python,sql}.min.js',
    './node_modules/waypoints/lib/noframework.waypoints.js',
    './src/js/**'
  ]).pipe(gulp.dest('./build/js'))
}

// gulp.task('js', function (done) {
//   gulp.src([
//     './node_modules/prismjs/prism.js',
//     './node_modules/prismjs/components/prism-{bash,json,r,python,sql}.min.js',
//     './node_modules/waypoints/lib/noframework.waypoints.js',
//     './src/js/**'
//   ]).pipe(gulp.dest('./build/js'))
//   done()
// })

// gulp.task('img', function (done) {
//   gulp.src([
//     './src/**/*.{gif,jpg,png,svg}'
//   ], {base: './src'}).pipe(gulp.dest('./build'))
//   done()
// })

const img = function() {
  return gulp.src([
    './src/**/*.{gif,jpg,png,svg}'
  ], {base: './src'}).pipe(gulp.dest('./build'))
}

const nunjucksF = function() {
  return gulp.src(['./src/**/*.html', '!./src/**/_*.html', '!./src/blog/index.html', '!./src/community/events.html'])
    .pipe(plumber())
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
}

// gulp.task('nunjucks', function (done) {
//   gulp.src(['./src/**/*.html', '!./src/**/_*.html', '!./src/blog/index.html', '!./src/community/events.html'])
//     .pipe(plumber())
//     .pipe(nunjucks2html())
//     .pipe(gulp.dest('./build'))
//     .pipe(connect.reload())
//   done()
// })

const markdown = function() {
  return gulp.src(['./src/**/*.md'])
    .pipe(plumber())
    .pipe(markdown2nunjucks())
    .pipe(nunjucks2html())
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload())
}

// gulp.task('markdown', function (done) {
//   gulp.src(['./src/**/*.md'])
//     .pipe(plumber())
//     .pipe(markdown2nunjucks())
//     .pipe(nunjucks2html())
//     .pipe(gulp.dest('./build'))
//     .pipe(connect.reload())
//   done()
// })

const blogIndex = function() {
  return gulp.src(['./src/blog/**/index.md'])
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
}

// gulp.task('blog/index', function (done) {
//   gulp.src(['./src/blog/**/index.md'])
//     .pipe(plumber())
//     .pipe(accumulate('./blog/index.html'))
//     .pipe(through.obj(function(all, encoding, callback) {
//       let posts = []
//       for (let file of all.files) {
//         let post = markdown2object(file).front
//         posts.push(post)
//       }
//       posts.sort((a, b) => (a.date > b.date) ? -1 : 1)
//       all.context = {posts}
//       all.contents = fs.readFileSync('./src/blog/index.html')
//       all.source = 'src/blog/index.html'
//       callback(null, all)
//     }))
//     .pipe(nunjucks2html())
//     .pipe(gulp.dest('./build'))
//     .pipe(connect.reload())
//   done()
// })

const communityEvents = function() {
  return gulp.src(['./src/community/events/**.md'])
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
}
// gulp.task('community/events', function (done) {
//   gulp.src(['./src/community/events/**.md'])
//     .pipe(plumber())
//     .pipe(accumulate('./community/events.html'))
//     .pipe(through.obj(function(all, encoding, callback) {
//       let events = []
//       for (let file of all.files) {
//         let eve = markdown2object(file).front
//         events.push(eve)
//       }
//       events.sort((a, b) => (a.date < b.date) ? -1 : 1)
//       all.context = {events}
//       all.contents = fs.readFileSync('./src/community/events.html')
//       all.source = 'src/community/events.html'
//       callback(null, all)
//     }))
//     .pipe(nunjucks2html())
//     .pipe(gulp.dest('./build'))
//     .pipe(connect.reload())
//
//   done()
// })


const connectF = function(done) {
  connect.server({
    root: 'build',
    livereload: true
  })
  done()
}
// gulp.task('connect', function (done) {
//   connect.server({
//     root: 'build',
//     livereload: true
//   })
//   done()
// })

const watch = function() {
    gulp.watch('./node_modules/@stencila/style/sass/**/*.sass', { ignoreInitial: false }, gulp.series(sassF))
    gulp.watch('./src/sass/**/*.sass', { ignoreInitial: false }, gulp.series(sassF))
    gulp.watch('./src/css/*', { ignoreInitial: false }, gulp.series(css))
    gulp.watch('./src/js/*', { ignoreInitial: false }, gulp.series(js))
    gulp.watch('./src/webfonts/*', { ignoreInitial: false }, gulp.series(webfonts))
    gulp.watch('./src/**/*.{gif,jpg,png,svg}', { ignoreInitial: false }, gulp.series(img))
    gulp.watch('./src/**/*.html', { ignoreInitial: false }, gulp.series(nunjucksF))
    gulp.watch('./src/**/_*.html', { ignoreInitial: false }, gulp.series(nunjucksF, markdown))
    gulp.watch('./src/**/*.md', { ignoreInitial: false }, gulp.series(markdown))
    gulp.watch('./src/blog/index.html', { ignoreInitial: false }, gulp.series(blogIndex))
    gulp.watch('./src/blog/**/index.md', { ignoreInitial: false }, gulp.series(blogIndex))
    gulp.watch('./src/community/events.html', { ignoreInitial: false }, gulp.series(communityEvents))
    gulp.watch('./src/community/events/**.md', { ignoreInitial: false }, gulp.series(communityEvents))
};

const buildTask = function(done) {
  return gulp.series(clean, gulp.series(sassF, css, js, webfonts, img, nunjucksF, markdown, blogIndex, communityEvents))
};


exports.build = gulp.series(clean, sassF, css, js, webfonts, img, nunjucksF, markdown, blogIndex, communityEvents)
exports.default = gulp.series(clean, gulp.parallel(connectF, watch));
exports.watch = watch
