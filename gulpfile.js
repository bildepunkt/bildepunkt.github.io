var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('cleanjs', function() {
    del(['js/*.js', 'js/min/*.js']);
});

gulp.task('cleanimg', function() {
    del(['img/*']);
});

gulp.task('concat', ['cleanjs'], function() {
    return gulp.src('dev/js/*.js')
    .pipe(concat('prod.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('min', ['concat'], function() {
    return gulp.src('js/prod.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/min'));
});

// Copy all static images
gulp.task('images', ['cleanimg'], function() {
    return gulp.src('dev/img/*')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('img'));
});

// Rerun the task when a file changes
/*gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});*/

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['concat', 'min', 'images']);