import * as logging from '../common/loggingUtils';
import {validationResult} from "express-validator";

const logger = logging.getLogger('authController');

const getLoginRegister = (req, res) => {
    logger.info("Running getLoginRegister");
    return res.render('auth/loginRegister');
};

const getLogout = (req, res) => {
    // do something
    logger.info("Running getLogout");
};

const postRegister = (req, res) => {
    logger.info("Running postRegister")
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()){
        const errors = Object.values(validationErrors.mapped());
        logger.debug(`errors: ${JSON.stringify(errors, null, 2)}`);
        const errorMessages = errors.map(error => {
            return error.msg;
        });
        logger.debug(`errorMessages:\n ${JSON.stringify(errorMessages, null, 2)}`);
        return;
    }
    logger.info("postRegister has passed validation.")
    logger.info(`req.body:\n${JSON.stringify(req.body, null, 2)}`);
};

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister,
    getLogout: getLogout
};