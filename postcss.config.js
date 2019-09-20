//npm i postcss-loader autoprefixer css-mqpacker cssnano -D

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('css-mqpacker'),
        require('cssnano')({
            preset: [
                'default',
                {
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        }),
    ],
};
