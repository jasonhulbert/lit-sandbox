const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, paths } = require('./base');

module.exports = {
    ...config,
    entry: {
        ...config.entry,
        'demo': './demo/blue-demo.ts'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: paths.DIST,
        hot: true,
    },
    plugins: [
        ...config.plugins,
        new HtmlWebpackPlugin({
            contentBase: `${paths.DIST}demo`,
            template: `${paths.SRC}/demo/index.html`,
            filename: 'demo/index.html',
            chunks: ['vendors', 'bundle']
        })
    ]
};