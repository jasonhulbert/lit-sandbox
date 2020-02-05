const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const paths = {
    NODE_MODULES: resolve('./', 'node_modules'),
    SRC: resolve('./', 'src'),
    DIST: resolve('./', 'dist')
};

const componentEntries = {
    'blue-button': './components/blue-button/blue-button.ts',
    'blue-card': './components/blue-card/blue-card.ts'
};

module.exports = {
    paths,
    config: {
        mode: process.env.NODE_ENV || 'development',
        context: paths.SRC,
        entry: {
            ...componentEntries,
            'bundle': Object.values(componentEntries)
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv(),
                                cssnano()
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        output: {
            path: paths.DIST,
            filename: '[name].js'
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '-',
                cacheGroups: {
                    default: false,
                    vendors: {
                        name: 'vendors',
                        filename: 'vendors.js',
                        reuseExistingChunk: true,
                        test: /[\\/]node_modules[\\/]/
                    }
                }
            },
        },
        plugins: [
            new CopyWebpackPlugin([{
                from: `${paths.NODE_MODULES}/@webcomponents/webcomponentsjs/webcomponents-bundle.js`,
                to: `${paths.DIST}/polyfills/webcomponents-bundle.js`,
                toType: 'file'
            }])
        ]
    }
};