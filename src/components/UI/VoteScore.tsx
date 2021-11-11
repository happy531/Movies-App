import React from "react";

import classes from "./VoteScore.module.scss";

const VoteScore: React.FC<{ vote: number }> = ({ vote }) => {
  function handleColorPick(vote: number): string {
    if (vote >= 7) return "#21D07A";
    else if (vote < 7 && vote >= 4) return "#B7BB2D";
    else return "#DB2360";
  }

  return (
    <div
      className={`${classes.vote}`}
      style={{ borderColor: handleColorPick(vote) }}
    >
      {vote}
    </div>
  );
};

export default VoteScore;
