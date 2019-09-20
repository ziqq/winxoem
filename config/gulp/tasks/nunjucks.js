const config = require('../../config');
const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const prettify = require('gulp-prettify');
const frontMatter = require('gulp-front-matter');

function renderHtml(onlyChanged) {
    nunjucksRender.nunjucks.configure({
        watch: false,
        trimBlocks: true,
        lstripBlocks: false,
    });

    return gulp
        .src([config.src.templates + '/**/[^_]*.html'])
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(
            nunjucksRender({
                PRODUCTION: config.production,
                path: [
                    config.src.templates + '/',
                    config.src.componentss + '/',
                ],
            })
        )
        .pipe(
            prettify({
                indent_size: 2,
                wrap_attributes: 'auto', // 'force'
                preserve_newlines: false,
                // unformatted: [],
                end_with_newline: true,
            })
        )
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('nunjucks', function() {
    return renderHtml();
});

gulp.task('nunjucks:changed', function() {
    return renderHtml(true);
});

gulp.task('nunjucks:watch', function() {
    gulp.watch(
        [
            config.src.templates + '/**/*.html',
            '!' + config.src.templates + '/**/_*.html',
            '!' + config.src.templates + '/ajax/**/*.html',
        ],
        ['nunjucks:changed']
    );

    gulp.watch(
        [
            config.src.templates + '/**/_*.html',
            config.src.templates + '/ajax/**/*.html',
        ],
        ['nunjucks']
    );
});
