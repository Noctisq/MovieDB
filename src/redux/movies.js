import { createSlice } from '@reduxjs/toolkit'

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesResults: [],
        isLoading: false

    },
    reducers: {

        setIsLoading: (state) => {


            state.isLoading = !state.isLoading
        },

        setMovies: (state, action) => {

            state.moviesResults = action.payload
        },

        sortMoviesByName: (state) => {
            state.moviesResults = state.moviesResults.sort((first, second) => {
                if (first.title < second.title) { return -1; }
                if (first.title > second.title) { return 1; }
                return 0;
            });
        },

        sortMoviesByScore: (state) => {
            state.moviesResults = state.moviesResults.sort((first, second) => {
                if (first.vote_average < second.vote_average) { return 1; }
                if (first.vote_average > second.vote_average) { return -1; }
                return 0;
            });
        }


    }
})

export const { setIsLoading, setMovies, sortMoviesByName, sortMoviesByScore } = moviesSlice.actions

export default moviesSlice.reducer