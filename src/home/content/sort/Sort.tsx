import React from 'react';
import './Sort.scss';
import {Select, MenuItem} from '@mui/material';
import {SelectChangeEvent} from '@mui/material/Select';

export default class Sort extends React.Component {
  state = {activeSort: 'RELEASE_DATE'};
  sortChange = (event: SelectChangeEvent) => {
    this.setState({activeSort: event.target.value as string});
  };
  render() {
    return (
      <div className="sort">
        <label>Sort by</label>
        <Select
          value={this.state.activeSort}
          label="Sort option"
          onChange={this.sortChange}
          className="select"
        >
          <MenuItem value={'RELEASE_DATE'}>Release date</MenuItem>
          <MenuItem value={'OTHER'}>Other</MenuItem>
        </Select>
      </div>
    );
  }
}
