import * as actionTypes from './actionTypes';
import axios from '../mock-client/MockAxios';

export const getPeople = () => dispatch => {
  axios.get('/people').then(response => {
    dispatch({
      type: actionTypes.GET_PEOPLE,
      payload: response.data.results
    });
  });
};
