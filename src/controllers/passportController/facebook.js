import passport from 'passport';
import passportFacebook from 'passport-facebook';
import * as logging from '../../utils/loggingUtils';
import UserModel from '../../models/userModel';
import { transErrors, transSuccess } from '../../../lang/en';
import { FB_APP_ID, FB_APP_SECRET, FB_CALLBACK_URL } from '../../utils/secrets';

const logger = logging.getLogger('passportControler-facebook');

const FacebookStrategy = passportFacebook.Strategy;

/**
 * Valid user account type: facebook
 * Strategy options reference: https://github.com/jaredhanson/passport-facebook
 */
const initPassportFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: FB_APP_ID,
        clientSecret: FB_APP_SECRET,
        callbackURL: FB_CALLBACK_URL,
        passReqToCallback: true,
        profileFields: ['email', 'gender', 'displayName'],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          logger.info('running Facebook Passport Strategy');
          const user = await UserModel.findByFacebookUid(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash('success', transSuccess.loginSuccess(user.username))
            );
          }
          const newUserItem = {
            username: profile.displayName,
            gender: profile.gender,
            local: { isActive: true },
            facebook: {
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

module.exports = initPassportFacebook;
