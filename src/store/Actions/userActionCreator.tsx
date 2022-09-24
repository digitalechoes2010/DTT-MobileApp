import * as userActionTypes from '../ActionTypes/userActionTypes';

export function updateUserRequest(request:any) {
  return {
    type: userActionTypes.UPDATE_USER_REQUEST,
    request,
  };
}
 
export function updateUserResponse(response:any) {
  return {
    type: userActionTypes.UPDATE_USER_RESPONSE,
    response,
  };
}

export function updateUserError(response: {errors:any}) {
  return {
    type: userActionTypes.UPDATE_USER_ERROR,
    response,
  };
}
