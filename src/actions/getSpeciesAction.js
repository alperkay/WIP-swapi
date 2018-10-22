import * as actionTypes from './actionTypes';
import axios from '../mock-client/MockAxios';

export const getSpecies = () => dispatch => {
  axios.get('/species').then(response => {
    dispatch({
      type: actionTypes.GET_SPECIES,
      payload: response.data.results
    });
  });
};
