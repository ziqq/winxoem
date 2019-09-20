const config = require('../../config');
const gulp = require('gulp');
const server = require('browser-sync').create();
const util = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../../webpack.config').createConfig;

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task('server', function() {
    server.init({
        server: {
            baseDir: !config.production
                ? [config.dest.root, config.src.root]
                : config.dest.root,
            directory: false,
            serveStaticOptions: {
                extensions: ['html'],
            },
        },
        browser: 'default',
        files: [
            config.dest.html + '/*.html',
            config.dest.css + '/**/*.css',
            config.dest.js + '/**/*.js',
        ],
        ui: false,
        ghostMode: true,
        port: util.env.port || 8080,
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: Boolean(util.env.open),
        notify: false,
        online: Boolean(util.env.tunnel),
        tunnel: util.env.tunnel || null,
    });
});

gulp.task('webpack-dev-server', function(callback) {
    // Start a webpack-dev-server
    const compiler = webpack(webpackConfig(config.env));

    new WebpackDevServer(compiler, {
        publicPath: '/' + config.dest.root,
        stats: {
            colors: true,
        },
        contentBase: 'public/',
    }).listen(8080, 'localhost', function(err) {
        if (err) throw new util.PluginError('webpack-dev-server', err);
        util.log(
            '[webpack-dev-server]',
            'http://localhost:8080/webpack-dev-server/index.html'
        );
    });
});

// gulp.task('server', function() {
//     server({
//         proxy: 'https://www.samesite.com',
//         files: [config.dest.css + '*.css'],
//         middleware: require('serve-static')('./build'),
//         rewriteRules: [
//             {
//                 match: new RegExp('</head>'),
//                 fn: function() {
//                     return '<script async src="/browser-sync/browser-sync-client.js?v=2.18.13"></script>' +
//                         '<link rel="stylesheet" href="/css/main.css" media="all"></script></head >'
//                 }
//             }
//         ],
//         port: 8080,
//         open: true
//     });
// });

module.exports = server;
