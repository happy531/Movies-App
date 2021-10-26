import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation";
import { Container } from "@mui/material";

import Trending from './pages/Trending'
import Movies from './pages/Movies'
import Series from './pages/Series'
import Favourites from './pages/Favourites'

import classes from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={classes.app}>
        <Container>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/trending"/>
            </Route>
            <Route path="/trending" component={Trending}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/series" component={Series}/>
            <Route path="/favourites" component={Favourites}/>
            <Route path="*">
              <Redirect to="/trending" />
            </Route>
          </Switch>
        </Container>
      </main>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
