const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify    = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const paths = {
    scss: './assets/style/**/*.scss',
}

// Sass Task 
function taskCSS(){
    return gulp.src(paths.scss)
    .pipe(sass( {outputStyle: 'compressed'} ))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./assets/style/'))
}

function watch(){
    gulp.watch(paths.scss, taskCSS);
}


exports.default = gulp.parallel(taskCSS,watch);
