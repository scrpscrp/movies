import { TvShow } from './tvshow.interface'
export interface TvShowDataInterface {
  page: number;
  results: TvShow[];
  totalPages: number;
  totalResults: number;
}
