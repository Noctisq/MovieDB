import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../redux/query';
import { sortMoviesByName, sortMoviesByScore } from '../redux/movies';

export const getStorageTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

const SearchForm = () => {

  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.query);
  const { error } = useSelector((state) => state.error);
  const { moviesResults } = useSelector((state) => state.movies);
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  const orderByName = () => {



    dispatch(sortMoviesByName());

  };

  const orderByScore = () => {


    dispatch(sortMoviesByScore());

  };

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (<form className="search-form" onSubmit={(e) => {
    e.preventDefault();
  }}>
    <nav>
      <div className="nav-center">
        <h1>Search Movies</h1>

        <input type="text" className="form-input" value={query}
          onChange={(e) => {
            dispatch(setQuery(e.target.value));
          }} />
      </div>
    </nav>



    <div>
      <button onClick={toggleTheme} className="btn" >
        ????
      </button>
      
      <button onClick={orderByName} className="btn" >
        Order by name
      </button>

      <button onClick={orderByScore} className="btn" >
        Order by score
      </button>


    </div>
    {error && < div className="error">No results found :(</div>}
  </form>)
}

export default SearchForm
