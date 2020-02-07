const { config, paths } = require('./base');

module.exports = {
    ...config,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        clientLogLevel: 'silent',
        contentBase: `${paths.DIST}/demo`,
        compress: true,
        open: true,
        openPage: 'demo',
        overlay: true,
        writeToDisk: true
    },
    plugins: [...config.plugins /* ...dev plugins */]
};
