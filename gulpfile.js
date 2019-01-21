var gulp = require('gulp');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var del = require('del');

// src and dist paths
var paths = {
  srcFile: './src/jquery.zeynep.js',
  dist: './dist'
};

// clean dist folder
gulp.task('clean', function () {
  return del([paths.dist + '/*']);
});

// watch for changes of source file to build distributable file (only for stage environment)
gulp.task('watch', function () {
  return watch([paths.srcFile], gulp.series('production'));
});

// generate production file in dist folder
gulp.task('production', gulp.series('clean', function () {
  return gulp.src(paths.srcFile)
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(header(
        '/*\n* zeynepjs v<%= version %>\n* A light-weight jQuery mobile side menu plugin.\n*\n* Author:\n* <%= author %>\n*/\n',
        {
          version : '1.0.0',
          author: 'Huseyin Elmas <hsynlms47@gmail.com>'
        }
      ))
    .pipe(gulp.dest(paths.dist));
}));

// run gulp
gulp.task('default', gulp.series('clean', 'production', 'watch'));
