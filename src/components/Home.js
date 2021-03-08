import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, setMovies } from '../redux/movies';
import { setError } from '../redux/error';
import { API_ENDPOINT_SEARCH } from '../utils/url';
import Form from './SearchForm'
import Movies from './Movies'

const Home = () => {
  const { query } = useSelector((state) => state.query);
  const { error } = useSelector((state) => state.error);




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
    
    dispatch(setIsLoading());
    try {
      const resultsOfQuery = await getMovies(`${API_ENDPOINT_SEARCH + query}`);

      if (resultsOfQuery.length > 0) {
        
        if (error) dispatch(setError());
        dispatch(setMovies(resultsOfQuery));


      } else {
        if (error) return;
        dispatch(setError());


      }

    } catch (err) {
      
      dispatch(setError());

      console.log(err);
    }
    dispatch(setIsLoading());


  }

  useEffect(() => {


    getMoviesQuery(query);



  }, [query]);

  return (
    <main>
      
      <Form />
      <Movies />
    </main>
  )
}

export default Home
