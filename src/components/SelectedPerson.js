import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedPerson extends Component {
  render() {
    const { person, planets } = this.props;
    const planet = planets.find(planet => planet.url === person.homeworld);
    return (
      <div className="selected-person">
        <p>Name: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Skin Color: {person.skin_color}</p>
        <p>Birth Year: {person.birth_year}</p>
        <p>Homeworld: {planet && planet.name}</p>
        <p>Population: {planet && planet.population}</p>
        <p>Climate: {planet && planet.climate}</p>
        <p>Terrain: {planet && planet.terrain}</p>
      </div>
    );
  }
}

const MapStateToProps = state => ({
  person: state.selectedPerson,
  planets: state.allPlanets
});

export default connect(
  MapStateToProps,
  {}
)(SelectedPerson);
