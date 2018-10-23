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
      gender: ['male', 'female', 'n/a'],
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
    // if (this.state.people !== prevState.people) {
    //   this.setState({
    //     planets: this.state.people.map(
    //       person =>
    //         person.homeworld === undefined
    //           ? 'undefined'
    //           : planets.find(planet => planet.url === person.homeworld)
    //     ),
    //     species: this.state.people.map(person =>
    //       species.find(s => s.url === person.species[0])
    //     ),
    //     gender: this.removeDuplicates(
    //       this.state.people.map(person => person.gender)
    //     )
    //   });
    // }
    if (people !== prevProps.people) {
      this.setState({ people: people });
    }
    if (planets !== prevProps.planets) {
      this.setState({ planets: planets });
    }
    if (species !== prevProps.species) {
      this.setState({ species: species });
    }
    // if (Object.values(filteringParams).find(value => value !== 'All')) {
    //   if (
    //     filteringParams.planetFilter !== prevState.filteringParams.planetFilter
    //   ) {
    //     if (filteringParams.planetFilter === 'All')
    //       this.setState({
    //         filteringOrder: filteringOrder.filter(
    //           param => param !== 'planetFilter'
    //         )
    //       });
    //     if (
    //       !filteringOrder.includes('planetFilter') &&
    //       filteringParams.planetFilter !== 'All'
    //     )
    //       this.setState({
    //         filteringOrder: [...filteringOrder, 'planetFilter']
    //       });
    //   }
    //   if (
    //     filteringParams.speciesFilter !==
    //     prevState.filteringParams.speciesFilter
    //   ) {
    //     if (filteringParams.speciesFilter === 'All')
    //       this.setState({
    //         filteringOrder: filteringOrder.filter(
    //           param => param !== 'speciesFilter'
    //         )
    //       });
    //     if (
    //       !filteringOrder.includes('speciesFilter') &&
    //       filteringParams.speciesFilter !== 'All'
    //     )
    //       this.setState({
    //         filteringOrder: [...filteringOrder, 'speciesFilter']
    //       });
    //   }
    //   if (
    //     filteringParams.genderFilter !== prevState.filteringParams.genderFilter
    //   ) {
    //     if (filteringParams.genderFilter === 'All')
    //       this.setState({
    //         filteringOrder: filteringOrder.filter(
    //           param => param !== 'genderFilter'
    //         )
    //       });
    //     if (
    //       !filteringOrder.includes('genderFilter') &&
    //       filteringParams.genderFilter !== 'All'
    //     )
    //       this.setState({
    //         filteringOrder: [...filteringOrder, 'genderFilter']
    //       });
    //   }
    // } else if (
    //   Object.values(prevState.filteringParams).find(value => value !== 'All') &&
    //   !Object.values(filteringParams).find(value => value !== 'All')
    // ) {
    //   this.setState({ filteringOrder: [] });
    // }
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
    return list.find(item => item.name === paramName);
  };

  filterPeople = (p, value) => {
    const { filteringOrder } = this.state;
    const { people, planets, species } = this.props;
    if (p === 'planetFilter') {
      const filteredPlanet = this.filterParams(value, planets);
      const filteredPeople = people.filter(
        person => person.homeworld === filteredPlanet.url
      );
      return filteredPeople;
    } else if (p === 'speciesFilter') {
      const filteredspecies = this.filterParams(value, species);
      const filteredPeople = people.filter(
        person => person.species[0] === filteredspecies.url
      );
      return filteredPeople;
    } else if (p === 'genderFilter') {
      const filteredPeople = people.filter(person => person.gender === value);
      return filteredPeople;
    }
  };

  filterList = (p, e) => {
    this.setState({
      people: this.filterPeople(p, e.target.value),
      planets: this.filterPeople(p, e.target.value).map(person =>
        this.props.planets.find(planet => planet.url === person.homeworld)
      ),
      species: this.filterPeople(p, e.target.value).map(person =>
        this.props.species.find(s => s.url === person.species[0])
      ),
      gender: this.filterPeople(p, e.target.value).map(person => person.gender)
    });
  };

  removeDuplicates = arr => {
    return arr.filter(function(item, index) {
      return arr.indexOf(item) >= index;
    });
  };

  dropdownList = arr => {
    this.removeDuplicates(arr.map(item => item.name));
  };

  render() {
    const { people, planets, species, gender } = this.state;
    const speciesList = this.removeDuplicates(
      species.map(s => (s === undefined ? null : s.name))
    );
    const genderList = this.removeDuplicates(gender);
    return (
      <div>
        <table>
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
                  {genderList.map((gender, key) => (
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
