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
const shins = require('shins')
const through = require('through2')
const yaml = require('js-yaml')
const yamlFront = require('yaml-front-matter')
const accumulate = require('vinyl-accumulate')
const widdershins = require('widdershins')

const root = path.join(__dirname, 'src')

/**
 * Parses a markdown file into a Javascript object with the properties
 * contained in the YAML frontmatter. This is used to get information
 * on files (e.g. blog posts) without converting them (e.g for getting title and date)
 */
function markdown2object (file, includeContent = true) { 
  const md = file.contents.toString()
  
  // Normalise and augment the page's properties...

  const front = yamlFront.loadFront(md)

  front.date = front.date ? new Date(front.date) : Date.now()
  front.folder = path.join('/', path.relative(root, path.dirname(file.path)))
  front.href = front.folder

  // The page's "main image"
  if (front.image) {
    front.image = path.join(front.folder, front.image)
  } else {
    const images = glob.sync(path.join(path.dirname(file.path),'*.{gif,jpg,png,svg}'))
    if (images.length) {
      front.image = path.join('/', path.relative(root, images[0]) )
    }
  }

  // The page's "suggested" items
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

/**
 * Convert markdown into HTML
 */
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

/**
 * Render a Nunjucks HTML template into HTML
 */
function nunjucks2html () {
  const env = new nunjucks.Environment(
    // Tell Nunjucks where to get partials e.g. `_base.html`
    new nunjucks.FileSystemLoader('src')
  )
  env.addFilter('date', nunjucksDateFilter)
  return through.obj(function(file, encoding, callback) {
    const content = file.contents.toString()
    const context = file.context || {}
    if (!context.source) context.source = path.relative(__dirname, file.path)
    const html = env.renderString(content, context) || ''

    // Custom transformations of HTML
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

/**
 * Augment an OpenAPI 3.0 YAML specification with non-standard
 * vendor exntensions (e.g. `x-code-samples` enabled by redoc)
 */
function openapi2redoc () {
  // List of languages and thh templates to use to generate code samples 
  // for each of them
  const langs = ['Curl', 'Javascript', 'Python', 'R']
  const templates = {}
  for (let lang of langs) {
    templates[lang] = fs.readFileSync(`./src/specs/code-samples/${lang.toLowerCase()}.txt`, 'utf8')
  }

  return through.obj(function(file, encoding, callback) {
    const content = file.contents.toString()
    const api = yaml.safeLoad(content, {json: true})
    const baseUrl = api.servers[0].url

    // Add code samples
    for (let [id, path] of Object.entries(api.paths)) {
      for (let [method, op] of Object.entries(path)) {
        const context = Object.assign({
          url: baseUrl + id,
          method
        }, op)
        let samples = []
        for (let lang of langs) {
          const source = nunjucks.renderString(templates[lang], context)
          samples.push({lang, source})
        }
        op['x-code-samples'] = samples
      }
    }

    const yml = yaml.dump(api)
    file.contents = Buffer.from(yml)
    file.path = replaceExt(file.path, '.redoc-yaml')
    callback(null, file)
  })
}

// Gulp tasks

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

gulp.task('specs/openapi', function () {
  gulp.src(['./src/specs/host.yaml'])
    .pipe(plumber())
    .pipe(openapi2redoc())
    .pipe(gulp.dest('./build/specs'))
    .pipe(connect.reload())
})

gulp.task('specs/yaml', function () {
  gulp.src(['./src/specs/*.yaml'])
    .pipe(plumber())
    .pipe(gulp.dest('./build/specs'))
    .pipe(connect.reload())
})

gulp.task('build', ['clean'], function () {
  gulp.start([
    'css', 'js', 'webfonts', 'img', 
    'nunjucks', 'markdown', 
    'blog/index',
    'specs/openapi', 'specs/yaml'
  ])
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
  gulp.watch(['./src/specs/host.yaml'], ['specs/openapi'])
  gulp.watch(['./src/specs/*.yaml'], ['specs/yaml'])
})

gulp.task('default', ['build', 'connect', 'watch'])
