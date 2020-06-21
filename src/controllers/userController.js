import multer from 'multer';
import uuid from 'react-uuid';
import fsExtra from 'fs-extra';
import { validationResult } from 'express-validator';
import * as logging from '../utils/loggingUtils';
import { appConfig } from '../config/app';
import { transErrors, transSuccess } from '../../lang/en';
import { userService } from '../services/index';

const logger = logging.getLogger('userController');

const storageAvatar = multer.diskStorage({
  destination: (req, file, callback) => {
    logger.info('destination');
    callback(null, appConfig.avatar_directory);
  },
  filename: (req, file, callback) => {
    const math = appConfig.avatar_type;
    logger.info('filename');
    const avatarTypes = appConfig.avatar_type;
    if (avatarTypes.indexOf(file.mimetype) === -1) {
      logger.info('Flashing error for avatar type');
      callback(transErrors.avatar_type, null);
      // return transErrors.avatar_type;
    }

    const avatarName = `${Date.now()}-${uuid()}-${file.originalname}`;
    logger.info(avatarName);
    logger.info('Successfully saving image to storage');
    callback(null, avatarName);
    // return avatarName;
  },
});

const avatarUploadFile = multer({
  storage: storageAvatar,
  limits: { fileSize: appConfig.avatar_limit_size },
}).single('avatar');

const updateAvatar = (req, res) => {
  logger.info('Calling avatarUploadFile');
  avatarUploadFile(req, res, async (error) => {
    if (error) {
      if (error.message) {
        logger.info('Flashing error message for avatar size');
        return res.status(500).send(transErrors.avatar_size);
      }
      return res.status(500).send(error);
    }
    logger.info(`${JSON.stringify(req.file, null, 2)}`);
    try {
      const updateUserItem = {
        avatar: req.file.filename,
        updatedAt: Date.now(),
      };

      // req.user._id from homeController user
      // update user
      const userUpdate = await userService.updateUser(
        // eslint-disable-next-line no-underscore-dangle
        req.user._id,
        updateUserItem
      );

      // remove old avatar
      await fsExtra.remove(
        `${appConfig.avatar_directory}/${userUpdate.avatar}`
      );

      const result = {
        message: transSuccess.user_info_updated,
        imageSrc: `images/users/${req.file.filename}`,
      };
      return res.status(200).send(result);
    } catch (e) {
      logger.error(e);
      return res.status(500).send(e);
    }
  });
};

const updateInfo = async (req, res) => {
  logger.info('calling updateInfo');

  const errorArr = [];

  logger.info('Processing validation result from middleware');
  const validationError = validationResult(req);
  if (!validationError.isEmpty()) {
    const errors = Object.values(validationError.mapped());
    errors.forEach((error) => {
      errorArr.push(error.msg);
    });

    return res.status(500).send(errorArr);
  }
  logger.info('updateInfo has passed validation.');

  try {
    const updateUserItem = req.body;
    await userService.updateUser(req.user._id, updateUserItem);

    const result = {
      message: transSuccess.user_info_updated,
    };
    return res.status(200).send(result);
  } catch (e) {
    logger.debug(e);
    return res.status(500).send(e);
  }
};

module.exports = {
  updateAvatar,
  updateInfo,
};
