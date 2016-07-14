/**
 * Created by cdd on 2016/7/13.
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });
});

//刷新的方法
var reload = browserSync.reload;

gulp.task('copy-html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('copy-js', function () {
    return gulp.src('js/**/*.js')
    //.pipe(concat('')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
    //.pipe(rename('')
});

gulp.task('copy-css', function () {
    return gulp.src('css/**/*')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-image', function () {
    return gulp.src('image/*.{png,jpg,gif,ico}')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/image'));
});

gulp.task('watch', function () {
    gulp.watch('*.html',['copy-html']).on("change", reload);
    gulp.watch('css/**/*.css', ['copy-css']).on("change", reload);
    gulp.watch('js/**/*.js', ['copy-js']).on("change", reload);
    gulp.watch('image/*.{png,jpg,gif,ico}',['copy-image']).on("change", reload);
});

gulp.task('default', ['browser-sync', 'watch']);
