import * as logging from '../common/loggingUtils';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';

dotenv.config();

const logger = logging.getLogger('connectDB');

const dbAtlasPW = process.env.MONGODB_PW;

/**
 * Connect to MongoDB
 */
let connectDB = () => {
    mongoose.Promise = bluebird;
    let URI = `mongodb+srv://devndvo:${dbAtlasPW}@cluster0-wfmeb.mongodb.net/test?retryWrites=true&w=majority`;
    mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(_ => logger.info('Already connected to MongoDB Atlas!'))
        .catch(e => {
            logger.debug('Failed to establish connection to MongoDB Atlas!');
            throw new Error(e);
        })
};

module.exports = connectDB;