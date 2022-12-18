import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieData } from '../models/movie';

interface SelectedMovieState {
  movieData: IMovieData | null;
}

const initialState: SelectedMovieState = {
  movieData: null,
};

const selectedMovieSlice = createSlice({
  name: 'selectedMovie',
  initialState,
  reducers: {
    selectedMovie(state, action) {
      state.movieData = action.payload;
    }
  }
});

export const { selectedMovie } = selectedMovieSlice.actions;
export default selectedMovieSlice.reducer;