import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ar from './ar.json';
import en from './en.json';
import sp from './sp.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    ar: ar,
	en: en,
	sp: sp,
  },
  interpolation: {
	escapeValue: false
  }
});

export default i18n;