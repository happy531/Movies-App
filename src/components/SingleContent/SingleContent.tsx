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
          src={`${img_300}/${props.poster_path}` || unavailable}
          alt={props.title}
        />
        <VoteScore vote={props.vote} />
        <span className={classes.title}>{props.title}</span>
      </Link>
    </li>
  );
};

export default SingleContent;
