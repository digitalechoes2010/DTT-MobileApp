import {all, fork, takeLatest} from 'redux-saga/effects';
import {GET_ITEMS} from '../ActionTypes/testActionTypes';
import {watchLoginSaga } from './handlers/loginSaga';
import {watchLoginRegisterSaga } from './handlers/loginRegisterSaga';
import {watchLoginResetPasswordSaga} from './handlers/loginResetPasswordSaga';
import {watchUserSaga} from './handlers/userSaga';
import {handleGetItems} from './handlers/testSaga';

function* watchTestSaga() {
  yield takeLatest(GET_ITEMS, handleGetItems);
}

export default function* watcherSaga() {
  yield all([fork(watchTestSaga), fork(watchLoginSaga), fork(watchLoginRegisterSaga), fork(watchLoginResetPasswordSaga), fork(watchUserSaga)]);
}
