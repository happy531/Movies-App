import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";

import {fetchContent} from '../../redux/content-slice';
import {minSpinnerLoading} from "../../utils/utils";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "../Page.module.scss";

const Trending: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(Number(useParams().page));
  const [loading, setLoading] = useState<boolean>(false);

  // @ts-ignore
  const {items, numOfPages, status} = useSelector(state => state.content);

  const url = `trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
  useEffect(() => {
    dispatch(fetchContent(url));

  }, [page, dispatch, url]);

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
      <ul className={classes["list-container"]}>
        {loading && <LoadingSpinner />}
        {!loading && items &&
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
