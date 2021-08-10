
let project_folder = "dist";
let source_folder = "#src";

let path = {
  build:{
    html: project_folder +"/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    fonts: project_folder + "/fonts/",
    img: project_folder + "/images/",
    jquery: project_folder + "/jquery/",
    slick: project_folder + "/slick/",
  },
  src:{
    html: [source_folder +"/*.html", "!" + source_folder +"/_*.html"],
    css: source_folder + "/less/style.less",
    js: source_folder + "/JS/app.js",
    fonts: source_folder + "/fonts/**",
    img: source_folder + "/images/**",
    jquery: source_folder + "/jquery/**",
    slick: source_folder + "/slick/**",
  },
  watch:{
    html: source_folder +"/**/*.html",
    css: source_folder + "/less/**/*.less",
    js: source_folder + "/JS/**/*.js",
    fonts: source_folder + "/fonts/",
    img: source_folder + "/images/**",
    jquery: source_folder + "/jquery/",
    slick: source_folder + "/slick/",
  },
  clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  less = require('gulp-less');

  
function browserSync(params) {
  browsersync.init ({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port:3000,
    notify:false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(less())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
    .pipe(browsersync.stream())
}

function jquery() {
  return src(path.src.jquery)
    .pipe(dest(path.build.jquery))
    .pipe(browsersync.stream())
}

function slick() {
  return src(path.src.slick)
    .pipe(dest(path.build.slick))
    .pipe(browsersync.stream())
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, jquery, slick, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.jquery = jquery;
exports.slick = slick;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;