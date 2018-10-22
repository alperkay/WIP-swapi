import { combineReducers } from 'redux';
import peopleReducer from './peopleReducer';
import planetsReducer from './planetsReducer';
import speciesReducer from './speciesReducer';

export default combineReducers({
  allPeople: peopleReducer,
  allPlanets: planetsReducer,
  allSpecies: speciesReducer
});
