import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TrendingIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TVSeriesIcon from "@mui/icons-material/Tv";
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
        zIndex: 11,
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
          component={NavLink}
          style={{ color: "whitesmoke" }}
          to="/trending/page/1"
          label="Trending"
          icon={<TrendingIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          style={{ color: "whitesmoke" }}
          to="/movie/page/1"
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          style={{ color: "whitesmoke" }}
          to="/tv/page/1"
          label="TV Series"
          icon={<TVSeriesIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
