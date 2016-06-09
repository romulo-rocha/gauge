/********************************************************/
/*************          PATHS              **************/
/********************************************************/
var paths = {
    app: {
        selection: ['./dev/assets/app/**/*.js', '!./dev/assets/app/**/*.min.js'],
        directory: './dev/assets/app'
    },
    js: {
        selection: ['./dev/assets/js/**/*.js', '!./dev/assets/js/**/*.min.js'],
        directory: './dev/assets/js'
    },
    sass: ['./dev/assets/scss/main.scss'],
    css: './dev/assets/css'
};
/********************************************************/
/*************          MODULES            **************/
/********************************************************/
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-cssnano'),
    purge = require('gulp-css-purge'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del');
/********************************************************/
/*************          TASKS              **************/
/********************************************************/
/////////////////
//  APP TASK   //
/////////////////
gulp.task('app', function () {
    'use strict';
    gulp.src(paths.app.selection)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.app.directory))
        .pipe(notify({title: 'APP', message: 'Task complete!', onLast: true}));
});
/////////////////////
//  SCRIPTS TASK   //
/////////////////////
gulp.task('scripts', function () {
    'use strict';
    gulp.src(paths.js.selection)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.directory))
        .pipe(notify({title: 'SCRIPTS', message: 'Task complete!', onLast: true}));
});
////////////////////
//  STYLES TASK   //
////////////////////
gulp.task('styles', function () {
    'use strict';
    gulp.src(paths.sass)
        .pipe(sass({style: 'compressed'}).on('error', sass.logError))
        .pipe(purge())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.css))
        .pipe(notify({title: 'STYLES', message: 'Task complete!', onLast: true}));
});
///////////////////
//  BUILD TASK   //
///////////////////
//clears out all files and folders from build folder
gulp.task('build:cleanfolder', function () {
    'use strict';
    del(['./build']);
});
//Copy dev folder to build directory
gulp.task('build:copy', ['build:cleanfolder'], function () {
    'use strict';
    return gulp.src('./dev/**')
        .pipe(gulp.dest('./build'));
});
//removes unwanted files (non-minified files, etc.)
//list all files and directories that you don't want to be available on build
gulp.task('build:remove', ['build:copy'], function () {
    'use strict';
    del([
        './build/assets/scss/',
        './build/assets/js/**/*.js',
        '!./build/assets/js/**/*.min.js',
        './build/assets/app/**/*.js',
        '!./build/assets/app/**/*.min.js'
    ]);
});
gulp.task('build', ['build:remove']);
///////////////////
//  WATCH TASK   //
///////////////////
gulp.task('watch', function () {
    'use strict';
    //app
    gulp.watch(paths.app.selection, ['app'])
        .on('change', function (evt) {
            var fileName = evt.path.split('\\');
            fileName = fileName[fileName.length - 1];
            console.log('[watcher] File ' + fileName + ' was ' + evt.type + ', uglifying...');
        });
    //scripts
    gulp.watch(paths.js.selection, ['scripts'])
        .on('change', function (evt) {
            var fileName = evt.path.split('\\');
            fileName = fileName[fileName.length - 1];
            console.log('[watcher] File ' + fileName + ' was ' + evt.type + ', uglifying...');
        });
    //styles
    gulp.watch('./dev/assets/scss/**/*.scss', ['styles'])
        .on('change', function (evt) {
            var fileName = evt.path.split('\\');
            fileName = fileName[fileName.length - 1];
            console.log('[watcher] File ' + fileName + ' was ' + evt.type + ', compressing...');
        });
});
/////////////////////
//  DEFAULT TASK   //
/////////////////////
gulp.task('default', ['app', 'scripts', 'styles', 'watch']);