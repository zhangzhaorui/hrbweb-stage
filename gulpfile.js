var gulp = require('gulp'),
    os = require('os'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    md5 = require('gulp-md5-plus'),
    htmlmin = require('gulp-htmlmin'),
    useref = require('gulp-useref'),
    webpack = require('webpack-stream'),
    clean = require('gulp-clean');

gulp.task('vue', function(done) {
    return gulp.src('')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('public/js/pagescript/'))
        .on('end', done);
});



gulp.task('htmlmin', function (done) {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
    };
    gulp.src('views/**/*.html')
        .pipe(useref({
            noAssets:true
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/views'))
        .on('end', done);
});

gulp.task('md5:js',['htmlmin'], function (done) {
    gulp.src('public/js/**/*.js')
        .pipe(md5(10, 'dist/views/**/*.html'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/public/js'))
        .on('end', done);
});

gulp.task('copy:all', function (done) {

    gulp.src(['**/app.js',
        '**/Dockerfile',
        '**/nginx.conf',
        '**/start.sh',
        '**/routes/*',
        '**/bin/*',
        '**/public/img/**',
//        '**/public/css/**',
        '**/public/plugin/**',
        '**/public/mobile/**',
        '**/public/*',
        '**/node_modules/**'])
        .pipe(gulp.dest('dist/')).on('end', done);

});

gulp.task('concatjs', function (done) {
    gulp.src(['public/js/jquery.min.js',
        'public/js/bootstrap.min.js',
        'public/plugin/jquery.cookie.js',
        'public/js/vue.js',
        'public/plugin/base64.js',
        'public/js/widget/footTops.js'])
        .pipe(concat('/full.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/public/js'))
        .on('end', done);
});

gulp.task('concatcss', function (done) {
    gulp.src(['public/css/include/bootstrap.min.css',
        'public/css/include/bootstrap-theme.min.css',
        'public/css/include/reset.css',
        'public/css/include/function.css',
        'public/css/module/loader.css',
        'public/css/include/animate.css'])
        .pipe(concat('/full.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/public/css'))
        .on('end', done);
});

gulp.task('mincss', function (done) {
    gulp.src(['public/css/**'])
        .pipe(cssmin())
        .pipe(gulp.dest('dist/public/css'))
        .on('end', done);
});

gulp.task('build',['concatjs','concatcss','md5:js','mincss','htmlmin','copy:all']);
gulp.task('dev',['vue']);

