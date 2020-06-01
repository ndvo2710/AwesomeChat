import UserSchema from '../models/userModel';

/**
 *
 * @param id: UserId
 * @param item: Data Update
 * @returns {*}
 */
const updateUser = (id, item) => {
  return UserSchema.updateUserById(id, item);
};

module.exports = {
  updateUser,
};
