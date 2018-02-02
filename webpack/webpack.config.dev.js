'use strict';
const webpack = require('webpack');
const path = require('path');


const CURRENT_WORKING_DIR = process.cwd();

const config = {
    context: path.resolve(CURRENT_WORKING_DIR, 'src'),
    entry: {
        app: [
            'babel-polyfill',
            'webpack-hot-middleware/client', // bundle the client for hot reloading
            'react-hot-loader/patch',   // activate HMR for React
            './app.js'  // the entry point of app
        ]
    },
    output: {
        path: path.resolve(CURRENT_WORKING_DIR, 'dist'), //  destination
        filename: 'client.bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(),  // do not emit compiled assets that include errors
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
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
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
    devtool: "source-map"
};

module.exports = config;
