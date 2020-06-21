let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};

function updateUserInfo() {
  $('#input-change-avatar').bind('change', function () {
    const fileData = $(this).prop('files')[0];
    const math = ['image/png', 'image/jpg', 'image/jpeg'];
    const limit = 1048576; // bytes = 1 MB

    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify(
        'This file type is not supported. The default allowed extensions are: png, jpg and jpeg.',
        'errors',
        7
      );
      $(this).val(null);
      return false;
    }

    if (fileData.size > limit) {
      alertify.notify(
        'The uploaded file size is too large. Maximum is 1MB',
        'errors',
        7
      );
      $(this).val(null);
      return false;
    }

    if (typeof FileReader !== 'undefined') {
      const imageReview = $('#image-edit-profile');
      imageReview.empty();

      const fileReader = new FileReader();
      fileReader.onload = function (elemment) {
        $('<img>', {
          src: elemment.target.result,
          class: 'avatar img-circle',
          id: 'user-modal-avatar',
          alt: 'avatar',
        }).appendTo(imageReview);
      };

      imageReview.show();
      fileReader.readAsDataURL(fileData);

      const formData = new FormData();
      formData.append('avatar', fileData);

      userAvatar = formData;
    } else {
      alertify.notify('Your system do not support FileReader', 'errors', 7);
    }
  });

  $('#input-change-username').bind('change', function () {
    const username = $(this).val();
    const regexUsername = new RegExp(
      '^[\\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$'
    );

    if (
      !regexUsername.test(username) ||
      username.length < 3 ||
      username.length > 17
    ) {
      alertify.notify(
        'Username length are between 3-17 characters and can only contain alphanumeric characters (A–Z, 0–9).',
        'errors',
        7
      );
      $(this).val(originUserInfo.username);
      delete userInfo.username;
      return false;
    }
    userInfo.username = username;
  });

  $('#input-change-gender-male').bind('click', function () {
    const gender = $(this).val();

    if (gender !== 'male') {
      alertify.notify(
        'Oops, the gender is wrong. Are you a hacker?',
        'errors',
        7
      );
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $('#input-change-gender-female').bind('click', function () {
    const gender = $(this).val();

    if (gender !== 'female') {
      alertify.notify(
        'Oops, the gender is wrong. Are you a hacker?',
        'errors',
        7
      );
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $('#input-change-address').bind('change', function () {
    const address = $(this).val();

    if (address.length < 3 || address.length > 30) {
      alertify.notify(
        'Address length is between 3-30 characters.',
        'errors',
        7
      );
      $(this).val(originUserInfo.address);
      delete userInfo.address;
      return false;
    }
    userInfo.address = address;
  });

  $('#input-change-phone').bind('change', function () {
    const phone = $(this).val();
    const regexPhone = new RegExp('^(1)[0-9]{10}$');

    if (!regexPhone.test(phone)) {
      alertify.notify(
        "The standard US number is 11 digits, such as 1(555) 555-1234. The first digit is always 1, next three digits are the 'area code', followed by 7 digits are the phone number",
        'errors',
        7
      );
      $(this).val(originUserInfo.phone);
      delete userInfo.phone;
      return false;
    }
    userInfo.phone = phone;
  });
}

function callUpdateUserAvatar() {
  $.ajax({
    url: '/user/update-avatar',
    type: 'PUT',
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success(result) {
      console.log(result);
      // Display success
      // message from userController result dict
      $('.user-modal-alert-success').find('span').text(result.message);
      $('.user-modal-alert-success').css('display', 'block');

      // Update avatar at navbar
      $('#navbar-avatar').attr('src', result.imageSrc);

      // Update origin img src with new avatar
      originAvatarSrc = result.imageSrc;

      // reset all
      $('#input-btn-cancel-update-user').click();
    },
    error(error) {
      // Display errors
      console.log(error);
      // responseText from the error dict
      $('.user-modal-alert-error').find('span').text(error.responseText);
      $('.user-modal-alert-error').css('display', 'block');

      // reset all
      $('#input-btn-cancel-update-user').click();
    },
  });
}

function callUpdateUserInfo() {
  $.ajax({
    url: '/user/update-info',
    type: 'PUT',
    data: userInfo,
    success(result) {
      console.log(result);
      // Display success
      // message from userController result dict
      $('.user-modal-alert-success').find('span').text(result.message);
      $('.user-modal-alert-success').css('display', 'block');

      // Update origin user info
      originUserInfo = Object.assign(originUserInfo, userInfo);

      // Update username at navbar
      $('#navbar-username').text(originUserInfo.username);

      // reset all
      $('#input-btn-cancel-update-user').click();
    },
    error(error) {
      // Display errors
      console.log(error);
      // responseText from the error dict
      $('.user-modal-alert-error').find('span').text(error.responseText);
      $('.user-modal-alert-error').css('display', 'block');

      // reset all
      $('#input-btn-cancel-update-user').click();
    },
  });
}

$(document).ready(function () {
  originAvatarSrc = $('#user-modal-avatar').attr('src');
  originUserInfo = {
    username: $('#input-change-username').val(),
    gender: $('#input-change-gender-male').is(':checked')
      ? $('#input-change-gender-male').val()
      : $('#input-change-gender-female').val,
    address: $('#input-change-address').val(),
    phone: $('#input-change-phone').val(),
  };

  // Update user info after change
  updateUserInfo();

  $('#input-btn-update-user').bind('click', function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify(
        'You have to change the information before submit',
        'errors',
        7
      );
      return false;
    }

    if (userAvatar) {
      callUpdateUserAvatar();
    }

    if (!$.isEmptyObject(userInfo)) {
      callUpdateUserInfo();
    }
  });

  $('#input-btn-cancel-update-user').bind('click', function () {
    userAvatar = null;
    userInfo = {};
    $('#input-change-avatar').val(null);
    $('#user-modal-avatar').attr('src', originAvatarSrc);
    $('#input-change-username').val(originUserInfo.username);
    originUserInfo.gender === 'male'
      ? $('#input-change-gender-male').click()
      : $('#input-change-gender-female').click();
    $('#input-change-address').val(originUserInfo.address);
    $('#input-change-phone').val(originUserInfo.phone);
  });
});
