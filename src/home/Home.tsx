import React, {useEffect} from 'react';
import './Home.scss';
import Header from './header/Header';
import Content from './content/Content';
import HeaderMovieDetails from './header-movie-details/HeaderMovieDetails';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {useFetchMoviesQuery} from '../features/movies-api-slice';
import {moviesData} from '../features/movies-slice';
import {convertUIToMovieSearchParams} from '../models/searchParams';

export default function Home() {
  const dispatch = useAppDispatch();

  const selectedMovieData = useAppSelector(
    (state) => state.selectedMovie.movieData
  );

  const uiSearchParams = useAppSelector((state) => state.uiSearchParams);

  const {data, isFetching} = useFetchMoviesQuery(
    convertUIToMovieSearchParams(uiSearchParams)
  );

  useEffect(() => {
    dispatch(moviesData(data?.data ?? []));
  });

  return (
    <div className="home">
      {(selectedMovieData && <HeaderMovieDetails />) || <Header />}
      <div className="divider"></div>
      <Content />
    </div>
  );
}
