import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movies';
import queryReducer from './query';
import errorReducer from './error';

export default configureStore({
  reducer: {
    movies: moviesReducer,
    query: queryReducer,
    error: errorReducer
  }
})