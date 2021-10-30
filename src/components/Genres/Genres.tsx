import React, { useEffect } from "react";
import axios from "axios";

import { Chip } from "@mui/material";

import { REACT_APP_API_KEY } from "../../config/env";
import Genre from "../../models/genre-model";

function compare(a: Genre, b: Genre) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

interface Props {
  genres: Array<Genre>;
  setGenres: (genres: Array<Genre>) => void;
  selectedGenres: Array<Genre>;
  setSelectedGenres: (genres: Array<Genre>) => void;
  type: string;
  setPage: (page: number) => void;
}

const Genres: React.FC<Props> = ({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
  setPage,
}) => {
  const handleAddGenre = (genre: Genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemoveGenre = (genre: { id: number; name: string }) => {
    setGenres([...genres, genre].sort(compare));
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    };

    fetchGenres();

    return () => setGenres([]);
  }, [setGenres, type]);

  return (
    <div>
      {selectedGenres &&
        selectedGenres.map((selectedGenre) => (
          <Chip
            style={{ color: "black", backgroundColor: "#E2B616", margin: 2 }}
            key={selectedGenre.id}
            label={selectedGenre.name}
            clickable
            onDelete={() => handleRemoveGenre(selectedGenre)}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            style={{ color: "black", backgroundColor: "whitesmoke", margin: 2 }}
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
