import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useGenre from "../../hooks/useGenre";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { fetchContent } from "../../redux/content-slice";
import { minSpinnerLoading } from "../../utils/utils";
import { RootState } from "../../redux/redux-store";

import classes from "../Page.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(Number(useParams().page));
  const [loading, setLoading] = useState<boolean>(true);

  const { items, numOfPages, status } = useSelector(
    (state: RootState) => state.content
  );
  const { selectedGenres } = useSelector((state: RootState) => state.genres);

  const selectedGenresIDs = useGenre(selectedGenres);

  useEffect(() => {
    const url = `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenresIDs}`;
    // if (searchRef.current) {
    //   const urlWithKeyword = `search/keyword?api_key=80dc1b62b53614a86a341ab0b6fca265&query=${searchRef.current.value}&page=1`;
    //   console.log(searchRef.current.value);
    // }

    dispatch(fetchContent(url));
  }, [page, selectedGenresIDs, dispatch]);

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
      <Genres type="movie" setPage={setPage} />
      <SearchBar />
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
      {items && !loading && (
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
