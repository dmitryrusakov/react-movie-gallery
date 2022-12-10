import React from 'react';
import './App.scss';
import ErrorBoundary from './ErrorBoundary';
import Home from './home/Home';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Home />
      </div>
    </ErrorBoundary>
  );
}
