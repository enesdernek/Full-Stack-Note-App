import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkTheme: true,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.darkTheme = !state.darkTheme
        }
    },
})

// Action creators are generated for each case reducer function
export const { changeTheme } = appSlice.actions

export default appSlice.reducer