import PT from 'prop-types';
import { GENRES, Genre } from './genre';

export interface IMovieData {
  id: number;
  coverUrl: string;
  movieUrl: string;
  title: string;
  description: string;
  year: number;
  releaseDate: Date;
  genres: Genre[];
  rating: number;
  runtime: number;
}

export class MovieModel implements IMovieData {
  id: number;
  coverUrl: string;
  movieUrl: string;
  title: string;
  description: string;
  year: number;
  releaseDate: Date;
  genres: Genre[];
  rating: number;
  runtime: number;

  private originalMovieData: IMovieData | null;

  constructor(data: IMovieData | null) {
    this.id = data ? data.id : -1;
    this.coverUrl = data ? data.coverUrl : '';
    this.movieUrl = data ? data.movieUrl : '';
    this.title = data ? data.title : '';
    this.description = data ? data.description : '';
    this.year = data ? data.year : 0;
    this.releaseDate = data ? data.releaseDate : new Date();
    this.genres = data ? data.genres : [];
    this.rating = data ? data.rating : 0;
    this.runtime = data ? data.runtime : 0;

    this.originalMovieData = data;
  }
}

export const MoviePropTypes = {
  id: PT.number.isRequired,
  coverUrl: PT.string.isRequired,
  movieUrl: PT.string.isRequired,
  title: PT.string.isRequired,
  description: PT.string.isRequired,
  year: PT.number.isRequired,
  releaseDate: PT.instanceOf(Date).isRequired,
  genres: PT.arrayOf(PT.oneOf(GENRES.map(g => g.value))).isRequired,
  rating: PT.number.isRequired,
  runtime: PT.number.isRequired,
};

export const sampleMovies: MovieModel[] = [];
for (let n = 1; n <= 10; n++) {
  sampleMovies.push(new MovieModel({
    id: n,
    coverUrl: '../../../../sample-cover.png',
    movieUrl: 'https://samplemovie.com/123',
    title: 'Movie ' + n,
    description: `Some sample text about the movie number ${n}. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    year: 2000 + n,
    releaseDate: new Date(),
    genres: ['comedy', 'documentary'],
    rating: 1.3 + n,
    runtime: 123 + n,
  }));
}
