const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
    scope: ['devDependencies'],
    lazy: true
});
const connect = require('connect');
const browserSync = require('browser-sync');
const sStatic = require('serve-static');

const JS_FILES = ['src/**/*.js'];
const CSS_FILES = ['src/**/*.scss'];
const HTML_FILES = ['src/**/*.html'];
const TARGET = 'dist';
const HTTP_PORT = 3000;

// Vendor scripts, the order matters.
const VENDOR_FILES = [
    //'es6-shim/es6-shim.js',
    'systemjs/dist/system-polyfills.js',
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/http.dev.js'
].map((file) => 'node_modules/' + file);

gulp.task('app-html', () => {
    return gulp.src(HTML_FILES)
        .pipe(gulp.dest(TARGET));
});

gulp.task('vendor-js', () => {
    return gulp.src(VENDOR_FILES)
        //.pipe($.uglify())
        .pipe($.concatUtil('vendor.js'))
        .pipe(gulp.dest(TARGET));
});

gulp.task('app-js', () => {
    return gulp.src(JS_FILES)
        .pipe($.babel())
        .pipe(gulp.dest(TARGET));
});

gulp.task('app-css', () => {
    return gulp.src(CSS_FILES)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.concatUtil('app.css'))
        .pipe(gulp.dest(TARGET));
});

gulp.task('app-index', () => {
    return gulp.src('index.html')
        .pipe(gulp.dest(TARGET));
});

gulp.task('browser-sync', () => {

    var proxy = {
        target: 'localhost:' + HTTP_PORT
    };
    var app = connect();

    app.use(sStatic(TARGET));
    app.listen(HTTP_PORT);

    return browserSync({
        proxy : proxy,
        notify: false, // Do not show the the notification
        open : false, // don't automatically open browser
        ghostMode : false // don't make it mirror all actions accross browsers (click/forms/scroll)
    });
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(JS_FILES, ['app-js', browserSync.reload]);
    gulp.watch(CSS_FILES, ['app-css', browserSync.reload]);
    gulp.watch(HTML_FILES, ['app-html', browserSync.reload]);
});

gulp.task('default', $.sequence('app-html', 'vendor-js', 'app-js', 'app-css', 'app-index'));