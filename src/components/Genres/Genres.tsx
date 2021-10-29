import React, { useEffect } from "react";
import { Chip } from "@mui/material";
import axios from "axios";
import { REACT_APP_API_KEY } from "../../config/env";

interface Props {
  genres: Array<any>;
  setGenres: (genres: Array<any>) => void;
  selectedGenres: Array<any>;
  setSelectedGenres: (genres: Array<any>) => void;
  type: string;
}

const Genres: React.FC<Props> = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
}) => {
  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    };

    fetchGenres();
  }, [setGenres]);

  return (
    <div>
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ color: "black", backgroundColor: "whitesmoke", margin: 2 }}
            key={genre.id}
            label={genre.name}
            clickable
          />
        ))}
    </div>
  );
};

export default Genres;
