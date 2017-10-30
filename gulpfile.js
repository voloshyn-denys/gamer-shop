var gulp = require('gulp'),
  gutil = require('gulp-util'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  animation = require('postcss-animation'),
  clearfix = require('postcss-clearfix'),
  mqpacker = require('css-mqpacker'),
  perfectionist = require('perfectionist'),
  focus = require('postcss-focus'),
  short = require('postcss-short'),
  size = require('postcss-size'),
  sass = require('gulp-sass');

gulp.task('html', function() {
  gulp.src('www/**/*.html');
});

gulp.task('sass', function(){
    var processors = [
        short(),
        size(),
        animation(),
        autoprefixer(),
        clearfix(),
        focus(),
        mqpacker(),
        perfectionist({format: 'compact'})
    ];
  return gulp.src('www/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .on('error', gutil.log)
    .pipe(gulp.dest('www/stylesheets/'))
});


gulp.task('watch', function () {
  gulp.watch('www/sass/**/*.sass', ['sass']);
});

gulp.task('default', ['html', 'sass', 'watch']);
