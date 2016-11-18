var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var babel = require('gulp-babel');

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});
gulp.task('concat', function() {
  return gulp.src(['app/js/babel/*.js','app/js/lib/*.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('app/js'));
}); 
gulp.task('uglify', function() {
	return gulp.src('app/js/main.min.js')
    .pipe(uglify('main.min.js'))
    .pipe(gulp.dest('app/js'));
}); 
gulp.task('babe', function() {
  return gulp.src(['app/js/*.js', '!app/js/main.min.js'])
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('app/js/babel'));
});

gulp.task('watch', function () {
  gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], ['babe','concat','uglify']);
  gulp.watch(['app/style/**/*.css','!app/style/main.css'],['autoprefixer']);
});


//---------------------GENERAL----------------
gulp.task('default',function(){
	runSequence('babe','concat','uglify','watch');
});
gulp.task('build',function(){
  runSequence('babe','concat','useref');
});