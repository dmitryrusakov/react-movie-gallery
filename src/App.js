import './App.css';
import Counter from './counter/Counter';
import Search from './search/Search';
import GenreToggle from './toggle/GenreToggle';

function App() {
  return (
    <div className="App">
      <Counter />
      <hr />
      <Search />
      <hr />
      <GenreToggle />
    </div>
  );
}

export default App;
