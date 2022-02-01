import React from "react";

import classes from "./VoteScore.module.scss";

const VoteScore: React.FC<{ vote?: number }> = ({ vote }) => {
  function handleColorPick(vote: number | undefined): string {
    let color = "";
    if (vote) {
      if (vote >= 7) color = "#21D07A";
      else if (vote < 7 && vote >= 4) color = "#B7BB2D";
      else color = "#DB2360";
    }
    return color;
  }

  return (
    <div
      className={`${classes.vote}`}
      style={{ borderColor: handleColorPick(vote) }}
    >
      {vote && Math.round(vote * 10) / 10}
    </div>
  );
};

export default VoteScore;
