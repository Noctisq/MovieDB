import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const url =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'


const Movies = () => {
  const { isLoading, moviesResults } = useSelector((state) => state.movies)


  if (isLoading) {

    return <div className="loading"></div>
  } else {
    console.log("dejo de cargar", moviesResults);
    console.log(isLoading)
    return (<section className="movies">
      {

        moviesResults.map((movie) => {
          const { poster_path, id, original_title } = movie
          return <Link className="movie" to={`/movies/${id}`} key={id}>
            <article className="">
              <img alt={original_title} src={poster_path === null ? url : `http://image.tmdb.org/t/p/original/${poster_path}`} />
              <div className="movie-info">
                <h4 className="title">{original_title}</h4>
                <p>Movie</p>
              </div>
            </article>
          </Link>
        })
      }
    </section>
    )

  }

}

export default Movies
