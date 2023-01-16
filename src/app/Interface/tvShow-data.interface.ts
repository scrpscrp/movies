import { TvShow } from './tvshow.interface'

export interface tvShowDataInterface {
  page: number;
  results: TvShow[];
  totalPages: number;
  totalResults: number;
}
