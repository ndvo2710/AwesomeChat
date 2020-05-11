import sgMail from '@sendgrid/mail';
import { TWILIO_API_KEY, ADMIN_EMAIL } from '../utils/secrets';

sgMail.setApiKey(TWILIO_API_KEY);

const sendMail = (to, subject, htmlContent) => {
  const msg = {
    to,
    from: ADMIN_EMAIL,
    subject,
    html: htmlContent,
  };
  return sgMail.send(msg); // This default return a promise
};

module.exports = sendMail;
