// var gulp        = require('gulp');
// var plumber     = require('gulp-plumber');
// var spritesmith = require('gulp.spritesmith');
// var buffer      = require('vinyl-buffer');
// var imagemin    = require('gulp-imagemin');
// var glob        = require('glob').Glob;
// var merge       = require('merge-stream');
// var config      = require('../../config');

// gulp.task('sprite:png:all', function() {
//   var tmp = new glob(config.src.iconsPng + '/**/*.png', {}, function(err, matches) {
//     var dirnames = [];          // имена каталогов с картинками для спрайтов
//     var files = [];             // массив с данными для spritesmith
//     var destination = [];     // каталоги назначения
//     for(var i = 0; i < matches.length; i++) {
//         var itemPath = matches[i].split('/');
//         dirnames.push(itemPath[itemPath.length - 2]);
//         itemPath[0] = 'app';
//         itemPath.length = 4;
//         destination.push(itemPath.join('/'));
//     }
//     dirnames = Array.from(new Set(dirnames));
//     destination = Array.from(new Set(destination));
//     for(var i = 0; i < dirnames.length; i++) {
//         files[i] = {};
//         files[i].data = [];
//         files[i].filename = dirnames[i];
//         for(var j = 0; j < matches.length; j++) {
//             if(matches[j].indexOf(dirnames[i]) != -1) {
//                 files[i].data.push(matches[j]);
//             }
//         }
//     }
//     for(var i = 0; i < files.length; i++) {
//         files[i].destImg ='';
//         for(var j = 0; j < destination.length; j++ ) {
//             var str = destination[j].split('/');
//             if(files[i].data[0].indexOf(str[2]) != -1) {
//                 files[i].destImg = destination[j];
//             }
//         }
//     }
//     files.forEach(function(item, i, arr){
//        var spriteData = gulp.src(arr[i].data)
//        .pipe(spritesmith({
//         imgName: arr[i].filename + '.png',
//         cssName: '_' + arr[i].filename + '.scss',
//         imgPath: '../img/sprite/' + arr[i].filename + '.png',
//         padding: 10,
//         algorithm: 'top-down',
//         cssTemplate: __dirname + '/sprite.template.mustache_scss.mustache'
//     }));
//        var stylStream = spriteData.css
//        .pipe(gulp.dest(config.src.sassGen + '/spritePng/'));

//        var imgStream = spriteData.img
//        .pipe(gulp.dest(config.dest.sprite + '/'))

//        return merge (imgStream, stylStream); 
//    });
// });
// });         

// gulp.task('sprite:png:watch', function() {
//    gulp.watch(config.src.iconsPng + '/*.png', ['sprite:png']);
// });