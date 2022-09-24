import * as themeActionTypes from '../ActionTypes/themeActionTypes';

export const setLight = () => {
  const action = {
    type: themeActionTypes.SET_LIGHT,
  };
  return action;
};

export const setDark = () => {
  const action = {
    type: themeActionTypes.SET_DARK,
  };
  return action;
};