import * as testActionTypes from '../ActionTypes/testActionTypes';

export const getItems = () => {
  const action = {
    type: testActionTypes.GET_ITEMS,
  };
  return action;
};

export const setItems = (payload: any) => {
  const action = {
    type: testActionTypes.SET_ITEMS,
    payload,
  };
  return action;
};
