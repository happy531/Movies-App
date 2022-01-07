import React, {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import useGenre from "../../hooks/useGenre";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import Genres from "../../components/Genres/Genres";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import {fetchContent} from "../../redux/content-slice";
import {minSpinnerLoading} from "../../utils/utils";

import classes from "../Page.module.scss";

const Series: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(Number(useParams().page));
  const [loading, setLoading] = useState<boolean>(false);

  // @ts-ignore
  const {items, numOfPages, status} = useSelector(state => state.content);
  // @ts-ignore
  const {selectedGenres} = useSelector(state => state.genres);
  const selectedGenresIDs = useGenre(selectedGenres);

  useEffect(() => {
    const url =
        `tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&with_genres=${selectedGenresIDs}`;

    dispatch(fetchContent(url));

  }, [page, selectedGenresIDs, dispatch]);

  useEffect(() => {
    if(status==="loading") {
      setLoading(true);
    }
    else {
      setTimeout(() => {setLoading(false)}, minSpinnerLoading);
    }
  }, [status]);

  return (
    <>
      <Genres
        type="tv"
        setPage={setPage}
      />
      <ul className={classes["list-container"]}>
        {loading && <LoadingSpinner />}
        {!loading && items &&
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
              media_type="tv"
            />
          ))}
        {!items && !loading && (
          <p className={classes["error-message"]}>
            No videos with such criteria ;(
          </p>
        )}
      </ul>
      {items.length > 0 && !loading && (
        <Pagination
          onSetPage={setPage}
          numOfPages={numOfPages}
          page_type="tv"
          defaultPage={page.toString()}
        />
      )}
    </>
  );
};

export default Series;
