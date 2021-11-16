import React, { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { useParams } from "react-router";
import useGenre from "../../hooks/useGenre";

import Genre from "../../models/genre-model";
import { REACT_APP_API_KEY } from "../../config/env";

import classes from "../Page.module.scss";

const Movies: React.FC = () => {
  const [page, setPage] = useState<number>(Number(useParams().page));
  const [numOfPages, setNumOfPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<Array<any>>([]);
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<Genre>>([]);

  const selectedGenresIDs = useGenre(selectedGenres);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenresIDs}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);

      setLoading(false);
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
        {loading && <LoadingSpinner />}
        {content &&
          !loading &&
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
          ))}
        {content.length === 0 && !loading && (
          <p className={classes["error-message"]}>
            No videos with such criteria ;(
          </p>
        )}
        {content.length > 0 && !loading && (
          <Pagination
            onSetPage={setPage}
            numOfPages={numOfPages}
            page_type="movie"
            defaultPage={page.toString()}
          />
        )}
      </ul>
    </>
  );
};

export default Movies;
