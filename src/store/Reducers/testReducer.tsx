import {SET_ITEMS} from '../ActionTypes/testActionTypes';

const initialState = {};

const TestReducer = (state = initialState, action: any) => {

  switch (action.type) {
    case SET_ITEMS:
      const {payload} = action;
      console.log('Payload:', payload);
      return {...state, payload};
    default:
      return state;
  }

};

export default TestReducer;
