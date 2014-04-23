var log = require('log_');
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');

gulp.task('default', ['sass', 'scripts', 'jade']);

gulp.task('watch', ['default'], function () {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
  gulp.watch('source/**/*.js', ['scripts']);
  gulp.watch('jade/**.jade', ['jade']);
});

gulp.task('jade', function () {
  return gulp.src('jade/*.jade')
    .pipe(jade({ pretty: true }))
    .on('error', log('jade', 'yellow'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
  return gulp.src('stylesheets/main.scss')
    .pipe(sass({ outputStyle: 'compressed', errLogToConsole: true }))
    .pipe(autoprefix())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
  return gulp.src('source/**/*').pipe(gulp.dest('dist/js/'));
});
