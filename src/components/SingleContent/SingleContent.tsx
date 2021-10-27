import React from "react";
import { img_300, unavailable } from "../../config/pictures_config";

import { SingleContentModel } from "../../models/single-content-model";

import classes from "./SingleContent.module.scss";

const SingleContent: React.FC<SingleContentModel> = (props) => {
  return (
    <li className={classes.container}>
      <img
        className={classes.poster}
        src={`${img_300}/${props.poster_path}` || unavailable}
        alt={props.title}
      />
      <span className={classes.title}>{props.title}</span>
      <div className={classes.info}>
        <span className={classes.release}>{props.release_date}</span>
        <span className={classes.type}>
          {props.media_type === "movie" ? "Movie" : "Series"}
        </span>
      </div>
    </li>
  );
};

export default SingleContent;
