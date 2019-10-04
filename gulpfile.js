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