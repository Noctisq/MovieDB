import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../redux/query';
const getStorageTheme = () => {
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
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
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
        <button onClick={toggleTheme} className="btn" >
          surprise :o
          </button>
      </div>
    </nav>


    <input type="text" className="form-input" value={query}
      onChange={(e) => {
        dispatch(setQuery(e.target.value));
      }} />

    {error && < div className="error">No results found :(</div>}
  </form>)
}

export default SearchForm
