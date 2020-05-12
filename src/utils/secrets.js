import dotenv from 'dotenv';
import * as logging from './loggingUtils';

const logger = logging.getLogger('secrets');

dotenv.config();

export const {
  MONGODB_PW,
  TWILIO_API_KEY,
  ADMIN_EMAIL,
  TEST_EMAIL,
  // Facebook configuration variables
  FB_APP_ID,
  FB_APP_SECRET,
  FB_CALLBACK_URL,
  // Google configuration variables
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  GOOGLE_CALLBACK_URL,
} = process.env;
