import dotenv from 'dotenv';
import * as logging from './loggingUtils';

const logger = logging.getLogger('secrets');

dotenv.config();

if (process.env.DOTENV !== 'env') {
  logger.error('Env is not loaded properly');
  process.exit(1);
}

export const { MONGODB_PW } = process.env;
export const { TWILIO_API_KEY } = process.env;
export const { ADMIN_EMAIL } = process.env;
export const { TEST_EMAIL } = process.env;

// Facebook configuration variables
export const { FB_APP_ID } = process.env;
export const { FB_APP_SECRET } = process.env;
export const { FB_CALLBACK_URL } = process.env;
