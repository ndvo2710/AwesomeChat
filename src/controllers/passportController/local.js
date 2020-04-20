import * as logging from "../../common/loggingUtils";
import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "../../models/userModel";
import {transErrors, transSuccess} from "../../../lang/en";

const logger = logging.getLogger('passportControler-local');

const LocalStrategy = passportLocal.Strategy;

/**
* Valid user account type: local
*/
const initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            logger.info("User is going through custom");
            logger.info("Validating login user");
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }
            if (!user.local.isActive) {
                return done(null, false, req.flash("errors", transErrors.account_not_active));
            }
            const checkPassword = await user.comparePassword(password);
            if (!checkPassword) {
                return done(null, false, req.flash("errors", transErrors.login_failed));
            }
            return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)));
        } catch (e) {
            logger.debug(e);
            return done(null, false.req.flash("errors", transErrors.server_error));
        }
    }));

    // Save userId to session
    passport.serializeUser((user, done) => {
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

module.exports = initPassportLocal;