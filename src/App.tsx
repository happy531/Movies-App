import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { Container } from "@mui/material";

import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Favourites from "./pages/Favourites/Favourites";
import ContentDetail from "./pages/ContentDetail/ContentDetail";

import classes from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={classes.main}>
        <Container>
          <Routes>
            <Route path="/trending/page/:page" element={<Trending />} />
            <Route
              path="/trending"
              element={<Navigate to="/trending/page/1" />}
            />
            <Route path="/movie/page/:page" element={<Movies />} />
            <Route path="/movie" element={<Navigate to="/movie/page/1" />} />
            <Route path="/tv/page/:page" element={<Series />} />
            <Route path="/tv" element={<Navigate to="/tv/page/1" />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie/:id" element={<ContentDetail />} />
            <Route path="/tv/:id" element={<ContentDetail />} />
            <Route path="*" element={<Navigate to="/trending/page/1" />} />
          </Routes>
        </Container>
      </main>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
