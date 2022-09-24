import {call, put, takeEvery} from 'redux-saga/effects';
import {LoginRegisterUser} from '../../../services/loginRegisterService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as loginActions from '../../Actions/loginActionCreator';
import * as loginRegisterActions from '../../Actions/loginRegisterActionCreator';
import * as loginRegisterActionTypes from '../../ActionTypes/loginRegisterActionTypes';
import * as sagaNavigation from '../../../navigation/SagaNavigation';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

const {t} = useTranslation();

export function* loginAsync(action: any): Generator<any> {
  try {
    const response: any = yield call(LoginRegisterUser, action.request);
    console.log('Error N1:', response.data.error);
    console.log('Response Status:', response.status);
    if (response.status === 200) {
      console.log('Data:', response.data);
      yield AsyncStorage.setItem('token', response.data.jwt);
      yield put(loginRegisterActions.onLoginRegisterResponse(response.data));
      yield put(loginActions.onLoginResponse(response.data));
      console.log('Success');
      console.log('Token:', response.data.jwt);
      return sagaNavigation.navigate('Drawer')}
    else if (response.status === 400) {
      return Alert.alert(
        t('emailNotConfirmed'),
        t('emailSpam'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
    }
    else {
      throw response.data.error;
    }
  } catch (err) {
    console.log('Error:', err);
    yield put(loginRegisterActions.loginRegisterFailed({errors: err}));
    yield put(loginActions.loginFailed({errors: err}));
  }
}

export function* logout() {
  yield AsyncStorage.setItem('token', '');
  sagaNavigation.navigate('Language');
}

export function* watchLoginRegisterSaga() {
  yield takeEvery(loginRegisterActionTypes.LOGIN_REGISTER_REQUEST, loginAsync);
  yield takeEvery(loginRegisterActionTypes.LOG_REGISTER_OUT, logout);
}
