import connectFlash from 'connect-flash';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import pem from 'pem';
import https from 'https';
import * as logging from './utils/loggingUtils';
import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import configSession from './config/session';

const logger = logging.getLogger('MainApp');

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
  if (err) {
    throw err;
  }

  // Init App
  const app = express();
  const port = process.env.PORT || 3000;

  // Setup log for app
  app.use(logging.expressLogger);

  // Connect to MongoDB
  connectDB();

  // Config Session
  configSession(app);

  // Config view engine
  configViewEngine(app);

  // Enable post data for request
  app.use(bodyParser.urlencoded({ extended: true }));

  // Enable flash messages
  app.use(connectFlash());

  // Config passport js
  app.use(passport.initialize());
  app.use(passport.session());

  // Init all routes
  initRoutes(app);

  https
    .createServer({ key: keys.serviceKey, cert: keys.certificate }, app)
    .listen(port, () => {
      logger.info(`Server is up on port ${port}`);
    });
});

// // Init App
// const app = express();
// const port = process.env.PORT || 3000;
//
// // Setup log for app
// app.use(logging.expressLogger);
//
// // Connect to MongoDB
// connectDB();
//
// // Config Session
// configSession(app);
//
// // Config view engine
// configViewEngine(app);
//
// // Enable post data for request
// app.use(bodyParser.urlencoded({ extended: true }));
//
// // Enable flash messages
// app.use(connectFlash());
//
// // Config passport js
// app.use(passport.initialize());
// app.use(passport.session());
//
// // Init all routes
// initRoutes(app);
//
// app.listen(port, () => {
//   logger.info(`Server is up on port ${port}`);
// });
