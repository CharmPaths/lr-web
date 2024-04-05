import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IInitState {
    isOpen: boolean
    title: string
    description: string
}

const initialState: IInitState = {
    isOpen: false,
    title: '',
    description: '',
}

export const modalToChangePhotoInfo = createSlice({
    name: 'modalToChangePhotoInfo',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        },
        changeTitle: (state, payload: PayloadAction<string>) => {
            state.title = payload.payload
        },

        changeDescription: (state, payload: PayloadAction<string>) => {
            state.description = payload.payload
        },
        resetModal: (state) => {
            state.isOpen = false
            state.title = ''
            state.description = ''
        },
    },
})

export const {
    openModal,
    closeModal,
    changeTitle,
    changeDescription,
    resetModal,
} = modalToChangePhotoInfo.actions
export const { reducer: modalToChangePhotoInfoReducer } = modalToChangePhotoInfo
