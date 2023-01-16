import { NumberValueAccessor } from '@angular/forms';

export interface TvShow {
  first_air_date: string;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
  vote_count: number;
}
