import * as loginRegisterActionTypes from '../ActionTypes/loginRegisterActionTypes';

export function requestLoginRegister(request:any) {
  return {
    type: loginRegisterActionTypes.LOGIN_REGISTER_REQUEST,
    request,
  };
}

export function onLoginRegisterResponse(response:any) {
  return {
    type: loginRegisterActionTypes.LOGIN_REGISTER_RESPONSE,
    response,
  };
}

export function loginRegisterFailed(response:any) {
  return {
    type: loginRegisterActionTypes.LOGIN_REGISTER_FAILED,
    response,
  };
}

export function logoutRegister() {
  return {
    type: loginRegisterActionTypes.LOG_REGISTER_OUT,
  };
}
