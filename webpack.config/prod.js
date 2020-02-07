const { config } = require('./base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    ...config,
    devtool: 'source-map',
    plugins: [
        ...config.plugins,
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.WEBPACK_ANALYZER === 'true' ? 'server' : 'disabled'
        })
    ]
};
