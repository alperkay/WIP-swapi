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
      filteringParams: {
        planetFilter: 'All',
        speciesFilter: 'All',
        genderFilter: 'All'
      },
      filteringOrder: []
    };
  }

  componentDidMount() {
    this.props.getPeople();
    this.props.getPlanets();
    this.props.getSpecies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { people, planets, species } = this.props;
    const { filteringParams, filteringOrder } = this.state;
    if (people !== prevProps.people) {
      this.setState({ people: people });
    }
    if (planets !== prevProps.planets) {
      this.setState({ planets: planets });
    }
    if (species !== prevProps.species) {
      this.setState({ species: species });
    }
    if (Object.values(filteringParams).find(value => value !== 'All')) {
      if (
        filteringParams.planetFilter !== prevState.filteringParams.planetFilter
      ) {
        if (filteringParams.planetFilter === 'All')
          this.setState({
            filteringOrder: filteringOrder.filter(param => param !== 'planet')
          });
        if (
          !filteringOrder.includes('planet') &&
          filteringParams.planetFilter !== 'All'
        )
          this.setState({ filteringOrder: [...filteringOrder, 'planet'] });
      }
      if (
        filteringParams.speciesFilter !==
        prevState.filteringParams.speciesFilter
      ) {
        if (filteringParams.speciesFilter === 'All')
          this.setState({
            filteringOrder: filteringOrder.filter(param => param !== 'species')
          });
        if (
          !filteringOrder.includes('species') &&
          filteringParams.speciesFilter !== 'All'
        )
          this.setState({ filteringOrder: [...filteringOrder, 'species'] });
      }
      if (
        filteringParams.genderFilter !== prevState.filteringParams.genderFilter
      ) {
        if (filteringParams.genderFilter === 'All')
          this.setState({
            filteringOrder: filteringOrder.filter(param => param !== 'gender')
          });
        if (
          !filteringOrder.includes('gender') &&
          filteringParams.genderFilter !== 'All'
        )
          this.setState({ filteringOrder: [...filteringOrder, 'gender'] });
      }
    } else if (
      Object.values(prevState.filteringParams).find(value => value !== 'All') &&
      !Object.values(filteringParams).find(value => value !== 'All')
    ) {
      this.setState({ filteringOrder: [] });
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

  filterParams = (paramName, list) => {
    return list.find(item => item.name === paramName);
  };

  filterList = (p, e) => {
    const {
      people,
      planets,
      species,
      filteringParams,
      filteringOrder
    } = this.state;
    const {
      planetFilter,
      speciesFilter,
      genderFilter
    } = this.state.filteringParams;
    this.setState({
      filteringParams: { ...filteringParams, [p]: e.target.value }
    });
  };

  render() {
    const { people, planets, species } = this.state;
    const planetsArray = ['All'].concat(planets.map(planet => planet.name));
    const speciesArray = ['All'].concat(species.map(s => s.name));
    const genderArray = ['All', 'male', 'female', 'n/a'];
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Character</th>
              <th>
                Home Planet{' '}
                <select onChange={e => this.filterList('planetFilter', e)}>
                  {planetsArray.map((p, key) => (
                    <option key={key} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                Species{' '}
                <select onChange={e => this.filterList('speciesFilter', e)}>
                  {speciesArray.map((s, key) => (
                    <option key={key} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                Gender{' '}
                <select onChange={e => this.filterList('genderFilter', e)}>
                  {genderArray.map((gender, key) => (
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
