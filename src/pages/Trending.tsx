import axios from "axios";
import React, { useEffect, useState } from "react";

import SingleContent from "../components/SingleContent/SingleContent";
import { SingleContentModel } from "../models/single-content-model";

import { REACT_APP_API_KEY } from "../config/env";

const Trending: React.FC = () => {
  const [content, setContent] = useState<Array<SingleContentModel>>([]);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${REACT_APP_API_KEY}`
    );
    const { results } = await data;
    console.log(results);
    setContent(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      {content ? (
        content.map((singleContent) => (
          <SingleContent
            key={singleContent.id}
            id={singleContent.id}
            title={singleContent.title}
            release_date={singleContent.release_date}
            poster_image={singleContent.poster_image}
            backdrop_image={singleContent.backdrop_image}
            vote={singleContent.vote}
          />
        ))
      ) : (
        <span>Sorry, something went wrong while fetching data ;(</span>
      )}
    </div>
  );
};

export default Trending;
