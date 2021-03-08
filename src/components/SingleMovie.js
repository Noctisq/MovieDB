import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT_FIND_ONE } from '../utils/url';
import getStorageTheme from './SearchForm';
import url from './Movies';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "Data not Found :(" });
  const [theme, setTheme] = useState(getStorageTheme());
  const getUrl = () => {

    return `${API_ENDPOINT_FIND_ONE}${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
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


  useEffect(() => {
    fetchMovie();
  }, [id]);

  useEffect(() => {

    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }

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

  const { title, poster_path, overview, release_date, genres, runtime, adult, tagline } = movie;
  console.log(movie);
  return (<section className="single-movie">
    <img alt={title} src={poster_path === null ? url : `http://image.tmdb.org/t/p/original/${poster_path}`} />

    <div className="single-movie-info">
      <h1>{title}</h1>
      <h4>{release_date} <span className="labeltime">{runtime}min</span></h4>
      {genres.map(genre => {
        return <span key={genre.id} className="labelgenre">{genre.name}</span>
      })}
      {adult && <span className="labeladult">+18</span>}

      <h3 style={{ marginTop: 30, fontStyle: "italic"}}>{tagline}</h3>
      <p>{overview}</p>



      <Link to="/" className="btn">back to movies</Link>
    </div>

  </section>)
}

export default SingleMovie
