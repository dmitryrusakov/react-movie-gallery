import React from 'react';
import {Button, TextField} from '@mui/material';
import './Search.scss';

export default class Search extends React.Component {
  state = {
    searchText: '',
  };
  changeSearchText = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({searchText: (event.target as HTMLTextAreaElement).value});
  };
  search = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.info('Search query:', this.state.searchText.toLowerCase());
  };
  render() {
    return (
      <div className="search-wrapper">
        <form onSubmit={this.search}>
          <div className="search-form-wrapper">
            <TextField
              className="search-textfield"
              label="What do you want to watch?"
              variant="standard"
              value={this.state.searchText}
              onChange={this.changeSearchText}
              InputProps={{
                classes: {
                  input: 'search-input',
                },
              }}
              InputLabelProps={{
                className: 'search-label',
              }}
            />
            <Button
              type="submit"
              onClick={this.search}
              variant="outlined"
              className="search-button"
            >
              Search
            </Button>
          </div>
          {/* <ItemList items={this.state.searchResult} /> */}
        </form>
      </div>
    );
  }
}
