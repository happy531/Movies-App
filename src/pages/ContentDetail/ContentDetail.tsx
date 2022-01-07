import React, { useEffect, useState } from "react";
import {
  img_original,
  unavailableLandscape,
} from "../../config/pictures_config";
import { minSpinnerLoading } from "../../utils/utils";

import { Container } from "@mui/material";
import Details from "../../components/Details/Details";
import Cast from "../../components/Cast/Cast";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { useLocation } from "react-router";

import classes from "./ContentDetail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailsAndVideo } from "../../redux/details-slice";

interface Props {}

const ContentDetail: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { details, status } = useSelector(
    // @ts-ignore
    (state) => state.details
  );

  const { backdrop_path: backdrop } = details;

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
      {!loading && (
        <div
          className={classes.backdrop}
          style={{
            backgroundImage: backdrop
              ? `url(${img_original}/${backdrop})`
              : unavailableLandscape,
          }}
        />
      )}
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
