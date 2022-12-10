import React, {useState} from 'react';
import './Content.scss';
import Sort from './sort/Sort';
import GenreToggle from './genre-toggle/GenreToggle';
import Gallery from './gallery/Gallery';

export default function Content() {
  const [moviesFound] = useState(10);
  return (
    <div className="content">
      <div className="content-header">
        <GenreToggle />
        <Sort />
      </div>
      <div className="movies-found">
        <b>{moviesFound}</b> movie
        {moviesFound === 1 ? '' : 's'} found
      </div>
      <Gallery />
    </div>
  );
}
