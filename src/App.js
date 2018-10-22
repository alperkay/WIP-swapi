import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import PeopleList from './components/PeopleList';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <PeopleList />
        </div>
      </Provider>
    );
  }
}

export default App;
