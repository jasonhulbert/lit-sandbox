const { config } = require('./base');

module.exports = {
    ...config,
    devtool: 'source-map',
    plugins: [
        ...config.plugins,
        // other plugins...
    ]
};