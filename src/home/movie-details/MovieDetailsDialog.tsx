import React, {ReactNode} from 'react';
import './MovieDetailsDialog.scss';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import PT from 'prop-types';
import {Moment} from 'moment';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@mui/material';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import {MoviePropTypes, MovieModel} from '../../models/movie';
import {Genre, GENRES, IGenre} from '../../models/genre';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export enum MovieDetailsDialogMode {
  ADD = 1,
  EDIT = 2,
}

const propTypes = {
  mode: PT.oneOf([MovieDetailsDialogMode.ADD, MovieDetailsDialogMode.EDIT]),
  open: PT.bool.isRequired,
  submit: PT.func.isRequired,
  close: PT.func.isRequired,
  movie: PT.shape(MoviePropTypes),
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default class MovieDetailsDialog extends React.Component<
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
  handleReleaseDate = (
    date: Moment | null,
    keyboardInputValue?: string | undefined
  ) => {
    const movie = this.state.movie;
    movie.year = date?.year() || 0;
    movie.releaseDate = date ? new Date(date?.toDate()) : null;
    this.setState({movie});
  };
  handleGenresSelect = (
    event: SelectChangeEvent<Genre[]>,
    child: ReactNode
  ) => {
    const movie = this.state.movie;
    movie.genres = event.target.value as Genre[];
    this.setState({movie});
  };
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const movie = this.state.movie;
    // @ts-ignore : String can not be used to type MovieModel.
    movie[name] = value;
    this.setState({movie});
  };
  render() {
    const movie = this.state.movie;
    return (
      <Dialog onClose={this.handleClose} open={this.props.open}>
        <DialogTitle>
          {`${
            this.props.mode === MovieDetailsDialogMode.ADD ? 'ADD' : 'EDIT'
          } MOVIE`}
        </DialogTitle>
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
          <div className="movie-details">
            <Grid container spacing={2}>
              <Grid item className="left" xs={12} sm={8}>
                <TextField
                  label="Title"
                  name="title"
                  value={movie.title}
                  onChange={this.handleInputChange}
                />

                <TextField
                  label="Movie URL"
                  name="movieUrl"
                  placeholder="https://"
                  value={movie.movieUrl}
                  onChange={this.handleInputChange}
                  className="text-field"
                />

                <Select
                  multiple
                  value={movie.genres}
                  onChange={this.handleGenresSelect}
                  input={<OutlinedInput label="Genre" />}
                  MenuProps={MenuProps}
                >
                  {GENRES.map((genre: IGenre) => (
                    <MenuItem key={genre.value} value={genre.value}>
                      {genre.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item className="right" xs={12} sm={4}>
                <div className="date">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DesktopDatePicker
                      value={this.props.movie?.year}
                      onChange={this.handleReleaseDate}
                      renderInput={(params) => <TextField {...params} />}
                      inputFormat="MM/DD/YYYY"
                      label="Date desktop"
                    />
                  </LocalizationProvider>
                </div>

                <TextField
                  name="rating"
                  value={movie.rating}
                  onChange={this.handleInputChange}
                  type="number"
                  label="Rating"
                />

                <TextField
                  name="runtime"
                  value={movie.runtime}
                  onChange={this.handleInputChange}
                  type="number"
                  label="Runtime"
                  placeholder="minutes"
                />
              </Grid>

              <Grid item className="bottom" xs={12}>
                <TextField
                  name="description"
                  value={movie.description}
                  onChange={this.handleInputChange}
                  className="overview-textarea"
                  label="Overview"
                  placeholder="Movie description"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose}>
            {this.props.mode === MovieDetailsDialogMode.ADD
              ? 'Reset'
              : 'Cancel'}
          </Button>
          <Button onClick={this.handleSubmit}>
            {this.props.mode === MovieDetailsDialogMode.ADD ? 'Submit' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
