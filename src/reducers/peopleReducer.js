import { GET_PEOPLE } from '../actions/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PEOPLE:
      return action.payload;
    default:
      return state;
  }
}
