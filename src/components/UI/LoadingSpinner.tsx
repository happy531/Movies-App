import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress style={{ color: "#ff0000" }} />
    </Box>
  );
}
