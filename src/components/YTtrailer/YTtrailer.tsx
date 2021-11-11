import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import classes from "./YTtrailer.module.scss";

interface Props {
  trailer_url: string;
}

const YTtrailer: React.FC<Props> = ({ trailer_url }) => {
  const handleShowTrailer = () => {
    window.open(trailer_url);
  };

  return (
    <div className={classes.yt_trailer} onClick={handleShowTrailer}>
      <PlayArrowIcon style={{ marginRight: "5" }} />
      <p>Play Trailer</p>
    </div>
  );
};

export default YTtrailer;
