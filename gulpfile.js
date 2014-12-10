var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var path = require('path');
var tagReplace = require('tag-replace');

gulp.task('cleanjs', function() {
    del(['js/*.js', 'js/min/*.js']);
});

gulp.task('cleancss', function() {
    del(['css/*.css', 'css/min/*.css']);
});

gulp.task('cleanimg', function() {
    del(['img/*']);
});

gulp.task('concatjs', ['cleanjs'], function() {
    return gulp.src('dev/js/*.js')
    .pipe(concat('prod.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('concatcss', ['cleancss'], function() {
    return gulp.src('dev/css/*.css')
    .pipe(concat('prod.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('minjs', ['concatjs'], function() {
    return gulp.src('js/prod.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/min'));
});

gulp.task('images', ['cleanimg'], function() {
    return gulp.src('dev/img/*')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('img'));
});

gulp.task('replaceTags', function() {
    tagReplace(
        path.join(__dirname, 'dev/index.html'), path.join(__dirname, 'index.html'),
        [
            { key: 'js',  newTag: '<script src="js/min/prod.js"></script>' },
            { key: 'css', newTag: '<link rel="stylesheet" type="text/css" href="css/prod.css">' }
        ]
    );
});

// Rerun the task when a file changes
/*gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});*/

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['concatjs', 'concatcss', 'minjs', 'images', 'replaceTags']);