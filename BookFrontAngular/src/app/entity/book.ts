import {Author} from './author';

export interface Book {
  id: number;
  name: string;
  genre: string;
  authors: Author[];
}
