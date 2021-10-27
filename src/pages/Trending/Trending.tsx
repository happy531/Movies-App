import axios from "axios";
import React, { useEffect, useState } from "react";

import SingleContent from "../../components/SingleContent/SingleContent";

import { REACT_APP_API_KEY } from "../../config/env";

import classes from './Trending.module.scss'

const Trending: React.FC = () => {
  const [content, setContent] = useState<Array<any>>([]);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${REACT_APP_API_KEY}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <ul className={classes['list-container']}>
      {content ? (
        content.map((singleContent) => (
          <SingleContent
            key={singleContent.id}
            id={singleContent.id}
            title={singleContent.title || singleContent.name}
            release_date={singleContent.release_date || singleContent.first_air_date}
            poster_path={singleContent.poster_path}
            backdrop_path={singleContent.backdrop_path}
            vote={singleContent.vote}
            media_type={singleContent.media_type}
          />
        ))
      ) : (
        <span>Sorry, something went wrong while fetching data ;(</span>
      )}
    </ul>
  );
};

export default Trending;
