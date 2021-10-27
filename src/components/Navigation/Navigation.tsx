import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TrendingIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TVSeriesIcon from "@mui/icons-material/Tv";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [value, setValue] = React.useState<number>(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <BottomNavigation
        style={{ backgroundColor: "rgb(12, 12, 12)" }}
        showLabels
        value={value}
        onChange={(event, newValue: number) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "whitesmoke" }}
          component={NavLink}
          activeStyle={{ color: "#E2B616" }}
          to="/trending"
          label="Trending"
          icon={<TrendingIcon />}
        />
        <BottomNavigationAction
          style={{ color: "whitesmoke" }}
          component={NavLink}
          activeStyle={{ color: "#E2B616" }}
          to="/movies"
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "whitesmoke" }}
          component={NavLink}
          activeStyle={{ color: "#E2B616" }}
          to="/series"
          label="TV Series"
          icon={<TVSeriesIcon />}
        />
        <BottomNavigationAction
          style={{ color: "whitesmoke" }}
          component={NavLink}
          to="/favourites"
          activeStyle={{ color: "#E2B616" }}
          label="Favourites"
          icon={<FavoriteIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
