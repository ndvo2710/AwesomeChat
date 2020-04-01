
import * as logging from './src/common/loggingUtils';
import express from 'express';
const logger = logging.getLogger('MainApp');

const app = express();
const port = process.env.PORT || 3000;

// body parser json
app.use(express.json());

// Setup log for app
app.use(logging.expressLogger);

app.get('/helloworld', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});