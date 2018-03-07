var gulp         = require('gulp');
var rsync        = require('gulp-rsync');
var config       = require('../config');

gulp.task('deploy', function() {
	return gulp.src(config.dest.root )
	.pipe(rsync({
		root: config.dest.root,
		hostname: 'antonuvd@win-x-oem.ru',
		destination: 'win-x-oem.ru/public_html/',
		// include: ['*.htaccess'], // Скрытые файлы, которые необходимо включить в деплой
		exclude: ['bom.php, /data, '], // Скрытые файлы, которые необходимо включить в деплой
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
});