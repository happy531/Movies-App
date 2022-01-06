import React, {useEffect, useState} from "react";
import axios from "axios";
import {img_original, unavailableLandscape,} from "../../config/pictures_config";

import {Container} from "@mui/material";
import Details from "../../components/Details/Details";
import Cast from "../../components/Cast/Cast";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import {useLocation} from "react-router";

import Genre from "../../models/genre-model";

import classes from "./ContentDetail.module.scss";

interface Props {}

const ContentDetail: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<any>({});
  const [video, setVideo] = useState<string>();
  const [genres, setGenres] = useState<Array<string>>([]);

  const detail_path = useLocation().pathname;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setDetails(data);
      setGenres(data.genres.map((g: Genre) => `${g.name} / `));
    };
    fetchDetails();

    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3${detail_path}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);

      setLoading(false);
    };
    fetchVideo();
  }, [detail_path]);

  return (
    <>
      {!loading && (
        <div
          className={classes.backdrop}
          style={{
            backgroundImage: details.backdrop_path
              ? `url(${img_original}/${details.backdrop_path})`
              : unavailableLandscape,
          }}
        />
      )}
      {!loading ? (
        <Container>
          <Details
            details={details}
            video={video ? video : ""}
            genres={genres}
          />
          <Cast detail_path={detail_path} />
        </Container>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default ContentDetail;
