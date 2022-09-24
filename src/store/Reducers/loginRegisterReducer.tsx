import {LOGIN_REGISTER_REQUEST, LOGIN_REGISTER_RESPONSE, LOGIN_REGISTER_FAILED, LOG_REGISTER_OUT} from '../ActionTypes/loginRegisterActionTypes';

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

const LoginRegisterReducer = (state = initialState, action:any) => {

  switch (action.type) {
    case LOGIN_REGISTER_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        identifier: action.request.identifier,
        password: action.request.password,
        errors: {},
      };
    case LOGIN_REGISTER_RESPONSE:
      return {
        ...state,
        isLoggedIn: true,
        errors: {},
        userData: action.response,
      };
    case LOGIN_REGISTER_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.response.errors,
        isLoading: false,
      };
    case LOG_REGISTER_OUT:
      return Object.assign({}, initialState);
    default:
      return state;
  }

};

export default LoginRegisterReducer;
