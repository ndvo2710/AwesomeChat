import * as logging from './common/loggingUtils';
import express from 'express';
import connectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from "body-parser";

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

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));


// Init all routes
initRoutes(app);


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});