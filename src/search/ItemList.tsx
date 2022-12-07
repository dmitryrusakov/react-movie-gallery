import React from 'react';

export type ItemModel = {
  id: number;
  value: string;
};

export function ItemList(props: {items: ItemModel[]}) {
  return (
    <ul>
      {props.items.map((item: ItemModel) => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  );
}
