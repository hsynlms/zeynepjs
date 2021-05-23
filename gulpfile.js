const chalk = require('chalk')
const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const header = require('gulp-header')
const del = require('del')
const sourcemaps = require('gulp-sourcemaps')
const pkg = require('./package.json')

const tpl = `
/*!
* <%= name %> v<%= version %>
* A light-weight multi-level jQuery side menu plugin.
* It's fully customizable and is compatible with modern browsers such as Google Chrome, Mozilla Firefox, Safari, Edge and Internet Explorer
* <%= license %> License
* by <%= author %>
*/
`.trimStart()

const paths = {
  srcJavascript: './src/*.js',
  srcCss: './src/*.css',
  dist: './dist/'
}

// clean dist folder
gulp.task('clean', function () {
  return del(paths.dist)
})

// watch for changes of source file to build distributable file (only for stage environment)
gulp.task('watch', function () {
  return gulp.watch(
    [paths.srcJavascript, paths.srcCss],
    gulp.series('build')
  )
})

// build javascript file
gulp.task('script', function () {
  return gulp.src(paths.srcJavascript)
    .pipe(sourcemaps.init())
    .pipe(
      header(tpl, pkg)
    )
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(
      header(tpl, pkg)
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist))
    .on('end', function () {
      console.log(
        chalk.green('Script file building process has been completed successfully.')
      )
    })
})

// build css file
gulp.task('style', function () {
  return gulp.src(paths.srcCss)
    .pipe(sourcemaps.init())
    .pipe(
      header(tpl, pkg)
    )
    .pipe(
      require('gulp-postcss')([
        require('postcss-discard-comments'),
        require('autoprefixer')(),
        require('postcss-sorting')({
          order: [
            'custom-properties',
            'dollar-variables',
            'declarations',
            'at-rules',
            'rules'
          ],
          'properties-order': 'alphabetical',
          'unspecified-properties-position': 'bottom'
        })
      ])
    )
    .pipe(gulp.dest(paths.dist))
    .pipe(
      require('gulp-clean-css')()
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist))
    .on('end', function () {
      console.log(
        chalk.green('Style file building process has been completed successfully.')
      )
    })
})

// generate/build production files in dist folder
gulp.task('build', gulp.series('script', 'style'))

// gulp default task
gulp.task(
  'default',
  gulp.series(
    'clean',
    'build',
    'watch'
  )
)
