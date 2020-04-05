import * as logging from './src/common/loggingUtils';
import express from 'express';
import connectDB from './src/config/connectDB';
import configViewEngine from './src/config/viewEngine';

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

app.get('/', (req, res) => {
    return res.render("main/master");
});

app.get('/login-register', (req, res) => {
    return res.render("auth/loginRegister");
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});