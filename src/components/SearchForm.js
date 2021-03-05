import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../redux/query';

const SearchForm = () => {
  
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.query);
  const { error } = useSelector((state) => state.error);

  return (<form className="search-form" onSubmit={(e) => {
    e.preventDefault();
  }}>
    <h2>Search Movies</h2>
    <input type="text" className="form-input" value={query}
      onChange={(e) => {
        dispatch(setQuery(e.target.value));
      }} />
    {error && < div className="error">No results found :(</div>}
  </form>)
}

export default SearchForm
