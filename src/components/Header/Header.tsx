import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <Link className={classes.logo} to="/">Movies App</Link>
    </div>
  );
};

export default Header;
