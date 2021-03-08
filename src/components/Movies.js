import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'


const Movies = () => {

  const { isLoading, moviesResults } = useSelector((state) => state.movies);
  if (isLoading) {

    return <div className="loading"></div>
  } else {

    return (<section className="movies">
      {

        moviesResults.map((movie) => {

          const { poster_path, id, original_title, vote_average } = movie
          return <Link className="movie" to={`/movies/${id}`} key={id}>
            <article >
              <img alt={original_title} src={poster_path === null ? url : `http://image.tmdb.org/t/p/original/${poster_path}`} />
              <div className="movie-info">
                <h4 className="title">{original_title}</h4>
                <p>User Score: {vote_average * 10}%</p>
                <progress className={vote_average < 5 ? "40" : vote_average < 8 ? "70" : "100"} max="100" value={vote_average * 10} ></progress>

              </div>

            </article>
          </Link>
        })
      }
    </section>
    )

  }

}

export default Movies;
