import React from 'react';
import './MovieCard.scss';
import PT from 'prop-types';
import {MoviePropTypes} from '../../../models/movie';
import {Menu, MenuItem, IconButton} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const propTypes = {
  openDetails: PT.func.isRequired,
  openDeleteDialog: PT.func.isRequired,
  movie: PT.shape(MoviePropTypes).isRequired,
};

interface IState {
  menuAnchorEl: HTMLElement | null | ParentNode | ChildNode | undefined;
}

export default class MovieCard extends React.Component<
  PT.InferProps<typeof propTypes>,
  IState
> {
  state = {
    menuAnchorEl: null,
  };
  openMenuOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({menuAnchorEl: event.currentTarget.parentNode?.firstChild});
  };
  closeMenu = () => {
    this.setState({menuAnchorEl: null});
  };
  openDetails = () => {
    this.props.openDetails(this.props.movie);
    this.closeMenu();
  };
  openDeleteDialog = () => {
    this.props.openDeleteDialog(this.props.movie);
    this.closeMenu();
  };
  render() {
    let menuIsOpen = Boolean(this.state.menuAnchorEl);
    return (
      <div className="movie-card">
        <div className="open-menu-hack"></div>
        <IconButton
          aria-label="menu"
          aria-controls={menuIsOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={menuIsOpen ? 'true' : undefined}
          onClick={this.openMenuOnClick}
          className="open-menu"
        >
          <MoreVertIcon />
        </IconButton>
        <div
          className="cover"
          style={{
            backgroundImage: `url(${this.props.movie.coverUrl})`,
          }}
        ></div>
        <Menu
          open={menuIsOpen}
          anchorEl={this.state.menuAnchorEl}
          onClose={this.closeMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={this.openDetails}>Details</MenuItem>
          <MenuItem onClick={this.openDeleteDialog}>Delete</MenuItem>
        </Menu>

        <div className="title-year-holder">
          <div className="title">{this.props.movie.title}</div>
          <div className="year">{this.props.movie.year}</div>
        </div>
        <div className="genre-tags">{this.props.movie.genres.join(', ')}</div>
      </div>
    );
  }
}
