import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/">
        🎥 moviees
      </Link>
    </header>
  );
};

export default Header;
