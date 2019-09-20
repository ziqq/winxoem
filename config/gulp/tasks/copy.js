const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const runSequence = require('run-sequence');
const config = require('../../config');

gulp.task('copy:rootfiles', function() {
    return gulp
        .src([config.src.root + '/*.*', config.src.static + '/**/*'])
        .pipe(gulp.dest(config.dest.root));
});

// gulp.task('copy:libs', function() {
//     return gulp
//         .src(config.src.libs + '/**/*.*')
//         .pipe(gulp.dest(config.dest.libs));
// });

gulp.task('copy:files', function() {
    return gulp
        .src([
            config.src.files + '/**/*.*',
            config.src.video + '/**/*.*',
            '!' + config.src.img + '/**/*.*',
            '!' + config.src.svgo + '/**/*.*',
            '!' + config.src.icons + '/**/*.*',
        ])
        .pipe(gulp.dest(config.dest.files));
});

gulp.task('copy:img', function() {
    return gulp
        .src(config.src.img + '/**/*.*')
        .pipe(newer(config.src.img + '/**/*.*'))
        .pipe(gulp.dest(config.dest.files + '/img'));
});

gulp.task('copy:img:production', function() {
    return gulp
        .src([
            config.src.img + '/**/*.*',
            '!' + config.src.img + '/svgo/**/*.*',
        ])
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng(),
                    imagemin.svgo([
                        { removeViewBox: false },
                        { minifyStyles: false },
                    ]),
                ],
                {
                    optimizationLevel: 3,
                }
            )
        )
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', function(cp) {
    runSequence(
        // 'copy:fonts',
        // 'copy:libs',
        'copy:rootfiles',
        'copy:files',
        'copy:img',
        cp
    );
});

gulp.task('copy:production', function(cp) {
    runSequence(
        // 'copy:fonts',
        // 'copy:libs',
        'copy:rootfiles',
        'copy:files',
        'copy:img:production',
        cp
    );
});

gulp.task('copy:watch', function() {
    gulp.watch(config.src.img + '/**/*.*', ['copy:img']);
    gulp.watch(config.src.files + '/**/*.*', ['copy:files']);
});

// gulp.task('copy:fonts', function() {
//     return gulp
//         .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
//         .pipe(gulp.dest(config.dest.fonts));
// });
