import React, { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent/SingleContent";
import Pagination from "../../components/Pagination/Pagination";

import { REACT_APP_API_KEY } from "../../config/env";

import classes from "../Page.module.scss";

const Trending: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(1);
  const [content, setContent] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${REACT_APP_API_KEY}&page=${page}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
    };

    fetchTrending();
  }, [page]);

  return (
    <>
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
              media_type={singleContent.media_type}
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

export default Trending;
