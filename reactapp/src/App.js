import Game from './Game';
import Home from './Home';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import players from './reducers/players'
import game from './reducers/game'
const store = createStore(combineReducers( { players, game } ))



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            < Home />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/dice">
            <Game />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;