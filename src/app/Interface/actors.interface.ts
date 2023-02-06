import { KnownForInterface } from './knownFor.interface';
export interface actorsInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownForInterface [];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}
