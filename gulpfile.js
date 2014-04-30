'use strict';

var log = require('log_');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var autoprefix = require('gulp-autoprefixer');
var through = require('through');
var Path = require('path');
var jadeify = require('jadeify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('default', ['sass', 'templates', 'libs', 'scripts']);

gulp.task('watch', ['default'], function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
  gulp.watch('source/**/*.js', ['scripts']);
  gulp.watch('jade/**/*.jade', ['templates']);
});

gulp.task('templates', function () {
  var output = source('jade.js');
  output.write('module.exports = {\n');

  var write = function (file) {
    var path = Path.relative('./source/utils', file.path);
    this.queue('  \'' + path + '\': require(\'' + path + '\'),\n');
  };
  
  var end = function () {
    this.queue('};\n');
    this.queue(null);
  };

  return gulp.src('jade/**/*.jade')
    .pipe(through(write, end))
    .pipe(output)
    .pipe(gulp.dest('source/utils'));

});

gulp.task('sass', function () {
  return gulp.src('stylesheets/main.scss')
    .pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(autoprefix())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  // return gulp.src('source/**/*').pipe(gulp.dest('dist/js/'));
  return browserify('./source/app.js')
    .transform(jadeify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('libs', function () {
  return gulp.src([
    'source/libs/jquery.js',
    'source/libs/jquery-ui.js',
    'source/libs/underscore.js',
    'source/libs/backbone.js',
    'source/libs/backbone.marionette.js',
    'source/libs/marionette.bossview.js',
    'source/libs/jade.js',
    'source/libs/moment.js',
    'source/libs/numeral.js',
    'source/libs/fastclick.js'
  ])
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('connect', ['watch'], function () {
  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});
