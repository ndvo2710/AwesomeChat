import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.TWILIO_API_KEY);

const sendMail = (to, subject, htmlContent) => {
  const msg = {
    to,
    from: process.env.ADMIN_EMAIL,
    subject,
    html: htmlContent,
  };
  return sgMail.send(msg); // This default return a promise
};

module.exports = sendMail;
