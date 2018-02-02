import express from 'express';
import path from 'path';
import helmet from 'helmet';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack/webpack.config.dev';

var app = express();

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

var rootPath = path.normalize(__dirname);
const directory = {
    root: rootPath,
    distDir: rootPath + '/dist',
    assetsDir: rootPath + '/public'
};
app.use('/dist', express.static(directory.distDir));
app.use(helmet());
app.use(express.static(directory.assetsDir));

// Landing page
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(8001, (error) => {
    if (error) {
        console.log(`Error in server startup`, error);
        process.exit(1);
    }

    console.log(`Server started at 8001`);
});