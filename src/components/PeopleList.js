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
      gender: ['All', 'male', 'female', 'n/a']
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
      return 'n/a';
    }
    return planet.name;
  };

  findSpecies = (person, species) => {
    const personsSpecies = species.find(
      spec => (spec === undefined ? null : spec.url === person.species[0])
    );
    if (personsSpecies === undefined) {
      return 'n/a';
    }
    return personsSpecies.name;
  };

  personClicked = person => {
    this.props.selectPerson(person);
  };

  //for filtering the planets and species
  filterParams = (paramName, list) => {
    let arr = [];
    arr = arr.concat(list.find(item => item.name === paramName));
    return arr.map(param => param.url);
  };

  //filtering people based on what's selected on the dropdowns
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

  //setting the component state based on selection
  filterList = (p, e) => {
    this.setState({
      people: this.filterPeople(p, e.target.value)
    });
  };

  render() {
    const { people, planets, species, gender } = this.state;
    return (
      <div>
        <table className="people-list-table">
          <tbody>
            <tr>
              <th>Character</th>
              <th>
                Home Planet
                <select onChange={e => this.filterList('planetFilter', e)}>
                  <option value="All">All</option>
                  {planets.map((p, key) => (
                    <option key={key} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                Species
                <select onChange={e => this.filterList('speciesFilter', e)}>
                  <option value="All">All</option>
                  {species.map((s, key) => (
                    <option key={key} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                Gender
                <select onChange={e => this.filterList('genderFilter', e)}>
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
                  <td>{this.findPlanet(person, planets)}</td>
                  <td>{this.findSpecies(person, species)}</td>
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
