import React from "react";

import VoteScore from "../UI/VoteScore";
import YTtrailer from "../YTtrailer/YTtrailer";
import { img_500, unavailable } from "../../config/pictures_config";

import classes from "./Details.module.scss";

// interface Props {
//     poster_path: string;
//     title: string;
//     name: string;
//     release_date: string;
//     first_air_date: string;
//
// }

interface Props {
  details: any;
  video: string;
  genres: Array<string>;
}

const Details: React.FC<Props> = ({ details, video, genres }) => {
  return (
    <section className={classes.main_content}>
      <div className={classes.poster}>
        <img
          src={
            details.poster_path
              ? `${img_500}/${details.poster_path}`
              : unavailable
          }
          alt={details.title || details.name}
        />
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
          <YTtrailer trailer_url={`https://www.youtube.com/watch?v=${video}`} />
        </div>
        <div className={classes.info}>
          <span className={classes.tagline}>{details.tagline}</span>
        </div>
        <div className={classes.overview}>
          <h1>Overview</h1>
          <span style={{ marginTop: "5px" }}>{details.overview}</span>
        </div>
      </section>
    </section>
  );
};

export default Details;
