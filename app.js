import * as logging from './src/common/loggingUtils';
import express from 'express';
import connectDB from './src/config/connectDB';
import ContactModel from './src/models/contact.model';

const logger = logging.getLogger('MainApp');

const app = express();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 3000;

// body parser json
app.use(express.json());

// Setup log for app
app.use(logging.expressLogger);

app.get('/test-database', (req, res) => {
    try {
        const item = {
            userId: '418443231',
            contactId: '59289484343524859425'
        };
        const contact = ContactModel.createNew(item);
        res.send(contact);
    } catch (e) {
        logger.debug(e);
    }
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});