'use strict';
const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV;
const Dotenv = require('dotenv-webpack');

const CURRENT_WORKING_DIR = process.cwd();

var config = {
    context: path.resolve(CURRENT_WORKING_DIR, 'src'),
    entry: './app.js',
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, 'public'),
        filename: 'client.bundle.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
            'process.env.API_URL': JSON.stringify('https://gppcore.instavc.com')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //check for all js files
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' }, // creates style nodes from JS strings
                    { loader: 'css-loader' }, // translates CSS into CommonJS
                    { loader: 'sass-loader' }, // compiles Sass to CSS
                ]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' },
                { loader: 'css-loader' }]
            },
            {
                test: /\.(woff2?|ttf|eot|svg|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    devtool: "hidden-source-map"
};

module.exports = config;