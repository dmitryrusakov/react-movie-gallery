import React from 'react';
import PT from 'prop-types';
import './Item.scss';

const propTypes = {
  onSelectGenre: PT.func.isRequired,
  isActive: PT.bool.isRequired,
  itemId: PT.string.isRequired,
  title: PT.string.isRequired,
};

export default class Item extends React.PureComponent<
  PT.InferProps<typeof propTypes>
> {
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
