import Genre from "./genre-model";

export default interface DetailsModel {
  backdrop_path?: string;
  poster_path?: string;
  title?: string;
  name?: string;
  genres?: Array<Genre>;
  runtime?: string;
  tagline?: string;
  overview?: string;
}
