import { Genre } from './genre';
import { SortOption } from './ui';

/** Params reflect UI state of search controls. */
export interface UISearchParams {
  selectedGenre: Genre | null;
  searchText: string;
  selectedSortOption: SortOption;
}

/** Params used to build a request query. */
export interface MovieSearchParams {
  filter: string[],  // Array to filter by genres
  sortBy?: string, // Field to sort by
  sortOrder?: 'asc' | 'desc', // Value to define sort direction - 'desc' or 'asc'
  search?: string, // Search value
  // searchBy?: string, // Type of search ["title" or "genres"]
}

export function convertUIToMovieSearchParams(ui: UISearchParams): MovieSearchParams {
  const m: MovieSearchParams = {
    filter: [],
  };
  if (ui.selectedGenre) {
    m.filter.push(ui.selectedGenre);
  }
  if (ui.selectedSortOption) {
    m.sortBy = ui.selectedSortOption;
    // Has no control on UI, just hardcoded to make it work along with sortBy.
    m.sortOrder = 'desc';
  }
  if (ui.searchText?.length) {
    m.search = ui.searchText;
  }
  return m;
}
