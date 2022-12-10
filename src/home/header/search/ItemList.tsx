import React from 'react';
import PT from 'prop-types';

const propTypes = {
  items: PT.arrayOf(
    PT.shape({
      id: PT.number.isRequired,
      value: PT.string.isRequired,
    })
  ).isRequired,
};

export default class ItemList extends React.PureComponent<
  PT.InferProps<typeof propTypes>
> {
  render() {
    return (
      <ul>
        {this.props.items.map((item) => (
          <li key={item?.id}>{item?.value}</li>
        ))}
      </ul>
    );
  }
}
