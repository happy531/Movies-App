import React, { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { useLocation } from "react-router-dom";

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/j%C4%99drzej-weso%C5%82owski-2455941a4/"
      >
        My Linkedin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  const [footerDisplay, setFooterDisplay] = useState<string>("block");
  useEffect(() => {
    setFooterDisplay("none");
    setTimeout(() => {
      setFooterDisplay("block");
    }, 500);
  }, [location]);

  return (
    <Box
      sx={{
        bgcolor: "#0F0F0F",
        p: 8,
        color: "#F5F5F5",
        display: footerDisplay,
      }}
      component="footer"
    >
      <Typography variant="subtitle1" align="center" component="p">
        Make sure you visit{" "}
        <Link color="inherit" href="https://github.com/happy531/Movies-App">
          Github
        </Link>{" "}
        repo!
      </Typography>
      <Copyright />
    </Box>
  );
};

export default Footer;
