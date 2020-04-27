import bcrypt from 'bcrypt';
import uuid from 'react-uuid';
import * as logging from '../common/loggingUtils';
import UserModel from '../models/userModel';
import { transErrors, transMail, transSuccess } from '../../lang/en';
import sendMail from '../config/mailer';

const logger = logging.getLogger('authService');

const SALT_ROUNDS = 7;

const register = async (email, gender, password, protocol, host) => {
  logger.info('Calling register method');
  const userByEmail = await UserModel.findByEmail(email);
  if (userByEmail) {
    if (userByEmail.deletedAt != null) {
      throw new Error(transErrors.account_removed);
    }
    if (!userByEmail.local.isActive) {
      throw new Error(transErrors.account_in_use);
    }
    throw new Error(transErrors.account_in_use);
  }

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const userItem = {
    username: email.split('@')[0],
    gender,
    local: {
      email,
      password: bcrypt.hashSync(password, salt),
      verifyToken: uuid(),
    },
  };
  logger.debug(`userItem is :\n ${JSON.stringify(userItem, null, 2)}`);
  logger.info('Creating new registered user in DB');
  const newUser = await UserModel.createNew(userItem);
  const linkVerify = `${protocol}://${host}/verify/${newUser.local.verifyToken}`;
  logger.debug('Click this link to verify');
  logger.debug(linkVerify);
  // send email
  try {
    await sendMail(email, transMail.subject, transMail.template(linkVerify));
    logger.info('Email is sent successfully');
    return transSuccess.userCreated(newUser.local.email);
  } catch (e) {
    logger.info('Failing to send email');
    logger.debug(e);
    // remove user from db
    await UserModel.removeById(user._id);
    throw new Error(transMail.sendFailed);
  }
};

const verifyToken = async (token) => {
  logger.info('Verifying Token');
  const user = await UserModel.verifyByTokenAndUpdateAccount(token);
  if (!user) {
    logger.info('Token does not exist');
    throw new Error(transErrors.token_not_exist);
  }
  logger.debug(`local : ${JSON.stringify(user.local, null, 2)}`);
  return transSuccess.account_active(user.local.email);
};

const getLogoutMessage = () => {
  return transSuccess.logout_success;
};

module.exports = {
  register,
  verifyToken,
  getLogoutMessage,
};
