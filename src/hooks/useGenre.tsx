import Genre from "../models/genre-model";

const useGenre = (selectedGenres: Array<Genre>): string => {
  if (selectedGenres.length === 0) return "";

  return selectedGenres.map((g: Genre) => g.id).toString();
};

export default useGenre;
