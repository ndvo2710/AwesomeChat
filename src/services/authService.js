import * as logging from '../common/loggingUtils';
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import uuid from "react-uuid";
import {transErrors, transSuccess} from "../../lang/en";

const logger = logging.getLogger('authService');

const SALT_ROUNDS = 7;

const register = async (email, gender, password) => {
    const userByEmail = await UserModel.findByEmail(email);
    if (userByEmail) {
        if (userByEmail.deletedAt != null) {
            throw new Error(transErrors.account_removed);
        }
        if (!userByEmail.local.isActive) {
            throw new Error(transErrors.account_in_use)
        }
        throw new Error(transErrors.account_in_use);
    }

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const userItem = {
        username: email.split("@")[0],
        gender: gender,
        local: {
            email: email,
            password: bcrypt.hashSync(password, salt),
            verifyToken: uuid()
        }
    };
    logger.debug(`userItem is :\n ${JSON.stringify(userItem, null, 2)}`);
    logger.info("Creating new registered user in DB");
    const newUser = await UserModel.createNew(userItem);
    return transSuccess.userCreated(newUser.local.email);
};

module.exports = {
    register: register
};