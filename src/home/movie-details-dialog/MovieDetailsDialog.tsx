import React, {ReactNode, useState} from 'react';
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

export default function MovieDetailsDialog(
  props: PT.InferProps<typeof propTypes>
) {
  const [movie, setMovie] = useState<MovieModel>(
    (props.movie as MovieModel) || new MovieModel(null)
  );
  // const [movie, setMovie] = useState<MovieModel>(props.movie || new MovieModel(null));
  const handleClose = () => {
    props.close();
  };
  const handleSubmit = () => {
    props.submit(movie);
  };
  const handleReleaseDate = (
    date: Moment | null,
    keyboardInputValue?: string | undefined
  ) => {
    movie.year = date?.year() || 0;
    movie.releaseDate = date ? new Date(date?.toDate()) : new Date();
    setMovie(movie);
  };
  const handleGenresSelect = (
    event: SelectChangeEvent<Genre[]>,
    child: ReactNode
  ) => {
    movie.genres = event.target.value as Genre[];
    setMovie(movie);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // @ts-ignore : String can not be used to type MovieModel.
    movie[name] = value;
    setMovie(movie);
  };
  return (
    <Dialog onClose={handleClose} open={props.open}>
      <DialogTitle>
        {`${props.mode === MovieDetailsDialogMode.ADD ? 'ADD' : 'EDIT'} MOVIE`}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
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
                onChange={handleInputChange}
              />

              <TextField
                label="Movie URL"
                name="movieUrl"
                placeholder="https://"
                value={movie.movieUrl}
                onChange={handleInputChange}
                className="text-field"
              />

              <Select
                multiple
                value={movie.genres}
                onChange={handleGenresSelect}
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
                    value={props.movie?.year}
                    onChange={handleReleaseDate}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="MM/DD/YYYY"
                    label="Date desktop"
                  />
                </LocalizationProvider>
              </div>

              <TextField
                name="rating"
                value={movie.rating}
                onChange={handleInputChange}
                type="number"
                label="Rating"
              />

              <TextField
                name="runtime"
                value={movie.runtime}
                onChange={handleInputChange}
                type="number"
                label="Runtime"
                placeholder="minutes"
              />
            </Grid>

            <Grid item className="bottom" xs={12}>
              <TextField
                name="description"
                value={movie.description}
                onChange={handleInputChange}
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
        <Button autoFocus onClick={handleClose}>
          {props.mode === MovieDetailsDialogMode.ADD ? 'Reset' : 'Cancel'}
        </Button>
        <Button onClick={handleSubmit}>
          {props.mode === MovieDetailsDialogMode.ADD ? 'Submit' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
