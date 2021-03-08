//End points that we're going to use

export const API_ENDPOINT_POPULAR = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;
export const API_ENDPOINT_TRENDINGMOVIES = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
export const API_ENDPOINT_BESTRATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;
export const API_ENDPOINT_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=`;
export const API_ENDPOINT_FIND_ONE = `https://api.themoviedb.org/3/movie/`
