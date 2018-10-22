import * as actionTypes from './actionTypes';
import axios from '../mock-client/MockAxios';

export const getPlanets = () => dispatch => {
  axios.get('/planets').then(response => {
    dispatch({
      type: actionTypes.GET_PLANETS,
      payload: response.data.results
    });
  });
};
