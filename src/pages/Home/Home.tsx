import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchContent } from "../../redux/content-slice";
import { minSpinnerLoading } from "../../utils/utils";
import SingleContent from "../../components/SingleContent/SingleContent";
import Slider from "react-slick";
import { slider_settings } from "../../config/slider-config";
// import LoadingSpinner from "../../components/UI/LoadingSpinner";
// import classes from "../Page.module.scss";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  // @ts-ignore
  const { items, status } = useSelector((state) => state.content);

  const url = `/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
  useEffect(() => {
    dispatch(fetchContent(url));
  }, [dispatch, url]);

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
      <h1 style={{ fontSize: "18px", marginLeft: "7px" }}>Trending Movies</h1>
      <Slider {...slider_settings}>
        {!loading &&
          items &&
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
      </Slider>
    </>
  );
};

export default Home;
