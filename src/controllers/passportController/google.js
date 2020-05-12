import passport from 'passport';
import passportGoogle from 'passport-google-oauth';
import * as logging from '../../utils/loggingUtils';
import UserModel from '../../models/userModel';
import { transErrors, transSuccess } from '../../../lang/en';
import {
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  GOOGLE_CALLBACK_URL,
} from '../../utils/secrets';

const logger = logging.getLogger('passportControler-Google');

const GoogleStrategy = passportGoogle.OAuth2Strategy;

/**
 * Valid user account type: Google
 * Strategy options reference:
      + https://github.com/jaredhanson/passport-google-oauth
      + https://github.com/jaredhanson/passport-google-oauth2
 */
const initPassportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_APP_ID,
        clientSecret: GOOGLE_APP_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, params, profile, done) => {
        try {
          logger.info('running Google Passport Strategy');
          const user = await UserModel.findByGoogleUid(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash('success', transSuccess.loginSuccess(user.username))
            );
          }
          logger.info(`profile: ${JSON.stringify(profile, null, 2)}`);
          const newUserItem = {
            username: profile.displayName
              ? profile.displayName
              : profile.emails[0].value.split('@')[0],
            gender: profile.gender ? profile.gender : 'male',
            local: { isActive: true },
            Google: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value,
            },
          };

          logger.debug(
            `Loading newUserItem: ${JSON.stringify(newUserItem, null, 2)}`
          );
          const newUser = await UserModel.createNew(newUserItem);
          logger.debug(`newUser: ${JSON.stringify(newUser, null, 2)}`);
          return done(
            null,
            newUser,
            req.flash('success', transSuccess.loginSuccess(newUser.username))
          );
        } catch (e) {
          logger.debug(e);
          return done(
            null,
            false.req.flash('errors', transErrors.server_error)
          );
        }
      }
    )
  );

  // Save userId to session
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findUserById(id);
      if (!user) {
        return done(new Error(transErrors.user_not_found));
      }
      return done(null, user);
    } catch (e) {
      return done(e, null);
    }
  });
};

module.exports = initPassportGoogle;
