import { ActorsInterface } from './actors.interface';
export interface ActorsDataInterface {
  page: number;
  results: ActorsInterface[];
  total_pages: number;
  total_results: number;
}
