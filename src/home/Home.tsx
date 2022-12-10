import React, {Context, useState, useContext} from 'react';
import './Home.scss';
import Header from './header/Header';
import Content from './content/Content';
import HeaderMovieDetails from './header-movie-details/HeaderMovieDetails';
import {HeaderMovieContext} from '../models/context';
import {MovieModel} from '../models/movie';

export default function Home() {
  const [movieC, setMovieC] = useState<MovieModel | null>(null);
  const headerMovieContext = useContext(HeaderMovieContext);
  return (
    <div className="home">
      <HeaderMovieContext.Provider value={{movie: movieC, setMovie: setMovieC}}>
        {(movieC && <HeaderMovieDetails />) || <Header />}
        <div className="divider"></div>
        <Content />
      </HeaderMovieContext.Provider>
    </div>
  );
}
