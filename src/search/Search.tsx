import React from 'react';
import {ItemList, ItemModel} from './ItemList';

const DEFAULT_ITEMS: ItemModel[] = [
  {id: 1, value: 'one'},
  {id: 2, value: 'two'},
  {id: 3, value: 'three'},
  {id: 4, value: 'four'},
  {id: 5, value: 'five'},
  {id: 6, value: 'six'},
  {id: 7, value: 'seven'},
  {id: 8, value: 'eight'},
  {id: 9, value: 'nine'},
  {id: 10, value: 'ten'},
];

class Search extends React.Component {
  state = {
    searchText: '',
    searchResult: [...DEFAULT_ITEMS],
  };
  changeSearchText = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({searchText: (event.target as HTMLTextAreaElement).value});
  };
  search = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({
      searchResult: DEFAULT_ITEMS.filter((item) =>
        item.value.includes(this.state.searchText.toLowerCase())
      ),
    });
  };
  render() {
    return (
      <form onSubmit={this.search}>
        <input value={this.state.searchText} onChange={this.changeSearchText} />
        <button type="submit" onClick={this.search}>
          Search
        </button>
        <ItemList items={this.state.searchResult} />
      </form>
    );
  }
}

export default Search;
