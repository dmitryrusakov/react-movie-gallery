import React, {useState} from 'react';
import {Grid} from '@mui/material';
import MovieCard from './MovieCard';
import {sampleMovies as movies} from '../../../models/movie';
import {MovieModel} from '../../../models/movie';
import MovieDetailsDialog, {
  MovieDetailsDialogMode,
} from '../../movie-details-dialog/MovieDetailsDialog';
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

export default function Gallery() {
  const [dialogMode, setDialogMode] = useState(DialogMode.HIDDEN);
  const [movieForDialog, setMovieForDialog] = useState<MovieModel>();
  const saveMovie = (movie: MovieModel) => {
    console.info('Save movie:', movie);
    hideDialog();
  };
  const deleteMovie = (movie: MovieModel) => {
    console.info('Delete movie:', movie);
    hideDialog();
  };
  const openDetails = (data: MovieModel) => {
    setDialogMode(DialogMode.DETAILS);
    setMovieForDialog(data);
  };
  /** Hides both Delete and Details dialogs. */
  const openDeleteDialog = (data: MovieModel) => {
    setDialogMode(DialogMode.DELETE);
    setMovieForDialog(data);
  };
  const hideDialog = () => {
    setDialogMode(DialogMode.HIDDEN);
  };

  return (
    <>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <MovieCard
              movie={movie}
              openDetails={openDetails}
              openDeleteDialog={openDeleteDialog}
            />
          </Grid>
        ))}
      </Grid>
      {dialogMode === DialogMode.DETAILS && movieForDialog && (
        <MovieDetailsDialog
          movie={movieForDialog}
          mode={MovieDetailsDialogMode.EDIT}
          open={dialogMode === DialogMode.DETAILS}
          submit={saveMovie}
          close={hideDialog}
        />
      )}
      {dialogMode === DialogMode.DELETE && movieForDialog && (
        <DeleteMovieDialog
          movie={movieForDialog}
          open={dialogMode === DialogMode.DELETE}
          submit={deleteMovie}
          close={hideDialog}
        />
      )}
    </>
  );
}
