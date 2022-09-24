import {call, put, takeLatest} from 'redux-saga/effects';
import {UpdateInfo} from '../../../screens/AccountDetails/AccountDetails';
import * as userActions from '../../Actions/userActionCreator';
import * as userActionTypes from '../../ActionTypes/userActionTypes';
import * as sagaNavigation from '../../../navigation/SagaNavigation';

export function* updateUser(action: any): Generator<any> {
  try {
    const response: any = yield call(UpdateInfo, action.request);
    console.log("SSS",response)
    if (response.status === 200) {
      console.log('Data:', response.data);
      yield put(userActions.updateUserRequest(response.data));
      return sagaNavigation.navigate('SettingStack');
    } else {
      throw response.data.error;
    }
  } catch (err) {
    yield put(userActions.updateUserError({errors: err}));
  }
}

export function* watchUserSaga() {
  yield takeLatest(userActionTypes.UPDATE_USER_REQUEST, updateUser);
}
