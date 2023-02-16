import { MovieCrew } from './movie.crew';
import { MovieCast } from "./movie.cast";
export interface MovieCredits {
    cast: MovieCast[];
    crew: MovieCrew[];
}