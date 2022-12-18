import React, {useEffect} from 'react';
import './GenreToggle.scss';
import Item from './Item';
import {GENRES, Genre} from '../../../models/genre';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {selectGenre} from '../../../features/ui-search-params-slice';

export default function GenreToggle() {
  const activeGenre = useAppSelector(
    (state) => state.uiSearchParams.selectedGenre
  );
  const dispatch = useAppDispatch();
  const handleSelectGenre = (genreValue: Genre) => {
    dispatch(selectGenre(genreValue));
  };
  return (
    <div className="genre-list">
      {GENRES.map((g) => (
        <Item
          key={g.value}
          isActive={activeGenre === g.value}
          itemId={g.value}
          title={g.label}
          onSelectGenre={handleSelectGenre}
        />
      ))}
    </div>
  );
}
