'use strict';
const webpack = require('webpack');
const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();
// const Dotenv = require('dotenv-webpack');

const config = {
    context: path.resolve(CURRENT_WORKING_DIR, 'src'),
    entry: './app.js',
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, 'public'),
        filename: 'client.bundle.js',
        publicPath: '/public/'
    },
    devServer: {
        port: 8001,
        historyApiFallback: true
    },
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
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
              'API_URL': JSON.stringify('http://localhost:8000')
            }
          })
    ]
};

module.exports = config;
