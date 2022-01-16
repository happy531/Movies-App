import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Carousel from "../../components/Carousel/Carousel";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { fetchHomeContent } from "../../redux/home-slice";
import { minSpinnerLoading } from "../../utils/utils";
import { RootState } from "../../redux/redux-store";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { trendingMovies, trendingTv, topRatedMovies, topRatedTv, status } =
    useSelector((state: RootState) => state.home);

  useEffect(() => {
    dispatch(fetchHomeContent());
  }, [dispatch]);

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
    <div style={{ minHeight: "20vh" }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Carousel header={"Trending Movies"} items={trendingMovies} />
          <Carousel header={"Trending Tv"} items={trendingTv} />
          <Carousel header={"Top Rated Movies"} items={topRatedMovies} />
          <Carousel header={"Top Rated Tv"} items={topRatedTv} />
        </>
      )}
    </div>
  );
};

export default Home;
