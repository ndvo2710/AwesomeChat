let userAvatar = null;
let userInfo = {};

const ready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

function updateAvatarImage(srcUpdate) {
  const imageReview = document.querySelector('#image-edit-profile');
  while (imageReview.firstChild) {
    imageReview.removeChild(imageReview.firstChild);
  }
  const img = document.createElement('img');
  img.src = srcUpdate;
  img.classList.add('avatar', 'img-circle');
  img.alt = 'avatar';
  imageReview.appendChild(img);
  imageReview.style.display = 'block'; // block: show, none: hide
}

function updateUserInfo() {
  document
    .querySelector('#input-change-avatar')
    .addEventListener('change', (e) => {
      const FileLists = e.target.files;
      const fileData = FileLists[0];
      const matchImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
      const limit = 1048576; // bytes = 1 MB

      if (matchImageTypes.indexOf(fileData.type) === -1) {
        alertify.notify(
          'This file type is not supported. The default allowed extensions are: png, jpg and jpeg.',
          'errors',
          7
        );
        e.target.value = null;
        return false;
      }

      if (fileData.size > limit) {
        alertify.notify(
          'The uploaded file size is too large. Maximum is 1MB',
          'errors',
          7
        );
        e.target.value = null;
        return false;
      }

      console.log(fileData);

      if (typeof FileReader !== 'undefined') {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const imgSrc = e.target.result;
          updateAvatarImage(imgSrc);
        };
        fileReader.readAsDataURL(fileData);

        const formData = new FormData();
        formData.append('avatar', fileData);
        userAvatar = formData;
        console.log(...userAvatar);
      } else {
        alertify.notify('Your system do not support FileReader', 'errors', 7);
      }
    });

  document
    .querySelector('#input-change-username')
    .addEventListener('change', (e) => {
      userInfo.username = e.target.value;
    });

  document
    .querySelector('#input-change-gender-male')
    .addEventListener('click', (e) => {
      userInfo.gender = e.target.value;
    });

  document
    .querySelector('#input-change-gender-female')
    .addEventListener('click', (e) => {
      userInfo.gender = e.target.value;
    });

  document
    .querySelector('#input-change-address')
    .addEventListener('change', (e) => {
      userInfo.address = e.target.value;
    });

  document
    .querySelector('#input-change-phone')
    .addEventListener('change', (e) => {
      userInfo.phone = e.target.value;
    });
}

ready(() => {
  let originAvatarSrc = document.querySelector('#user-modal-avatar').src;
  console.log(`originAvatarSrc : ${originAvatarSrc}`);
  updateUserInfo();
  document
    .querySelector('#input-btn-update-user')
    .addEventListener('click', async (e) => {
      e.preventDefault();
      if (userInfo === {} && !userAvatar) {
        alertify.notify(
          'You have to change the information before submit',
          'errors',
          7
        );
        return false;
      }
      console.log(...userAvatar);
      console.log(`userInfo: ${JSON.stringify(userInfo, null, 2)}`);
      console.log('Fetching PUT avatar');
      const url = '/user/update-avatar';
      const requestConfig = {
        method: 'PUT', // *GET, POST, PUT/PATCH, DELETE, etc.
        body: userAvatar,
      };
      try {
        const response = await fetch(url, requestConfig);
        const resultData = await response.json();
        console.log(`resultData: ${JSON.stringify(resultData, null, 2)}`);
        // Display success
        // message from userController result dict
        const spanElement = document
          .querySelector('.user-modal-alert-success')
          .querySelector('span');
        spanElement.text = resultData.message;
        document.querySelector('.user-modal-alert-success').style.display =
          'block';
        // Update avatar at navbar
        document.querySelector('#navbar-avatar').src = resultData.imageSrc;
        // Update origin img src with new avatar
        originAvatarSrc = resultData.imageSrc;
        console.log(`originAvatarSrc : ${originAvatarSrc}`);
        originalAvatar.src = resultData.imageSrc;
        // reset all
        document.querySelector('#input-btn-cancel-update-user').click();
      } catch (e) {
        console.log(e);
        // responseText from the error dict
        document
          .querySelector('.user-modal-alert-error')
          .querySelector('span').text = e.responseText;
        document.querySelector('.user-modal-alert-error').style.display =
          'block';

        // reset all
        document.querySelector('#input-btn-cancel-update-user').click();
      }
    });

  document
    .querySelector('#input-btn-cancel-update-user')
    .addEventListener('click', async (e) => {
      e.preventDefault();
      userAvatar = null;
      userInfo = {};
      updateAvatarImage(originAvatarSrc);
      document.querySelector('#input-change-avatar').value = null;
    });
});
