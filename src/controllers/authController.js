import { validationResult } from 'express-validator';
import * as logging from '../utils/loggingUtils';
import authService from '../services';

const logger = logging.getLogger('authController');

const getLoginRegister = (req, res) => {
  logger.info('calling getLoginRegister');
  return res.render('auth/master', {
    errors: req.flash('errors'),
    success: req.flash('success'),
  });
};

const postRegister = async (req, res) => {
  logger.info('Calling postRegister');
  const errorArr = [];
  const successArr = [];

  logger.info('Processing validation result from middleware');
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = Object.values(validationErrors.mapped());
    errors.forEach((error) => {
      errorArr.push(error.msg);
    });
    logger.info('Flashing error message');
    req.flash('errors', errorArr);
    return res.redirect('/login-register');
  }
  logger.info('postRegister has passed validation.');
  logger.debug(req.body);
  logger.debug(req.get('host'));
  try {
    const successMessage = await authService.register(
      req.body.email,
      req.body.gender,
      req.body.password,
      req.protocol,
      req.get('host')
    );
    successArr.push(successMessage);
    logger.info('Flashing success message');
    req.flash('success', successArr);
  } catch (e) {
    errorArr.push(e.message);
    logger.info('Flashing error message');
    req.flash('errors', errorArr);
  }

  return res.redirect('/login-register');
};

const verifyAccount = async (req, res) => {
  logger.info('Calling verifyAccount');
  const errorArr = [];
  const successArr = [];

  logger.debug(`token: ${req.params.token}`);
  try {
    const successMessage = await authService.verifyToken(req.params.token);
    successArr.push(successMessage);
    logger.info('Flashing success messages');
    logger.debug(successArr);
    req.flash('success', successArr);
  } catch (e) {
    errorArr.push(e.message);
    logger.info('Flashing error messages');
    req.flash('errors', errorArr);
  }
  return res.redirect('/login-register');
};

const getLogout = (req, res) => {
  logger.info('calling getLogout');
  req.logout(); // remove session passport user
  req.flash('success', authService.getLogoutMessage);
  return res.redirect('/login-register');
};

const checkLoggedOut = (req, res, next) => {
  logger.info('calling checkLoggedOut');
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return next();
};

const checkLoggedIn = (req, res, next) => {
  logger.info('calling stayLoggedIn');
  if (!req.isAuthenticated()) {
    return res.redirect('/login-register');
  }
  return next();
};

module.exports = {
  getLoginRegister,
  postRegister,
  getLogout,
  verifyAccount,
  checkLoggedIn,
  checkLoggedOut,
};
