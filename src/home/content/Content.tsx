import React from 'react';
import './Content.scss';
import Sort from './sort/Sort';
import GenreToggle from './genre-toggle/GenreToggle';
import Gallery from './gallery/Gallery';

export default class Content extends React.Component {
  state = {moviesFound: 10};
  render() {
    return (
      <div className="content">
        <div className="content-header">
          <GenreToggle />
          <Sort />
        </div>
        <div className="movies-found">
          <b>{this.state.moviesFound}</b> movie
          {this.state.moviesFound === 1 ? '' : 's'} found
        </div>
        <Gallery />
      </div>
    );
  }
}
