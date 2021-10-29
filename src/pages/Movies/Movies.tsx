import React, { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";

import { REACT_APP_API_KEY } from "../../config/env";

import classes from "../Trending/Trending.module.scss";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(1);
  const [content, setContent] = useState<Array<any>>([]);
  const [genres, setGenres] = useState<Array<any>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    };

    fetchMovies();
  }, [page]);

  return (
    <>
      <Genres
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        type="movie"
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
          <span>Sorry, something went wrong while fetching data ;(</span>
        )}
        <Pagination onSetPage={setPage} numOfPages={numOfPages} />
      </ul>
    </>
  );
};

export default Movies;
