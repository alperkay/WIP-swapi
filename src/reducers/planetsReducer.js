import { GET_PLANETS } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      return action.payload;
    default:
      return state;
  }
}
