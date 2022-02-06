import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useGenre from "../../hooks/useGenre";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import SearchBar from "../../components/SearchBar/SearchBar";

import { fetchContent } from "../../redux/content-slice";
import { minSpinnerLoading } from "../../utils/utils";
import { RootState } from "../../redux/redux-store";

import classes from "../Page.module.scss";
import { genreActions } from "../../redux/genre-slice";

const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(Number(useParams().page));
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState<string>("");

  const { items, numOfPages, status } = useSelector(
    (state: RootState) => state.content
  );
  const { selectedGenres } = useSelector((state: RootState) => state.genres);

  const selectedGenresIDs = useGenre(selectedGenres);

  useEffect(() => {
    const url = `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenresIDs}`;
    if (!keyword) {
      dispatch(fetchContent(url));
    }
  }, [page, selectedGenresIDs, dispatch, keyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        console.log("trigger");
        dispatch(genreActions.clearSelectedGenres());
        const urlWithKeyword = `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=true`;
        dispatch(fetchContent(urlWithKeyword));
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [dispatch, keyword]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, minSpinnerLoading);
    }
  }, [status]);

  return (
    <>
      <Genres type="movie" setPage={setPage} setKeyword={setKeyword} />
      <SearchBar keyword={keyword} onSetKeyword={setKeyword} />
      <ul className={classes["list-container"]}>
        {loading && <LoadingSpinner />}
        {items &&
          !loading &&
          items.map((singleContent: any) => (
            <SingleContent
              key={singleContent.id}
              id={singleContent.id}
              title={singleContent.title || singleContent.name}
              poster_path={singleContent.poster_path}
              vote={singleContent.vote_average}
              media_type="movie"
            />
          ))}
        {!items && !loading && (
          <p className={classes["error-message"]}>
            No videos with such criteria ;(
          </p>
        )}
      </ul>
      {!loading && numOfPages > 1 && !keyword && (
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
