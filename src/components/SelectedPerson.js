import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedPerson extends Component {
  render() {
    const { person } = this.props;
    return (
      <div className="selected-person">
        <p>Name: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Skin Color: {person.skin_color}</p>
        <p>Birth Year: {person.birth_year}</p>
      </div>
    );
  }
}

const MapStateToProps = state => ({
  person: state.selectedPerson
});

export default connect(
  MapStateToProps,
  {}
)(SelectedPerson);
