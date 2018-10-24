import React, { Component } from 'react';
import { getPeople } from '../actions/getPeopleAction';
import { getPlanets } from '../actions/getPlanetsAction';
import { getSpecies } from '../actions/getSpeciesAction';
import { selectPerson } from '../actions/selectPersonAction';
import { connect } from 'react-redux';

class PeopleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      planets: [],
      species: [],
      gender: ['male', 'female', 'n/a']
    };
  }

  componentDidMount() {
    this.props.getPeople();
    this.props.getPlanets();
    this.props.getSpecies();
  }

  componentDidUpdate(prevProps) {
    const { people, planets, species } = this.props;
    if (people !== prevProps.people) {
      this.setState({ people: people });
    }
    if (planets !== prevProps.planets) {
      this.setState({ planets: planets });
    }
    if (species !== prevProps.species) {
      this.setState({ species: species });
    }
  }

  findPlanet = (person, planets) => {
    const planet = planets.find(
      planet => (planet === undefined ? null : planet.url === person.homeworld)
    );
    if (planet === undefined) {
      return 'Not found in db';
    }
    return planet.name;
  };

  findSpecies = (person, species) => {
    const personsSpecies = species.find(
      spec => (spec === undefined ? null : spec.url === person.species[0])
    );
    if (personsSpecies === undefined) {
      return 'Not found in db';
    }
    return personsSpecies.name;
  };

  personClicked = person => {
    this.props.selectPerson(person);
  };

  filterParams = (paramName, list) => {
    let arr = [];
    arr = arr.concat(list.find(item => item.name === paramName));
    return arr.map(param => param.url);
  };

  filterPeople = (p, value) => {
    const { people, planets, species } = this.props;
    if (value === 'All') return people;
    if (p === 'planetFilter') {
      const filteredPlanets = this.filterParams(value, planets);
      return people.filter(person =>
        filteredPlanets.includes(person.homeworld)
      );
    } else if (p === 'speciesFilter') {
      const filteredSpecies = this.filterParams(value, species);
      return people.filter(person =>
        filteredSpecies.includes(person.species[0])
      );
    } else if (p === 'genderFilter') {
      return people.filter(person => person.gender === value);
    }
  };

  filterList = (p, e) => {
    this.setState({
      people: this.filterPeople(p, e.target.value)
    });
  };

  render() {
    const { people, planets, species, gender } = this.state;
    const speciesList = species.map(s => (s === undefined ? null : s.name));
    return (
      <div>
        <table className="people-list-table">
          <tbody>
            <tr>
              <th>Character</th>
              <th>
                Home Planet{' '}
                <select onChange={e => this.filterList('planetFilter', e)}>
                  <option value="All">All</option>
                  {planets.length === 1 && planets[0] === {}
                    ? null
                    : planets.map(
                        (p, key) =>
                          p === undefined ? null : (
                            <option key={key} value={p.name}>
                              {p.name}
                            </option>
                          )
                      )}
                </select>
              </th>
              <th>
                Species{' '}
                <select onChange={e => this.filterList('speciesFilter', e)}>
                  <option value="All">All</option>
                  {speciesList.map(
                    (s, key) =>
                      s === undefined ? null : (
                        <option key={key} value={s}>
                          {s}
                        </option>
                      )
                  )}
                </select>
              </th>
              <th>
                Gender{' '}
                <select onChange={e => this.filterList('genderFilter', e)}>
                  <option value="All">All</option>
                  {gender.map((gender, key) => (
                    <option key={key} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
            {people.length &&
              people.map((person, key) => (
                <tr
                  className="table-content"
                  key={key}
                  onClick={() => this.personClicked(person)}
                >
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
  { getPeople, getPlanets, getSpecies, selectPerson }
)(PeopleList);
