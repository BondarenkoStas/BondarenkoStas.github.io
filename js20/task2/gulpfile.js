var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var useref = require('gulp-useref');

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});
gulp.task('webserver', function() {
  gulp.src('app/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('concat', function() {
  return gulp.src(['app/js/**/*.js','!app/js/main.min.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('app/js'));
}); 
gulp.task('uglify', function() {
	return gulp.src('app/js/main.min.js')
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('app/js'));
}); 
gulp.task('watch', function () {
  gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], ['concat','uglify']);
});


//---------------------GENERAL----------------
gulp.task('default',function(){
	  runSequence('concat','webserver','watch');
});
gulp.task('build',function(){
  runSequence('useref','webserver');
});