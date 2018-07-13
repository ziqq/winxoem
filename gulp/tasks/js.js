// var gulp        = require('gulp');
// var config      = require('../config');
// var include     = require("gulp-include");
// var rename      = require('gulp-rename');
// var concat      = require('gulp-concat');
// var uglify      = require('gulp-uglify');
// var browserSync = require('browser-sync');
// var babel       = require('gulp-babel');
// var sourcemaps  = require('gulp-sourcemaps');
// var runSequence = require('run-sequence');
// reload          = browserSync.reload;

// gulp.task('js', function () {
//     return gulp.src([
//         config.src.js + '/main.js',
//         config.src.js + '/del.js'
//     ])
//     .pipe(include())
//     .pipe(sourcemaps.init())
//     .on('error', function(){notify("Javascript include error");})
//     .pipe(babel())
//     // .pipe(uglify())
//      .pipe(sourcemaps.write())
//     .pipe(gulp.dest(config.production ? config.src.jsTemp + '/' : config.dest.js + '/'))
//     .pipe(reload({stream: true}));
// });

// gulp.task('js:assets', function () {
//     return gulp.src([
//         config.src.js + 'assets/yandex.map.js'
//     ])
//     .pipe(uglify())
//     .pipe(gulp.dest(config.dest.js + '/'))
// });

// gulp.task('js:libs', function() {
// 	return gulp.src(config.src.js + '/libs.js')
// 	.pipe(include())
// 	.on('error', function(){notify("Javascript include error");})
// 	.pipe(rename({suffix: '.min', prefix : ''}))
// 	.pipe(uglify())
// 	.pipe(gulp.dest(config.production ? config.src.jsTemp + '/' : config.dest.js + '/'))
// 	.pipe(reload({stream: true}));
// });

// gulp.task('js:dev', function () {
//     return gulp.src(config.src.js + '/dev.js')
//     .pipe(include())
//     .on('error', function(){notify("Javascript include error");})
//     .pipe(babel())
//     .pipe(uglify())
//     .pipe(gulp.dest(config.production ? config.src.jsTemp + '/' : ''))
//     .pipe(reload({stream: true}));
// });

// gulp.task('js:concat', function() {
//     return gulp.src([
//         config.src.jsTemp + '/libs.min.js',
//         config.src.jsTemp + '/main.js',
//         config.src.jsTemp + '/dev.js',
//     ])
//     .pipe(concat('app.js'))
//     .on('error', function(){notify("Javascript include error");})
//     .pipe(uglify())
//     .pipe(gulp.dest(config.dest.js + '/'));
// });

// gulp.task('js:all', function(js) {
//     runSequence(
//         'js:libs',
//         'js:assets',
//         'js',
//         js
//     );
// });

// gulp.task('js:build', function(js) {
//     runSequence(
//         'js:libs',
//         'js:dev',
//         'js',
//         'js:concat',
//         js
//     );
// });

// gulp.task('js:watch', function() {
//     gulp.watch(config.src.js + '/main.js', ['js']);
//     gulp.watch(config.src.js + '/libs.js', ['js:libs']);
// });
