import { Episode } from './Episode.js';
import { Location } from './Location.js';

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  location?: Location;
  origin?: Location;
  episode?: Episode[];
}
