import express from 'express';
import passport from 'passport';
import { homeControl, authControl } from '../controllers/index';
import { authValid } from '../validation';
import initPassportLocal from '../controllers/passportController/local';

initPassportLocal();
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

  router.get('/', authControl.checkLoggedIn, homeControl.getHome);
  router.get('/logout', authControl.checkLoggedIn, authControl.getLogout);

  return app.use('/', router);
};

module.exports = initRoutes;
