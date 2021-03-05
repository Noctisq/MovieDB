import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setMovies } from '../redux/movies';
import { setQuery } from '../redux/query';
import { API_ENDPOINT_SEARCH, API_ENDPOINT_POPULAR, API_ENDPOINT_TRENDINGMOVIES, API_ENDPOINT_BESTRATED } from '../utils/url';
import Form from './SearchForm'
import Movies from './Movies'

const Home = () => {
  const { query } = useSelector((state) => state.query);
  
  const [error, setError] = useState({
    show: false,
    msg: ''
  });


  const dispatch = useDispatch();


  const getMovies = async (url) => {
    try {
      const response = await fetch(url);
      const movies = await response.json();
      const { results } = movies;

      return results;
    } catch (err) {
      console.log(err);
    }


  }

  const getMoviesQuery = async (query) => {

    try {
      const resultsOfQuery = await getMovies(`${API_ENDPOINT_SEARCH + query}`);

      if (resultsOfQuery.length > 0) {
        dispatch(setMovies(resultsOfQuery));
        dispatch(setIsLoading());
      } else {
        setError({ show: true, msg: "Movies not found :(" });
        console.log(error);
      }

    } catch (err) {
      console.log(err);
    }


  }



  useEffect(() => {

    getMoviesQuery(query);
    dispatch(setIsLoading());
  }, [query, getMoviesQuery]);


  return (
    <main>
      <Form />


      {error.show ? <h1>Error</h1> : <Movies />}
    </main>
  )
}

export default Home
