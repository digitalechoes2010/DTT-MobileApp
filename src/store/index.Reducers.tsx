import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TestReducer from './Reducers/testReducer';
import ThemeReducer from './Reducers/themeReducer';
import LanguageReducer from './Reducers/languageReducer';
import LoginReducer from './Reducers/loginReducer';
import LoginRegisterReducer from './Reducers/loginRegisterReducer';
import LoginResetPasswordReducer from './Reducers/loginResetPasswordReducer';
import UserReducer from './Reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const RootReducer = combineReducers({
  TestReducer,
  ThemeReducer,
  LanguageReducer,
  LoginReducer,
  LoginRegisterReducer,
  LoginResetPasswordReducer,
  UserReducer
});

export default persistReducer(persistConfig, RootReducer);
