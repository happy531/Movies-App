import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TrendingIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TVSeriesIcon from "@mui/icons-material/Tv";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Navigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
      }}
    >
      <BottomNavigation
        style={{ backgroundColor: "rgb(12, 12, 12)" }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Trending"
          icon={<TrendingIcon />}
          style={{ color: "whitesmoke" }}
        />
        <BottomNavigationAction
          label="Movies"
          icon={<MovieIcon />}
          style={{ color: "whitesmoke" }}
        />
        <BottomNavigationAction
          label="TV Series"
          icon={<TVSeriesIcon />}
          style={{ color: "whitesmoke" }}
        />
        <BottomNavigationAction
          label="Favourites"
          icon={<FavoriteIcon />}
          style={{ color: "whitesmoke" }}
        />
      </BottomNavigation>
    </Box>
  );
}
