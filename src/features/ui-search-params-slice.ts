import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UISearchParams } from '../models/searchParams';

const initialState: UISearchParams = {
  selectedGenre: null,
  searchText: '',
  selectedSortOption: '',
};

const uiSearchParamsSlice = createSlice({
  name: 'uiSearchParams',
  initialState,
  reducers: {
    selectGenre(state, action) {
      state.selectedGenre = action.payload;
    },
    updateSearchText(state, action) {
      state.searchText = action.payload;
    },
    sortBy(state, action) {
      state.selectedSortOption = action.payload;
    }
  }
});

export const {
  selectGenre,
  updateSearchText,
  sortBy,
} = uiSearchParamsSlice.actions;
export default uiSearchParamsSlice.reducer;
