import * as loginResetPasswordActionTypes from '../ActionTypes/loginResetPasswordActionTypes';

export function requestLoginResetPassword(request:any) {
  return {
    type: loginResetPasswordActionTypes.LOGIN_RESETPASSWORD_REQUEST,
    request,
  };
}

export function onLoginResetPasswordResponse(response:any) {
  return {
    type: loginResetPasswordActionTypes.LOGIN_RESETPASSWORD_RESPONSE,
    response,
  };
}

export function loginResetPasswordFailed(response:any) {
  return {
    type: loginResetPasswordActionTypes.LOGIN_RESETPASSWORD_FAILED,
    response,
  };
}

export function logoutResetPassword() {
  return {
    type: loginResetPasswordActionTypes.LOG_RESETPASSWORD_OUT,
  };
}
