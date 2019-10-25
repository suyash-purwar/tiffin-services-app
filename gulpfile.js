const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const uglify_composer = require("gulp-uglify/composer");
const uglifyes = require("uglify-es");
const uglify = uglify_composer(uglifyes, console)
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

const optimizeImages = () => {
    const image_paths = [
        "src/images/logo/*",
        "src/images/img-comp/*"
    ];

    const compress_logo = gulp.src(image_paths[0])
        .pipe(imagemin([
            pngquant({ quality: [0.6, 0.6]})
        ]))
        .pipe(gulp.dest("dist/images/logo"));

    const compress_img_comp = gulp.src(image_paths[1])
        .pipe(imagemin([
            pngquant({ quality: [0.7, 0.7] })
        ]))
        .pipe(gulp.dest("dist/images/img-comp"));

    return merge(compress_logo, compress_img_comp)
        .pipe(browserSync.stream());
}

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

const bundleThirdPartyJS = () => {
    js_paths = [
        "node_modules/siema/dist/siema.min.js"
    ]

    const siema = gulp.src(js_paths[0]);
    return merge(siema)
        .pipe(concat('external.js'))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/sass/**/*.scss', manageStyles);
    gulp.watch('src/images/favicons/*', sendFavicons);
    gulp.watch('src/images/**/*', optimizeImages);
    gulp.watch('src/*.html', copyHTML);
    gulp.watch('src/js/*.js', bundleIndexJS);
    gulp.watch('src/js/*.js', bundleThirdPartyJS);
}

exports.watch = watch