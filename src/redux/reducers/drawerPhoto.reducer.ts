/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from '@reduxjs/toolkit'

interface IInitState {
    isOpen: boolean
}

const initialState: IInitState = {
    isOpen: false,
}

export const drawerPhotoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.isOpen = true
        },
        closeDrawer: (state) => {
            state.isOpen = false
        },
    },
})

export const { openDrawer, closeDrawer } = drawerPhotoSlice.actions
export const { reducer: drawerPhotoReducer } = drawerPhotoSlice
