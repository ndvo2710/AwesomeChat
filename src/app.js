import * as logging from './common/loggingUtils';
import express from 'express';
import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';

const logger = logging.getLogger('MainApp');

const app = express();
const port = process.env.PORT || 3000;
// body parser json
app.use(express.json());
// Setup log for app
app.use(logging.expressLogger);

// Connect to MongoDB
connectDB();

// Config view engine
configViewEngine(app);

// Init all routes
initRoutes(app);


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});