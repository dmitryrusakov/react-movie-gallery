import React, {useState, useContext} from 'react';
import './MovieCard.scss';
import PT from 'prop-types';
import {MoviePropTypes} from '../../../models/movie';
import {Menu, MenuItem, IconButton} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {HeaderMovieContext} from '../../../models/context';
import {MovieModel} from '../../../models/movie';
import {executeInTheNextEventLoopTick} from '@mui/x-date-pickers/internals';

export const propTypes = {
  openDetails: PT.func.isRequired,
  openDeleteDialog: PT.func.isRequired,
  movie: PT.shape(MoviePropTypes).isRequired,
};

export default function MovieCard(props: PT.InferProps<typeof propTypes>) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLButtonElement | null>(
    null
  );
  const headerMovieContext = useContext(HeaderMovieContext);

  const openMenuOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setMenuAnchorEl(
      event.currentTarget.parentNode?.firstChild as HTMLButtonElement
    );
  };
  const closeMenu = () => {
    setMenuAnchorEl(null);
  };
  const openDetails = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    props.openDetails(props.movie);
    closeMenu();
  };
  const openDeleteDialog = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    props.openDeleteDialog(props.movie);
    closeMenu();
  };
  const setMovieForHeaderDetails = (movie: MovieModel) => {
    headerMovieContext?.setMovie(movie);
  };

  let menuIsOpen = Boolean(menuAnchorEl);
  return (
    <div
      className="movie-card"
      onClick={() => setMovieForHeaderDetails(props.movie as MovieModel)}
    >
      <div className="open-menu-hack"></div>
      <IconButton
        aria-label="menu"
        aria-controls={menuIsOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuIsOpen ? 'true' : undefined}
        onClick={openMenuOnClick}
        className="open-menu"
      >
        <MoreVertIcon />
      </IconButton>
      <div
        className="cover"
        style={{
          backgroundImage: `url(${props.movie.coverUrl})`,
        }}
      ></div>
      <Menu
        open={menuIsOpen}
        anchorEl={menuAnchorEl}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={openDetails}>Details</MenuItem>
        <MenuItem onClick={openDeleteDialog}>Delete</MenuItem>
      </Menu>

      <div className="title-year-holder">
        <div className="title">{props.movie.title}</div>
        <div className="year">{props.movie.year}</div>
      </div>
      <div className="genre-tags">{props.movie.genres.join(', ')}</div>
    </div>
  );
}
