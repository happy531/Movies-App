import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../UI/SearchBar";

import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/trending/page/1">
        🎥 moviees
      </Link>
      <SearchBar />
    </header>
  );
};

export default Header;
