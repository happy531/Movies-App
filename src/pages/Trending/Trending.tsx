import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchContent} from '../../redux/content-slice';

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import {useParams} from "react-router";

import classes from "../Page.module.scss";

const Trending: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(Number(useParams().page));

  // @ts-ignore
  const {items} = useSelector(state => state.content);
  // @ts-ignore
  const {numOfPages} = useSelector(state => state.content);

  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
  useEffect(() => {
    setLoading(true);
    dispatch(fetchContent(url));
    setLoading(false);

  }, [page, dispatch, url]);

  return (
    <>
      <ul className={classes["list-container"]}>
        {loading && <LoadingSpinner />}
        {items &&
            items.map(
            (singleContent: any) =>
              singleContent.title && (
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
                  media_type={singleContent.media_type}
                />
              )
          )}
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
          page_type="trending"
          defaultPage={page.toString()}
        />
      )}
    </>
  );
};

export default Trending;
