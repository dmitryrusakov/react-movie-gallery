import React from 'react';
import './Sort.scss';
import {Select, MenuItem} from '@mui/material';
import {SelectChangeEvent} from '@mui/material/Select';
import {SORT_OPTIONS} from '../../../models/ui';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {sortBy} from '../../../features/ui-search-params-slice';

export default function Sort() {
  const activeSort = useAppSelector(
    (state) => state.uiSearchParams.selectedSortOption
  );
  const dispatch = useAppDispatch();
  const sortChange = (event: SelectChangeEvent) => {
    dispatch(sortBy(event.target.value as string));
  };
  return (
    <div className="sort">
      <label>Sort by</label>
      <Select
        value={activeSort}
        label="Sort option"
        onChange={sortChange}
        className="select"
      >
        {SORT_OPTIONS.map((so) => (
          <MenuItem key={so.value} value={so.value}>
            {so.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
