import {call, put, takeEvery} from 'redux-saga/effects';
import {LoginUser} from '../../../services/loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as loginActions from '../../Actions/loginActionCreator';
import * as loginActionTypes from '../../ActionTypes/loginActionTypes';
import * as sagaNavigation from '../../../navigation/SagaNavigation';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

const {t} = useTranslation();

export function* loginAsync(action: any): Generator<any> {
  try {
    const response: any = yield call(LoginUser, action.request);
    console.log('Error N1:', response.data.error);
    console.log('Response Status:', response.status);
    if (response.status === 200) {
      console.log('Data:', response.data);
      yield AsyncStorage.setItem('token', response.data.jwt);
      yield put(loginActions.onLoginResponse(response.data));
      console.log('Success');
      console.log('Token:', response.data.jwt);
      return sagaNavigation.navigate('Drawer')}
    else if (response.status === 400 && response.data.error.name === 'ValidationError') {
      return Alert.alert(
        t('userInvalid'),
        t('emailPasswordIncorrect'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
    }
    else if (response.status === 400 && response.data.error.name === 'ApplicationError') {
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
    yield put(loginActions.loginFailed({errors: err}));
  }
}

export function* logout() {
  yield AsyncStorage.setItem('token', '');
  sagaNavigation.navigate('Language');
}

export function* watchLoginSaga() {
  yield takeEvery(loginActionTypes.LOGIN_REQUEST, loginAsync);
  yield takeEvery(loginActionTypes.LOG_OUT, logout);
}
