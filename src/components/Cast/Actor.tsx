import React from "react";
import classes from "./Actor.module.scss";

const handleDragStart = (e: any) => e.preventDefault();

interface Props {
  profile_path: string;
  name: string;
  character: string;
}

const Actor: React.FC<Props> = ({ profile_path, name, character }) => {
  return (
    <div className={classes.actor}>
      <img
        src={profile_path}
        alt={name}
        onDragStart={handleDragStart}
        className={classes.actor_img}
      />
      <span className={classes.actor_name}>{name}</span>
      <span className={classes.actor_character}>{character}</span>
    </div>
  );
};

export default Actor;
