var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return gulp
    .src('./build/app/', { read: false })
    .pipe($.clean());
});
gulp.task('copy:img', function () {
    return gulp
    .src('./src/img/**/*')
    .pipe(gulp.dest('./build/app/img/'));
});
gulp.task('copy:js', function () {
    return gulp
    .src('./src/js/**/*.js')
    .pipe(gulp.dest('./build/app/js/'));
});
gulp.task('jade', function () {
    return gulp
    .src('./src/**/*.jade')
    .pipe($.jade({
        locals: {}
    }))
    .pipe(gulp.dest('./build/app/'))
});
gulp.task('browserify', function () {
    return gulp.src('src/js/app.js')
    .pipe($.browserify({
        debug: !process.env.NODE_ENV === 'production'
    }))
    .pipe(gulp.dest('./build/app/js'))
});

gulp.task('default', function (callback) {
    runSequence(
        'clean',
        [
            'copy:img',
            'copy:js',
            'jade',
            'browserify'
        ]
    , callback);
});
