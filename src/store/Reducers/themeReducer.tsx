import {SET_LIGHT, SET_DARK} from "../ActionTypes/themeActionTypes";

const initialState = {theme: true};

const ThemeReducer = (state = initialState, action:any) => {

  switch (action.type) {
    case SET_LIGHT:
      return {theme: true};
    case SET_DARK:
      return {theme: false};
    default:
      return state;
  }

};

export default ThemeReducer;