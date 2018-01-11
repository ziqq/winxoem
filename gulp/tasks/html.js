// var gulp        = require('gulp'),
// 	include     = require("gulp-include"),
// 	rigger      = require('gulp-rigger'),
// 	config      = require('../config'),
// 	browserSync = require('browser-sync'),
// 	reload      = browserSync.reload;

// gulp.task('html', function () {
// 	gulp.src(config.src.root + '/*.html')
// 		.pipe(rigger())
// 		// .on('error', function(){notify("HTML include error");})
// 		.on('error', function(){notify("HTML include error");})
// 		.pipe(gulp.dest(config.dest.root))
// 		.pipe(reload({stream: true}));
// });

// gulp.task('html:watch', function() {
// 	gulp.watch([
// 		config.src.root + '/*.html', 
// 		config.src.root + '/partials/*.html'
// 	], ['html']);
// });