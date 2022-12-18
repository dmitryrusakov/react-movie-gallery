export type SortOption = '' | 'release_date' | 'vote_count';

export interface ISortOption {
  label: string;
  value: SortOption;
}

export const SORT_OPTIONS: ISortOption[] = [
  {
    label: 'None',
    value: '',
  },
  {
    label: 'Release Date',
    value: 'release_date',
  },
  {
    label: 'Rating',
    value: 'vote_count',
  },
];
