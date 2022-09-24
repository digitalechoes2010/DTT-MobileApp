import {call, put, takeEvery} from 'redux-saga/effects';
import {LoginResetPasswordUser} from '../../../screens/ResetPasswordStepTwo/ResetPasswordStepTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as loginActions from '../../Actions/loginActionCreator';
import * as loginResetPasswordActions from '../../Actions/loginResetPasswordActionCreator';
import * as loginResetPasswordActionTypes from '../../ActionTypes/loginResetPasswordActionTypes';
import * as sagaNavigation from '../../../navigation/SagaNavigation';
import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';

const {t} = useTranslation();

export function* loginAsync(action: any): Generator<any> {
  try {
    const response: any = yield call(LoginResetPasswordUser, action.request);
    console.log('Error N1:', response.data.error);
    console.log('Response Status:', response.status);
    if (response.status === 200) {
      console.log('Data:', response.data);
      yield AsyncStorage.setItem('token', response.data.jwt);
      yield put(loginResetPasswordActions.onLoginResetPasswordResponse(response.data));
      yield put(loginActions.onLoginResponse(response.data));
      console.log('Success');
      console.log('Token:', response.data.jwt);
      return sagaNavigation.navigate('ResetPasswordStepThree');}
    else if (response.status === 400 && response.data.error.name === 'BadRequestError') {
      return Alert.alert(
        t('invalidAccessToken'),
        t('invalidAccessTokenTxt'),
        [{text: t('closeTxt')}],
        {cancelable: false},
      );
    }
    else {
      throw response.data.error;
    }
  } catch (err) {
    console.log('Error:', err);
    yield put(loginResetPasswordActions.loginResetPasswordFailed({errors: err}));
    yield put(loginActions.loginFailed({errors: err}));
  }
}

export function* logout() {
  yield AsyncStorage.setItem('token', '');
  sagaNavigation.navigate('Language');
}

export function* watchLoginResetPasswordSaga() {
  yield takeEvery(loginResetPasswordActionTypes.LOGIN_RESETPASSWORD_REQUEST, loginAsync);
  yield takeEvery(loginResetPasswordActionTypes.LOG_RESETPASSWORD_OUT, logout);
}
