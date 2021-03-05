import { createSlice } from '@reduxjs/toolkit'

export const errorSlice = createSlice({
    name: 'error',
    initialState: {

        error: false,


    },
    reducers: {

        setError: (state) => {
            state.error = !state.error
        },

    }
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer;