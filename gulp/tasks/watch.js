var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', [
    'copy:watch',

    'nunjucks:watch',
    'sprite:svg:watch',
    'sprite:png:watch',
    'svgo:watch',
    'list-pages:watch',
    // 'js:watch',
    'webpack:watch',
    'sass:watch'
]);
