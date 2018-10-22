import React, { Component } from 'react';
import { getPeople } from '../actions/getPeopleAction';
import { getPlanets } from '../actions/getPlanetsAction';
import { getSpecies } from '../actions/getSpeciesAction';
import { connect } from 'react-redux';

class PeopleList extends Component {
  componentDidMount() {
    this.props.getPeople();
    this.props.getPlanets();
    this.props.getSpecies();
  }

  findPlanet = (person, planets) => {
    const planet = planets.find(planet => planet.url === person.homeworld);
    if (planet === undefined) {
      return 'Planet not in db';
    }
    return planet.name;
  };

  findSpecies = (person, species) => {
    const personsSpecies = species.find(spec => spec.url === person.species[0]);
    if (personsSpecies === undefined) {
      return 'Species not in db';
    }
    return personsSpecies.name;
  };

  personClicked = person => {
    console.log(person);
  };

  render() {
    const { people, planets, species } = this.props;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Character</th>
              <th>Home Planet</th>
              <th>Species</th>
              <th>Gender</th>
            </tr>
            {people.length &&
              people.map((person, key) => (
                <tr key={key} onClick={() => this.personClicked(person)}>
                  <td>{person.name}</td>
                  <td>{planets.length && this.findPlanet(person, planets)}</td>
                  <td>{species.length && this.findSpecies(person, species)}</td>
                  <td>{person.gender}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const MapStateToProps = state => ({
  people: state.allPeople,
  planets: state.allPlanets,
  species: state.allSpecies
});

export default connect(
  MapStateToProps,
  { getPeople, getPlanets, getSpecies }
)(PeopleList);
