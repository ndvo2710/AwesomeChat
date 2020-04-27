import connectFlash from 'connect-flash';
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as logging from './common/loggingUtils';
import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import configSession from './config/session';

const logger = logging.getLogger('MainApp');

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

app.listen(port, () => {
  logger.info(`Server is up on port ${port}`);
});
