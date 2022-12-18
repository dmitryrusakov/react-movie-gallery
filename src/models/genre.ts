export type Genre = '' | 'comedy' | 'crime' | 'documentary' | 'horror';

export interface IGenre {
  label: string;
  value: Genre;
}

export const GENRES: IGenre[] = [
  {
    label: 'All',
    value: '',
  }, {
    label: 'Comedy',
    value: 'comedy',
  }, {
    label: 'Crime',
    value: 'crime',
  }, {
    label: 'Documenraty',
    value: 'documentary',
  }, {
    label: 'Horror',
    value: 'horror',
  }
];