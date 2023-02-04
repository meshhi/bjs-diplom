'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
  const callbackAuth = (responseBody) => {
    if (responseBody.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(responseBody.error);
    }
  }

  try {
    ApiConnector.login(data, callbackAuth);
  } catch(e) {

  }
}

userForm.registerFormCallback = function(data) {
  const callbackReg = (responseBody) => {
    if (responseBody.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(responseBody.error);
    }
  }

  try {
    ApiConnector.register(data, callbackReg);
  } catch(e) {

  }
}