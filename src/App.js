import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import PeopleList from './components/PeopleList';
import SelectedPerson from './components/SelectedPerson';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <PeopleList />
          <SelectedPerson />
        </div>
      </Provider>
    );
  }
}

export default App;
