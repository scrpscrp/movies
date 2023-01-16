import { Movie } from './movie.interface';

export interface DataInterface {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
  
}
