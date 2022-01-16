import React, { useEffect, useState } from "react";
import { minSpinnerLoading } from "../../utils/utils";

import { Container } from "@mui/material";
import Details from "./Details/Details";
import Cast from "./Cast/Cast";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsAndVideo } from "../../redux/details-slice";
import { RootState } from "../../redux/redux-store";

interface Props {}

const ContentDetail: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSelector((state: RootState) => state.details);

  const detailsPath = useLocation().pathname;

  useEffect(() => {
    const detailsUrl = `${detailsPath}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    const videoUrl = `${detailsPath}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    dispatch(fetchDetailsAndVideo({ detailsUrl, videoUrl }));
  }, [dispatch, detailsPath]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, minSpinnerLoading);
    }
  }, [status]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <Details />
          <Cast detail_path={detailsPath} />
        </Container>
      )}
    </>
  );
};

export default ContentDetail;
