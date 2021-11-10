import React, { useState } from "react";
import { img_300, unavailable } from "../../config/pictures_config";

import SingleContentModel from "../../models/single-content-model";

import FavoriteIcon from "@mui/icons-material/Favorite";

import classes from "./SingleContent.module.scss";
import VoteScore from "../UI/VoteScore";
import { Link, useLocation } from "react-router-dom";

const SingleContent: React.FC<SingleContentModel> = (props) => {
  const [favourite, setFavourite] = useState<boolean>(false);
  const location = useLocation();
  return (
    <>
      <Link
        to={`/${props.media_type}/${props.id}`}
        style={{ textDecoration: "none" }}
      >
        <li className={classes.container}>
          <span
            className={`${classes.favourite} ${favourite && classes.active}`}
            onClick={() => setFavourite(!favourite)}
          >
            <FavoriteIcon
              className={`${classes.icon} ${favourite && classes.active}`}
            />
          </span>
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
        </li>
      </Link>
    </>
  );
};

export default SingleContent;
