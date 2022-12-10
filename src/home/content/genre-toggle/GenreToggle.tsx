import React from 'react';
import './GenreToggle.scss';
import Item from './Item';

const GENRES = [
  {id: 1, value: 'all'},
  {id: 2, value: 'documentary'},
  {id: 3, value: 'comedy'},
  {id: 4, value: 'horror'},
  {id: 5, value: 'crime'},
];

export default class GenreToggle extends React.Component {
  state = {activeGenre: 1};
  selectGenre = (genreId: string) => {
    this.setState({activeGenre: genreId});
  };
  render() {
    return (
      <div className="genre-list">
        {GENRES.map((g) => (
          <Item
            key={g.id}
            isActive={this.state.activeGenre === g.id}
            itemId={g.id}
            title={g.value}
            onSelectGenre={this.selectGenre}
          />
        ))}
      </div>
    );
  }
}
