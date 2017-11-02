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
  sass = require('gulp-sass'),
  merge = require('merge-stream'),
  csso = require('gulp-csso'),
  spritesmith = require('gulp.spritesmith');

gulp.task('html', function() {
  gulp.src('www/**/*.html');
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('www/images/icons-sprite/*.png').pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_icons.sass',
        padding: 5,
        cssTemplate: 'sprite-theme.handlebars'
    }));

    var imgStream = spriteData.img
        .pipe(gulp.dest('www/images/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('www/sass/'));

    return merge(imgStream, cssStream);
});

gulp.task('sass', function(){
    var processors = [
        short(),
        size(),
        animation(),
        autoprefixer(),
        clearfix(),
        focus(),
        mqpacker()
    ];
  return gulp.src('www/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(csso())
    .on('error', gutil.log)
    .pipe(gulp.dest('www/stylesheets/'))
});


gulp.task('watch', function () {
  gulp.watch('www/sass/**/*.sass', ['sass']);
});

gulp.task('default', ['html', 'sass', 'watch']);
