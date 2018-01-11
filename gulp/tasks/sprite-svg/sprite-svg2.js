var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgmin      = require('gulp-svgmin');
var svgSprite    = require("gulp-svg-sprite");
var replace     = require('gulp-replace');
var concat      = require('gulp-concat');
var inject      = require('gulp-inject-string');
var runSequence = require('run-sequence');
var gulpif      = require('gulp-if');

var rename      = require('gulp-rename');
var cheerio     = require('gulp-cheerio');
var through2    = require('through2');
var consolidate = require('gulp-consolidate');
var config      = require('../../config');

//Sprite SVG
gulp.task('sprite:svg', function () {
	return gulp.src(config.src.icons + '/*.svg')
	.pipe(plumber({
		errorHandler: config.errorHandler
	}))
	.pipe(svgSprite({
		mode: {
			symbol: {
				dest: config.src.none,
				sprite: "sprite.svg",
				example: {
					dest: "symbols.html"
				}
			}
		}
	}))
	.pipe(cheerio({
		run: function($, file) {
			$('[fill]:not([fill="currentColor"])').removeAttr('fill');
			$('[stroke]').removeAttr('stroke');
		},
		parserOptions: { xmlMode: true }
	}))
	.pipe(gulp.dest(config.src.img + '/'));
});

/*  Переводим полученный SVG спрайт в строку,
 Чтобы иметь возможность подключить его прямо из документа
 ------------------------------------ */
 gulp.task('svg2string', function () {
 	gulp.src(config.src.img + '/sprite.svg')
	// Меняем формат в .js
	.pipe(concat('sprite-svg.js'))
		// Удаляем все переносы строк
		.pipe(replace("\n", ""))
		// Оборачиваем в переменную, которую потом запросим из HTML документа
		.pipe(inject.wrap('var SVG_SPRITE = [\'', '\'];'))
		// Перемещаем в общую директорию для .js файлов
		.pipe(gulp.dest(config.src.jsAssets))
	});

/*  Объединяем задачи в последовательность
------------------------------------ */
gulp.task('sprite:svg:build', function (cb) {
	runSequence(
		'sprite:svg',
		'svg2string',
		cb);
});

gulp.task('sprite:svg:watch', function() {
	gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
});