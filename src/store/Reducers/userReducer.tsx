import {UPDATE_USER_REQUEST, UPDATE_USER_RESPONSE, UPDATE_USER_ERROR} from '../ActionTypes/userActionTypes';

const initialState: any = {};

const UserReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoggedIn: true,
      };
    case UPDATE_USER_RESPONSE:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.response,
      };
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isLoggedIn: true,
        errors: action.response.errors,
      };
    default:
      return state;
  }
};

export default UserReducer;
