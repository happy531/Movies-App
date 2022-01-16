import React from "react";

import classes from "./Trailer.module.scss";

interface Props {
  trailerUrl: string;
}

const Trailer: React.FC<Props> = ({ trailerUrl }) => {
  const handleShowTrailer = () => {
    window.open(trailerUrl);
  };

  return (
    <span className={classes.trailer} onClick={handleShowTrailer}>
      <p>Play Trailer</p>
    </span>
  );
};

export default Trailer;
