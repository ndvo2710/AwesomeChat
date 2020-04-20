import express from 'express';
import { homeControl, authControl } from './../controllers/index';
import {authValid} from "../validation";
import passport from "passport";
import initPassportLocal from "../controllers/passportController/local";

initPassportLocal();
const router = express.Router();

/**
 * Init all routes
 * @param app from exactly from express module
 */
const initRoutes = (app) => {
    router.get('/', homeControl.getHome);
    router.get('/login-register', authControl.getLoginRegister);
    router.post('/register', authValid.register, authControl.postRegister);
    router.get("/verify/:token", authControl.verifyAccount);

    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login-register",
        successFlash: true,
        failureFlash: true
    }));

    return app.use('/', router);
};

module.exports = initRoutes;