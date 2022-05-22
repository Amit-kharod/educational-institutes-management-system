import { SET_DEPARTMENT_DATA } from '../actions/types';

const initialState = null;

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DEPARTMENT_DATA:
      return payload;
    default:
      return state;
  }
}
