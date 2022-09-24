import {LOGIN_RESETPASSWORD_REQUEST, LOGIN_RESETPASSWORD_RESPONSE, LOGIN_RESETPASSWORD_FAILED, LOG_RESETPASSWORD_OUT} from '../ActionTypes/loginResetPasswordActionTypes';

const initialState = {
  token: null,
  blocked: null,
  city: null,
  confirmed: null,
  country: null,
  createdAt: null,
  email: null,
  fullname: null,
  id: null,
  phone: null,
  provider: null,
  type: null,
  updatedAt: null,
  username: null,
  isLoggedIn: false,
  errors: {},
  userData: null
};

const LoginResetPasswordReducer = (state = initialState, action:any) => {

  switch (action.type) {
    case LOGIN_RESETPASSWORD_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loginToken: action.request.loginToken,
        errors: {},
      };
    case LOGIN_RESETPASSWORD_RESPONSE:
      return {
        ...state,
        isLoggedIn: true,
        errors: {},
        userData: action.response,
      };
    case LOGIN_RESETPASSWORD_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.response.errors,
        isLoading: false,
      };
    case LOG_RESETPASSWORD_OUT:
      return Object.assign({}, initialState);
    default:
      return state;
  }

};

export default LoginResetPasswordReducer;
