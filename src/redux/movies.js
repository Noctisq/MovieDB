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
        }
    }
})

export const { setIsLoading, setMovies } = moviesSlice.actions

export default moviesSlice.reducer