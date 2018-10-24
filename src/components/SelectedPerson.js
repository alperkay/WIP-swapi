import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedPerson extends Component {
  render() {
    const { person, planets } = this.props;
    const planet = planets.find(planet => planet.url === person.homeworld);
    return (
      <div className="card">
        <div className="container">
          <table className="card-table">
            <tbody>
              <tr>
                <th>
                  <b>Name:</b>
                </th>
                <td>{person.name}</td>
              </tr>
              <tr>
                <th>
                  <b>Height:</b>
                </th>
                <td>{person.height}</td>
              </tr>
              <tr>
                <th>
                  <b>Mass:</b>
                </th>
                <td>{person.mass}</td>
              </tr>
              <tr>
                <th>
                  <b>Hair Color:</b>
                </th>
                <td>{person.hair_color}</td>
              </tr>
              <tr>
                <th>
                  <b>Birth Year:</b>
                </th>
                <td>{person.birth_year}</td>
              </tr>
              <tr>
                <th>
                  <b>Homeworld:</b>
                </th>
                <td>{planet && planet.name}</td>
              </tr>
              <tr>
                <th>
                  <b>Population:</b>
                </th>
                <td>{planet && planet.population}</td>
              </tr>
              <tr>
                <th>
                  <b>Climate:</b>
                </th>
                <td>{planet && planet.climate}</td>
              </tr>
              <tr>
                <th>
                  <b>Terrain:</b>
                </th>
                <td>{planet && planet.terrain}</td>
              </tr>
            </tbody>
          </table>
        </div>
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
