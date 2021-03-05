import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT_FIND_ONE } from '../utils/url';
import url from './Movies';

const SingleMovie = () => {
  const { id } = useParams();
  console.log(id)
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: "Data not Found :(" });

  const getUrl = () => {

    return `${API_ENDPOINT_FIND_ONE}${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
  }
  const fetchMovie = async () => {

    const url = getUrl();
    try {
      const response = await fetch(url);
      const movie = await response.json();
      setMovie(movie);
      console.log(movie);
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

  if (isLoading)
    return <div className="loading"></div>;


  if (error.show)
    return (<div className="page-error">
      <h1>{error.msg}</h1>
      <Link to="/" className="btn">
        back to movies
      </Link>
    </div>);

  const { title, poster_path, overview, release_date } = movie;
  return (<section className="single-movie">
    <img alt={title} src={poster_path === null ? url : `http://image.tmdb.org/t/p/original/${poster_path}`} />
    <div className="single-movie-info">
      <h2>{title}</h2>
      <p>{overview}</p>
      <h4>{release_date}</h4>
      <Link to="/" className="btn">back to movies</Link>
    </div>
  </section>)
}

export default SingleMovie
