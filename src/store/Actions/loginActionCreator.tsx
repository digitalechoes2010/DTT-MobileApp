import * as loginActionTypes from '../ActionTypes/loginActionTypes';

export function requestLogin(request:any) {
  return {
    type: loginActionTypes.LOGIN_REQUEST,
    request,
  };
}

export function onLoginResponse(response:any) {
  return {
    type: loginActionTypes.LOGIN_RESPONSE,
    response,
  };
}

export function loginFailed(response:any) {
  return {
    type: loginActionTypes.LOGIN_FAILED,
    response,
  };
}

export function logout() {
  return {
    type: loginActionTypes.LOG_OUT,
  };
}
