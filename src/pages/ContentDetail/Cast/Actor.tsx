import React from "react";
import classes from "./Actor.module.scss";

interface Props {
  profile_path: string;
  name: string;
  character: string;
}

const Actor: React.FC<Props> = ({ profile_path, name, character }) => {
  return (
    <span className={classes.actor}>
      <img src={profile_path} alt={name} />
      <span className={classes.actor_name}>{name}</span>
      <span className={classes.actor_character}>{character}</span>
    </span>
  );
};

export default Actor;
