import mongoose from 'mongoose';
import bluebird from 'bluebird';
import * as logging from '../utils/loggingUtils';
import { MONGODB_PW } from '../utils/secrets';

const logger = logging.getLogger('connectDB');

/**
 * Connect to MongoDB
 */
const connectDB = () => {
  mongoose.Promise = bluebird;
  const URI = `mongodb+srv://devndvo:${MONGODB_PW}@cluster0-wfmeb.mongodb.net/test?retryWrites=true&w=majority`;
  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((_) => logger.info('Already connected to MongoDB Atlas!'))
    .catch((e) => {
      logger.debug('Failed to establish connection to MongoDB Atlas!');
      throw new Error(e);
    });
};

module.exports = connectDB;
