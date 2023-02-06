import { movieCrew } from './movie.crew';
import { movieCast } from "./movie.cast";

export interface movieCredits {
    cast: movieCast[];
    crew: movieCrew[];
}