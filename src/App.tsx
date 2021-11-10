import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import { Container } from "@mui/material";

import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Favourites from "./pages/Favourites/Favourites";

import classes from "./App.module.scss";
import ContentDetail from "./pages/ContentDetail/ContentDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className={classes.main}>
        <Container>
          <Routes>
            <Route path="/trending" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie/:id" element={<ContentDetail />} />
            <Route path="/tv/:id" element={<ContentDetail />} />
            <Route path="*" element={<Navigate to="/trending" />} />
          </Routes>
        </Container>
      </main>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
