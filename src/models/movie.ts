import PT from 'prop-types';
import { GENRES, Genre } from './genre';

// export interface IMovieData {
//   id: number;
//   coverUrl: string;
//   movieUrl: string;
//   title: string;
//   description: string;
//   year: number;
//   releaseDate: Date;
//   genres: Genre[];
//   rating: number;
//   runtime: number;
// }

export interface IMovieData {
  id: number;
  title: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  poster_path: string;
  overview: string;
  budget?: number;
  revenue?: number;
  runtime: number;
  genres: string[];
}

export class MovieModel {
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
    this.id = data?.id ?? -1;
    this.coverUrl = data?.poster_path ?? '';
    this.movieUrl = /*data ? data.movieUrl :*/ 'https://samplemovie.com/123';
    this.title = data?.title ?? '';
    this.description = data?.overview ?? '';
    this.year = data?.release_date ? new Date(data.release_date).getFullYear() : 0;
    this.releaseDate = data?.release_date ? new Date(data.release_date) : new Date();
    this.genres = data?.genres as Genre[] ?? [];
    this.rating = data?.vote_count ?? 0;
    this.runtime = data?.runtime ?? 0;

    this.originalMovieData = data;
  }

  toMovieData(): IMovieData {
    return {
      id: this.id,
      title: this.title,
      tagline: this.originalMovieData?.tagline ?? '',
      vote_average: this.originalMovieData?.vote_average ?? 0,
      vote_count: this.rating,
      release_date: this.releaseDate.toLocaleDateString('en-CA'),
      poster_path: this.coverUrl,
      overview: this.description,
      budget: this.originalMovieData?.budget ?? 0,
      revenue: this.originalMovieData?.revenue ?? 0,
      runtime: this.runtime,
      genres: this.genres.slice(),
    };
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
for (let n = 1; n <= 22; n++) {
  sampleMovies.push(new MovieModel({
    id: n,
    poster_path: '../../../../sample-cover.png',
    // movieUrl: 'https://samplemovie.com/123',
    title: 'Movie ' + n,
    overview: `Some sample text about the movie number ${n}. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    release_date: 'Thu Dec 08 2022 23:26:41 GMT-0800 (Pacific Standard Time)',
    genres: ['comedy', 'documentary'],
    vote_count: 1.3 + n,
    runtime: 123 + n,
  }));
}
