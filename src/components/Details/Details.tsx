import React from "react";

import VoteScore from "../UI/VoteScore";
import YTtrailer from "../YTtrailer/YTtrailer";
import { img_300, unavailable } from "../../config/pictures_config";

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
    <section className={classes.details}>
      <div className={classes.details_poster}>
        <img
          src={
            details.poster_path
              ? `${img_300}/${details.poster_path}`
              : unavailable
          }
          alt={details.title || details.name}
        />
      </div>
      <section className={classes.details_main}>
        <h1>{details.title || details.name}</h1>
        <div className={classes.details_main__info}>
          <p>{details.release_date || details.first_air_date}</p>
          <p>{genres}</p>
          <p>{details.runtime || details.episode_run_time || "N/A"} mins</p>
        </div>
        <div className={classes.details_main__info}>
          <div className={classes.vote}>
            <VoteScore vote={details.vote_average} />
          </div>
          <YTtrailer trailer_url={`https://www.youtube.com/watch?v=${video}`} />
        </div>
        <div className={classes.details_main__info}>
          <span className={classes.tagline}>{details.tagline}</span>
        </div>
        <div className={classes.details_main__overview}>
          <h1>Overview</h1>
          <span>{details.overview}</span>
        </div>
        <div className={classes.details_main__additional}>
          <span className={classes.slice}>
            <span className={classes.slice__title}>Status</span>
            <p className={classes.slice__text}>{details.status}</p>
          </span>
          <span className={classes.slice}>
            <span className={classes.slice__title}>Budget</span>
            <p className={classes.slice__text}>
              {details.budget ? `$${details.budget}` : "N/A"}
            </p>
          </span>
          <span className={classes.slice}>
            <span className={classes.slice__title}>Revenue</span>
            <p className={classes.slice__text}>
              {details.revenue ? `$${details.revenue}` : "N/A"}
            </p>
          </span>
          <span className={classes.slice}>
            <span className={classes.slice__title}>Original Language</span>
            <p className={classes.slice__text}>{details.original_language}</p>
          </span>
        </div>
      </section>
    </section>
  );
};

export default Details;
