import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/SingleMovie';

const App = () => {
  //Defining our routes and init the localStorage
  if (localStorage.getItem('favorites') === null) {
    localStorage.setItem('favorites', JSON.stringify([]));
  };
  
  return <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/movies/:id" children={<Movie />}>

    </Route>
  </Switch>
}

export default App
