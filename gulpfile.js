const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat")
const merge = require("merge-stream")
const rename = require("gulp-rename")
const minifycss = require("gulp-clean-css")

// Logs Info
const info = () => {
    return console.log("Gulp is running!")
}

// Send favicons to dist
const sendFavicons = () => gulp.src("src/images/favicons/*")
    .pipe(gulp.dest("dist/images/favicons"))
    .pipe(browserSync.stream());

// Copy all HTML files
const copyHTML = () => {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
}

// Manage Styles
const manageStyles = () => {
    return gulp.src("src/sass/main.scss")
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());

    // FOR FUTURE USE
    // const css_paths = [
    //     "node_modules/splitting/dist/splitting.css"
    // ]

    // const sass_stream = gulp.src("src/sass/main.sass")
    //     .pipe(sass({
    //         outputStyle: 'compressed'
    //     }).on('error', sass.logError))
    //     .pipe(autoprefixer({
    //         browsers: ['last 5 versions'],
    //         cascade: false
    //     }))

    // const css_stream = gulp.src(css_paths)
    //     .pipe(minifycss())

    // return merge(sass_stream, css_stream)
    //     .pipe(concat("main.css"))
    //     .pipe(gulp.dest("dist/css"))
    //     .pipe(browserSync.stream());
}

const bundleIndexJS = () => {
    return gulp.src("src/js/index.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/sass/**/*.scss', manageStyles);
    gulp.watch('src/images/favicons/*', sendFavicons);
    gulp.watch('src/*.html', copyHTML);
    gulp.watch('src/js/*.js', bundleIndexJS);
}

exports.watch = watch