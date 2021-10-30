import Genre from "../models/genre-model";

const useGenre = (selectedGenres: Array<Genre>): string => {
  if (selectedGenres.length === 0) return "";

  const selectedGenresIDs = selectedGenres.map((g: Genre) => g.id);
  // @ts-ignore
  return selectedGenresIDs.reduce(
    // @ts-ignore
    (acc: number, curr: number) => `${acc},${curr}`
  );
};

export default useGenre;
