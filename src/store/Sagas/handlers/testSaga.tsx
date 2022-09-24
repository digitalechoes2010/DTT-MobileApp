import {call, put} from 'redux-saga/effects';
import getItemsApi from '../../../services/testService';
import {setItems} from '../../Actions/testActionCreator';

export function* handleGetItems() {

  try {
    const response = yield call(getItemsApi);
    if (response.status === 200) {
      console.log('Response Data:', response.data);

      yield put(setItems(response.data));
    } else {
      throw new Error('Could not connect to API');
    }
  } catch (err) {
    console.log(err);
  }

}
