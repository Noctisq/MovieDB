import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies';
import queryReducer from './query'
export default configureStore({
  reducer: {
    movies: moviesReducer,
    query: queryReducer
  }
})