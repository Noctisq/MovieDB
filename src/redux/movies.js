import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        trendingMovies: [],
        popularMovies: [],
        bestRatedMovies: [],
        allMovies: [],
        searchMovies: [],

    },
    reducers: {

        setAllMovies: (state, action) => {
            state.allMovies = [...state.allMovies, action.payload]
            console.log(state.allMovies);
        },
        setTrendingMovies: (state, action) => {

            state.trendingMovies = [...state.trendingMovies, action.payload]
            console.log(state.trendingMovies);
        },

        setPopularMovies: (state, action) => {

            state.popularMovies = [...state.popularMovies, action.payload]
            console.log(state.popularMovies);
        },

        setBestRatedMovies: (state, action) => {

            state.bestRatedMovies = [...state.bestRatedMovies, action.payload]
            console.log(state.bestRatedMovies);
        },

        setSearchedMovies: (state, action) => {

            state.searchMovies = [...state.searchMovies, action.payload]
            console.log(state.searchMovies);
        },
    }
})

export const { setSearchedMovies, setAllMovies, setTrendingMovies, setPopularMovies, setBestRatedMovies } = moviesSlice.actions

export default moviesSlice.reducer