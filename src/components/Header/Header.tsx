import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.scss";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];

const Header = () => {
  const [shrink, setShrink] = useState<boolean>(false);

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.documentElement.scrollTop > 100) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div className={`${classes.header} ${shrink ? classes.shrink : ""}`}>
      <div className={`${classes.header__wrap}`}>
        <div>
          <Link className={classes.logo} to="/trending/page/1">
            🎥 moviees app 🎥
          </Link>
        </div>
        <ul className={classes.header__nav}>
          {headerNav.map((e: { display: string; path: string }, i: number) => (
            <li key={i}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
