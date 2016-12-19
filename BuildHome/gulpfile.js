var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  	.pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});

// ------------Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html');
  gulp.watch('app/js/**/*.js');
});
//-------------FOR BUILD------------
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
    imgName: '../images/sprite.png',
    cssName: 'sprite.css'
  }));
  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('app/images'));
  var cssStream = spriteData.css
    .pipe(gulp.dest('app/scss'));
  return merge(imgStream, cssStream);
});
gulp.task('images', function() {
  return gulp.src(['app/images/**/*.+(png|jpg|jpeg|gif|svg)','!app/images/icons/*'])
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})


//----------------GENERAL------------------
gulp.task('default', function(callback) {
  runSequence(['sass', 'watch'],
    callback
  )
});
gulp.task('build', function(callback) {
  runSequence(
    'sass','sprite',
    ['useref','images', 'fonts'],
    callback
  )
});