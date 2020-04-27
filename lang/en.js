import fs from 'fs';
import path from 'path';

const MAIL_TEMPLATE_STR = fs.readFileSync(
  path.join(__dirname, './mailerTemplate.html'),
  'utf8'
);

export const transValidation = {
  email_incorrect: 'Email must have format example@company.com!',
  gender_incorrect: 'Oops, gender field is incorrect !!!',
  password_incorrect:
    'Password must have 8 characters ' +
    'including Capital and normal letter, ' +
    'number and some special characters!',
  password_confirmation_incorrect:
    'Confirmation password does not match' + 'the above password!',
};

export const transErrors = {
  account_in_use: 'This email has been used.',
  account_removed: 'This account is removed by system.',
  account_not_active: 'This email is registered but not yet activated.',
  token_not_exist: 'This token does not exist.',
  login_failed: 'Wrong username or password!',
  server_error: 'Error in server, please contact Administrator.',
  user_not_found: 'User Not Found!',
};

export const transSuccess = {
  userCreated: (userEmail) => {
    return `Account <strong>${userEmail} </strong> is registered. Please check your email to activate account.`;
  },
  account_active: (userEmail) => {
    return `Account <strong>${userEmail} </strong> is active. You can use your account to log in now.`;
  },
  loginSuccess: (username) => {
    return `Hi ${username}, have a nice day!`;
  },
  logout_success: 'Your account has successfully logged out.',
};

export const transMail = {
  subject: 'Awesome Chat: Confirm Your Email.',
  template: (linkVerify) => {
    return MAIL_TEMPLATE_STR.split('__HREF_LINK__').join(linkVerify);
  },
  sendFailed: 'There is error while sending email confirmation',
};
