import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { REACT_APP_API_KEY } from "../../config/env";
import { img_500, img_original } from "../../config/pictures_config";
import Dot from "@mui/icons-material/FiberManualRecord";

import Genre from "../../models/genre-model";

import classes from "./ContentDetail.module.scss";
import VoteScore from "../../components/UI/VoteScore";
import YTtrailer from "../../components/YTtrailer/YTtrailer";

interface Props {}

const ContentDetail: React.FC<Props> = () => {
  const [details, setDetails] = useState<any>({});
  const [video, setVideo] = useState<string>();
  const [credits, setCredits] = useState<Array<any>>([]);
  const [genres, setGenres] = useState<Array<string>>([]);

  const detail_path = useLocation().pathname;

  useEffect(() => {
    const fetchDetails = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setDetails(data);
      setGenres(data.genres.map((g: Genre) => `${g.name} / `));
      console.log(data);
    };
    fetchDetails();

    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}/videos?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
      console.log(data.results[0]?.key);
    };
    fetchVideo();

    const fetchCredits = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setCredits(data.cast);
      console.log(data.cast);
    };
    fetchCredits();
  }, []);

  return (
    <section className={classes.container}>
      <div
        className={classes.backdrop}
        style={{
          backgroundImage: `url(${img_original}/${details.backdrop_path})`,
        }}
      />
      <section className={classes.main_content}>
        <div className={classes.poster}>
          <img src={`${img_500}/${details.poster_path}`} alt="" />
        </div>
        <section className={classes.details}>
          <h1>{details.title || details.name}</h1>
          <div className={classes.info}>
            <p>{details.release_date || details.first_air_date}</p>
            <p>{genres}</p>
            <p>{details.runtime || details.episode_run_time || "N/A"} mins</p>
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
            <h2>Overview</h2>
            <span style={{ marginTop: "5px"}}>{details.overview}</span>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ContentDetail;
