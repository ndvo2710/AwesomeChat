import { check } from 'express-validator';
import { transValidation } from '../../lang/en';

const updateUserInfo = [
  // check params must be them same as name in register.ejs
  check('username', transValidation.update_username)
    .optional()
    .isLength({ min: 3, max: 17 })
    .matches(
      /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/
    ),
  check('gender', transValidation.update_gender)
    .optional()
    .isIn(['male', 'female']),
  check('address', transValidation.update_address)
    .optional()
    .isLength({ min: 3, max: 30 }),
  check('phone', transValidation.update_phone)
    .optional()
    .matches(/^(1)[0-9]{10}$/),
];

module.exports = {
  updateUserInfo,
};
