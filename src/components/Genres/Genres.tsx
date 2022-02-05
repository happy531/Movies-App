import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, genreActions } from "../../redux/genre-slice";
import { minSpinnerLoading } from "../../utils/utils";

import LoadingSpinner from "../UI/LoadingSpinner";
import { Chip } from "@mui/material";

import Genre from "../../models/genre-model";
import { RootState } from "../../redux/redux-store";

import classes from "./Genres.module.scss";

interface Props {
  type: string;
  setPage: (page: number) => void;
}

const Genres: React.FC<Props> = ({ type, setPage }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const { genres, selectedGenres, status } = useSelector(
    (state: RootState) => state.genres
  );

  const handleAddGenre = (genre: Genre) => {
    dispatch(genreActions.addGenre(genre));
    navigate(`/${type}/page/1`);
    setPage(1);
  };
  const handleRemoveGenre = (genre: { id: number; name: string }) => {
    dispatch(genreActions.removeGenre(genre));
    navigate(`/${type}/page/1`);
    setPage(1);
  };

  useEffect(() => {
    const url = `genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    dispatch(fetchGenres(url));
  }, [type, dispatch]);

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
    <div className={classes.genres_container}>
      {loading && <LoadingSpinner />}
      {selectedGenres &&
        !loading &&
        selectedGenres.map((selectedGenre: Genre) => (
          <Chip
            style={{
              color: "black",
              backgroundColor: "#E2B616",
              margin: 2,
            }}
            key={selectedGenre.id}
            label={selectedGenre.name}
            clickable
            onDelete={() => handleRemoveGenre(selectedGenre)}
          />
        ))}
      {genres &&
        !loading &&
        genres.map((genre: Genre) => (
          <Chip
            className={classes.genre}
            style={{
              color: "black",
              backgroundColor: "whitesmoke",
              margin: 2,
            }}
            key={genre.id}
            label={genre.name}
            clickable
            onClick={() => handleAddGenre(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
