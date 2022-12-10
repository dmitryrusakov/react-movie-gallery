import { MovieModel, IMovieData } from '../models/movie';

export interface MovieApiResponse {
  total?: number;
  offset?: number;
  limit?: number;
  data: IMovieData[];
}

function movieRequst(method: string, body?: Object) {
  return fetch('http://localhost:4000/movies', {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });
}

export function getMovies(): Promise<MovieModel[]> {
  return new Promise((resolve, reject) => {
    movieRequst('GET')
      .then((response) => response.json())
      .then((response: MovieApiResponse) => {
        console.log(response);
        const movies = response?.data.map((movieData: IMovieData) => new MovieModel(movieData));
        resolve(movies);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}
