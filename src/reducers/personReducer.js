import { SELECT_PERSON } from '../actions/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_PERSON:
      return action.payload;
    default:
      return state;
  }
}
