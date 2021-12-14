import React from "react";
import { img_300, unavailable } from "../../config/pictures_config";

import { Link } from "react-router-dom";

import VoteScore from "../UI/VoteScore";

import SingleContentModel from "../../models/single-content-model";

import classes from "./SingleContent.module.scss";

const SingleContent: React.FC<SingleContentModel> = (props) => {
  return (
    <li>
      <Link
        to={`/${props.media_type}/${props.id}`}
        className={classes.container}
      >
        <img
          className={classes.poster}
          src={`${img_300}/${props.poster_path}` || unavailable}
          alt={props.title}
        />
        <VoteScore vote={props.vote} />
        <span className={classes.title}>{props.title}</span>
        <div className={classes.info}>
          <span className={classes.release}>{props.release_date}</span>
          <span className={classes.type}>{props.media_type}</span>
        </div>
      </Link>
    </li>
  );
};

export default SingleContent;
