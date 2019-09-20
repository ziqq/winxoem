var gulp = require('gulp');

gulp.task('watch', [
    'copy:watch',
    // 'sprite:png:watch',
    'sprite:svg:watch',
    'webpack:watch',
    'nunjucks:watch',
    // 'js:watch',
    'list-pages:watch',
    'sass:watch'
]);
