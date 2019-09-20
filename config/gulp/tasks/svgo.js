const config = require('../../config');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');

gulp.task('svgo', function() {
    return gulp
        .src(config.src.svgo + '/**/*.svg')
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(changed(config.dest.iconsSvg + '/'))
        .pipe(
            svgmin({
                js2svg: { pretty: true },
                plugins: [
                    { removeDesc: true },
                    { cleanupIDs: true },
                    { mergePaths: false },
                ],
            })
        )
        .pipe(gulp.dest(config.dest.iconsSvg + '/'));
});

gulp.task('svgo:watch', function() {
    gulp.watch(config.src.svgo + '/**/*.svg', ['svgo']);
});
