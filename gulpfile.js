var log = require('log_');
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var autoprefix = require('gulp-autoprefixer');

var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('default', ['sass', 'scripts', 'jade']);

gulp.task('watch', ['default'], function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
  gulp.watch('source/**/*.js', ['scripts']);
  gulp.watch('jade/**.jade', ['jade']);
});

gulp.task('jade', function () {
  return gulp.src('jade/index.jade')
    .pipe(jade({ pretty: true }))
    .on('error', log('jade', 'yellow'))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
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
    .bundle()
    .pipe(source('init.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('connect', ['watch'], function () {
  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
});
