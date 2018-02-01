import Express from 'express';
// import { Session } from 'express-session';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import morgan from 'morgan';
import lodash from 'lodash'
// var sanitizeMW = require('mongo-sanitize');

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ccavReqHandler from './paymentgateway/ccavRequestHandler';
import ccavResHandler from './paymentgateway/ccavResponseHandler';

var formidable = require('formidable');
var fs = require('fs');
// Initialize the Express App
const app = new Express({ strict: true });
/*app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);*/

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import login from './routes/login.routes';
import adminRoute from './routes/admin.routes';
import logRoute from './routes/logger.routes';
import apiRoute from './routes/api.routes';
import { authCheck } from './controllers/login.controller.js';
import defaultUser from './defaultUser.js';
import serverConfig from './config';
import fileUploadRoute from './routes/fileupload.routes';
import paymentRoute from './routes/payment.routes';
import paymentEmailRoute from './routes/payment.routes';
import userDashboardRoute from './routes/userDashboard.routes';
import schedule from './routes/schedule.routes';
import contacts from './routes/contacts.routes';
import reports from './routes/reports.routes';
import registration from './routes/registration.routes';
import fullCalendar from './routes/calendar.routes';

import {confRoute, confGeneral} from './routes/conf.routes';
import { mediaFileUplaod } from './controllers/fileupload.controller';
 
import scormRoute from './routes/scorm.routes';

var tokens = require('csrf-tokens')()
var cookieParser = require('cookie-parser')

// Set native promises as mongoose promise
// mongoose.Promise = global.Promise;

// Use bluebird
mongoose.Promise = require('bluebird');

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  // dummyData();
  defaultUser()
});

var secret = tokens.secretSync()

// Apply body Parser and server public assets and routes
app.use(compression());
// app.use(sanitizeMW);
app.use(Express.static(path.resolve(__dirname, '../dist')));
app.use(Express.static(path.resolve(__dirname, '../public')));
app.use("/uploads", Express.static(process.env.PWD + '/uploads'));

// app.use(morgan('dev'));
//Chnaged by Rajesh Goriga For setting the bodyParser limit 
app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next){
  var token = req.headers['csrf']
  if(!token && lodash.isEmpty(req.body))
  {
    next();
    return;
  }

  var isValid = tokens.verify(secret, token)
  if(!isValid){
    res.status(403)
    res.send('invalid token')
    return; 
  }

  next();
})

app.use('/', function(req, res, next){
    var token = tokens.create(secret)
    // console.log("token", token)
    res.cookie("csrf",token)
    next();
})


// app.post('/logAnalytics', function(req, res){
//   // post(AdminController.saveLog)
// });
app.post('/ccavRequestHandler', function (request, response){
  // console.log("in ccacvReqyestHandler");
  ccavReqHandler.postReq(request, response,function(error){
    if(error) {
      console.log("errror in postReq");
    }
  });
});


app.post('/ccavResponseHandler', function (request, response){
        ccavResHandler.postRes(request, response);
});
app.post('/payment',bodyParser.json({}),bodyParser.urlencoded({extended: true}),paymentRoute);
app.post('/paymentEmailValidation',bodyParser.json({}),bodyParser.urlencoded({extended: true}),paymentEmailRoute);
app.post('/saveuser',bodyParser.json({}),bodyParser.urlencoded({extended: true}),adminRoute);
app.post('/savepackage',bodyParser.json({}),bodyParser.urlencoded({extended: true}),adminRoute);
app.post('/saveroom',bodyParser.json({}),bodyParser.urlencoded({extended: true}),adminRoute);
app.post('/savecorporate',bodyParser.json({}),bodyParser.urlencoded({extended: true}),adminRoute);
app.post('/initialpurchase', bodyParser.json({}), bodyParser.urlencoded({extended : true}),apiRoute);

// app.get('/conf/:rid', bodyParser.json({}),bodyParser.urlencoded({extended: true}), confRoute);

//app.post('/fetchToken', bodyParser.json({}), bodyParser.urlencoded({extended: true}), confRoute /*function(req, res) { console.log(req.body); }*/);
app.post('/mediafileupload/:topicId/:roomId/:token', mediaFileUplaod);

app.use('/api',bodyParser.json({ limit: '200mb' }), [login, adminRoute, fileUploadRoute, userDashboardRoute, confRoute, scormRoute, schedule, contacts, registration, logRoute, fullCalendar,reports, scormRoute]);

// Render Initial HTML
const renderFullPage = (html, initialState) => {
const head = Helmet.rewind();

// Import Manifests
const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel='stylesheet' href='/css/font-awesome/css/font-awesome.min.css'/>
        <link rel='stylesheet' href='/css/bootstrap.min.css'>
        <link rel="stylesheet" href="/css/animate.min.css">
        <link rel="stylesheet" href="/css/toastr.min.css">
        <link rel="stylesheet" href="/css/global.css">
        <link rel="stylesheet" href="/css/image-slide.css">
        <link rel="stylesheet" href="/css/react-calendar.css">
        <link rel="stylesheet" href="/css/bootstrap-datetimepicker.css">

        <script src="/js/alertify.min.js"></script>
        
        <script src="/js/adapter.js"></script>
        <script src="/js/socket.io.js"></script>
        <script src="/js/woogeen.sdk.js"></script>
        <script src="/js/woogeen.sdk.ui.js"></script>
        <script src="/js/sc.websocket.js"></script>
        
        <script src="/js/quill.js" type="text/javascript"></script>
        <script src="/js/katex.min.js" type="text/javascript"></script>
        <script src="/js/fabric.js" type="text/javascript"></script>
        <script src="/js/offline.min.js" type="text/javascript"></script>
        
        <link rel="stylesheet" href="/css/alertify.min.css" />
        <link rel="stylesheet" href="/css/default.min.css" />
        <link href="/css/quill.snow.css" rel="stylesheet">
        <link rel="stylesheet" href="/css/katex.min.css">
        <link href="/css/quill.bubble.css" rel="stylesheet">

        <link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/jckdbnkecmmpemaghimijhehobdeplmd" />

        <link rel='stylesheet' href='/fullcalendar-3.4.0/fullcalendar.css' />
        <script src='/fullcalendar-3.4.0/lib/jquery.min.js'></script>
        <script src='/fullcalendar-3.4.0/lib/moment.min.js'></script>
        <script src='/fullcalendar-3.4.0/fullcalendar.js'></script>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script> 

      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

const renderNotFound = err => {
    const head = Helmet.rewind();
    const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);


     return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
        <link rel='stylesheet' href='/css/font-awesome/css/font-awesome.min.css'/>
        <link rel='stylesheet' href='/css/bootstrap.min.css'>
        <link rel="stylesheet" href="/css/animate.min.css">
        <link rel="stylesheet" href="/css/toastr.min.css">
        <link rel="stylesheet" href="/css/global.css">
        <link rel="stylesheet" href="/css/react-calendar.css">
        <link rel="stylesheet" href="/css/bootstrap-datetimepicker.css">
        <script src="/js/alertify.min.js"></script>
        <link rel="stylesheet" href="/css/alertify.min.css" />
        <link rel="stylesheet" href="/css/default.min.css" />
        
        
      </head>
      <body>
        
        
        <div>
        <h1> 404.. Not found </h1>
        </div>
      </body>
    </html>
  `;
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res,next) => {
  if(req.url == '/make-payment'){
    return next();
  }
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.log("Errrrrr--------");
      console.log(err);
      return res.status(500).end(renderError(err));
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }  else if (!renderProps) {
       renderProps = "";
      res.status(404).end(renderNotFound(err));
    } else {
      const store = configureStore();
     return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <IntlWrapper>
              <RouterContext {...renderProps} />
            </IntlWrapper>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
    }

    
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;


/*<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'/>
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1">        
*/