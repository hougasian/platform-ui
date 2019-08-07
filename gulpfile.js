const { src, dest, series, parallel } = require('gulp');
const autoprefixer = require("autoprefixer");
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const kss = require('kss');
const nano = require('cssnano');
const postcss = require("gulp-postcss");
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const { watch } = require('gulp');

function serve() {
  connect.server({
    root: './',
    port: 8001,
    livereload: true
  });
}

function copyStaticAssets() {
  return src(['src/assets/images/**/*', 'src/assets/stylesheets/**/*', '!src/assets/stylesheets/sass/**'], { base: 'src/assets' })
    .pipe(dest('./styleguide/site-assets'))
    .pipe(connect.reload());
}

function css() {
  return src('src/assets/stylesheets/sass/main.scss')
    .pipe(sass())
    .pipe(concat('platform-ui.min.css'))
    .pipe(postcss([autoprefixer(), nano()]))
    .pipe(dest('src/assets/stylesheets/'))
    .pipe(dest('dist/'))
    .pipe(connect.reload())
}

function js() {
  return src('src/assets/js/src/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('platform-ui.min.js'))
    .pipe(uglify())
    .pipe(dest('src/assets/js'))
    .pipe(dest('dist/js'))
    .pipe(dest('custom-builder/kss-assets/'))
    .pipe(connect.reload())
}

function styleguide() {
  return kss({
    source: 'src/assets/stylesheets/',
    destination: 'styleguide/',
    builder: 'custom-builder',
    css: 'kss-assets/kss.css'
  });
}

function watchFiles() {
  watch('./src/assets/stylesheets/sass/*', css);
  watch('./src/assets/js/src/*', js);
  watch(['./src/assets/js/src/*', './src/assets/stylesheets/sass/*'], copyStaticAssets);
}

exports.build = series(css, js, styleguide, copyStaticAssets);
exports.css = css;
exports.js = js;
exports.styleguide = styleguide;
exports.serve = serve;
exports.copyStaticAssets = copyStaticAssets;
exports.default = parallel(series(css, styleguide, copyStaticAssets), js, serve, watchFiles);
