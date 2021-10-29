import React, { useState } from "react";
import { img_300, unavailable } from "../../config/pictures_config";

import { SingleContentModel } from "../../models/single-content-model";

import FavoriteIcon from "@mui/icons-material/Favorite";

import classes from "./SingleContent.module.scss";

const SingleContent: React.FC<SingleContentModel> = (props) => {
  const [favourite, setFavourite] = useState<boolean>(false);

  return (
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
      <span className={classes.title}>{props.title}</span>
      <div className={classes.info}>
        <span className={classes.release}>{props.release_date}</span>
        <span className={classes.type}>
          {props.media_type === "tv" ? "series" : props.media_type}
        </span>
      </div>
    </li>
  );
};

export default SingleContent;
