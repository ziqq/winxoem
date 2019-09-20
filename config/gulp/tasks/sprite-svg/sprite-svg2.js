var config = require('../../../config');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var svgSprite = require('gulp-svg-sprite');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var inject = require('gulp-inject-string');
var svgmin = require('gulp-svgmin');
var changed = require('gulp-changed');
var cheerio = require('gulp-cheerio');
var runSequence = require('run-sequence');

//Sprite SVG
gulp.task('sprite:svg', function () {
    return (
        gulp
            .src(config.src.iconsSvg + '/*.svg')
            //.pipe(svgmin())
            .pipe(
                svgmin({
                    js2svg: {
                        pretty: true,
                    },
                    plugins: [
                        {
                            removeDoctype: true,
                            removeComments: true,

                            cleanupNumericValues: {
                                floatPrecision: 2,
                            },
                            convertColors: {
                                names2hex: false,
                                rgb2hex: false,
                            },
                            cleanupIDs: {
                                prefix: false,
                                minify: true,
                            },
                        },
                    ],
                })
            )
            // .pipe(
            //     cheerio({
            //         run: function($) {
            //             $('[fill]').removeAttr('fill');
            //             $('[style]').removeAttr('style');
            //         },
            //         parserOptions: { xmlMode: true },
            //     }),
            // )
            // .pipe(replace('&gt;', '>'))
            .pipe(
                svgSprite({
                    mode: {
                        symbol: {
                            dest: config.src.none,
                            sprite: 'sprite.svg',
                            example: {
                                dest: 'symbols.html',
                            },
                        },
                    },
                })
            )
            .pipe(
                plumber({
                    errorHandler: config.errorHandler,
                })
            )
            .pipe(gulp.dest(config.dest.files + '/'))
    );
});

/*  Переводим полученный SVG спрайт в строку,
 Чтобы иметь возможность подключить его прямо из документа
 ------------------------------------ */
gulp.task('svg2string', function () {
    gulp.src(config.src.img + '/sprite.svg')
        // Меняем формат в .js
        .pipe(concat('svg-sprite.js'))
        // Удаляем все переносы строк
        .pipe(replace('\n', ''))
        // Оборачиваем в переменную, которую потом запросим из HTML документа
        .pipe(inject.wrap("var SVG_SPRITE = ['", "'];"))
        // Перемещаем в общую директорию для .js файлов
        .pipe(gulp.dest(config.src.js + '/_lib'));
});

/*  Объединяем задачи в последовательность
 ------------------------------------ */
gulp.task('sprite:svg:build', function (cb) {
    runSequence('svg2string', 'sprite:svg', cb);
});

gulp.task('sprite:svg:watch', function () {
    gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
});
