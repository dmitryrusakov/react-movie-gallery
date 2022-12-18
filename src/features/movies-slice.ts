import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieData } from '../models/movie';

interface MoviesState {
  moviesData: IMovieData[];
}

const initialState: MoviesState = {
  moviesData: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    moviesData(state, action) {
      state.moviesData = action.payload;
    }
  }
});

export const { moviesData } = moviesSlice.actions;
export default moviesSlice.reducer;
