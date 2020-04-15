import * as logging from '../common/loggingUtils';
import {validationResult} from "express-validator";
import {authService} from "../services";


const logger = logging.getLogger('authController');

const getLoginRegister = (req, res) => {
    logger.info("Running getLoginRegister");
    return res.render('auth/master', {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};

const getLogout = (req, res) => {
    // do something
    logger.info("Running getLogout");
};

const postRegister = async (req, res) => {
    logger.info("Running postRegister")
    let errorMessages = [];
    let successMessages = [];

    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = Object.values(validationErrors.mapped());
        errors.forEach(error => {
            errorMessages.push(error.msg);
        });
        logger.info("Flashing error message");
        req.flash("errors", errorMessages);
    }
    logger.info("postRegister has passed validation.");
    logger.info(req.body);
    try {
        const successMessage = await authService.register(req.body.email, req.body.gender, req.body.password);
        successMessages.push(successMessage);
        logger.info("Flashing success message");
        req.flash("success", successMessages);
    } catch (e) {
        errorMessages.push(e.message);
        logger.info("Flashing error message")
        req.flash("errors", errorMessages);
    }

    return res.redirect("/login-register");

};

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister,
    getLogout: getLogout
};