import React, { Component } from 'react';
import './GenreToggle.css';
import Item from './Item';

const GENRES = [
  { id: 1, value: 'all' },
  { id: 2, value: 'documentary' },
  { id: 3, value: 'comedy' },
  { id: 4, value: 'horror' },
  { id: 5, value: 'crime' },
];

class GenreToggle extends Component {
  state = { activeGenre: 1 };
  selectGenre = (genreId) => {
    this.setState({ activeGenre: genreId });
  }
  render() {
    return <div className="genre-list">
      {GENRES.map(g =>
        React.createElement(Item, {
          key: g.id,
          itemId: g.id,
          title: g.value,
          isActive: this.state.activeGenre === g.id,
          onSelectGenre: this.selectGenre,
        })
      )}
    </div>
  }
}

export default GenreToggle;
