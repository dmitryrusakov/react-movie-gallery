import React, {useContext} from 'react';
import './HeaderMovieDetails.scss';
import {HeaderMovieContext} from '../../models/context';
import {Grid, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function HeaderMovieDetails() {
  const headerMovieContext = useContext(HeaderMovieContext);
  const movie = headerMovieContext?.movie;
  const closeDetails = () => {
    headerMovieContext?.setMovie(null);
  };
  const convertMinsToHrsMins = (mins = 0) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    let result = `${m}min`;
    if (h > 0) {
      result = `${h}h ${result}`;
    }
    return result;
  };
  return (
    <div className="header-movie-details">
      <Grid container spacing={4}>
        <Grid item xs={6} sm={4} md={3} lg={2} key={'cover'}>
          <div
            className="cover"
            style={{
              backgroundImage: `url(${movie?.coverUrl})`,
            }}
          ></div>
        </Grid>
        <Grid item xs={6} sm={8} md={9} lg={10} key={'details'}>
          <div className="title-rating-holder">
            <div className="title">{movie?.title}</div>
            <div className="rating">{movie?.rating}</div>
          </div>
          <div className="genre-tags">{movie?.genres.join(', ')}</div>
          <div className="year-runtime-holder">
            <div className="year">{movie?.year}</div>
            <div className="runtime">
              {convertMinsToHrsMins(movie?.runtime)}
            </div>
          </div>
          <div className="description">{movie?.description}</div>
        </Grid>
      </Grid>
      <IconButton
        aria-label="close"
        onClick={closeDetails}
        className="close-button"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
}
