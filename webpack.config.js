const config = require('./config/config');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'development';

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = path.join(__dirname, config.src.templates);
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith('.html'));

function createConfig(env) {
    let isProduction, webpackConfig;

    if (env === undefined) {
        env = process.env.NODE_ENV;
    }

    isProduction = env === 'production';

    function addHash(template, hash) {
        return NODE_ENV == 'production'
            ? template.replace(/\.[^.]+$/, `.[${hash}]$&`)
            : template;
    }

    webpackConfig = {
        mode: isProduction ? 'production' : 'development',
        context: path.join(__dirname, config.src.js),

        entry: {
            // vendor: ['jquery'],
            app: './app.js',
        },

        output: {
            path: path.join(__dirname, config.dest.js),
            filename: '[name].js',
            publicPath: config.dest.js + '/',
            // filename: addHash('[name].js', 'chunkhash'),
            // library: '[name]',
            // libraryTarget: 'umd',   // Important
            // umdNamedDefine: true   // Important
        },

        devtool: isProduction ? false : '#cheap-module-eval-source-map',

        // optimization: {
        //     // runtimeChunk: true,
        //     splitChunks: {
        //         cacheGroups: {
        //             vendors: {
        //                 test: /[\\/]node_modules[\\/]((?!vue).*)[\\/]/,
        //                 name: 'vendors',
        //                 chunks: 'all'
        //             },
        //             common: {
        //                 test: /\.js$/,
        //                 name: 'common',
        //                 chunks: 'all',
        //                 minChunks: 2,
        //                 minSize: 0
        //             }
        //         }
        //     }
        // },

        resolve: {
            alias: {
                '@': path.join(__dirname, config.src.root),
                vue$: 'vue/dist/vue.esm.js',
                jquery: path.resolve(__dirname, 'node_modules/jquery'),
                inherits: path.resolve(__dirname, 'node_modules/inherits'),
                TweenLite: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TweenLite.js'
                ),
                TweenMax: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TweenMax.js'
                ),
                TimelineLite: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TimelineLite.js'
                ),
                TimelineMax: path.resolve(
                    'node_modules',
                    'gsap/src/uncompressed/TimelineMax.js'
                ),
                ScrollMagic: path.resolve(
                    'node_modules',
                    'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
                ),
                'animation.gsap': path.resolve(
                    'node_modules',
                    'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
                ),
                'debug.addIndicators': path.resolve(
                    'node_modules',
                    'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
                ),
            },
            extensions: ['*', '.js', '.vue', '.json'],
        },

        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        cache: true,
                        ignorePattern: __dirname + '/src/js/_lib/',
                    },
                    exclude: [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'src/js/_lib/'),
                    ],
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: [
                        path.resolve(__dirname, 'node_modules'),
                        path.resolve(__dirname, 'src/js/_lib/'),
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loader: {
                            scss: 'vue-style-loader!css-loader!sass-loader',
                        },
                    },
                },
                // {
                //     test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name].[ext]'
                //     }
                // },
                // {
                //     test: /\.(png|jpg|gif|svg)$/,
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name].[ext]'
                //     }
                // },
                {
                    test: /\.scss$/,
                    use: [
                        // 'style-loader',
                        // MiniCssExtractPlugin.loader,
                        // 'vue-style-loader',
                        // 'css-loader',
                        // 'sass-loader'
                        {
                            loader: 'vue-style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: { path: './postcss.config.js' },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: { path: './postcss.config.js' },
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new UnusedFilesWebpackPlugin(),
            new DuplicatePackageCheckerPlugin(),
            new VueLoaderPlugin(),

            new webpack.LoaderOptionsPlugin({
                options: {
                    eslint: {
                        formatter: require('eslint-formatter-pretty'),
                    },
                },
            }),

            // new MiniCssExtractPlugin({
            //     // filename: `${PATHS.assets}css/app.[hash].css`
            //     filename: config.dest.css + '[name].css'
            // }),

            // Automatic creation any html pages (Don't forget to RERUN dev server)
            // ...PAGES.map(page => new HtmlWebpackPlugin({
            //     template: `${PAGES_DIR}/${page}`,
            //     filename: `./${page}`,
            //     // inject: false
            // })),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            }),

            new webpack.ContextReplacementPlugin(
                /moment[/\\]locale$/,
                /ru|en-gb/
            ),

            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(env),
                LANG: JSON.stringify('ru'),
            }),

            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 4000,
                openAnalyzer: false,
            }),

            new webpack.HashedModuleIdsPlugin({
                hashFunction: 'md4',
                hashDigest: 'base64',
                hashDigestLength: 8,
            }),
        ],

        devServer: {
            port: 8080,
            overlay: true,
            // inline: true,
            // hot: true
        },
    };

    if (isProduction) {
        webpackConfig.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
            })
        );
    } else {
        webpackConfig.plugins
            .push
            // new webpack.HotModuleReplacementPlugin(),

            // new webpack.SourceMapDevToolPlugin({
            //     filename: '[file].map'
            // })
            ();
    }

    return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
