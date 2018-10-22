import * as actionTypes from './actionTypes';

export const selectPerson = person => dispatch => {
  dispatch({
    type: actionTypes.SELECT_PERSON,
    payload: person
  });
};
