import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/movies-api-slice';
import selectedMovieReducer from '../features/selected-movie-slice';
import moviesReducer from '../features/movies-slice';
import searchParamsReducer from '../features/ui-search-params-slice';
import uiSearchParamsReducer from '../features/ui-search-params-slice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    selectedMovie: selectedMovieReducer,
    searchParams: searchParamsReducer,
    uiSearchParams: uiSearchParamsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
