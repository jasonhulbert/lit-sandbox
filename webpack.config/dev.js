const HtmlWebpackPlugin = require('html-webpack-plugin');
const { config, paths } = require('./base');

module.exports = {
    ...config,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: paths.DIST,
        hot: true,
    },
    plugins: [
        ...config.plugins,
        new HtmlWebpackPlugin({
            template: `${paths.SRC}/demo/index.html`,
            filename: 'index.html',
            chunks: ['vendors', 'bundle']
        })
    ]
};