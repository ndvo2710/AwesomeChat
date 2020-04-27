import * as logging from '../src/common/loggingUtils';
import express from 'express';
import connectDB from '../src/config/connectDB';
import configSession from "../src/config/session";
import connectFlash from "connect-flash";


const logger = logging.getLogger('FlashTest');

const app = express();
const port = process.env.PORT || 3000;

app.use(logging.expressLogger);

connectDB();

configSession(app);

app.use(connectFlash());


app.get('/', (req, res) => {
    req.flash('message', 'This is a message from the "/" endpoint');
    res.redirect('/contact');
});

app.get('/contact', (req, res) => {
    res.send(req.flash('message'));$
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});