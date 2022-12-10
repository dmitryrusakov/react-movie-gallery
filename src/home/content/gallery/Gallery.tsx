import React from 'react';
import {Grid} from '@mui/material';
import MovieCard from './MovieCard';
import {sampleMovies as movies} from '../../../models/movie';
import {MovieModel} from '../../../models/movie';
import MovieDetailsDialog, {
  MovieDetailsDialogMode,
} from '../../movie-details/MovieDetailsDialog';
import DeleteMovieDialog from './DeleteMovieDialog';

/**
 * Dialog Mode handles the visibility of both Details and Delete dialogs.
 * There can only be one of those on a screen, thus chose a Mode approach
 * instead of flags to benefit from a single proprety in the component.
 */
enum DialogMode {
  HIDDEN = 1,
  DETAILS = 2,
  DELETE = 3,
}

interface IState {
  dialogMode: DialogMode;
  /** Movie to provide into a dialog for editing or deletion. */
  movieForDialog: MovieModel | null;
}

export default class Gallery extends React.Component<{}, IState> {
  state = {
    dialogMode: DialogMode.HIDDEN,
    movieForDialog: null,
  };
  saveMovie = (movieData: MovieModel) => {
    console.info('Save movie:', movieData);
    this.hideDialog();
  };
  deleteMovie = (movieData: MovieModel) => {
    console.info('Delete movie:', movieData);
    this.hideDialog();
  };
  openDetails = (data: MovieModel) => {
    this.setState({dialogMode: DialogMode.DETAILS, movieForDialog: data});
  };
  /** Hides both Delete and Details dialogs. */
  openDeleteDialog = (data: MovieModel) => {
    this.setState({dialogMode: DialogMode.DELETE, movieForDialog: data});
  };
  hideDialog = () => {
    this.setState({dialogMode: DialogMode.HIDDEN});
  };
  render() {
    return (
      <>
        <Grid container spacing={4}>
          {movies.map((movieData) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movieData.id}>
              <MovieCard
                movie={movieData}
                openDetails={this.openDetails}
                openDeleteDialog={this.openDeleteDialog}
              />
            </Grid>
          ))}
        </Grid>
        {this.state.dialogMode === DialogMode.DETAILS &&
          this.state.movieForDialog && (
            <MovieDetailsDialog
              movie={this.state.movieForDialog}
              mode={MovieDetailsDialogMode.EDIT}
              open={this.state.dialogMode === DialogMode.DETAILS}
              submit={this.saveMovie}
              close={this.hideDialog}
            />
          )}
        {this.state.dialogMode === DialogMode.DELETE &&
          this.state.movieForDialog && (
            <DeleteMovieDialog
              movie={this.state.movieForDialog}
              open={this.state.dialogMode === DialogMode.DELETE}
              submit={this.deleteMovie}
              close={this.hideDialog}
            />
          )}
      </>
    );
  }
}
