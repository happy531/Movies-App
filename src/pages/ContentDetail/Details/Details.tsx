import React from "react";
import { useSelector } from "react-redux";
import Trailer from "../../../components/Trailer/Trailer";

import {
  img_300,
  img_original,
  unavailable,
  unavailableLandscape,
} from "../../../config/pictures_config";

import Genre from "../../../models/genre-model";

import classes from "./Details.module.scss";

const Details: React.FC = () => {
  const { details, video } = useSelector(
    // @ts-ignore
    (state) => state.details
  );

  return (
    <>
      <div
        className={classes.banner}
        style={{
          backgroundImage: details.backdrop_path
            ? `url(${img_original}/${details.backdrop_path})`
            : unavailableLandscape,
        }}
      />
      <div className={classes["movie-content"]}>
        <div className={classes["movie-content__poster"]}>
          <div
            className={classes["movie-content__poster__img"]}
            style={{
              backgroundImage: `url(${
                details.poster_path
                  ? `${img_300}/${details.poster_path}`
                  : unavailable
              })`,
            }}
          />
        </div>
        <div className={classes["movie-content__info"]}>
          <h1 className={classes.title}>{details.title || details.name}</h1>
          <div className={classes.genres}>
            {details.genres &&
              details.genres.slice(0, 5).map((genre: Genre, i: number) => (
                <span key={i} className={classes.genres__item}>
                  {genre.name}
                </span>
              ))}
            {details.runtime && (
              <span className={classes.runtime}>{details.runtime} min</span>
            )}
          </div>
          <Trailer trailerUrl={`https://www.youtube.com/watch?v=${video}`} />
          <span className={classes.tagline}>{details.tagline}</span>
          <span className={classes.overview}>{details.overview}</span>
        </div>
      </div>
    </>
  );
};

export default Details;
