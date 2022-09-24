import {SET_ENGLISH, SET_ARABIC, SET_ESPANOL} from '../ActionTypes/languageActionTypes';

const initialState = {language: 'en'};

const LanguageReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case SET_ENGLISH:
      return {language: 'en'};
    case SET_ARABIC:
      return {language: 'ar'};
    case SET_ESPANOL:
      return {language: 'sp'};
    default:
      return state;
  }
  
};

export default LanguageReducer;
