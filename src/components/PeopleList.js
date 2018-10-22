import React, { Component } from 'react';
import { getPeople } from '../actions/getPeopleAction';
import { getPlanets } from '../actions/getPlanetsAction';
import { getSpecies } from '../actions/getSpeciesAction';
import { selectPerson } from '../actions/selectPersonAction';
import { connect } from 'react-redux';

class PeopleList extends Component {
  state = {
    people: [],
    planets: [],
    species: [],
    filteringParams: {
      planetFilter: 'all',
      speciesFilter: 'all',
      genderFilter: 'all'
    }
  };

  componentDidMount() {
    this.props.getPeople();
    this.props.getPlanets();
    this.props.getSpecies();
  }

  componentDidUpdate(prevState) {
    const { people, planets, species } = this.props;
    if (people !== prevState.people) {
      this.setState({ people: people });
    }
    if (planets !== prevState.planets) {
      this.setState({ planets: planets });
    }
    if (species !== prevState.species) {
      this.setState({ species: species });
    }
  }

  findPlanet = (person, planets) => {
    const planet = planets.find(planet => planet.url === person.homeworld);
    if (planet === undefined) {
      return 'Not found in db';
    }
    return planet.name;
  };

  findSpecies = (person, species) => {
    const personsSpecies = species.find(spec => spec.url === person.species[0]);
    if (personsSpecies === undefined) {
      return 'Not found in db';
    }
    return personsSpecies.name;
  };

  personClicked = person => {
    this.props.selectPerson(person);
  };

  filterList = (p, e) => {
    const { planet, spec, gender } = this.state.filteringParams;
    const { people, planets, species } = this.state;
    let filteredPeople = [];
    let filteredPlanet = {};
    switch (p) {
      case 'planets':
        this.setState({
          ...this.state,
          filteringParams: {
            ...this.state.filteringParams,
            planetFilter: e.target.value
          }
        });
        if (e.target.value === 'all' && spec === 'all' && gender === 'all') {
          this.setState({ people: people });
        } else {
          filteredPlanet = planets.find(
            planet => planet.name === e.target.value
          );
          filteredPeople = people.filter(
            person => person.homeworld === filteredPlanet.url
          );
        }
        break;
      case 'species':
        this.setState({
          ...this.state,
          filteringParams: {
            ...this.state.filteringParams,
            speciesFilter: e.target.value
          }
        });
        break;
      case 'gender':
        this.setState({
          ...this.state,
          filteringParams: {
            ...this.state.filteringParams,
            genderFilter: e.target.value
          }
        });
        filteredPeople = people.filter(
          person => person.gender === e.target.value
        );
        break;
      default:
        return;
    }

    this.setState({
      people: filteredPeople
    });
  };

  // planetFilter = e => {
  //   this.setState({ filteringParams: { planet: e.target.value } });
  //   if (e.target.value === 'all') {
  //     this.setState({ people: this.props.people });
  //     return;
  //   }
  //   const { planets } = this.state;
  //   const { people } = this.props;
  //   const filteredPlanet = planets.find(
  //     planet => planet.name === e.target.value
  //   );
  //   const filteredPeople = people.filter(
  //     person => person.homeworld === filteredPlanet.url
  //   );
  //   this.setState({ people: filteredPeople });
  // };
  // speciesFilter = e => {
  //   if (e.target.value === 'all') {
  //     return this.setState({ people: this.props.people });
  //   }
  //   const { species } = this.state;
  //   const { people } = this.props;
  //   const filteredSpecies = species.find(s => s.name === e.target.value);
  //   const filteredPeople = people.filter(
  //     person => person.species[0] === filteredSpecies.url
  //   );
  //   this.setState({ people: filteredPeople });
  // };
  // genderFilter = e => {
  //   if (e.target.value === 'all') {
  //     return this.setState({ people: this.props.people });
  //   }

  //   const { people } = this.props;

  //   const filteredPeople = people.filter(
  //     person => person.gender === e.target.value
  //   );
  //   this.setState({ people: filteredPeople });
  // };

  render() {
    const { people, planets, species } = this.state;
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Character</th>
              <th>
                Home Planet{' '}
                <select onChange={e => this.filterList('planets', e)}>
                  <option value="all">all</option>
                  {planets.map((p, key) => (
                    <option key={key} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                Species{' '}
                <select onChange={e => this.filterList('species', e)}>
                  <option value="all">all</option>
                  {species.map((s, key) => (
                    <option key={key} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                Gender{' '}
                <select onChange={e => this.filterList('gender', e)}>
                  <option value="all">all</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="n/a">n/a</option>
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
