/**
 * Created by Kevin Vo
 */
function showRegisterForm() {
  // location.reload();
  $('.loginBox').fadeOut('fast', function () {
    $('.registerBox').fadeIn('fast');
    $('.login-footer').fadeOut('fast', function () {
      $('.register-footer').fadeIn('fast');
    });
    $('.modal-title').html('Register a new account');
  });
  $('.error').removeClass('alert alert-danger').html('');
}

function showLoginForm() {
  $('.registerBox').fadeOut('fast', function () {
    $('.loginBox').fadeIn('fast');
    $('.register-footer').fadeOut('fast', function () {
      $('.login-footer').fadeIn('fast');
    });

    $('.modal-title').html('Sign In');
  });
}

function openLoginModal() {
  setTimeout(function () {
    $('#loginModal').modal('show');
    showLoginForm();
  }, 230);
}

function openRegisterModal() {
  setTimeout(function () {
    $('#loginModal').modal('show');
    showRegisterForm();
  }, 230);
}
