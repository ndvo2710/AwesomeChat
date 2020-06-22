import express from 'express';
import passport from 'passport';
import { homeControl, authControl, userControl } from '../controllers/index';
import { authValid, userValid } from '../validation';
import initPassportLocal from '../controllers/passportController/local';
import initPassportFacebook from '../controllers/passportController/facebook';
import initPassportGoogle from '../controllers/passportController/google';

initPassportLocal();
initPassportFacebook();
initPassportGoogle();

const router = express.Router();

/**
 * Init all routes
 * @param app from exactly from express module
 */
const initRoutes = (app) => {
  router.get(
    '/login-register',
    authControl.checkLoggedOut,
    authControl.getLoginRegister
  );
  router.post(
    '/register',
    authControl.checkLoggedOut,
    authValid.register,
    authControl.postRegister
  );
  router.get(
    '/verify/:token',
    authControl.checkLoggedOut,
    authControl.verifyAccount
  );
  router.post(
    '/login',
    authControl.checkLoggedOut,
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login-register',
      successFlash: true,
      failureFlash: true,
    })
  );

  router.get(
    '/auth/facebook',
    authControl.checkLoggedOut,
    passport.authenticate('facebook', {
      scope: ['email'],
    })
  );

  router.get(
    '/auth/facebook/callback',
    authControl.checkLoggedOut,
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login-register',
    })
  );

  router.get(
    '/auth/google',
    authControl.checkLoggedOut,
    passport.authenticate('google', {
      scope: ['email'],
    })
  );

  router.get(
    '/auth/google/callback',
    authControl.checkLoggedOut,
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login-register',
    })
  );

  router.get('/', authControl.checkLoggedIn, homeControl.getHome);
  router.get('/logout', authControl.checkLoggedIn, authControl.getLogout);

  router.put(
    '/user/update-avatar',
    authControl.checkLoggedIn,
    userControl.updateAvatar
  );

  router.put(
    '/user/update-info',
    authControl.checkLoggedIn,
    userValid.updateUserInfo,
    userControl.updateInfo
  );

  return app.use('/', router);
};

module.exports = initRoutes;
