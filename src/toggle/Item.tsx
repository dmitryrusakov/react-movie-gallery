import React from 'react';
import './Item.css';

export type ItemProps = {
  onSelectGenre: (id: string) => {};
  isActive: boolean;
  itemId: string;
  title: string;
};

export class Item extends React.PureComponent<ItemProps, {}> {
  render() {
    return (
      <div
        onClick={(e) => this.props.onSelectGenre(this.props.itemId)}
        className={'genre-item ' + (this.props.isActive ? 'active' : '')}
      >
        {this.props.title}
      </div>
    );
  }
}
