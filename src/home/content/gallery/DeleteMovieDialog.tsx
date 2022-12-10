import React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import PT from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {MoviePropTypes, MovieModel} from '../../../models/movie';

const propTypes = {
  open: PT.bool.isRequired,
  submit: PT.func.isRequired,
  close: PT.func.isRequired,
  movie: PT.shape(MoviePropTypes),
};

export default class DeleteMovieDialog extends React.Component<
  PT.InferProps<typeof propTypes>
> {
  state = {
    // TODO(dmitryrusakov): Fix TypeScript error.
    // @ts-ignore : Some wierd Issue with "Genre" type assignment.
    movie: new MovieModel(this.props.movie ?? null),
  };
  handleClose = () => {
    this.props.close();
  };
  handleSubmit = () => {
    this.props.submit(this.state.movie);
  };
  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle>DELETE MOVIE</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={this.handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          Are you sure you want to delete "{this.state.movie.title}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit}>CONFIRM</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
