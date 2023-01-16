import { actorsInterface } from './actors.interface';
export interface actorsDataInterface {
  page: number;
  results: actorsInterface[];
  total_pages: number;
  total_results: number;
}
