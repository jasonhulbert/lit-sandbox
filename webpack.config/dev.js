const { config, paths } = require('./base');

module.exports = {
    ...config,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: `${paths.DIST}/demo`,
        compress: true,
        open: true,
        openPage: 'demo',
        clientLogLevel: 'silent',
        writeToDisk: true
    },
    plugins: [...config.plugins /* ...dev plugins */]
};
