var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'public';

var config = {
    env: 'development',
    production: production,

    src: {
        none: '',
        root: 'src',
        pagelist: 'src/index.yaml',
        componentss: 'src/components',
        templates: 'src/templates',
        templatesData: 'src/data',
        static: 'src/static',

        sass: 'src/sass',
        sassGen: 'src/sass/generated',

        js: 'src/js',

        files: 'src/files',
        img: 'src/files/img',
        video: 'src/files/video',
        svgo: 'src/files/svgo',
        icons: 'src/files/icons',
        iconsPng: 'src/files/icons/png',
        iconsSvg: 'src/files/icons/svg',
        fonts: 'src/files/fonts',

        libs: 'src/libs',
    },
    dest: {
        root: destPath,
        html: destPath,
        files: destPath + '/files',
        css: destPath + '/css',
        js: destPath + '/js',
        img: destPath + '/files/img',
        video: destPath + '/files/video',
        iconsSvg: destPath + '/files/icons/svg',
        iconsPng: destPath + '/files/icons/png',
        sprite: destPath + '/files/sprite',
        fonts: destPath + '/files/fonts',
        libs: destPath + '/libs',
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./gulp/util/handle-errors'),
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
