import React, { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";

import GenreModel from "../../models/genre-model";
import useGenre from "../../hooks/useGenre";

import { REACT_APP_API_KEY } from "../../config/env";
import classes from "../Page.module.scss";

// import { useSelector, useDispatch } from "react-redux";
// import { fetchMovies } from "../../redux-store/movies-slice";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(1);
  const [content, setContent] = useState<Array<any>>([]);
  const [genres, setGenres] = useState<Array<GenreModel>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<GenreModel>>([]);

  const selectedGenresIDs = useGenre(selectedGenres);

  // const cont = useSelector((s: any) => s.movies.content);
  // console.log(cont);
  // const dispatch = useDispatch();
  // dispatch(fetchMovies());

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenresIDs}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    };

    fetchMovies();
  }, [page, selectedGenresIDs]);

  return (
    <>
      <Genres
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        type="movie"
        setPage={setPage}
      />
      <ul className={classes["list-container"]}>
        {content ? (
          content.map((singleContent) => (
            <SingleContent
              key={singleContent.id}
              id={singleContent.id}
              title={singleContent.title || singleContent.name}
              release_date={
                singleContent.release_date || singleContent.first_air_date
              }
              poster_path={singleContent.poster_path}
              backdrop_path={singleContent.backdrop_path}
              vote={singleContent.vote_average}
              media_type="movie"
            />
          ))
        ) : (
          <p className={classes["error-message"]}>
            Sorry, something went wrong while fetching data ;(
          </p>
        )}
        {content.length === 0 && (
          <p className={classes["error-message"]}>
            No videos with such criteria ;(
          </p>
        )}
        <Pagination onSetPage={setPage} numOfPages={numOfPages} />
      </ul>
    </>
  );
};

export default Movies;
