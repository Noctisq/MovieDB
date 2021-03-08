import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT_FIND_ONE } from '../utils/url';
import getStorageTheme from './SearchForm';
import url from './Movies';

const SingleMovie = () => {
  
  //Using reactjs hooks when needed and not just only relying on the Redux store

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "Data not Found :(" });
  const [theme, setTheme] = useState(getStorageTheme());
  const [isChecked, setIsChecked] = useState(false);

 //Getting the url so we can get the data of the movie we want
  const getUrl = () => {
    return `${API_ENDPOINT_FIND_ONE}${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
  }
   

  const fetchMovie = async () => {

    const url = getUrl();
    try {
      const response = await fetch(url);
      const movie = await response.json();
      setMovie(movie);
      setIsLoading(false);
    } catch (err) {
      setError((prevState) => ({ ...prevState, show: true }));
      setIsLoading(false);
      console.log(error)
    }

  }


  //Adding to favorites on localstorage so the data is safe even on refresh or on close
  const setFavorites = () => {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      const newFavorites = [...favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));

    } else {
      localStorage.setItem('favorites', JSON.stringify([movie]));
    }
  };

  //Checking if the heart is selected so we can show the heart checked
  const searchFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    const newFavorites = favorites.find(singleMovie => singleMovie.id === parseInt(id));

    if (newFavorites)
      return setIsChecked(true);

    return setIsChecked(false);

  }

  const removeFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const newFavorites = favorites.filter(singleMovie => singleMovie.id === id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  }


  //Checking if we need to add the movie or remove it from the favorites
  
  const checkedFavorite = (e) => {
    if (e.target.checked) {
      setFavorites();
    } else {
      removeFavorites();
    }
  }

  useEffect(() => {
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
    searchFavorite();
  }, []);

  if (isLoading)
    return <div className="loading"></div>;


  if (error.show)
    return (<div className="page-error">
      <h1>{error.msg}</h1>
      <Link to="/" className="btn">
        back to movies
      </Link>
    </div>);

  //destructuring the properties we need and printing de movie
  const { title, poster_path, overview, release_date, genres, runtime, adult, tagline } = movie;

  return (<section className="single-movie">
    <img alt={title} src={poster_path === null ? url : `http://image.tmdb.org/t/p/original/${poster_path}`} />

    <div className="single-movie-info">
      <h1>{title} </h1>

      <h4>{release_date} <span className="labeltime">{runtime}min</span></h4>

      {genres.map(genre => {
        return <span key={genre.id} className="labelgenre">{genre.name}</span>
      })}

      {adult && <span className="labeladult">+18</span>}

      <input onChange={checkedFavorite} defaultChecked={isChecked} id="toggle-heart" type="checkbox" />
      <label htmlFor="toggle-heart">❤</label>

      <h3 style={{ marginTop: 30, fontStyle: "italic" }}>{tagline}</h3>
      <p>{overview}</p>

      <Link to="/" className="btn">back to movies</Link>
    </div>

  </section>)
}

export default SingleMovie
