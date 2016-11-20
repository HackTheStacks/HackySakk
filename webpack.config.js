module.exports = {
    entry: {
        'app': './src/app/js/src/app.js',
        'test': './src/app/js/src/test.js'
    },
    output: {
        path: './src/app/js/dist',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ],
    }
};