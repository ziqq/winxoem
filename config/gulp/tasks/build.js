var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../../config');

function build(cb) {
    runSequence(
        'clean',
        'sprite:png',
        'sprite:svg',
        'svgo',
        'sass',
        'nunjucks',
        // 'js:all',
        'webpack',
        'copy',
        // 'list-pages',
        cb
    );
}

function buildDev(cb) {
    runSequence(
        'clean',
        'sprite:png',
        'sprite:svg',
        'svgo',
        'sass',
        'nunjucks',
        // 'js:build',
        'webpack',
        'copy',
        // 'list-pages',
        cb
    );
}

gulp.task('build', function(cb) {
    config.setEnv('production');
    config.logEnv();
    buildDev(cb);
});

gulp.task('build:dev', function(cb) {
    config.setEnv('development');
    config.logEnv();
    build(cb);
});
