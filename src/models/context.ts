import { createContext, Dispatch, SetStateAction } from 'react';
import { MovieModel } from './movie';

interface IHeaderMovieContext {
  movie: MovieModel | null;
  setMovie: Dispatch<SetStateAction<MovieModel | null>>;
}

export const HeaderMovieContext = createContext<IHeaderMovieContext | null>(null);
