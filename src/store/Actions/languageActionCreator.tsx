import * as languageActionTypes from '../ActionTypes/languageActionTypes';

export const setEnglish = () => {
  const action = {
    type: languageActionTypes.SET_ENGLISH,
  };
  return action;
};

export const setArabic = () => {
  const action = {
    type: languageActionTypes.SET_ARABIC,
  };
  return action;
};

export const setEspanol = () => {
  const action = {
    type: languageActionTypes.SET_ESPANOL,
  };
  return action;
};
