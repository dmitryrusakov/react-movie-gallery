import React, { PureComponent } from 'react';
import './Item.css';

class Item extends PureComponent {
  render() {
    return <div
      onClick={e => this.props.onSelectGenre(this.props.itemId)}
      className={"genre-item " + (this.props.isActive ? 'active' : '')}
    >
      {this.props.title}
    </div>
  }
}

export default Item;
