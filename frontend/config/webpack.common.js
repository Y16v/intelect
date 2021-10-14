const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const paths = require('./env');


module.exports = {
    entry: [
        paths.appIndexJs,
    ],
    output: {
        path: paths.dist,
        filename: "static/index.bundle.js",
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
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                loader: 'url-loader?limit=25000',
                query: {
                    limit: 25000,
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
                use: 'file-loader?name=static/fonts/[name].[ext]!static'
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                use:[
                    'file-loader?name=static/assets/sounds/[name].[ext]'
                ]
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
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    resolve: {
        extensions: ['*', ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json", "d.ts"]
    }

};
