import React from "react";

import classes from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={classes.header}>
      <span className={classes.logo}>Movies App</span>
    </div>
  );
};

export default Header;
