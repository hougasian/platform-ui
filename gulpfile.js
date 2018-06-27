// Include gulp
var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    cachebust = require('gulp-cache-bust'),
    connect = require('gulp-connect'),
    babel  = require('gulp-babel'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return gulp.src('assets/stylesheets/sass/main.scss')
        .pipe(sass()
          .on('error', sass.logError))
        .pipe(gulp.dest('assets/stylesheets/'));
});

gulp.task('scripts', function() {
    return gulp.src('assets/js/vue/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {includeContent: true, sourceRoot: './'}))
        .pipe(gulp.dest('assets/js'));
});

gulp.src('*.html')
    .pipe(cachebust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('.'));

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 8001,
    livereload: true
  });
});

gulp.task('default', ['sass', 'scripts', 'connect']);
