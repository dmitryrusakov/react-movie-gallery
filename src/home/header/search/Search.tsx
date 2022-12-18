import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import './Search.scss';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {updateSearchText} from '../../../features/ui-search-params-slice';

export default function Search() {
  // const searchText = useAppSelector((state) => state.uiSearchParams.searchText);
  const searchTextFromStore = useAppSelector(
    (state) => state.uiSearchParams.searchText
  );
  const [searchText, setSearchText] = useState(searchTextFromStore);
  const dispatch = useAppDispatch();
  const changeSearchText = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setSearchText((event.target as HTMLTextAreaElement).value);
    // dispatch(setSearchText((event.target as HTMLTextAreaElement).value));
  };
  const search = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(updateSearchText(searchText));
  };
  return (
    <div className="search-wrapper">
      <form onSubmit={search}>
        <div className="search-form-wrapper">
          <TextField
            className="search-textfield"
            label="What do you want to watch?"
            variant="standard"
            value={searchText}
            onChange={changeSearchText}
            InputProps={{
              classes: {
                input: 'search-input',
              },
            }}
            InputLabelProps={{
              className: 'search-label',
            }}
          />
          <Button
            type="submit"
            onClick={search}
            variant="outlined"
            className="search-button"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
