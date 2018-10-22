import { GET_SPECIES } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPECIES:
      return action.payload;
    default:
      return state;
  }
}
