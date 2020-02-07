const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

const paths = {
    NODE_MODULES: resolve('./', 'node_modules'),
    SRC: resolve('./', 'src'),
    DIST: resolve('./', 'dist')
};

const componentEntries = {
    'blue-button': './components/blue-button/blue-button.ts',
    'blue-card': './components/blue-card/blue-card.ts'
};

const demoEntries = {
    'demo-frame': './demo/blue-demo-frame.ts',
    'demo-nav': './demo/blue-demo-nav.ts',
    demo: './demo/blue-demo.ts'
};

module.exports = {
    paths,
    config: {
        mode,
        context: paths.SRC,
        entry: {
            ...componentEntries,
            demo: Object.values(demoEntries),
            bundle: Object.values(componentEntries)
        },
        resolve: { extensions: ['.ts', '.js', '.json'] },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {}
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: !!(mode === 'development')
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                sourceMap: !!(mode === 'development'),
                                plugins: () => [require('postcss-preset-env')(), require('cssnano')()]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('dart-sass'),
                                sourceMap: !!(mode === 'development')
                            }
                        }
                    ]
                }
            ]
        },
        output: {
            path: paths.DIST,
            chunkFilename: '[name].js',
            filename: chunkData => {
                let filename = '[name].js';
                if (/^demo$/.test(chunkData.chunk.name)) filename = 'demo/[name].js';
                return filename;
            }
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
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${paths.SRC}/demo/index.html`,
                filename: 'demo/index.html',
                chunks: ['vendors', 'bundle', 'demo']
            }),
            new HtmlWebpackPlugin({
                template: `${paths.SRC}/demo/index.demo.html`,
                filename: 'demo/index.demo.html',
                chunks: ['vendors', 'bundle']
            }),
            new CopyWebpackPlugin([
                {
                    from: `${paths.NODE_MODULES}/@webcomponents/webcomponentsjs/webcomponents-bundle.*`,
                    to: `${paths.DIST}/polyfills/[name].[ext]`,
                    toType: 'template'
                }
            ])
        ]
    }
};
