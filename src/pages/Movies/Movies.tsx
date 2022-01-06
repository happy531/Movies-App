import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchContent} from "../../redux/content-slice";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import {useParams} from "react-router";
import useGenre from "../../hooks/useGenre";

import Genre from "../../models/genre-model";

import classes from "../Page.module.scss";

const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(Number(useParams().page));
  const [loading, setLoading] = useState<boolean>(true);
  const [genres, setGenres] = useState<Array<Genre>>([]);
  const [selectedGenres, setSelectedGenres] = useState<Array<Genre>>([]);

  const selectedGenresIDs = useGenre(selectedGenres);
  // @ts-ignore
  const {items} = useSelector(state => state.content);
  // @ts-ignore
  const {numOfPages} = useSelector(state => state.content);

  useEffect(() => {
    const url =
        `movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenresIDs}`;

    setLoading(true);
    dispatch(fetchContent(url));
    setLoading(false);

  }, [page, selectedGenresIDs, dispatch]);

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
        {items &&
          !loading &&
            items.map((singleContent: any) => (
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
        {items.length === 0 && !loading && (
          <p className={classes["error-message"]}>
            No videos with such criteria ;(
          </p>
        )}
      </ul>
      {items.length > 0 && !loading && (
        <Pagination
          onSetPage={setPage}
          numOfPages={numOfPages}
          page_type="movie"
          defaultPage={page.toString()}
        />
      )}
    </>
  );
};

export default Movies;
