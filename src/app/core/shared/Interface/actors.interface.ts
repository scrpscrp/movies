import { KnownForInterface } from './knownFor.interface';
export interface ActorsInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownForInterface [];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
}
