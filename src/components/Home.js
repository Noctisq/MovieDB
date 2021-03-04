import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedMovies, setAllMovies, setTrendingMovies, setBestRatedMovies, setPopularMovies } from '../redux/movies';
import { API_ENDPOINT_SEARCH, API_ENDPOINT_POPULAR, API_ENDPOINT_TRENDINGMOVIES, API_ENDPOINT_BESTRATED } from '../utils/url';
import Form from './SearchForm'
import Movies from './Movies'

const Home = () => {

  const { moviesNow, popularMovies, bestRatedMovies } = useSelector((state) => state.movies)

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('Avengers');


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
    setIsLoading(true);
    try {
      const resultsOfQuery = await getMovies(`${API_ENDPOINT_SEARCH + query}`);

      if (resultsOfQuery.length > 0) {
        dispatch(setSearchedMovies(resultsOfQuery));
      } else {
        setError({ show: true, msg: "Movies not found :(" });
        console.log(error);
      }

    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);

  }

  const dispatchMovies = async () => {
    setIsLoading(true);

    const trendingMovies = await getMovies(API_ENDPOINT_TRENDINGMOVIES);
    const popularMovies = await getMovies(API_ENDPOINT_POPULAR);
    const bestRatedMovies = await getMovies(API_ENDPOINT_BESTRATED);
    dispatch(setTrendingMovies(trendingMovies));
    dispatch(setPopularMovies(popularMovies));
    dispatch(setBestRatedMovies(bestRatedMovies));
    dispatch(setAllMovies(trendingMovies.concat(popularMovies, bestRatedMovies)));

    setIsLoading(false);
  };


  useEffect(() => {

    dispatchMovies();

  }, []);


  useEffect(() => {

    getMoviesQuery(query);

  }, [query]);


  return (
    <main>
      <Form />


      {error.show ? <h1>Error</h1> : <Movies />}
    </main>
  )
}

export default Home
