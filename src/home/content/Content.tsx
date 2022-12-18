import React, {useState, useEffect} from 'react';
import './Content.scss';
import Sort from './sort/Sort';
import GenreToggle from './genre-toggle/GenreToggle';
import Gallery from './gallery/Gallery';
import {IMovieData, MovieModel} from '../../models/movie';
import {useAppSelector} from '../../app/hooks';

export default function Content() {
  const moviesData = useAppSelector((state) => state.movies.moviesData);
  const movies = moviesData.map(
    (movieData: IMovieData) => new MovieModel(movieData)
  );

  return (
    <div className="content">
      <div className="content-header">
        <GenreToggle />
        <Sort />
      </div>
      <div className="movies-found">
        <b>{movies.length}</b> movie
        {movies.length === 1 ? '' : 's'} found
      </div>
      <Gallery movies={movies} />
    </div>
  );
}
