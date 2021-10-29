import React from "react";

import MaterialPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";

const useStyles: any = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "whitesmoke",
    },
  },
}));

interface Props {
  onSetPage: (page: number) => void;
  numOfPages: number;
}

const Pagination: React.FC<Props> = ({ onSetPage, numOfPages }) => {

  const styles = useStyles();

  const handlePageChange = (page: string) => {
    onSetPage(Number(page));
    window.scroll(0, 0);
  };

  return (
    <Stack
      spacing={2}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "15px auto",
      }}
    >
      <MaterialPagination
        classes={{ ul: styles.ul }}
        count={numOfPages}
        color="primary"
        variant="outlined"
        shape="rounded"
        onClick={(e: any) => {
          handlePageChange(e.target.textContent);
        }}
      />
    </Stack>
  );
};

export default Pagination;
