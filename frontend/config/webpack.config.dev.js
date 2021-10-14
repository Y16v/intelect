const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const paths = require('./env');


module.exports = {
    entry: [
        'react-hot-loader/patch',
        require.resolve('react-dev-utils/webpackHotDevClient'),
        require.resolve('react-error-overlay'),
        paths.appIndexJs,
    ],
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "static/index.bundle.js",
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"]
            },
            // Load images.
            {
                test: /\.(gif|jpe?g|png)$/,
                loader: 'url-loader?limit=25000',
                query: {
                    limit: 10000,
                    name: 'static/media/images/[name].[hash:8].[ext]'
                }
            },
            // jSon Loader
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader?name=fonts/[name].[ext]!static'
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtml
        }),
        new Dotenv({
            path: paths.dotenv,
            safe: false,
            silent: false
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new WatchMissingNodeModulesPlugin(path.resolve('node_modules')),
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000,
        contentBase: ['./src', './public', './dist'], // both src and output dirs
        inline: true,
        hot: true,
        compress: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8000',
                secure: false,
                changeOrigin: true,
            }
        },
        overlay: {
            errors: true,
            warnings: true
        },
        transportMode: "ws",
        watchOptions: {
            ignored: /node_modules/,
        },
        clientLogLevel: 'none'

    },
    resolve: {
        extensions: ['*', ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],

        plugins: [
            new ModuleScopePlugin(paths.appSrc),
        ],
        modules: [
            paths.appSrc,
            paths.nodeModules
        ]

    },
    devtool: 'source-maps',
    cache: false
};
