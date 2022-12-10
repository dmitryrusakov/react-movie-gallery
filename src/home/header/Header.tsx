import React, {Component} from 'react';
import {Button} from '@mui/material';
import './Header.scss';
import Search from './search/Search';
import MovieDetailsDialog, {
  MovieDetailsDialogMode,
} from '../movie-details/MovieDetailsDialog';
import {MovieModel} from '../../models/movie';

interface IState {
  showAddMovieDialog: boolean;
}

export default class Header extends Component<{}, IState> {
  state = {
    showAddMovieDialog: false,
  };
  addMovie = (movieData: MovieModel) => {
    console.info('Add movie:', movieData);
  };
  showAddMovieDialog = () => {
    this.setState({showAddMovieDialog: true});
  };
  hideAddMovieDialog = () => {
    this.setState({showAddMovieDialog: false});
  };
  render() {
    return (
      <div className="header">
        <div className="bg"></div>
        <Button
          className="add-button"
          onClick={this.showAddMovieDialog}
          variant="outlined"
        >
          + Add Movie
        </Button>
        <div className="search-holder">
          <label className="label">Find Your Movie</label>
          <Search />
        </div>
        <MovieDetailsDialog
          mode={MovieDetailsDialogMode.ADD}
          open={this.state.showAddMovieDialog}
          submit={this.addMovie}
          close={this.hideAddMovieDialog}
        />
      </div>
    );
  }
}
