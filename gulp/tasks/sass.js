var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var csso         = require('postcss-csso');
var rename       = require('gulp-rename');
var config       = require('../config');

var processors = [
	autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}),
	require('lost'),
	mqpacker({
		sort: sortMediaQueries
	}),
	// csso
];

var processorsMin = [
	autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}),
	require('lost'),
	mqpacker({
		sort: sortMediaQueries
	}),
	csso
];

gulp.task('sass', function() {
	return gulp
		.src(config.src.sass + '/*.{sass,scss}')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: config.production ? 'compressed' : 'expanded', // nested, expanded, compact, compressed
			precision: 5,            
			includePaths: ['node_modules/susy/sass']
		}))
		.on('error', config.errorHandler)
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:libs', function() {
	return gulp
		.src(config.dest.css + '/libs.css')
		.pipe(rename({suffix: '.min', prefix : ''}))
		.on('error', config.errorHandler)
		.pipe(postcss(processorsMin))
		.pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
	gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']);
	gulp.watch(config.src.sass + '/libs.{sass,scss}', ['sass:libs']);
});

function isMax(mq) {
	return /max-width/.test(mq);
}

function isMin(mq) {
	return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
	A = a.replace(/\D/g, '');
	B = b.replace(/\D/g, '');

	if (isMax(a) && isMax(b)) {
		return B - A;
	} else if (isMin(a) && isMin(b)) {
		return A - B;
	} else if (isMax(a) && isMin(b)) {
		return 1;
	} else if (isMin(a) && isMax(b)) {
		return -1;
	}

	return 1;
}
