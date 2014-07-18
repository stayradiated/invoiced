var gulp = require('gulp');
var brfs = require('gulp-brfs');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var react = require('gulp-react');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');

gulp.task('default', ['app', 'stylesheets'], function () {
  gulp.watch('./stylesheets/**/*.scss', ['stylesheets']);

  return connect.server({
    root: ['dist'],
    port: 8000,
    livereload: true
  });
}); 

gulp.task('app', function () {
  var bundler = watchify({ extensions: '.jsx' });

  bundler.exclude('stylus');
  bundler.add('./source/app.jsx');

  bundler.transform(reactify);
  bundler.transform(brfs.brfs);

  bundler.on('update', rebundle);
  bundler.on('error', console.log.bind(console));

  function rebundle () {
    console.log('rebundling');
    return bundler.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(connect.reload());
  }

  return rebundle();
});

gulp.task('stylesheets', function () {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('minify', function () {
  return gulp.src('./dist/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
