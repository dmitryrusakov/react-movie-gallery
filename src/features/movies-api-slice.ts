import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IMovieData } from '../models/movie';
import { MovieSearchParams } from '../models/searchParams';

export interface MovieApiResponse {
  total?: number;
  offset?: number;
  limit?: number;
  data: IMovieData[];
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query<MovieApiResponse, MovieSearchParams>({
        query(params) {
          console.log(params);
          return `/movies?${buildSearchQuery(params)}`;
        },
      }),
    };
  },
});

function buildSearchQuery(params: MovieSearchParams) {
  const paramsArr: string[] = [];
  if (params.filter?.length) {
    paramsArr.push(`filter=${params.filter}`);
  }
  if (params.sortBy) {
    paramsArr.push(`sortBy=${params.sortBy}`);
    paramsArr.push(`sortOrder=${params.sortOrder}`);
  }
  if (params.search) {
    paramsArr.push(`search=${params.search}`);
    paramsArr.push(`searchBy=title`);
  }
  return paramsArr.join('&');
}

export const { useFetchMoviesQuery } = apiSlice;