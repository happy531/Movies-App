import React from "react";

import MaterialPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

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
  page_type: string;
  defaultPage: string;
}

const Pagination: React.FC<Props> = ({
  onSetPage,
  numOfPages,
  page_type,
  defaultPage,
}) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    navigate(`/${page_type}/page/${page}`);
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
        defaultPage={Number(defaultPage)}
        page={Number(defaultPage)}
        color="secondary"
        variant="outlined"
        shape="rounded"
        hideNextButton
        hidePrevButton
        onClick={(e: any) => {
          handlePageChange(e.target.textContent);
        }}
      />
    </Stack>
  );
};

export default Pagination;
