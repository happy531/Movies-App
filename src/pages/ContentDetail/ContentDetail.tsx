import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  img_500,
  img_original,
  unavailable,
  unavailableLandscape,
} from "../../config/pictures_config";

import VoteScore from "../../components/UI/VoteScore";
import YTtrailer from "../../components/YTtrailer/YTtrailer";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import Cast from '../../components/Cast/Cast'

import { useLocation } from "react-router";

import Genre from "../../models/genre-model";
import { REACT_APP_API_KEY } from "../../config/env";

import classes from "./ContentDetail.module.scss";

interface Props {}

const ContentDetail: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<any>({});
  const [video, setVideo] = useState<string>();
  const [cast, setCast] = useState<Array<any>>([]);
  const [genres, setGenres] = useState<Array<string>>([]);

  const detail_path = useLocation().pathname;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setDetails(data);
      setGenres(data.genres.map((g: Genre) => `${g.name} / `));
    };
    fetchDetails();

    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}/videos?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    };
    fetchVideo();

    const fetchCast = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setCast(data.cast);

      setLoading(false);
    };
    fetchCast();
  }, [detail_path]);

  return (
    <section className={classes.container}>
      {!loading && (
        <div
          className={classes.backdrop}
          style={{
            backgroundImage: details.backdrop_path
              ? `url(${img_original}/${details.backdrop_path})`
              : unavailableLandscape,
          }}
        />
      )}
      <section className={classes.main_content}>
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            <div className={classes.poster}>
              <img
                src={
                  details.poster_path
                    ? `${img_500}/${details.poster_path}`
                    : unavailable
                }
                alt=""
              />
            </div>
            <section className={classes.details}>
              <h1>{details.title || details.name}</h1>
              <div className={classes.info}>
                <p>{details.release_date || details.first_air_date}</p>
                <p>{genres}</p>
                <p>
                  {details.runtime || details.episode_run_time || "N/A"} mins
                </p>
              </div>
              <div className={classes.info}>
                <div className={classes.vote_container}>
                  <VoteScore vote={details.vote_average} />
                </div>
                <YTtrailer
                  trailer_url={`https://www.youtube.com/watch?v=${video}`}
                />
              </div>
              <div className={classes.info}>
                <span className={classes.tagline}>{details.tagline}</span>
              </div>
              <div className={classes.overview}>
                <h1>Overview</h1>
                <span style={{ marginTop: "5px" }}>{details.overview}</span>
              </div>
              <div className={classes.cast}>
                <Cast cast={cast} />
              </div>
            </section>
          </>
        )}
      </section>
    </section>
  );
};

export default ContentDetail;
