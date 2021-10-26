import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation";
import { Container } from "@mui/material";

import classes from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={classes.app}>
        <Container>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/trending" />
            </Route>
            <Route path="/trending" />
            <Route path="/movies" />
            <Route path="/series" />
            <Route path="/favourites" />
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
