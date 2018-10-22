import { combineReducers } from 'redux';
import peopleReducer from './peopleReducer';
import planetsReducer from './planetsReducer';
import speciesReducer from './speciesReducer';
import personReducer from './personReducer';

export default combineReducers({
  allPeople: peopleReducer,
  allPlanets: planetsReducer,
  allSpecies: speciesReducer,
  selectedPerson: personReducer
});
