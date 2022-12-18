import React, {useState} from 'react';
import './App.scss';
import ErrorBoundary from './ErrorBoundary';
import Home from './home/Home';
import {useAppDispatch, useAppSelector} from './app/hooks';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  const dispatch = useAppDispatch();

  const [numMovies, setNumMovies] = useState(10);

  return (
    <ErrorBoundary>
      <div className="App">
        <Home />
      </div>
    </ErrorBoundary>
  );
}
